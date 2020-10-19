import { useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@apollo/react-hooks';
import {
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Select,
  SimpleGrid,
  Heading,
  useToast,
} from '@chakra-ui/core';
import { useRouter } from 'next/router';
import {
  UserStatus,
  UserStatusDescription,
  UserType,
  UserTypeDescription,
} from '../../libs/entities/user';
import { CREATE_USER } from '../../libs/gql/users';
import { schemaCreateUsers } from '../../utils/yupValidations';
import { yupResolver } from '../../utils/yupResolver';
import Input from '../../components/Input';
import TopNavigation from '../../components/TopNavigation';

interface CreateUserData {
  name: string;
  responsible: string;
  creci: string;
  email: string;
  phone: string;
  secondary_phone: string;
  status: UserStatus;
  type: UserType;
  password: string;
}

const userTypes = ['ADM', 'ADVERTISER', 'USER'] as const;

const userStatus = ['NEW', 'ACTIVE', 'INACTIVE'] as const;

const CreateUsers: React.FC = () => {
  const { control, handleSubmit, errors } = useForm<CreateUserData>({
    resolver: yupResolver(schemaCreateUsers),
  });
  const [createUser, { error }] = useMutation(CREATE_USER);
  const router = useRouter();
  const toast = useToast();

  const onSubmit = useCallback(
    async (data: CreateUserData): Promise<void> => {
      try {
        await createUser({
          variables: {
            ...data,
          },
        });
        toast({
          position: 'top-right',
          title: 'Cadastro de novo usuário realizado com sucesso!',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
        router.push('/users');
      } catch (err) {
        toast({
          position: 'top-right',
          title: 'Erro ao tentar cadastrar novo usuário',
          description: 'Verifique os campos necessários',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
        // eslint-disable-next-line no-console
        console.log({ error });
      }
    },
    [createUser, error, router, toast],
  );

  return (
    <Flex
      as="main"
      height="100vh"
      justifyContent="flex-start"
      alignItems="center"
      flexDirection="column"
    >
      <TopNavigation />
      <Heading marginTop="16px" as="h1" fontWeight="700">
        Cadastro de usuário
      </Heading>
      <Flex
        as="form"
        width="80vw"
        height="100vh"
        alignItems="center"
        justifyContent="flex-start"
        flexDirection="column"
        marginY="48px"
        onSubmit={handleSubmit(onSubmit)}
      >
        <SimpleGrid columns={2} width="100%" spacing={4}>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            render={(props) => (
              <FormControl isInvalid={!!errors.name}>
                <FormLabel htmlFor="name">Nome:</FormLabel>
                <Input
                  value={props.value}
                  onChange={props.onChange}
                  onBlur={props.onBlur}
                  id="name"
                  placeholder="Nome"
                />
                {errors.name && (
                  <FormErrorMessage>{errors.name.message}</FormErrorMessage>
                )}
              </FormControl>
            )}
          />
          <Controller
            name="responsible"
            control={control}
            defaultValue=""
            render={(props) => (
              <FormControl isInvalid={!!errors.responsible}>
                <FormLabel htmlFor="responsible">
                  Responsável (opcional):
                </FormLabel>
                <Input
                  value={props.value}
                  onChange={props.onChange}
                  onBlur={props.onBlur}
                  id="responsible"
                  placeholder="Responsável"
                />
                {errors.responsible && (
                  <FormErrorMessage>
                    {errors.responsible.message}
                  </FormErrorMessage>
                )}
              </FormControl>
            )}
          />
          <Controller
            name="creci"
            control={control}
            defaultValue=""
            render={(props) => (
              <FormControl isInvalid={!!errors.creci}>
                <FormLabel htmlFor="creci">CRECI (opcional):</FormLabel>
                <Input
                  value={props.value}
                  onChange={props.onChange}
                  onBlur={props.onBlur}
                  id="creci"
                  placeholder="CRECI"
                />
                {errors.creci && (
                  <FormErrorMessage>{errors.creci.message}</FormErrorMessage>
                )}
              </FormControl>
            )}
          />
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={(props) => (
              <FormControl isInvalid={!!errors.email}>
                <FormLabel htmlFor="email">E-mail:</FormLabel>
                <Input
                  value={props.value}
                  onChange={props.onChange}
                  onBlur={props.onBlur}
                  id="email"
                  placeholder="E-mail"
                />
                {errors.email && (
                  <FormErrorMessage>{errors.email.message}</FormErrorMessage>
                )}
              </FormControl>
            )}
          />
          <Controller
            name="phone"
            control={control}
            defaultValue=""
            render={(props) => (
              <FormControl isInvalid={!!errors.phone}>
                <FormLabel htmlFor="phone">Telefone Principal:</FormLabel>
                <Input
                  value={props.value}
                  onChange={props.onChange}
                  onBlur={props.onBlur}
                  id="phone"
                  placeholder="Telefone principal"
                />
                {errors.phone && (
                  <FormErrorMessage>{errors.phone.message}</FormErrorMessage>
                )}
              </FormControl>
            )}
          />
          <Controller
            name="secondary_phone"
            control={control}
            defaultValue=""
            render={(props) => (
              <FormControl isInvalid={!!errors.secondary_phone}>
                <FormLabel htmlFor="secondary_phone">
                  Telefone Secundário (opcional):
                </FormLabel>
                <Input
                  value={props.value}
                  onChange={props.onChange}
                  onBlur={props.onBlur}
                  id="secondary_phone"
                  placeholder="Telefone secundário"
                />
                {errors.secondary_phone && (
                  <FormErrorMessage>
                    {errors.secondary_phone.message}
                  </FormErrorMessage>
                )}
              </FormControl>
            )}
          />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={(props) => (
              <FormControl isInvalid={!!errors.password}>
                <FormLabel htmlFor="password">Senha:</FormLabel>
                <Input
                  value={props.value}
                  onChange={props.onChange}
                  onBlur={props.onBlur}
                  id="password"
                  placeholder="Senha"
                />
                {errors.password && (
                  <FormErrorMessage>{errors.password.message}</FormErrorMessage>
                )}
              </FormControl>
            )}
          />
          <Controller
            name="status"
            control={control}
            defaultValue={userStatus[0]}
            render={(props) => (
              <FormControl isInvalid={!!errors.status}>
                <FormLabel htmlFor="status">Status:</FormLabel>
                <Select
                  value={props.value}
                  onChange={props.onChange}
                  color="black"
                  backgroundColor="gray.400"
                  height="48px"
                >
                  {userStatus.map((item) => (
                    <option key={item} value={item}>
                      {UserStatusDescription[item]}
                    </option>
                  ))}
                </Select>
                {errors.status && (
                  <FormErrorMessage>{errors.status.message}</FormErrorMessage>
                )}
              </FormControl>
            )}
          />
          <Controller
            name="type"
            control={control}
            defaultValue={userTypes[0]}
            render={(props) => (
              <FormControl isInvalid={!!errors.status}>
                <FormLabel htmlFor="type">Tipo de usuário:</FormLabel>
                <Select
                  value={props.value}
                  onChange={props.onChange}
                  color="black"
                  backgroundColor="gray.400"
                  height="48px"
                >
                  {userTypes.map((item) => (
                    <option key={item} value={item}>
                      {UserTypeDescription[item]}
                    </option>
                  ))}
                </Select>
                {errors.status && (
                  <FormErrorMessage>{errors.status.message}</FormErrorMessage>
                )}
              </FormControl>
            )}
          />
        </SimpleGrid>
        <Button
          type="submit"
          width="200px"
          alignSelf="flex-start"
          marginTop="30px"
        >
          Cadastrar
        </Button>
      </Flex>
    </Flex>
  );
};

export default CreateUsers;
