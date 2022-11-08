import presetAttributify from "@unocss/preset-attributify";
import presetIcons from "@unocss/preset-icons";
import presetUno from "@unocss/preset-uno";
import presetTagify from "@unocss/preset-tagify";
import presetWindi from "@unocss/preset-wind";
import presetWebFonts from '@unocss/preset-web-fonts'
import { presetForms } from "@julr/unocss-preset-forms";
import { presetScalpel } from "unocss-preset-scalpel";
import { presetExtra } from 'unocss-preset-extra';
import { presetScrollbar } from 'unocss-preset-scrollbar';
import { defineConfig, presetTypography, transformerDirectives, transformerVariantGroup } from "unocss";
import {presetBetterNestedColors} from "unocss-preset-better-nested-colors"


export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify({
      trueToNonValued: true
    }),
    presetWindi(),
    presetTagify(),
    presetScalpel(),
    presetForms(),
    presetTypography(),
    presetExtra(),
    presetScrollbar(),
    presetIcons({
      extraProperties: {
        display: "inline-block",
        "vertical-align": "middle",
      },
    }), // @ts-ignore
    presetWebFonts({
      provider: 'google',
      fonts: {
        manrope: 'Manrope',
        sans: 'Source Sans Pro',
        mono: ['Fira Code', 'Fira Mono:400,700'],
      },
    }),

  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  theme: {
    colors: {},
    breakpoints: {
      xs: '280px',
      sm: '480px',
      md: '720px',
      lg:'1024px'
    },

  },
  shortcuts: [
    {
      input: "w-full border-radius-4px bg-base h-42px focus:border-mauve/50 focus:ring-0 border-2px border-overlay0/25 px-12px py-6px mt-6px",
      btn: "fw-600 px-28px py-12px border-radius-4px bg-mauve/80 hover:bg-mauve/60 color-light whitespace-nowrap",
      sexybar: "scrollbar scrollbar-thumb-color-overlay2/30 scrollbar-track-color-overlay0/30 scrollbar-rounded scrollbar-w-8px scrollbar-radius-4px scrollbar-track-radius-4"
    }
  ],
  rules: [
    [
      /^text-(.*)$/,
      ([, c], { theme }) => {
        // @ts-ignore
        if (theme.colors[c])
          // @ts-ignore
          return { color: theme.colors[c] };
      },
    ],
  ],
});
