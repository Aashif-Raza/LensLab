const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './script.js', // Adjust if your main JS file is different
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new Dotenv()
  ],
  mode: 'development', // Change to 'production' for production builds
}; 