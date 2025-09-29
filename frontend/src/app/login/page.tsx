"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/auth";
import { Box, Button, Input, Heading, VStack, Text } from "@chakra-ui/react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin() {
    try {
      setError("");
      const res = await login(email, password);
      localStorage.setItem("token", res.token); // store JWT
      router.push("/"); // redirect home
    } catch (err: any) {
      setError(err.response?.data?.error || "Login failed");
    }
  }

  return (
    <Box maxW="sm" mx="auto" mt={10} p={6} borderWidth="1px" borderRadius="md">
      <Heading mb={4}>Login</Heading>
      <VStack spacing={3}>
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