"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";
import { fetchProfile } from "@/lib/api";
import { Box, Heading, Text, VStack, Spinner } from "@chakra-ui/react";
import { UserProfile } from "@/types";

export default function ProfilePage() {
  const { token } = useAuthContext();
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (!token) {
      router.push("/login");
    } else {
      fetchProfile(token).then(setProfile).catch(() => router.push("/login"));
    }
  }, [token, router]);

  if (!profile) {
    return (
      <Box textAlign="center" mt={20}>
        <Spinner size="xl" />
        <Heading size="sm" mt={4}>Loading profile...</Heading>
      </Box>
    );
  }

  return (
    <Box maxW="md" mx="auto" mt={10} p={6} borderWidth="1px" borderRadius="lg">
      <Heading mb={4}>My Profile</Heading>
      <VStack align="start" gap={3}>
        <Text><b>User ID:</b> {profile.id}</Text>
        <Text><b>Email:</b> {profile.email}</Text>
        <Text><b>Created At:</b> {new Date(profile.createdAt).toLocaleString()}</Text>
      </VStack>
    </Box>
  );
}