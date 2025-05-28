/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'primary': '#ff735b',
                'primary-dark': '#be503d',
                'primary-light': '#ffaea0',
            },
            fontFamily: {
                'sans': ['Poppins', 'sans-serif'],
            },
            transitionDuration: {
                '0': '0ms',
                '200': '200ms',
                '300': '300ms',
                '400': '400ms',
                '500': '500ms',
                '600': '600ms',
                '700': '700ms',
                '800': '800ms',
                '900': '900ms',
            },
        },
    },
    plugins: [],
}