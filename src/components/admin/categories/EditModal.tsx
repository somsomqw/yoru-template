import React from "react";
import {
  Button,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Spacer,
} from "@chakra-ui/react";
import { trpc } from "../../../utils/trpc";

type EditModalProps = {
  isOpen: boolean;
  onClose: () => void;
  selected: string;
  refetch: () => void;
};

const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  selected,
  refetch,
}) => {
  const toast = useToast();
  const { mutate: editMutate } = trpc.category.edit.useMutation({
    onError: () => {
      toast({
        title: "Failed edit.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
    onSuccess: () => {
      toast({
        title: "Category edited.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
      refetch();
    },
  });

  const onSubmit = (e: any) => {
    e.preventDefault();
    const newName = e.target.categoryName.value;
    editMutate({ targetName: selected, newName });
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Category</ModalHeader>
          <ModalCloseButton />
          <form method="POST" onSubmit={onSubmit}>
            <ModalBody>
              <FormControl>
                <FormLabel>Category name</FormLabel>
                <Input
                  id="category-name"
                  name="categoryName"
                  type="text"
                  defaultValue={selected}
                  required
                />
                <Spacer h="5" />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                CLOSE
              </Button>
              <Button variant="ghost" type="submit">
                EDIT
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default EditModal;
