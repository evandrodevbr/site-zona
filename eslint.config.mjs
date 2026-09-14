import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [...compat.extends("next/core-web-vitals")];

// O parser do eslint-config-next não declara `meta` (vercel/next.js#74791) e o
// ESLint precisa desse campo para serializar a configuração no cache de lint.
// Sem isso, `next lint` e o passo de lint do `next build` falham com
// "Cannot serialize key \"parse\" in parser: Function values are not supported".
for (const config of eslintConfig) {
  const parser = config.languageOptions?.parser;
  if (parser && typeof parser === "object" && !parser.meta) {
    parser.meta = { name: "next-babel-eslint-parser", version: "1.0.0" };
  }
}

export default eslintConfig;
