import { ChangeEvent, FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Flex, Grid, Heading, useToast } from '@chakra-ui/core';

import Input from '../components/Input';
import { useAuth } from '../contexts/hooks/auth';

export default function SignInHome(): JSX.Element {
  const { signIn, isAuthenticated } = useAuth();
  const router = useRouter();
  const toast = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSecret, setIsSecret] = useState(true);

  if (isAuthenticated) {
    router.push('/dashboard');
  }

  async function handleSignIn(event: FormEvent): Promise<void> {
    event.preventDefault();
    setLoading(true);

    try {
      await signIn({
        email,
        password,
      });
      toast({
        position: 'top-right',
        title: 'Login realizado com sucesso!',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      router.push('/dashboard');
    } catch (err) {
      toast({
        position: 'top-right',
        title: 'Erro ao tentar se conectar',
        description: 'Verifique suas credenciais',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      // eslint-disable-next-line no-console
      console.log({ err });
    } finally {
      setLoading(false);
    }
  }

  function handleViewPassword(event: FormEvent): void {
    event.preventDefault();

    isSecret ? setIsSecret(false) : setIsSecret(true);
  }

  return (
    <Grid
      as="main"
      height="100vh"
      templateColumns="1fr 480px 480px 1fr"
      templateRows="1fr 480px 1fr"
      templateAreas="
        '. . . .'
        '. logo form .'
        '. . . .'
      "
      justifyContent="center"
      alignItems="center"
    >
      <Flex gridArea="logo" flexDir="column" alignItems="flex-start">
        <img src="/logo.svg" alt="Imóveis de luxo" height="56" />
        <Heading size="2xl" lineHeight="shorter" marginTop={16}>
          Faça seu login na plataforma
        </Heading>
      </Flex>

      <Flex
        as="form"
        gridArea="form"
        height="100%"
        backgroundColor="gray.700"
        borderRadius="md"
        flexDir="column"
        alignItems="center"
        justifyContent="center"
        padding={16}
        onSubmit={handleSignIn}
      >
        <Input
          placeholder="e-mail"
          width="100%"
          value={email}
          leftIconInput="email"
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setEmail(event.target.value)
          }
        />
        <Input
          placeholder="senha"
          width="100%"
          marginTop={2}
          value={password}
          type={!isSecret ? 'text' : 'password'}
          leftIconInput="lock"
          rightIconInput={isSecret ? 'view' : 'view-off'}
          rightOnClick={handleViewPassword}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setPassword(event.target.value)
          }
        />

        <Button
          backgroundColor="orange.700"
          height="50px"
          width="100%"
          borderRadius="sm"
          isLoading={loading}
          isDisabled={loading}
          marginTop={6}
          _hover={{ color: 'orange.900' }}
          _focus={{ color: 'orange.900' }}
          type="submit"
        >
          ENTRAR
        </Button>
      </Flex>
    </Grid>
  );
}
