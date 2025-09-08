import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { FaEnvelope, FaTimes } from "react-icons/fa";
import { forgotPassword } from "../../apis/auth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const mutation = useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      setEmail("");
    },
    onError: () => {
      setEmail("");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(email);
  };
  console.log(mutation);
  console.log(email);
  return (
    <Box px={[null, "20px", "5%", "10%"]} py={"5%"} textAlign={"center"}>
      <Heading py="20px">Forgot Password</Heading>
      <Text>
        Enter your email address. We will send you a code to reset your password
      </Text>

      <FormControl
        isRequired
        mt="4"
        w={["100%", "400px", "500px"]}
        mx={"auto"}
        py="30px"
      >
        {mutation?.isError && (
          <Alert mb={4} rounded={"md"} status="error">
            <AlertIcon />
            <AlertDescription>
              {mutation?.error?.response?.data?.message}
            </AlertDescription>
          </Alert>
        )}
        {mutation?.isSuccess && (
          <Alert mb={4} rounded={"md"} status="success">
            <AlertIcon />
            <AlertDescription>{mutation?.data?.message}</AlertDescription>
          </Alert>
        )}

        <Flex
          align="center"
          w="100%"
          p="2px"
          border="1px"
          borderColor="gray.100"
          borderRadius="0"
        >
          <Button
            href="/"
            bgColor="gray.100"
            p="3"
            border="1px"
            borderRadius="0"
            borderColor="gray.100"
          >
            <FaEnvelope />
          </Button>
          <Input
            type="email"
            fontSize="14px"
            borderRadius="0"
            border="none"
            placeholder="Enter email address"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </Flex>
      </FormControl>

      <Button
        isLoading={mutation?.isPending}
        isDisabled={mutation?.isPending}
        fontSize="14px"
        borderRadius="2px"
        border={"1px solid red.900"}
        bgColor={"red.900"}
        color="white"
        mx="auto"
        w={["100%", "400px", "500px"]}
        mt="6"
        _hover={{ bgColor: "brand.800" }}
        onClick={handleSubmit}
      >
        Reset Password
      </Button>
    </Box>
  );
};

export default ForgotPassword;
