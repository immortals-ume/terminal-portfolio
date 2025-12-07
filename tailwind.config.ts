import type {Config} from 'tailwindcss'

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
            },
            animation: {
                'fade-in-up': 'fadeInUp 0.3s ease-out forwards',
            },
            keyframes: {
                fadeInUp: {
                    '0%': {
                        opacity: '0',
                        transform: 'translateY(20px)',
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translateY(0)',
                    },
                },
            },
            fontSize: {
                '2xs': '0.7rem',
                'xs-plus': '0.8125rem',
            },
            spacing: {
                '18': '4.5rem',
                '22': '5.5rem',
            },
            minHeight: {
                '10': '2.5rem',
                '37.5': '9.375rem',
            },
            minWidth: {
                '5': '1.25rem',
            },
        },
    },
    plugins: [],
}
export default config