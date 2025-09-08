import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { currentUser, logout } from "../apis/auth";

export const useAuth = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: currentUser,
    staleTime: 1000 * 60 * 5,
    retry: false,
    onError: (error) => {
      if (error.response?.status === 401) {
        return null;
      }
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries(["currentUser"]);
      queryClient.clear();
    },
  });
};
