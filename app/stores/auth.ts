export const useAuthStore = defineStore('auth', () => {
  const token = useCookie('crm_auth', { maxAge: 86400 });

  const isAuthenticated = computed(() => token.value === 'ok');

  const login = (username: string, password: string): boolean => {
    if (username === 'admin' && password === 'admin') {
      token.value = 'ok';

      return true;
    }
    return false;
  };

  const logout = () => {
    token.value = null;
  };

  return { isAuthenticated, login, logout };
});
