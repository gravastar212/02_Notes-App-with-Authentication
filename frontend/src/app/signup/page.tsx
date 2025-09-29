"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signup } from "@/lib/auth";
import { Box, Button, Input, Heading, VStack, Text, Progress } from "@chakra-ui/react";
import validator from "validator";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [strength, setStrength] = useState(0);

  function checkPasswordStrength(pw: string) {
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return score;
  }

  async function handleSignup() {
    if (!validator.isEmail(email)) {
      setError("Invalid email format");
      return;
    }
    if (checkPasswordStrength(password) < 3) {
      setError("Password too weak (use 8+ chars, numbers, symbols)");
      return;
    }

    try {
      setError("");
      const res = await signup(email, password);
      localStorage.setItem("token", res.token);
      router.push("/");
    } catch (err: any) {
      if (err.response?.data?.errors) {
        setError(err.response.data.errors[0].msg); // show first error
      } else {
        setError(err.response?.data?.error || "Signup failed");
      }
    }
  }

  return (
    <Box maxW="sm" mx="auto" mt={10} p={6} borderWidth="1px" borderRadius="md">
      <Heading mb={4}>Sign Up</Heading>
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
          onChange={(e) => {
            setPassword(e.target.value);
            setStrength(checkPasswordStrength(e.target.value));
          }}
        />
        <Progress.Root value={strength * 25} width="100%">
          <Progress.Track>
            <Progress.Range colorScheme="green" />
          </Progress.Track>
        </Progress.Root>
        {error && <Text color="red.500">{error}</Text>}
        <Button colorScheme="teal" w="full" onClick={handleSignup}>
          Sign Up
        </Button>
      </VStack>
    </Box>
  );
}