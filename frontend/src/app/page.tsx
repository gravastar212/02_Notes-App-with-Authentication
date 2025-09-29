"use client";

import Link from "next/link";
import { Box, Heading, Button, HStack } from "@chakra-ui/react";

export default function HomePage() {
  return (
    <Box p={6}>
      <Heading mb={6}>Notes App 📝</Heading>
      <HStack spacing={4}>
        <Link href="/signup">
          <Button colorScheme="teal">Sign Up</Button>
        </Link>
        <Link href="/login">
          <Button colorScheme="blue">Login</Button>
        </Link>
      </HStack>
    </Box>
  );
}