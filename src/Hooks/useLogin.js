import { useMutation } from '@tanstack/react-query';
import { loginAdmin, loginUser } from '../Services/Auth';
import useUserStore from '../Stores/UserStore';
import { showErrorToast } from '../Utils/Utils';

export function useLogin(role) {
  const { setUser, setRole, setToken } = useUserStore();
  return useMutation({
    mutationFn: role === 'admin' ? loginAdmin : loginUser,
    onMutate: (variables) => {
      console.log('Login request started:', variables);
    },
    onSuccess: async (data) => {
      // Set the user in the store upon successful login
      setUser(data.user);
      setRole(data.role);
      setToken(data.token);
      // setIsSubscribed(data.user.is_subscribed);
      // setIsProfileCompleted(data.user.complete_profile);
      // setSelectedBranch(data.user.selected_branch);
      // setBranchName(data.user.branch_name);
      // Set cookie with JavaScript
      document.cookie = `token=${data.token}; path=/; secure; samesite=strict`;
    },
    onError: (error) => {
      showErrorToast(error);
      // Handle errors here (e.g., display a notification)
      console.error('Login Failed', error);
    },
  });
}
