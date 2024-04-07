/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class", "[data-mode='dark']"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './stories/**/*.{js,ts,jsx,tsx,mdx}',
	],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        hubotSans: ['var(--font-hubot-sans)'],
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
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
        novel: {
          DEFAULT: "var(--novel-highlight-default)",
          gray: "var(--novel-highlight-gray)",
          red: "var(--novel-highlight-red)",
          green: "var(--novel-highlight-green)",
          yellow: "var(--novel-highlight-yellow)",
          purple: "var(--novel-highlight-purple)",
          orange: "var(--novel-highlight-orange)",
          pink: "var(--novel-highlight-pink)",
          blue: "var(--novel-highlight-blue)",
        },
        success: {
          DEFAULT: "var(--success-bg)",
          foreground: "var(--success-text)",
          border: "var(--success-border)",
        },
        error: {
          DEFAULT: "var(--error-bg)",
          foreground: "var(--error-text)",
          border: "var(--error-border)",
        },
        warning: {
          DEFAULT: "var(--warning-bg)",
          foreground: "var(--warning-text)",
          border: "var(--warning-border)",
        },
        info: {
          DEFAULT: "var(--info-bg)",
          foreground: "var(--info-text)",
          border: "var(--info-border)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require ("@tailwindcss/typography")],
}