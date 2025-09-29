"use client";

import { Box, Heading, Button } from "@chakra-ui/react";

export default function HomePage() {
  return (
    <Box textAlign="center" mt={10}>
      <Heading>Notes App 📝</Heading>
      <Button colorScheme="teal" mt={4}>
        Get Started
      </Button>
    </Box>
  );
}