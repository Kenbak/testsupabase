import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import Unocss from 'unocss/vite';
import unoConfig from './unocss.config'
import solidSvg from "vite-plugin-solid-svg";

export default defineConfig({
  plugins: [
    solidPlugin(),
    solidSvg(),
    Unocss(unoConfig)
  ],
});
