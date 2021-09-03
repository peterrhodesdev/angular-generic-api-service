import { defaultEnvironment, IEnvironment } from "./environment.default";

const env {
  production: true,
};

export const environment: IEnvironment = { ...defaultEnvironment, ...env };
