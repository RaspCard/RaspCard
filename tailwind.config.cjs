const config = {
  content: [
    "./src/**/*.{html,js,svelte,ts}",
    "./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}",
  ],

  theme: {
    colors: {
      'primary': 'var(--color-primary)',
      'secondary': 'var(--color-secondary)',
      'primary-button': 'var(--color-primary-button)',
      'secondary-button': 'var(--color-secondary-button)',
      'accent': 'var(--color-accent)',
    }
  },

  plugins: [
    require('flowbite/plugin')
  ],
  darkMode: 'class',
};

module.exports = config;