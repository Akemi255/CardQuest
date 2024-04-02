/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
  darkMode: ["selector"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: {
          DEFAULT: "hsl(var(--border))",
          grey: "hsl(var(--border-grey))",
          button: {
            DEFAULT: "hsl(var(--border-button))",
            hover: "hsl(var(--border-button-hover))",
          },
          overlay: "hsl(var(--border-overlay))",
        },

        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background2: "hsl(var(--background2))",
        background3: "hsl(var(--background3))",

        background: {
          DEFAULT: "hsl(var(--background))",
          surface: {
            100: "hsl(var(--background-surface-100))",
            200: "hsl(var(--background-surface-200))",
            300: "hsl(var(--background-surface-300))",
            400: "hsl(var(--background-surface-400))",
            500: "hsl(var(--background-surface-500))",
          },
        },

        bgSelection: "hsl(var(--background-selection) / var(--tw-bg-opacity))",

        foreground: {
          DEFAULT: "hsl(var(--foreground))",
          muted: "hsl(var(--foreground))",
          light: "hsl(var(--foreground))",
          lighter: "hsl(var(--foreground))",
        },

        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: {
            DEFAULT: "hsl(var(--primary-foreground))",
            light: "hsl(var(--primary-foreground-light))",
            lighter: "hsl(var(--primary-foreground-lighter))",
            morelighter: "hsl(var(--primary-foreground-morelighter))",
          },
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
