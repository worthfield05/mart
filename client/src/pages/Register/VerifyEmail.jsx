import { Box, Button, Spinner, Text } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { verifyEmail } from "../../apis/auth";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, ...mutation } = useMutation({
    mutationFn: (token) => verifyEmail(token),
    onSuccess: () => {
      queryClient.invalidateQueries(["currentUser"]);
    },
  });
  useEffect(() => {
    if (!token) {
      return;
    }
    mutate(token);
  }, [token, mutate]);
  if (!token) {
    return <Navigate to={"/"} />;
  }
  return (
    <Box
      maxW="md"
      mx="auto"
      mt={20}
      p={6}
      borderWidth="1px"
      borderRadius="lg"
      shadow="md"
      textAlign="center"
      mb={4}
    >
      {mutation?.isPending && (
        <>
          <Spinner size="xl" mb={4} />
          <Text>Verifying your email, please wait...</Text>
        </>
      )}
      {mutation?.isSuccess && (
        <>
          <Text mb={4}>{mutation?.data?.message}</Text>
        </>
      )}
      {mutation?.isError && (
        <>
          <Text mb={4} color="red.500">
            {mutation?.error?.response?.data?.message}
          </Text>
          <Button colorScheme={"red"} onClick={() => navigate("/login")}>
            Go to Login
          </Button>
        </>
      )}
    </Box>
  );
};

export default VerifyEmail;
