module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss/nesting'),
    require('tailwindcss'),
    require('postcss-preset-env')({
      stage: 1,
      features: {
        'is-pseudo-class': false, // Disable transformation for :is() pseudo-class
      },
    }),
    require('cssnano'),
  ],
};
