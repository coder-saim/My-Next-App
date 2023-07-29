import { getServerSession } from "next-auth/next"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import EmailProvider from "next-auth/providers/email"
import GitHubProvider from "next-auth/providers/github"
import { Client } from "postmark"
import GoogleProvider from "next-auth/providers/google"

import { siteConfig } from "@/config/site"
import { db } from "@/lib/db"
import { NextApiRequest, NextApiResponse } from "next"
import { AuthOptions } from "next-auth"
import axios from "axios"

export function getAuthOptions(
  req: NextApiRequest | null,
  res: NextApiResponse | null
): AuthOptions {
  return {
    adapter: PrismaAdapter(db as any),
    session: {
      strategy: "jwt",
    },
    pages: {
      signIn: "/login",
    },
    providers: [
      GitHubProvider({
        clientId: process.env.GITHUB_CLIENT_ID || "",
        clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
      }),
      GoogleProvider({
        clientId: process.env.GOOGLE_ID || "",
        clientSecret: process.env.GOOGLE_SECRET || "",
      }),
      EmailProvider({
        from: "support@shaped.ai",
        sendVerificationRequest: async ({ identifier, url, provider }) => {
          const user = await db.user.findUnique({
            where: {
              email: identifier,
            },
            select: {
              emailVerified: true,
            },
          })

          const templateId = user?.emailVerified
            ? process.env.POSTMARK_SIGN_IN_TEMPLATE
            : process.env.POSTMARK_ACTIVATION_TEMPLATE
          if (!templateId) {
            throw new Error("Missing template id")
          }

          const postmarkClient = new Client(
            process.env.POSTMARK_API_TOKEN || ""
          )
          const result = await postmarkClient.sendEmailWithTemplate({
            TemplateId: parseInt(templateId),
            To: identifier,
            From: provider.from as string,
            TemplateModel: {
              action_url: url,
              product_name: siteConfig.name,
              email: identifier,
            },
            Headers: [
              {
                // Set this to prevent Gmail from threading emails.
                // See https://stackoverflow.com/questions/23434110/force-emails-not-to-be-grouped-into-conversations/25435722.
                Name: "X-Entity-Ref-ID",
                Value: new Date().getTime() + "",
              },
            ],
          })

          if (result.ErrorCode) {
            throw new Error(result.Message)
          }
        },
      }),
    ],
    callbacks: {
      async signIn({ user, email }) {
        if (req != null) {
          console.log("Cookies", req.cookies)
          console.log("User", user)
          console.log("Email", email)
          console.log("Query", req.query)
          console.log("URL ", req.url)
        }

        console.log(`Callback Signin - ${JSON.stringify(user)}`)
        if (req != null && req.cookies.sign_in_type == "register") {
          const { invitationCode } = req.cookies

          console.log("Registering user:", user)
          console.log("Inviation code : ", invitationCode)

          if (!invitationCode) {
            // Create organization.
            try {
              const resp = await axios.post(
                `${process.env.SHAPED_PRIVATE_API_URL}/organization`,
                {
                  email: user.email,
                }
              )
              return true
            } catch (error) {
              console.log(`Error creating organization - ${error}`)
              return false
            }
          } else {
            // Member is invited, add this member in an organization
            try {
              const resp = await axios.post(
                `${process.env.SHAPED_PRIVATE_API_URL}/member`,
                {
                  email: user.email,
                  name: user.name,
                  invitationCode: invitationCode,
                }
              )
              return true
            } catch (error) {
              console.log(
                `Error adding organization member ${user.email} - ${error}`
              )
              return false
            }
          }
        } else {
          console.log("Authenticating user:", user)

          // Allow login if tenant found.

          return await fetch(
            `${process.env.SHAPED_PRIVATE_API_URL}/member?email=${user.email}`
          ).then((res) => res.status == 200)
        }
      },
      async session({ token, session }) {
        if (token) {
          session.user.id = token.id
          session.user.name = token.name
          session.user.email = token.email
          session.user.image = token.picture
        }

        return session
      },
      async jwt({ token, user }) {
        const dbUser = await db.user.findFirst({
          where: {
            email: token.email,
          },
        })

        if (!dbUser) {
          if (user) {
            token.id = user?.id
          }
          return token
        }

        return {
          id: dbUser.id,
          name: dbUser.name,
          email: dbUser.email,
          picture: dbUser.image,
        }
      },
    },
  }
}
