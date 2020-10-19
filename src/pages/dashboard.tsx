import { Flex, Heading } from '@chakra-ui/core';
import React from 'react';
import TopNavigation from '../components/TopNavigation';

export default function Home(): JSX.Element {
  return (
    <Flex
      as="main"
      height="100vh"
      justifyContent="flex-start"
      alignItems="center"
      flexDirection="column"
    >
      <TopNavigation />
      <Heading as="h1" fontWeight="700">
        Dashboard
      </Heading>
    </Flex>
  );
}
