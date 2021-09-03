import { defaultEnvironment, IEnvironment } from "./environment.default";

const env = {
  production: false,
};

export const environment: IEnvironment = { ...defaultEnvironment, ...env };
