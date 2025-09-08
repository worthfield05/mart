import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { register } from "../../apis/auth";
import { Link as routerLink } from "react-router-dom";

const Register = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!credentials.email) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credentials.email))
      errs.email = "Invalid email format";
    else if (!credentials.password) errs.password = "Password is required";
    else if (credentials.password.length < 8)
      errs.password = "Minimum 8 characters";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const mutation = useMutation({
    mutationFn: register,
    onSuccess: () => {
      setCredentials({ email: "", password: "" });
    },
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    mutation.mutate(credentials);
  };
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Create new account</Heading>
        </Stack>

        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          {mutation.isError && (
            <Alert mb={4} rounded={"md"} status="error">
              <AlertIcon />
              <AlertDescription>
                {mutation?.error?.response?.data?.message}
              </AlertDescription>
            </Alert>
          )}
          <Stack spacing={4}>
            <FormControl id="email" isInvalid={!!errors.email} isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={credentials.email}
                name="email"
                onChange={handleChange}
                required
              />
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            </FormControl>
            <FormControl id="password" isInvalid={!!errors.password} isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={credentials.password}
                name="password"
                onChange={handleChange}
                required
              />
              <FormErrorMessage>{errors.password}</FormErrorMessage>
            </FormControl>
            <Stack spacing={10}>
              <Button
                isLoading={mutation?.isPending}
                isDisabled={mutation?.isPending}
                loadingText="Registering"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={handleSubmit}
              >
                Sign Up
              </Button>
            </Stack>
            {mutation?.isSuccess && (
              <Alert rounded={"md"} status="success">
                <AlertIcon />
                <AlertDescription>{mutation?.data?.message}</AlertDescription>
              </Alert>
            )}
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user?{" "}
                <Link as={routerLink} to={"/login"} color={"blue.400"}>
                  Login
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Register;
