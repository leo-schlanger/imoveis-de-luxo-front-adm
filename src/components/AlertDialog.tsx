import {
  AlertDialog as ChakraAlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/core';
import { MouseEvent, useRef } from 'react';

interface Props {
  title?: string;
  body: string;
  cancelButtonText: string;
  approveButtonText: string;
  isOpen: boolean;
  onClose(event: MouseEvent<any, globalThis.MouseEvent>): void;
  onApprove(event: MouseEvent<any, globalThis.MouseEvent>): void;
}

const AlertDialog: React.FC<Props> = ({
  title,
  body,
  cancelButtonText,
  approveButtonText,
  isOpen,
  onApprove,
  onClose,
}) => {
  const cancelRef = useRef();

  return (
    <ChakraAlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay />
      <AlertDialogContent borderRadius="20px">
        <AlertDialogHeader fontSize="24px" fontWeight="400" borderBottom="1px">
          {title}
        </AlertDialogHeader>

        <AlertDialogBody marginTop="8px">{body}</AlertDialogBody>

        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onClose} fontWeight="300">
            {cancelButtonText}
          </Button>
          <Button
            color="red.700"
            variantColor="red"
            onClick={onApprove}
            fontWeight="300"
            ml={3}
          >
            {approveButtonText}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </ChakraAlertDialog>
  );
};

export default AlertDialog;
