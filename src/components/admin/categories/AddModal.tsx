import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Spacer,
  useToast,
} from "@chakra-ui/react";
import { trpc } from "../../../utils/trpc";
import useCustomToast from "../../../hooks/useCustomToast";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const AddModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const toast = useToast();

  const { mutate, isLoading } = trpc.category.regist.useMutation({
    onError: (error) => {
      toast({
        title: "Failed create.",
        status: "error",
        description: error.message,
        duration: 5000,
        isClosable: true,
      });
    },
    onSuccess: () => {
      toast({
        title: "New category created.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
    },
  });

  const onSubmit = (e: any) => {
    e.preventDefault();
    const name = e.target.categoryName.value;
    mutate({ name });
  };
  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form method="POST" onSubmit={onSubmit}>
            <ModalHeader>Create new category</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>Category name</FormLabel>
                <Input id="category-name" name="categoryName" type="text" />
                <Spacer h="5" />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant="ghost" type="submit">
                CREATE
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AddModal;
