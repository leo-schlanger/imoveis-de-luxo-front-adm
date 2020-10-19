/* eslint-disable no-plusplus */
import {
  Box,
  BoxProps,
  Flex,
  Grid,
  IconButton,
  Select,
  SimpleGrid,
  Skeleton,
  SkeletonProps,
  Text,
} from '@chakra-ui/core';
import { ChangeEvent } from 'react';

interface TableRowProps {
  columns: number;
}

interface TablePaginationProps {
  page: number;
  setPage: (newPage: number) => void;
  paginationValue: any;
  onChangeSelect?: (event: ChangeEvent<HTMLSelectElement>) => void;
  selectPlaceholder?: string;
  pagination: number[];
  total: number;
}

interface TableRowsSkeletonProps extends SkeletonProps {
  rows: number;
  columns: number;
}

export const Table: React.FC = ({ children }) => {
  return (
    <Grid
      width="100%"
      alignSelf="center"
      templateColumns="1fr 80% 1fr"
      templateRows="1fr auto auto"
      templateAreas="
          '. . .'
          '. table .'
          '. pagination .'
        "
      justifyContent="center"
      alignItems="center"
    >
      {children}
    </Grid>
  );
};

export const TableRows: React.FC<TableRowProps> = ({ children, columns }) => {
  return (
    <SimpleGrid
      gridArea="table"
      alignItems="center"
      alignSelf="center"
      columns={columns}
    >
      {children}
    </SimpleGrid>
  );
};

export const TableColumnHeader: React.FC<BoxProps> = ({
  children,
  ...rest
}) => {
  return (
    <Box bg="blue.600" textAlign="center" border="1px" {...rest}>
      {children}
    </Box>
  );
};

export const TableColumnField: React.FC<BoxProps> = ({ children, ...rest }) => {
  return (
    <Box
      bg="gray.300"
      height="40px"
      display="flex"
      alignItems="center"
      color="black"
      border="1px"
      {...rest}
    >
      {children}
    </Box>
  );
};

export const TablePagination: React.FC<TablePaginationProps> = ({
  page,
  setPage,
  pagination,
  paginationValue,
  onChangeSelect,
  selectPlaceholder = '',
  total,
}) => {
  return (
    <Flex
      gridArea="pagination"
      alignItems="center"
      justifyContent="space-between"
      padding="4px"
      marginBottom="12px"
    >
      <Flex width="15%" alignItems="center" justifyContent="space-between">
        <IconButton
          isDisabled={page === 1}
          onClick={() => setPage(page - 1)}
          backgroundColor="transparent"
          marginY="4px"
          _focus={null}
          icon="chevron-left"
          aria-label="back"
        />
        <Text fontSize="18px">
          {paginationValue * (page - 1) + 1}/
          {paginationValue * page < total ? paginationValue * page : total}
        </Text>
        <IconButton
          isDisabled={page * paginationValue >= total}
          onClick={() => setPage(page + 1)}
          backgroundColor="transparent"
          marginY="4px"
          _focus={null}
          icon="chevron-right"
          aria-label="next"
        />
      </Flex>
      <Text>Total: {total}</Text>
      <Flex width="20%" alignItems="center" justifyContent="space-between">
        <Text>por pagina: </Text>
        <Select
          width="40%"
          marginRight="40px"
          value={paginationValue}
          onChange={onChangeSelect}
          placeholder={selectPlaceholder}
          color="black"
          backgroundColor="gray.400"
        >
          {pagination.map((item) => (
            <option key={Math.random() * 100 + item} value={item}>
              {item}
            </option>
          ))}
        </Select>
      </Flex>
    </Flex>
  );
};

export const TableRowsSkeleton: React.FC<TableRowsSkeletonProps> = ({
  columns,
  rows,
}) => {
  const fields: JSX.Element[] = [];
  for (let i = 0; i < columns; i++) {
    fields.push(<Skeleton height="20px" my="10px" key={i} />);
  }

  const skeleton: JSX.Element[][] = [];

  for (let i = 0; i < rows; i++) {
    skeleton.push(fields);
  }
  return <>{skeleton}</>;
};
