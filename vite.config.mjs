import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import dotenv from 'dotenv';
import { visualizer } from 'rollup-plugin-visualizer';

// Load environment variables
dotenv.config();

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ['babel-plugin-macros'],
      },
    }),
    visualizer({
      open: false, // Automatically open the report in your default browser
      filename: 'stats.html', // Output file for the report
      template: 'treemap', // Visualization type: 'treemap', 'sunburst', or 'network'
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'), // Map "@" to "src"
    },
  },
  server: {
    port: 3000,
    open: true, // Automatically open in the browser
    historyApiFallback: true, // Support React Router
  },
  build: {
    outDir: 'build', // Align output directory with CRA
  },
  esbuild: {
    loader: 'jsx', // Treat .js files as JSX
    include: /src\/.*\.js$/, // Include .js files in the src directory
    exclude: /node_modules/, // Exclude node_modules
  },
  // optimizeDeps: {
  //   esbuildOptions: {
  //     loader: {
  //       '.js': 'jsx', // Treat all `.js` files as JSX
  //     },
  //   },
  // },
  // define: {
  //   // Define environment variables
  //   'process.env': JSON.stringify(process.env),
  //   'process.stdout': JSON.stringify({
  //     isTTY: true, // Mimic terminal behavior for logging
  //   }),
  // },
});
