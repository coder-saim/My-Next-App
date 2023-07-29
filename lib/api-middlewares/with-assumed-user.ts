import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth/next"

import { getAuthOptions } from "@/lib/auth"

export function withAssumedUser(handler: NextApiHandler) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, getAuthOptions(req, res))
    const user = session?.user

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not authorized",
      })
    }

    const assumedUserEmail = req.headers["x-assumed-user-email"]
    if (assumedUserEmail) {
      if (user.email?.endsWith("@shaped.ai")) {
        req.query.email = assumedUserEmail
      } else {
        return res.status(403).json({
          success: false,
          message: "Can't assume role of other users",
        })
      }
    } else {
      req.query.email = user.email as string
    }

    return handler(req, res)
  }
}
