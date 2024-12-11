// @ts-check
import { defineConfig } from "astro/config";

import lottie from "astro-integration-lottie";

import tunnel from "astro-tunnel";

import icon from "astro-icon";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), icon(), tunnel()],
});