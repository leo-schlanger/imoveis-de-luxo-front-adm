import { useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery } from '@apollo/react-hooks';
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
  Box,
  Switch,
  Progress,
} from '@chakra-ui/core';
import { useRouter } from 'next/router';
import {
  FIND_ADVERTISEMENT_BY_ID,
  UPDATE_ADVERTISEMENT,
} from '../../libs/gql/advertisements';
import { schemaCreateAdvertisement } from '../../utils/yupValidations';
import { yupResolver } from '../../utils/yupResolver';
import Input from '../../components/Input';
import TopNavigation from '../../components/TopNavigation';
import {
  propertyTypeDescription,
  advertisementTypeDescription,
  AdvertisementType,
  PropertyType,
  Advertisement,
} from '../../libs/entities/advertisements';

interface CreateAdvertisementData {
  title: string;
  description: string;
  status: boolean;
  type: AdvertisementType;
  address_visible: boolean;
  type_property: PropertyType;
  value: number;
  country: string;
  state: string;
  postal_code: string;
  neighborhood: string;
  sub_neighborhood: string;
  number: string;
  complement: string;
  street: string;
}
interface FindAdvertisementByIDData {
  getAdvertisementById: Advertisement;
}

const advertisementType = ['PURCHASE', 'TENANCY'] as const;

const propertyType = [
  'HOME',
  'APARTMENT',
  'PENTHOUSE',
  'GRANGE',
  'FARM',
  'TERRAIN',
  'SHED',
  'CORPORATE',
  'OFFICE',
  'STORE',
  'HOTEL',
  'INN',
  'ISLAND',
  'CUSTOMIZED',
] as const;

const CreateAdvertisement: React.FC = () => {
  const { control, handleSubmit, errors } = useForm<CreateAdvertisementData>({
    resolver: yupResolver(schemaCreateAdvertisement),
  });
  const [updateAdvertisement, { error }] = useMutation(UPDATE_ADVERTISEMENT);
  const router = useRouter();
  const toast = useToast();

  const { id } = router.query;

  const { data: response, loading, error: notFound } = useQuery<
    FindAdvertisementByIDData
  >(FIND_ADVERTISEMENT_BY_ID, {
    variables: {
      id: Number(id),
    },
  });

  const onSubmit = useCallback(
    async (data: CreateAdvertisementData): Promise<void> => {
      try {
        await updateAdvertisement({
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
    [updateAdvertisement, error, router, toast],
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

  const advertisement = response.getAdvertisementById;

  return (
    <Flex
      as="main"
      justifyContent="flex-start"
      alignItems="center"
      flexDirection="column"
    >
      <TopNavigation />
      <Heading marginTop="16px" as="h1" fontWeight="700">
        Cadastro de Anúncios
      </Heading>
      <Flex
        as="form"
        width="80vw"
        alignItems="center"
        justifyContent="flex-start"
        flexDirection="column"
        marginY="48px"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Heading
          alignSelf="flex-start"
          marginTop="16px"
          as="h4"
          fontWeight="400"
        >
          Dados básicos:
        </Heading>
        <Box width="100%" borderWidth="1px" rounded="lg" padding="24px">
          <SimpleGrid columns={2} width="100%" spacing={4}>
            <Controller
              name="status"
              control={control}
              defaultValue={advertisement.status}
              render={(props) => (
                <FormControl>
                  <FormLabel htmlFor="status">O anúncio está ativo? </FormLabel>
                  <Switch
                    size="md"
                    value={props.value}
                    onChange={props.onChange}
                  />
                </FormControl>
              )}
            />
            <Flex />
            <Controller
              name="address_visible"
              control={control}
              defaultValue={advertisement.address_visible}
              render={(props) => (
                <FormControl>
                  <FormLabel htmlFor="address_visible">
                    Os compradores podem visualizar o endereço?{' '}
                  </FormLabel>
                  <Switch
                    size="md"
                    value={props.value}
                    onChange={props.onChange}
                  />
                </FormControl>
              )}
            />
            <Flex />
            <Controller
              name="type"
              control={control}
              defaultValue={advertisement.type}
              render={(props) => (
                <FormControl isInvalid={!!errors.type}>
                  <FormLabel htmlFor="type">Tipo de anúncio:</FormLabel>
                  <Select
                    value={props.value}
                    onChange={props.onChange}
                    backgroundColor="gray.600"
                    height="48px"
                  >
                    {advertisementType.map((item) => (
                      <option key={item} value={item}>
                        {advertisementTypeDescription[item]}
                      </option>
                    ))}
                  </Select>
                  {errors.type && (
                    <FormErrorMessage>{errors.type.message}</FormErrorMessage>
                  )}
                </FormControl>
              )}
            />
            <Controller
              name="type_property"
              control={control}
              defaultValue={advertisement.property.type}
              render={(props) => (
                <FormControl isInvalid={!!errors.type_property}>
                  <FormLabel htmlFor="type_property">
                    Tipo de propriedade:
                  </FormLabel>
                  <Select
                    value={props.value}
                    onChange={props.onChange}
                    backgroundColor="gray.600"
                    height="48px"
                  >
                    {propertyType.map((item) => (
                      <option key={item} value={item}>
                        {propertyTypeDescription[item]}
                      </option>
                    ))}
                  </Select>
                  {errors.type_property && (
                    <FormErrorMessage>
                      {errors.type_property.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
              )}
            />

            <Controller
              name="title"
              control={control}
              defaultValue={advertisement.title}
              render={(props) => (
                <FormControl isInvalid={!!errors.title}>
                  <FormLabel htmlFor="title">Título:</FormLabel>
                  <Input
                    value={props.value}
                    onChange={props.onChange}
                    onBlur={props.onBlur}
                    id="title"
                    placeholder="Título"
                  />
                  {errors.title && (
                    <FormErrorMessage>{errors.title.message}</FormErrorMessage>
                  )}
                </FormControl>
              )}
            />
            <Controller
              name="description"
              control={control}
              defaultValue={advertisement.description}
              render={(props) => (
                <FormControl isInvalid={!!errors.description}>
                  <FormLabel htmlFor="description">
                    Descrição (opcional):
                  </FormLabel>
                  <Input
                    value={props.value}
                    onChange={props.onChange}
                    onBlur={props.onBlur}
                    id="description"
                    placeholder="Descrição"
                  />
                  {errors.description && (
                    <FormErrorMessage>
                      {errors.description.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
              )}
            />
            <Controller
              name="value"
              control={control}
              defaultValue={advertisement.property.value}
              render={(props) => (
                <FormControl isInvalid={!!errors.value}>
                  <FormLabel htmlFor="value">Valor do imóvel:</FormLabel>
                  <Input
                    value={props.value}
                    onChange={props.onChange}
                    onBlur={props.onBlur}
                    id="value"
                    placeholder="Valor do imóvel"
                  />
                  {errors.value && (
                    <FormErrorMessage>{errors.value.message}</FormErrorMessage>
                  )}
                </FormControl>
              )}
            />
          </SimpleGrid>
        </Box>

        <Heading
          alignSelf="flex-start"
          marginTop="16px"
          as="h4"
          fontWeight="400"
        >
          Endereço da propriedade:
        </Heading>
        <Box width="100%" borderWidth="1px" rounded="lg" padding="24px">
          <SimpleGrid columns={2} width="100%" spacing={4}>
            <Controller
              name="postal_code"
              control={control}
              defaultValue={advertisement.property.address.postal_code}
              render={(props) => (
                <FormControl isInvalid={!!errors.postal_code}>
                  <FormLabel htmlFor="postal_code">ZIP-CODE(CEP):</FormLabel>
                  <Input
                    value={props.value}
                    onChange={props.onChange}
                    onBlur={props.onBlur}
                    id="postal_code"
                    placeholder="ZIP-CODE(CEP)"
                  />
                  {errors.country && (
                    <FormErrorMessage>
                      {errors.country.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
              )}
            />
            <Flex />
            <Controller
              name="country"
              control={control}
              defaultValue={advertisement.property.address.country}
              render={(props) => (
                <FormControl isInvalid={!!errors.country}>
                  <FormLabel htmlFor="country">País:</FormLabel>
                  <Input
                    value={props.value}
                    onChange={props.onChange}
                    onBlur={props.onBlur}
                    id="country"
                    placeholder="País"
                  />
                  {errors.country && (
                    <FormErrorMessage>
                      {errors.country.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
              )}
            />
            <Controller
              name="state"
              control={control}
              defaultValue={advertisement.property.address.state}
              render={(props) => (
                <FormControl isInvalid={!!errors.state}>
                  <FormLabel htmlFor="state">Estado:</FormLabel>
                  <Input
                    value={props.value}
                    onChange={props.onChange}
                    onBlur={props.onBlur}
                    id="state"
                    placeholder="País"
                  />
                  {errors.state && (
                    <FormErrorMessage>{errors.state.message}</FormErrorMessage>
                  )}
                </FormControl>
              )}
            />
            <Controller
              name="neighborhood"
              control={control}
              defaultValue={advertisement.property.address.neighborhood}
              render={(props) => (
                <FormControl isInvalid={!!errors.neighborhood}>
                  <FormLabel htmlFor="neighborhood">Bairro:</FormLabel>
                  <Input
                    value={props.value}
                    onChange={props.onChange}
                    onBlur={props.onBlur}
                    id="neighborhood"
                    placeholder="Bairro"
                  />
                  {errors.neighborhood && (
                    <FormErrorMessage>
                      {errors.neighborhood.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
              )}
            />
            <Controller
              name="sub_neighborhood"
              control={control}
              defaultValue={
                advertisement.property.address.sub_neighborhood
                  ? advertisement.property.address.sub_neighborhood
                  : ''
              }
              render={(props) => (
                <FormControl isInvalid={!!errors.sub_neighborhood}>
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
                  {errors.sub_neighborhood && (
                    <FormErrorMessage>
                      {errors.sub_neighborhood.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
              )}
            />
            <Controller
              name="street"
              control={control}
              defaultValue={advertisement.property.address.street}
              render={(props) => (
                <FormControl isInvalid={!!errors.street}>
                  <FormLabel htmlFor="street">Rua:</FormLabel>
                  <Input
                    value={props.value}
                    onChange={props.onChange}
                    onBlur={props.onBlur}
                    id="street"
                    placeholder="Rua"
                  />
                  {errors.street && (
                    <FormErrorMessage>{errors.street.message}</FormErrorMessage>
                  )}
                </FormControl>
              )}
            />
            <Controller
              name="number"
              control={control}
              defaultValue={advertisement.property.address.number}
              render={(props) => (
                <FormControl isInvalid={!!errors.number}>
                  <FormLabel htmlFor="number">Número:</FormLabel>
                  <Input
                    value={props.value}
                    onChange={props.onChange}
                    onBlur={props.onBlur}
                    id="number"
                    placeholder="Número"
                  />
                  {errors.number && (
                    <FormErrorMessage>{errors.number.message}</FormErrorMessage>
                  )}
                </FormControl>
              )}
            />
            <Controller
              name="complement"
              control={control}
              defaultValue={advertisement.property.address.complement}
              render={(props) => (
                <FormControl isInvalid={!!errors.complement}>
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
                  {errors.complement && (
                    <FormErrorMessage>
                      {errors.complement.message}
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
          fontSize="16px"
          fontWeight="400"
          padding="24px"
          alignSelf="flex-start"
          marginY="30px"
        >
          Cadastrar
        </Button>
      </Flex>
    </Flex>
  );
};

export default CreateAdvertisement;
