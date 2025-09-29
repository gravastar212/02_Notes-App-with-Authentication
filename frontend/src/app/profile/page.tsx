"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";
import { Box, Heading, Text, VStack, Spinner } from "@chakra-ui/react";

export default function ProfilePage() {
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user, router]);

  if (!user) {
    return (
      <Box textAlign="center" mt={20}>
        <Spinner size="xl" />
        <Heading size="sm" mt={4}>Redirecting to login...</Heading>
      </Box>
    );
  }

  return (
    <Box maxW="md" mx="auto" mt={10} p={6} borderWidth="1px" borderRadius="lg">
      <Heading mb={4}>My Profile</Heading>
      <VStack align="start" gap={3}>
        <Text><b>User ID:</b> {user.id}</Text>
        <Text><b>Email:</b> {user.email}</Text>
        <Text><b>Account Created:</b> (not available yet)</Text>
      </VStack>
    </Box>
  );
}