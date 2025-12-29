import { AxiosError } from "axios";

export const getApiErrorMessage = (
  error: unknown,
  defaultMessage: string
): string => {
  if (error instanceof AxiosError) {
    if (
      error.response?.data &&
      typeof error.response.data === "object" &&
      "message" in error.response.data
    ) {
      return String((error.response.data as any).message);
    }
    return error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return defaultMessage;
};
