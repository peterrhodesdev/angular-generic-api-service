import { commonEnv } from "./environment.common";

const env = {
  production: false,
};

export const environment = { ...commonEnv, ...env };
