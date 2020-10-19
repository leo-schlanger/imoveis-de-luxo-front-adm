import Link from 'next/link';
import { useRouter } from 'next/router';
import { FiLogOut } from 'react-icons/fi';
import { Box, Button, Flex } from '@chakra-ui/core';
import { useAuth } from '../contexts/hooks/auth';

const TopNavigation: React.FC = () => {
  const { signOut } = useAuth();
  const router = useRouter();

  function handleSignOut(): void {
    signOut();

    router.push('/');
  }

  return (
    <Flex
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      backgroundColor="#333"
      width="100vw"
      height="16"
      padding="2"
    >
      <Flex
        color="#f2f2f2"
        textAlign="center"
        textDecoration="none"
        width="25%"
        alignItems="center"
        justifyContent="space-between"
      >
        <Link href="/dashboard">
          <Button
            textAlign="center"
            paddingX="14px"
            paddingY="16px"
            fontSize="18px"
            fontWeight="400"
            backgroundColor="transparent"
            _hover={{ backgroundColor: '#ddd', color: 'black' }}
          >
            Home
          </Button>
        </Link>
        <Link href="/users">
          <Button
            textAlign="center"
            paddingX="14px"
            paddingY="16px"
            fontSize="18px"
            fontWeight="400"
            backgroundColor="transparent"
            _hover={{ backgroundColor: '#ddd', color: 'black' }}
          >
            Usuários
          </Button>
        </Link>
        <Link href="advertisements">
          <Button
            textAlign="center"
            paddingX="14px"
            paddingY="16px"
            fontSize="18px"
            fontWeight="400"
            backgroundColor="transparent"
            _hover={{ backgroundColor: '#ddd', color: 'black' }}
          >
            Anúncios
          </Button>
        </Link>
        <Link href="/plans">
          <Button
            textAlign="center"
            paddingX="14px"
            paddingY="16px"
            fontSize="18px"
            fontWeight="400"
            backgroundColor="transparent"
            _hover={{ backgroundColor: '#ddd', color: 'black' }}
          >
            Planos
          </Button>
        </Link>
      </Flex>
      <Button
        alignSelf="center"
        alignItems="center"
        justifyContent="center"
        size="lg"
        onClick={handleSignOut}
      >
        <Box as={FiLogOut} color="red.500" size="32px" />
      </Button>
    </Flex>
  );
};

export default TopNavigation;
