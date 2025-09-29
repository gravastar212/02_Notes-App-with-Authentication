"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/auth";
import { Box, Button, Input, Heading, VStack, Text } from "@chakra-ui/react";
import validator from "validator";
import { toaster } from "@/components/ui/toaster"

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin() {
    // Inside handleLogin:
    if (!validator.isEmail(email)) {
      toaster.create({
        title: "Invalid Email",
        type: "error",
        duration: 3000,
        closable: true,
      });
      return;
    }
    if (password.trim().length === 0) {
      toaster.create({
        title: "Empty Password",
        type: "error",
        duration: 3000,
        closable: true,
      });
      return;
    }

    try {
      setError("");
      const res = await login(email, password);
      localStorage.setItem("token", res.token); // store JWT
      window.dispatchEvent(new Event("authChange")); // notify auth change
      toaster.create({
        title: "Login Successful",
        description: "Welcome back!",
        type: "success",
        duration: 3000,
        closable: true,
      });
      router.push("/"); // redirect home
    } catch (err: any) {
      if (err.response?.data?.errors) {
        setError(err.response.data.errors[0].msg); // show first error
      } else {
        setError(err.response?.data?.error || "Login failed");
        toaster.create({
          title: "Login Error",
          description: "errorMsg",
          type: "error",
          duration: 4000,
          closable: true,
        });
      }
    }
  }

  return (
    <Box maxW="sm" mx="auto" mt={10} p={6} borderWidth="1px" borderRadius="md">
      <Heading mb={4}>Login</Heading>
      <VStack gap={3}>
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <Text color="red.500">{error}</Text>}
        <Button colorScheme="teal" w="full" onClick={handleLogin}>
          Login
        </Button>
      </VStack>
    </Box>
  );
}