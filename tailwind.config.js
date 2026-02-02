/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                dark: {
                    DEFAULT: '#0a0a0a',
                    100: '#1a1a1a',
                    200: '#2a2a2a',
                },
                brand: {
                    purple: '#8b5cf6', // Violet 500
                    cyan: '#06b6d4',   // Cyan 500
                    blue: '#3b82f6',   // Blue 500
                },
                luxury: {
                    black: '#050505',
                    charcoal: '#121212',
                    gold: '#D4AF37',    // Classic Gold
                    champagne: '#F7E7CE', // Soft Gold
                    silver: '#C0C0C0',
                },
                ember: {
                    black: '#0a0604',      // Deep charcoal with warm undertone
                    charcoal: '#1a1210',   // Dark warm gray
                    orange: '#FF6B35',     // Vibrant ember orange
                    red: '#F7931E',        // Warm glowing red-orange
                    glow: '#FFB627',       // Bright ember glow
                    core: '#FF4500',       // Hot ember core (OrangeRed)
                    ash: '#4A4A4A',        // Cool ash gray
                    flame: '#FFA500',      // Bright flame orange
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                serif: ['Playfair Display', 'serif'],
            },
            animation: {
                'pulse-slow': 'pulse 10s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'blob': 'blob 7s infinite',
                'glow': 'glow 3s ease-in-out infinite',
                'flicker': 'flicker 3s ease-in-out infinite',
                'float': 'float 6s ease-in-out infinite',
                'ember-pulse': 'ember-pulse 4s ease-in-out infinite',
                'rise': 'rise 8s ease-in-out infinite',
            },
            keyframes: {
                blob: {
                    "0%": { transform: "translate(0px, 0px) scale(1)" },
                    "33%": { transform: "translate(30px, -50px) scale(1.1)" },
                    "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
                    "100%": { transform: "translate(0px, 0px) scale(1)" },
                },
                glow: {
                    "0%, 100%": {
                        boxShadow: "0 0 20px rgba(255, 107, 53, 0.3), 0 0 40px rgba(255, 107, 53, 0.1)",
                        filter: "brightness(1)"
                    },
                    "50%": {
                        boxShadow: "0 0 40px rgba(255, 107, 53, 0.6), 0 0 80px rgba(255, 107, 53, 0.3)",
                        filter: "brightness(1.2)"
                    },
                },
                flicker: {
                    "0%, 100%": { opacity: "1" },
                    "25%": { opacity: "0.9" },
                    "50%": { opacity: "1" },
                    "75%": { opacity: "0.85" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
                    "50%": { transform: "translateY(-20px) rotate(3deg)" },
                },
                "ember-pulse": {
                    "0%, 100%": {
                        transform: "scale(1)",
                        opacity: "0.8"
                    },
                    "50%": {
                        transform: "scale(1.05)",
                        opacity: "1"
                    },
                },
                rise: {
                    "0%": {
                        transform: "translateY(0) scale(1)",
                        opacity: "0.6"
                    },
                    "50%": {
                        transform: "translateY(-30px) scale(1.1)",
                        opacity: "0.9"
                    },
                    "100%": {
                        transform: "translateY(-60px) scale(0.8)",
                        opacity: "0"
                    },
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                serif: ['Playfair Display', 'serif'],
            },
            animation: {
                'pulse-slow': 'pulse 10s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'blob': 'blob 7s infinite',
            },
            keyframes: {
                blob: {
                    "0%": { transform: "translate(0px, 0px) scale(1)" },
                    "33%": { transform: "translate(30px, -50px) scale(1.1)" },
                    "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
                    "100%": { transform: "translate(0px, 0px) scale(1)" },
                },
            },
        },
    },
    plugins: [],
}
