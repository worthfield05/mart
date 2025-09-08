import {
  Alert,
  AlertDescription,
  AlertIcon,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { resetPassword } from "../../apis/auth";

export default function ResetPassword() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [token, setToken] = useState(searchParams.get("token") || "");
  const [credentials, setCredentials] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const urlToken = searchParams.get("token") || "";
    setToken(urlToken);
  }, [searchParams, setSearchParams]);

  const validate = () => {
    const errs = {};
    if (!credentials.password) errs.password = "Password is required";
    else if (credentials.password.length < 8)
      errs.password = "Minimum 8 characters";
    else if (credentials.password !== credentials.confirmPassword)
      errs.confirmPassword = "Password not match";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const mutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      navigate("/login");
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
    mutation.mutate({ token, password: credentials.password });
  };
  console.log(mutation);
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
          Enter new password
        </Heading>

        {mutation?.isError && (
          <Alert mb={4} rounded={"md"} status="error">
            <AlertIcon />
            <AlertDescription>
              {mutation?.error?.response?.data?.message}
            </AlertDescription>
          </Alert>
        )}

        <FormControl id="password" isInvalid={!!errors.password} isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            value={credentials.password}
            name="password"
            onChange={handleChange}
            required
            type="password"
          />
          <FormErrorMessage>{errors.password}</FormErrorMessage>
        </FormControl>
        <FormControl
          id="confirmPassword"
          isInvalid={!!errors.confirmPassword}
          isRequired
        >
          <FormLabel>Confirm Password</FormLabel>
          <Input
            value={credentials.confirmPassword}
            name="confirmPassword"
            onChange={handleChange}
            required
            type="password"
          />
          <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
        </FormControl>
        <Stack spacing={6}>
          <Button
            isLoading={mutation?.isPending}
            isDisabled={mutation?.isPending}
            bg={"red.400"}
            color={"white"}
            _hover={{
              bg: "red.500",
            }}
            onClick={handleSubmit}
          >
            Reset Password
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
