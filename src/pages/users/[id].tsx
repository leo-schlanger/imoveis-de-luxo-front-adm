import { useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useMutation, useQuery } from '@apollo/react-hooks';
import {
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  SimpleGrid,
  Heading,
  useToast,
  Box,
  Avatar,
  Text,
  Select,
} from '@chakra-ui/core';
import { useRouter } from 'next/router';
import { schemaUpdateUser } from '../../utils/yupValidations';
import { yupResolver } from '../../utils/yupResolver';
import Input from '../../components/Input';
import TopNavigation from '../../components/TopNavigation';
import { FIND_USER_BY_ID, UPDATE_USER } from '../../libs/gql/users';
import Progress from '../../components/Progress';
import {
  User,
  UserType,
  UserStatus,
  UserStatusDescription,
  UserTypeDescription,
} from '../../libs/entities/user';
import { Plan } from '../../libs/api';

interface UpdateUserData {
  name: string;
  email: string;
  phone: string;
  secondary_phone: string;
  avatar_url: string;
  responsible: string;
  description: string;
  creci: string;
  status: UserStatus;
  type: UserType;
  plan: Plan;
  plan_status: boolean;
  address: {
    country: string;
    state: string;
    postal_code: string;
    neighborhood: string;
    sub_neighborhood: string | undefined;
    street: string;
    number: string | undefined;
    complement: string | undefined;
    description: string | undefined;
  };
}

interface FindUserByIDData {
  getUserById: User;
}

const userTypes = ['ADM', 'ADVERTISER', 'USER'] as const;

const userStatus = ['NEW', 'ACTIVE', 'INACTIVE'] as const;

function UserDetails(): JSX.Element {
  const router = useRouter();
  const toast = useToast();
  const { control, handleSubmit, errors } = useForm<UpdateUserData>({
    resolver: yupResolver(schemaUpdateUser),
  });

  const { id } = router.query;
  const [updateUser, { error }] = useMutation(UPDATE_USER);

  const { data: response, loading, error: notFound } = useQuery<
    FindUserByIDData
  >(FIND_USER_BY_ID, {
    variables: {
      id,
    },
  });

  const onSubmit = useCallback(
    async (data: UpdateUserData): Promise<void> => {
      try {
        await updateUser({
          variables: {
            ...data,
            id,
          },
        });
        toast({
          position: 'top-right',
          title: 'Atualização de usuário realizado com sucesso!',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
        router.push('/users');
      } catch (err) {
        toast({
          position: 'top-right',
          title: 'Erro ao tentar atualizar usuário',
          description: 'Verifique os campos necessários',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });

        // eslint-disable-next-line no-console
        console.log({ error });
      }
    },
    [updateUser, error, router, toast, id],
  );

  if (loading) {
    return <Progress />;
  }

  if (notFound) {
    return (
      <Heading as="h1" fontWeight="700">
        Erro ao carregar o usuário... Tente novamente
      </Heading>
    );
  }

  const user = response.getUserById;

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
        Dados do usuário
      </Heading>
      <Avatar
        name={user.name}
        src={user.avatar_url ? user.avatar_url : '/unknown.jpg'}
        size="2xl"
        alignSelf="center"
        marginTop="16px"
      />
      <Flex
        as="form"
        width="80vw"
        justifyContent="flex-start"
        flexDirection="column"
        marginY="48px"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Flex as="div" width="100%" margin="0px" flexDirection="row">
          <Flex as="div" width="60%" margin="0px" flexDirection="column">
            <Heading marginTop="16px" as="h4" fontWeight="400">
              Informações básicas:
            </Heading>
            <Box borderWidth="1px" rounded="lg" padding="24px">
              <SimpleGrid columns={2} width="100%" spacing={4}>
                <Controller
                  name="status"
                  control={control}
                  defaultValue={user.status}
                  render={(props) => (
                    <Select
                      value={props.value}
                      onChange={props.onChange}
                      onBlur={props.onBlur}
                      color="black"
                      backgroundColor="gray.400"
                      id="status"
                      variant="outline"
                    >
                      {userStatus.map((item) => (
                        <option key={item} value={item}>
                          {UserStatusDescription[item]}
                        </option>
                      ))}
                    </Select>
                  )}
                />
                <Controller
                  name="type"
                  control={control}
                  defaultValue={user.type}
                  render={(props) => (
                    <Select
                      value={props.value}
                      onChange={props.onChange}
                      onBlur={props.onBlur}
                      color="black"
                      backgroundColor="gray.400"
                      id="type"
                      variant="outline"
                    >
                      {userTypes.map((item) => (
                        <option key={item} value={item}>
                          {UserTypeDescription[item]}
                        </option>
                      ))}
                    </Select>
                  )}
                />
                <Controller
                  name="name"
                  control={control}
                  defaultValue={user.name}
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
                        <FormErrorMessage>
                          {errors.name.message}
                        </FormErrorMessage>
                      )}
                    </FormControl>
                  )}
                />
                <Controller
                  name="responsible"
                  control={control}
                  defaultValue={user.responsible || ''}
                  render={(props) => (
                    <FormControl isInvalid={!!errors.responsible}>
                      <FormLabel htmlFor="responsible">
                        Responsável (Opcional):
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
                  name="email"
                  control={control}
                  defaultValue={user.email}
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
                        <FormErrorMessage>
                          {errors.email.message}
                        </FormErrorMessage>
                      )}
                    </FormControl>
                  )}
                />
                <Controller
                  name="creci"
                  control={control}
                  defaultValue={user.creci || ''}
                  render={(props) => (
                    <FormControl isInvalid={!!errors.creci}>
                      <FormLabel htmlFor="creci">CRECI:</FormLabel>
                      <Input
                        value={props.value}
                        onChange={props.onChange}
                        onBlur={props.onBlur}
                        id="creci"
                        placeholder="CRECI"
                      />
                      {errors.creci && (
                        <FormErrorMessage>
                          {errors.creci.message}
                        </FormErrorMessage>
                      )}
                    </FormControl>
                  )}
                />
              </SimpleGrid>
            </Box>
          </Flex>
          <Flex as="div" width="40%" marginX="16px" flexDirection="column">
            <Heading marginTop="16px" as="h5" fontWeight="400">
              Plano:
            </Heading>
            <Box borderWidth="1px" rounded="lg" padding="24px">
              {user.plan ? (
                <>
                  <Text>Nome: {user.plan.name}</Text>
                  <Text>Descrição: {user.plan.description}</Text>
                  <Text>Valor: {user.plan.value}</Text>
                </>
              ) : (
                <Text>Nenhum plano vinculado</Text>
              )}
            </Box>
          </Flex>
        </Flex>
        <Heading marginTop="16px" as="h4" fontWeight="400">
          Endereço do usuário:
        </Heading>
        <Box width="100%" borderWidth="1px" rounded="lg" padding="24px">
          <SimpleGrid columns={2} width="100%" spacing={4}>
            <Controller
              name="postal_code"
              control={control}
              defaultValue={user?.address?.postal_code || ''}
              render={(props) => (
                <FormControl
                  isInvalid={!!errors.address && !!errors.address.postal_code}
                >
                  <FormLabel htmlFor="postal_code">ZIP-CODE(CEP):</FormLabel>
                  <Input
                    value={props.value}
                    onChange={props.onChange}
                    onBlur={props.onBlur}
                    id="postal_code"
                    placeholder="ZIP-CODE(CEP)"
                  />
                  {errors.address && errors.address.country && (
                    <FormErrorMessage>
                      {errors.address.country.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
              )}
            />
            <Flex />
            <Controller
              name="country"
              control={control}
              defaultValue={user?.address?.country || ''}
              render={(props) => (
                <FormControl
                  isInvalid={!!errors.address && !!errors.address.country}
                >
                  <FormLabel htmlFor="country">País:</FormLabel>
                  <Input
                    value={props.value}
                    onChange={props.onChange}
                    onBlur={props.onBlur}
                    id="country"
                    placeholder="País"
                  />
                  {errors.address && errors.address.country && (
                    <FormErrorMessage>
                      {errors.address.country.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
              )}
            />
            <Controller
              name="state"
              control={control}
              defaultValue={user?.address?.state || ''}
              render={(props) => (
                <FormControl
                  isInvalid={!!errors.address && !!errors.address.state}
                >
                  <FormLabel htmlFor="state">Estado:</FormLabel>
                  <Input
                    value={props.value}
                    onChange={props.onChange}
                    onBlur={props.onBlur}
                    id="state"
                    placeholder="País"
                  />
                  {errors.address && errors.address.state && (
                    <FormErrorMessage>
                      {errors.address.state.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
              )}
            />
            <Controller
              name="neighborhood"
              control={control}
              defaultValue={user?.address?.neighborhood || ''}
              render={(props) => (
                <FormControl
                  isInvalid={!!errors.address && !!errors.address.neighborhood}
                >
                  <FormLabel htmlFor="neighborhood">Bairro:</FormLabel>
                  <Input
                    value={props.value}
                    onChange={props.onChange}
                    onBlur={props.onBlur}
                    id="neighborhood"
                    placeholder="Bairro"
                  />
                  {errors.address && errors.address.neighborhood && (
                    <FormErrorMessage>
                      {errors.address.neighborhood.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
              )}
            />
            <Controller
              name="sub_neighborhood"
              control={control}
              defaultValue={user?.address?.sub_neighborhood || ''}
              render={(props) => (
                <FormControl
                  isInvalid={
                    !!errors.address && !!errors.address.sub_neighborhood
                  }
                >
                  <FormLabel htmlFor="sub_neighborhood">
                    Sub-bairro (Opcional):
                  </FormLabel>
                  <Input
                    value={props.value}
                    onChange={props.onChange}
                    onBlur={props.onBlur}
                    id="sub_neighborhood"
                    placeholder="Sub-bairro (Opcional)"
                  />
                  {errors.address && errors.address.sub_neighborhood && (
                    <FormErrorMessage>
                      {errors.address.sub_neighborhood.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
              )}
            />
            <Controller
              name="street"
              control={control}
              defaultValue={user?.address?.street || ''}
              render={(props) => (
                <FormControl
                  isInvalid={!!errors.address && !!errors.address.street}
                >
                  <FormLabel htmlFor="street">Rua:</FormLabel>
                  <Input
                    value={props.value}
                    onChange={props.onChange}
                    onBlur={props.onBlur}
                    id="street"
                    placeholder="Rua"
                  />
                  {errors.address && errors.address.street && (
                    <FormErrorMessage>
                      {errors.address.street.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
              )}
            />
            <Controller
              name="number"
              control={control}
              defaultValue={user?.address?.number || ''}
              render={(props) => (
                <FormControl
                  isInvalid={!!errors.address && !!errors.address.number}
                >
                  <FormLabel htmlFor="number">Número:</FormLabel>
                  <Input
                    value={props.value}
                    onChange={props.onChange}
                    onBlur={props.onBlur}
                    id="number"
                    placeholder="Número"
                  />
                  {errors.address && errors.address.number && (
                    <FormErrorMessage>
                      {errors.address.number.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
              )}
            />
            <Controller
              name="complement"
              control={control}
              defaultValue={user?.address?.complement || ''}
              render={(props) => (
                <FormControl
                  isInvalid={!!errors.address && !!errors.address.complement}
                >
                  <FormLabel htmlFor="complement">
                    Complemento (Opcional):
                  </FormLabel>
                  <Input
                    value={props.value}
                    onChange={props.onChange}
                    onBlur={props.onBlur}
                    id="complement"
                    placeholder="Complemento (Opcional)"
                  />
                  {errors.address && errors.address.complement && (
                    <FormErrorMessage>
                      {errors.address.complement.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
              )}
            />
          </SimpleGrid>
        </Box>

        <Button
          type="submit"
          width="200px"
          alignSelf="flex-start"
          marginTop="30px"
        >
          Atualizar dados
        </Button>
      </Flex>
    </Flex>
  );
}

export default UserDetails;
