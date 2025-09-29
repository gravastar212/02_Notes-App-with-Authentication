"use client";

import { Box, Flex, Heading, Spacer, Button, HStack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { user, setToken } = useAuthContext();
  const router = useRouter();

  function handleLogout() {
    setToken(null);
    router.push("/login");
  }

  return (
    <Box bg="gray.100" px={6} py={3} boxShadow="sm">
      <Flex align="center">
        <Heading size="md">
          <Link href="/">Notes App 📝</Link>
        </Heading>
        <Spacer />
        {user ? (
          <HStack gap={4}>
            <Text fontWeight="medium">{user.email}</Text>
            <Link href="/profile">
              <Button size="sm" variant="outline" colorScheme="blue">
                Profile
              </Button>
            </Link>
            <Button colorScheme="red" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </HStack>
        ) : (
          <HStack gap={4}>
            <Link href="/login">
              <Button colorScheme="blue" size="sm">Login</Button>
            </Link>
            <Link href="/signup">
              <Button colorScheme="teal" size="sm">Sign Up</Button>
            </Link>
          </HStack>
        )}
      </Flex>
    </Box>
  );
}