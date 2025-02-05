/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"], // Asegura que Tailwind escanee tus archivos HTML
  theme: {
    extend: {
      fontSize: {
        h1: ['32px', '1.2'], // Tamaño base 32px con line-height de 1.2
      },
      screens: {
        sm: '640px',
      },
    },
  },
  plugins: [],
};

Smodule.exports = {
  content: ["./*.html"],
  theme: {
    extend: {},
  },
  plugins: [],
};
module.exports = {
  theme: {
    extend: {
      minWidth: {
        'btn': '150px'
      },
      maxWidth: {
        'btn': '350px'
      }
    }
  }
}
