const USER_KEY = "logika_user";

export interface UserInfo {
  email: string;
}

export const currentUser = {
  get: (): UserInfo | null => {
    try {
      const stored = localStorage.getItem(USER_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  },
  set: (user: UserInfo) => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },
  remove: () => {
    localStorage.removeItem(USER_KEY);
  },
};
