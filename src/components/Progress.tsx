import { CircularProgress, Flex } from '@chakra-ui/core';

const Progress: React.FC = () => {
  return (
    <Flex alignItems="center" justifyContent="center">
      <CircularProgress
        isIndeterminate
        size="180px"
        thickness={0.1}
        color="orange"
        marginTop="160px"
      />
    </Flex>
  );
};

export default Progress;
