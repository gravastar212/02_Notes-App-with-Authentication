"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/auth";
import { Box, Button, Input, Heading, VStack, Text } from "@chakra-ui/react";
import validator from "validator";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin() {
    // Inside handleLogin:
    if (!validator.isEmail(email)) {
      setError("Invalid email format");
      return;
    }
    if (password.trim().length === 0) {
      setError("Password cannot be empty");
      return;
    }

    try {
      setError("");
      const res = await login(email, password);
      localStorage.setItem("token", res.token); // store JWT
      window.dispatchEvent(new Event("authChange")); // notify auth change
      router.push("/"); // redirect home
    } catch (err: any) {
      setError(err.response?.data?.error || "Login failed");
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