module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                gray: {
                    200: '#e5e7eb',
                    300: '#d1d5db',
                    400: '#9ca3af',
                    900: '#111827',
                },
                indigo: {
                    500: '#6366f1',
                    600: '#4f46e5',
                    700: '#4338ca',
                },
                white: '#ffffff',
            },
            width: {
                '7/10': '70%',
                '3/10': '30%',
            },
        },
    },
    plugins: [require('@headlessui/react'), require('@tailwindcss/forms')],
}