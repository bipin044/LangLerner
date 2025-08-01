import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup } from "../lib/api";

const useSignUp = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: signup,
    onSuccess: (data, variables, context) => {
      // Store token in localStorage
      if (data.token) {
        localStorage.setItem('authToken', data.token);
      }
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      
      // Call the success callback if provided
      if (context?.onSuccess) {
        context.onSuccess(data);
      }
    },
    onError: (error, variables, context) => {
      // Call the error callback if provided
      if (context?.onError) {
        context.onError(error);
      }
    }
  });

  return { isPending, error, signupMutation: mutate };
};
export default useSignUp;
