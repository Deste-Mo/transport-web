import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import {SERVERLINK} from "./src/constants/index.js";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      "/api":{
        target:SERVERLINK,
      },
    },
  }
})
