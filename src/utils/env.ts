const isProd = process.env.NODE_ENV === "production";

export const env = {
  authBaseUrl: isProd ? "" : (process.env.REACT_APP_AUTH_API_BASE as string),
  actionsBaseUrl: isProd
    ? ""
    : (process.env.REACT_APP_ACTIONS_API_BASE as string),
};
