/* eslint-disable no-nested-ternary */
import { useMutation, useQuery } from '@apollo/react-hooks';
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Select,
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
import { UserStatusDescription } from '../../libs/entities/user';
import {
  DELETE_USER,
  FIND_USERS,
  FIND_USERS_BY_STATUS,
  IQueryUsersListData,
} from '../../libs/gql/users';

const headers = ['Nome', 'E-mail', 'Status', 'Tipo', 'Opções'];

const userStatus = ['', 'NEW', 'ACTIVE', 'INACTIVE'] as const;

export default function Users(): JSX.Element {
  const [page, setPage] = useState(1);
  const [per_page, setPerPage] = useState(20);
  const [status, setStatus] = useState('');
  const [modalDeleteView, setModalDeleteView] = useState(false);
  const [selected, setSelected] = useState('');

  const router = useRouter();
  const { data, loading, error, refetch } = useQuery<IQueryUsersListData>(
    status !== '' ? FIND_USERS_BY_STATUS : FIND_USERS,
    {
      variables: {
        per_page,
        page,
        status: status !== '' ? status : null,
      },
    },
  );
  const [deleteUser] = useMutation(DELETE_USER);

  if (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return (
      <Heading as="h1" fontWeight="400">
        Erro no carregamento da página. Tente novamente.
      </Heading>
    );
  }

  async function handleDelete(): Promise<void> {
    await deleteUser({ variables: { selected } });
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
          Usuários
        </Heading>
      </Box>
      <Flex
        width="80vw"
        alignItems="center"
        flexDirection="row"
        justifyContent="space-between"
        margin="8px"
      >
        <Select
          value={status}
          width="15%"
          alignSelf="flex-start"
          onChange={(event) => setStatus(event.target.value)}
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
        <Button
          alignItems="center"
          justifyContent="center"
          alignSelf="flex-end"
          marginY="16px"
          onClick={() => {
            router.push('users/create');
          }}
        >
          <Text fontSize="16px" fontWeight="700">
            Criar novo usuário
          </Text>
          <Box as={FiPlus} color="blue.500" size="32px" />
        </Button>
      </Flex>
      <Table>
        <TableRows columns={headers.length}>
          {headers.map((element) => (
            <TableColumnHeader key={`user_${element}`}>
              {element}
            </TableColumnHeader>
          ))}

          {!loading ? (
            data.users.list.map((user) => {
              return (
                <Fragment key={`user_${user.id}`}>
                  <TableColumnField key={`${user.id}_${user.name}`}>
                    {user.name}
                  </TableColumnField>
                  <TableColumnField key={`${user.id}_${user.email}`}>
                    {user.email}
                  </TableColumnField>
                  <TableColumnField key={`${user.id}_${user.status}`}>
                    {user.status === 'ACTIVE' ? (
                      <Tag size="lg" color="green.600" variantColor="green">
                        Ativo
                      </Tag>
                    ) : user.status === 'INACTIVE' ? (
                      <Tag size="lg" color="red.500" variantColor="red">
                        Inativo
                      </Tag>
                    ) : (
                      <Tag size="lg" color="blue.600" variantColor="blue">
                        Novo
                      </Tag>
                    )}
                  </TableColumnField>
                  <TableColumnField key={`${user.id}_${user.type}`}>
                    {user.type === 'ADM'
                      ? 'Administrador'
                      : user.type === 'ADVERTISER'
                      ? 'Anunciante'
                      : 'Usuário'}
                  </TableColumnField>
                  <TableColumnField
                    key={`${user.id}_options`}
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
                        router.push(`/users/${user.id}`);
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
                        setSelected(user.id);
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
            total={data.users.total}
          />
        )}
      </Table>

      <AlertDialog
        title="Deletar Usuário do sistema"
        body="Você tem certeza que deseja deleta esse usuário?"
        cancelButtonText="Cancelar"
        approveButtonText="Deletar"
        isOpen={modalDeleteView}
        onClose={() => setModalDeleteView(false)}
        onApprove={handleDelete}
      />
    </Flex>
  );
}
