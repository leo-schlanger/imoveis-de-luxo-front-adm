import { useMutation, useQuery } from '@apollo/react-hooks';
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Tag,
  Text,
} from '@chakra-ui/core';
import { useRouter } from 'next/router';
import { Fragment, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import AlertDialog from '../../components/AlertDialog';
import {
  Table,
  TableColumnField,
  TableColumnHeader,
  TablePagination,
  TableRows,
  TableRowsSkeleton,
} from '../../components/Table';
import TopNavigation from '../../components/TopNavigation';
import {
  DELETE_ADVERTISEMENT,
  FIND_ADVERTISEMENTS,
  IQueryAdvertisementsListData,
} from '../../libs/gql/advertisements';

const headers = [
  'id',
  'Título',
  'Tipo de anúncio',
  'Tipo de propriedade',
  'Anunciante',
  'Status',
  'Opções',
];

export default function Advertisements(): JSX.Element {
  const [page, setPage] = useState(1);
  const [per_page, setPerPage] = useState(20);
  const [modalDeleteView, setModalDeleteView] = useState(false);
  const [selected, setSelected] = useState('');

  const router = useRouter();
  const { data, loading, error, refetch } = useQuery<
    IQueryAdvertisementsListData
  >(FIND_ADVERTISEMENTS, {
    variables: {
      per_page,
      page,
    },
  });
  const [deleteAdvertisements] = useMutation(DELETE_ADVERTISEMENT);

  if (error) {
    return (
      <Heading as="h1" fontWeight="400">
        Erro no carregamento da página. Tente novamente.
      </Heading>
    );
  }

  async function handleDelete(): Promise<void> {
    await deleteAdvertisements({ variables: { selected } });
    refetch();
    setModalDeleteView(false);
  }

  return (
    <Flex
      as="main"
      height="100vh"
      justifyContent="flex-start"
      alignItems="center"
      flexDirection="column"
    >
      <TopNavigation />
      <Box marginTop="8px">
        <Heading as="h1" fontWeight="400" marginBottom="8px">
          Anúncios
        </Heading>
      </Box>
      <Button
        alignSelf="flex-end"
        alignItems="center"
        justifyContent="center"
        marginRight="10vw"
        marginY="16px"
        onClick={() => {
          router.push('advertisements/create');
        }}
      >
        <Text fontSize="16px" fontWeight="700">
          Criar novo anúncio
        </Text>
        <Box as={FiPlus} color="blue.500" size="32px" />
      </Button>
      <Table>
        <TableRows columns={headers.length}>
          {headers.map((element) => (
            <TableColumnHeader key={`advertisement_${element}`}>
              {element}
            </TableColumnHeader>
          ))}

          {!loading ? (
            data.advertisements.list.map((advertisement) => {
              return (
                <Fragment key={`advertisement_${advertisement.id}`}>
                  <TableColumnField key={advertisement.id}>
                    {advertisement.id}
                  </TableColumnField>
                  <TableColumnField
                    key={`${advertisement.id}_${advertisement.title}`}
                  >
                    {advertisement.title}
                  </TableColumnField>
                  <TableColumnField
                    key={`${advertisement.id}_${advertisement.type}`}
                  >
                    {advertisement.type}
                  </TableColumnField>
                  <TableColumnField
                    key={`${advertisement.id}_${advertisement.property.type}`}
                  >
                    {advertisement.property.type}
                  </TableColumnField>
                  <TableColumnField
                    key={`${advertisement.id}_${advertisement.user.name}`}
                  >
                    {advertisement.user.name}
                  </TableColumnField>
                  <TableColumnField
                    key={`${advertisement.id}_${advertisement.status}`}
                  >
                    {advertisement.status ? (
                      <Tag size="lg" color="green.600" variantColor="green">
                        Ativo
                      </Tag>
                    ) : (
                      <Tag size="lg" color="red.500" variantColor="red">
                        Inativo
                      </Tag>
                    )}
                  </TableColumnField>
                  <TableColumnField
                    key={`${advertisement.id}_options`}
                    justifyContent="flex-end"
                    padding="4px"
                  >
                    <IconButton
                      icon="edit"
                      size="lg"
                      backgroundColor="transparent"
                      _hover={{ color: 'blue.600' }}
                      _focus={null}
                      aria-label="Editar usuário"
                      onClick={() => {
                        router.push(`/advertisements/${advertisement.id}`);
                      }}
                    />
                    <IconButton
                      icon="delete"
                      size="lg"
                      backgroundColor="transparent"
                      _hover={{ color: 'red.600' }}
                      _focus={null}
                      aria-label="Deletar usuário"
                      onClick={() => {
                        setSelected(advertisement.id);
                        setModalDeleteView(true);
                      }}
                    />
                  </TableColumnField>
                </Fragment>
              );
            })
          ) : (
            <TableRowsSkeleton columns={headers.length} rows={per_page} />
          )}
        </TableRows>
        {!loading && (
          <TablePagination
            page={page}
            setPage={setPage}
            paginationValue={per_page}
            pagination={[15, 20, 30, 50]}
            onChangeSelect={(e) => {
              setPerPage(Number(e.target.value));
            }}
            total={data.advertisements.total}
          />
        )}
      </Table>

      <AlertDialog
        title="Deletar Anúncio do sistema"
        body="Você tem certeza que deseja deleta esse anúncio?"
        cancelButtonText="Cancelar"
        approveButtonText="Deletar"
        isOpen={modalDeleteView}
        onClose={() => setModalDeleteView(false)}
        onApprove={handleDelete}
      />
    </Flex>
  );
}
