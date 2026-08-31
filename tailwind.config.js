/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                void: {
                    DEFAULT: '#050506', // page background
                    100: '#0b0b0d',     // panel background
                    200: '#131316',     // raised panel / card surface
                    300: '#1c1c20',     // hairline-adjacent surface, hover states
                },
                steel: {
                    DEFAULT: '#8a8a92', // secondary text
                    line: '#2a2a30',    // hairline borders
                    lineStrong: '#3a3a42',
                    ash: '#4a4a52',     // muted / disabled
                },
                signal: {
                    DEFAULT: '#FF6B35', // primary energy accent — vibrant ember orange
                    bright: '#FFB627',  // hover / active glow
                    dim: '#7A3712',     // low-emphasis accent
                    core: '#FF4500',    // hottest highlight, used sparingly
                },
                alert: {
                    DEFAULT: '#a11d2e', // dark crimson — warning / targeting only
                    bright: '#e0304a',  // active alert state
                },
            },
            fontFamily: {
                sans: ['Inter', 'Inter Fallback', 'sans-serif'],
                display: ['Space Grotesk', 'Space Grotesk Fallback', 'Inter', 'Inter Fallback', 'sans-serif'],
                mono: ['JetBrains Mono', 'JetBrains Mono Fallback', 'ui-monospace', 'monospace'],
            },
            animation: {
                'power-pulse': 'power-pulse 4s ease-in-out infinite',
                'marquee': 'marquee 38s linear infinite',
                'scan': 'scan 6s linear infinite',
                'blink': 'blink 1.1s step-end infinite',
                'flicker': 'flicker 3s ease-in-out infinite',
                'conduit-flow': 'conduit-flow 2.4s linear infinite',
                'chamfer-in': 'chamfer-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) both',
            },
            keyframes: {
                'power-pulse': {
                    "0%, 100%": { transform: "scale(1)", opacity: "0.85" },
                    "50%": { transform: "scale(1.05)", opacity: "1" },
                },
                flicker: {
                    "0%, 100%": { opacity: "1" },
                    "25%": { opacity: "0.9" },
                    "50%": { opacity: "1" },
                    "75%": { opacity: "0.85" },
                },
                marquee: {
                    "0%": { transform: "translateX(0)" },
                    "100%": { transform: "translateX(-50%)" },
                },
                scan: {
                    "0%": { transform: "translateY(-100%)" },
                    "100%": { transform: "translateY(100%)" },
                },
                blink: {
                    "0%, 100%": { opacity: "1" },
                    "50%": { opacity: "0" },
                },
                'conduit-flow': {
                    "0%": { backgroundPosition: "0 -120%" },
                    "100%": { backgroundPosition: "0 120%" },
                },
                'chamfer-in': {
                    "0%": { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)", opacity: "0" },
                    "100%": { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", opacity: "1" },
                },
            },
        },
    },
    plugins: [],
}
