const { colors } = require("tailwindcss/colors")
const { fontFamily } = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./ui/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  safelist: [
    'text-green-800',
    'bg-green-100',
    'text-yellow-800',
    'bg-yellow-100',
    'text-violet-800',
    'bg-violet-100',
    'text-blue-800',
    'bg-blue-100',
    'text-orange-800',
    'bg-orange-100',
    'text-red-800',
    'bg-red-100',
    'text-slate-800',
    'bg-slate-100',
    'bg-gray-100',
    'pl-0',
    'pl-10',
    'pl-20',
    'bg-indigo-50',
    'bg-indigo-500',
    'bg-yellow-500'
  ],
  darkMode: ["class"],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1440px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", ...fontFamily.sans],
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "overlay-show": {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        "content-show": {
          from: { opacity: 0, transform: 'translate(-50%, -48%) scale(0.96)' },
          to: { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "overlay-show": 'overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        "content-show": 'contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
  ],
}