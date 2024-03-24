/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions & import('@ianvs/prettier-plugin-sort-imports').PluginConfig} */
const config = {
  plugins: [
    "prettier-plugin-tailwindcss",
    "@ianvs/prettier-plugin-sort-imports",
  ],
  importOrder: [
    ".css$",
    "",
    "<BUILT_IN_MODULES>",
    "",
    "^(react/(.*)$)|^(react$)",
    "^(react-dom/(.*)$)|^(react-dom$)",
    "^(next/(.*)$)|^(next$)",
    "",
    "<THIRD_PARTY_MODULES>",
    "",
    "^types$",
    "^~/types/(.*)$",
    "",
    "^~/config/(.*)$",
    "^~/hooks/(.*)$",
    "^~/components/(.*)$",
    "^(~/providers/(.*)$)|^(~/providers$)",
    "^~/assets/(.*)$",
    "^~/utils/(.*)$",
    "^~/shared/ui/(.*)$",
    "^~/shared/(.*)$",
    "",
    "^~/app/(.*)$",
    "",
    "^~/(.*)$",
    "",
    "^[./]",
  ],
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
};

export default config;
