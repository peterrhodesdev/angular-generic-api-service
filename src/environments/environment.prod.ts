import { commonEnv } from "./environment.common";

const env {
  production: true,
};

export const environment = { ...commonEnv, ...env };
