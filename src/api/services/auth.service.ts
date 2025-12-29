import { createHttpClient } from "../http/httpClient";
import { env } from "../../utils/env";

export interface LoginPayload {
  username: string;
  password?: string;
}

export interface AuthResponse {
  token: string;
  expiration?: string;
}

const authClient = createHttpClient({
  baseURL: env.authBaseUrl,
});

export const authService = {
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    const response = await authClient.post<string>(
      "/api/Authentication/Login",
      payload
    );
    return { token: response.data };
  },
};
