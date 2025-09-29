"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signup } from "@/lib/auth";
import { Box, Button, Input, Heading, VStack, Text, Progress } from "@chakra-ui/react";
import validator from "validator";
import { toaster } from "@/components/ui/toaster"

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
      toaster.create({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        type: "error",
        duration: 3000,
        closable: true,
      });
      return;
    }
    if (checkPasswordStrength(password) < 3) {
      toaster.create({
        title: "Weak Password",
        description: "Use 8+ chars with numbers & symbols",
        type: "error",
        duration: 3000,
        closable: true,
      });
      return;
    }

    try {
      setError("");
      const res = await signup(email, password);
      localStorage.setItem("token", res.token);
      toaster.create({
        title: "Signup Successful",
        description: "Welcome to Notes App!",
        type: "success",
        duration: 3000,
        closable: true,
      });
      router.push("/");
    } catch (err: any) {
      if (err.response?.data?.errors) {
        setError(err.response.data.errors[0].msg); // show first error
      } else {
        setError(err.response?.data?.error || "Signup failed");
        toaster.create({
          title: "Signup Error",
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