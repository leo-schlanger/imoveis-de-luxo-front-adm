import { Flex } from '@chakra-ui/core';
import { useRouter } from 'next/router';
import React from 'react';

export default function UserDetails(): JSX.Element {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Flex
      as="main"
      height="100vh"
      justifyContent="flex-start"
      alignItems="center"
      flexDirection="column"
    >
      Hello {id}
    </Flex>
  );
}
