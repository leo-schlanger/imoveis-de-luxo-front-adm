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
  SimpleGrid,
  Heading,
  useToast,
} from '@chakra-ui/core';
import { useRouter } from 'next/router';
import { schemaCreatePlan } from '../../utils/yupValidations';
import { yupResolver } from '../../utils/yupResolver';
import Input from '../../components/Input';
import TopNavigation from '../../components/TopNavigation';
import { CREATE_PLAN } from '../../libs/gql/plans';

interface CreatePlanData {
  name: string;
  description: string;
  quantity_properties: number;
  quantity_photos: number;
  quantity_videos: number;
  value: number;
}

const CreatePlans: React.FC = () => {
  const { control, handleSubmit, errors } = useForm<CreatePlanData>({
    resolver: yupResolver(schemaCreatePlan),
  });
  const [createPlan, { error }] = useMutation(CREATE_PLAN);
  const router = useRouter();
  const toast = useToast();

  const onSubmit = useCallback(
    async (data: CreatePlanData): Promise<void> => {
      try {
        await createPlan({
          variables: {
            ...data,
          },
        });
        toast({
          position: 'top-right',
          title: 'Cadastro de novo plano realizado com sucesso!',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
        router.push('/plans');
      } catch (err) {
        toast({
          position: 'top-right',
          title: 'Erro ao tentar cadastrar novo plano',
          description: 'Verifique os campos necessários',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });

        // eslint-disable-next-line no-console
        console.log({ error });
      }
    },
    [createPlan, error, router, toast],
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
        Cadastro de plano
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
            name="description"
            control={control}
            defaultValue=""
            render={(props) => (
              <FormControl isInvalid={!!errors.description}>
                <FormLabel htmlFor="description">
                  Descrição do plano (opcional):
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
            name="quantity_properties"
            control={control}
            defaultValue=""
            render={(props) => (
              <FormControl isInvalid={!!errors.quantity_properties}>
                <FormLabel htmlFor="quantity_properties">
                  Quantidade de propriedades:
                </FormLabel>
                <Input
                  value={props.value}
                  onChange={props.onChange}
                  onBlur={props.onBlur}
                  id="quantity_properties"
                  placeholder="Quantidade de propriedades"
                />
                {errors.quantity_properties && (
                  <FormErrorMessage>
                    {errors.quantity_properties.message}
                  </FormErrorMessage>
                )}
              </FormControl>
            )}
          />
          <Controller
            name="quantity_photos"
            control={control}
            defaultValue=""
            render={(props) => (
              <FormControl isInvalid={!!errors.quantity_photos}>
                <FormLabel htmlFor="quantity_photos">
                  Quantidade de fotos:
                </FormLabel>
                <Input
                  value={props.value}
                  onChange={props.onChange}
                  onBlur={props.onBlur}
                  id="quantity_photos"
                  placeholder="Quantidade de fotos"
                />
                {errors.quantity_photos && (
                  <FormErrorMessage>
                    {errors.quantity_photos.message}
                  </FormErrorMessage>
                )}
              </FormControl>
            )}
          />
          <Controller
            name="quantity_videos"
            control={control}
            defaultValue=""
            render={(props) => (
              <FormControl isInvalid={!!errors.quantity_videos}>
                <FormLabel htmlFor="quantity_videos">
                  Quantidade de vídeos:
                </FormLabel>
                <Input
                  value={props.value}
                  onChange={props.onChange}
                  onBlur={props.onBlur}
                  id="quantity_videos"
                  placeholder="Quantidade de vídeos"
                />
                {errors.quantity_videos && (
                  <FormErrorMessage>
                    {errors.quantity_videos.message}
                  </FormErrorMessage>
                )}
              </FormControl>
            )}
          />
          <Controller
            name="value"
            control={control}
            defaultValue=""
            render={(props) => (
              <FormControl isInvalid={!!errors.value}>
                <FormLabel htmlFor="value">Valor do plano:</FormLabel>
                <Input
                  value={props.value}
                  onChange={props.onChange}
                  onBlur={props.onBlur}
                  id="value"
                  placeholder="Valor do plano"
                />
                {errors.value && (
                  <FormErrorMessage>{errors.value.message}</FormErrorMessage>
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

export default CreatePlans;
