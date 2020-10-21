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
} from '@chakra-ui/core';
import { useRouter } from 'next/router';
import { schemaUpdatePlan } from '../../utils/yupValidations';
import { yupResolver } from '../../utils/yupResolver';
import Input from '../../components/Input';
import TopNavigation from '../../components/TopNavigation';
import { FIND_PLAN_BY_ID, UPDATE_PLAN } from '../../libs/gql/plans';
import Progress from '../../components/Progress';
import { Plan } from '../../libs/entities/plan';

interface UpdatePlanData {
  name: string;
  description: string;
  quantity_properties: number;
  quantity_photos: number;
  quantity_videos: number;
  value: number;
}

interface FindPlanByIDData {
  getPlanById: Plan;
}

function PlanDetails(): JSX.Element {
  const router = useRouter();
  const toast = useToast();
  const { control, handleSubmit, errors } = useForm<UpdatePlanData>({
    resolver: yupResolver(schemaUpdatePlan),
  });

  const { id } = router.query;
  const [updatePlan, { error }] = useMutation(UPDATE_PLAN);

  const { data: response, loading, error: notFound } = useQuery<
    FindPlanByIDData
  >(FIND_PLAN_BY_ID, {
    variables: {
      id,
    },
  });

  const onSubmit = useCallback(
    async (data: UpdatePlanData): Promise<void> => {
      try {
        await updatePlan({
          variables: {
            ...data,
            id,
          },
        });
        toast({
          position: 'top-right',
          title: 'Atualização de plano realizado com sucesso!',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
        router.push('/plans');
      } catch (err) {
        toast({
          position: 'top-right',
          title: 'Erro ao tentar atualizar plano',
          description: 'Verifique os campos necessários',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });

        // eslint-disable-next-line no-console
        console.log({ error });
      }
    },
    [updatePlan, error, router, toast, id],
  );

  if (loading) {
    return <Progress />;
  }

  if (notFound) {
    return (
      <Heading as="h1" fontWeight="700">
        Erro ao carregar o plano... Tente novamente
      </Heading>
    );
  }

  const plan = response.getPlanById;

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
        Dados do plano
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
            defaultValue={plan.name}
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
            defaultValue={plan.description ? plan.description : ''}
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
            defaultValue={plan.quantity_properties}
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
            defaultValue={plan.quantity_photos}
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
            defaultValue={plan.quantity_videos}
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
            defaultValue={plan.value}
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
          Atualizar dados
        </Button>
      </Flex>
    </Flex>
  );
}

export default PlanDetails;
