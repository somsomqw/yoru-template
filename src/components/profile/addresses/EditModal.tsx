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
  Switch,
  useToast,
} from "@chakra-ui/react";
import { trpc } from "../../../utils/trpc";

type EditModalProps = {
  id: string;
  isOpen: boolean;
  onClose: () => void;
  selected: string;
  refetch: () => void;
};

const EditModal: React.FC<EditModalProps> = ({
  id,
  isOpen,
  onClose,
  selected,
  refetch,
}) => {
  const toast = useToast();
  const { data } = trpc.address.getSingle.useQuery({ id: id });
  const onSubmit = async (e: any) => {
    e.preventDefault();
    const editInfo = {
      id: String(id) ?? "",
      nameKanji: String(e.target.nameKanji.value) ?? "",
      nameKana: String(e.target.nameKana.value) ?? "",
      phone: String(e.target.phone.value) ?? "",
      zipcode: String(e.target.zipcode.value) ?? "",
      address1: String(e.target.address1.value) ?? "",
      address2: String(e.target.address2.value) ?? "",
      isDefault: Boolean(e.target.isDefault.value) ?? false,
    };
    mutate(editInfo);
  };
  const { mutate } = trpc.address.edit.useMutation({
    onError: () => {
      toast({
        title: "Failed delete.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
    onSuccess: () => {
      toast({
        title: "Category deleted.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
      refetch();
    },
  });
  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit address</ModalHeader>
          <ModalCloseButton />
          <form method="POST" onSubmit={onSubmit}>
            <ModalBody>
              <FormControl>
                <FormLabel>name kanji</FormLabel>
                <Input
                  id="address-name-kanji"
                  name="nameKanji"
                  type="text"
                  maxLength={50}
                  defaultValue={data?.nameKanji}
                  required
                />
                <Spacer h="5" />
              </FormControl>
              <FormControl>
                <FormLabel>name kana</FormLabel>
                <Input
                  id="address-name-kana"
                  name="nameKana"
                  type="text"
                  maxLength={50}
                  defaultValue={data?.nameKana}
                  required
                />
                <Spacer h="5" />
              </FormControl>
              <FormControl>
                <FormLabel>phone number</FormLabel>
                <Input
                  id="address-phone"
                  name="phone"
                  type="string"
                  placeholder="ex) 080-1111-2222"
                  maxLength={11}
                  defaultValue={data?.phone}
                  required
                />
                <Spacer h="5" />
              </FormControl>
              <FormControl>
                <FormLabel>zipcode</FormLabel>
                <Input
                  id="address-zipcode"
                  name="zipcode"
                  type="string"
                  placeholder="ex) 0000000"
                  maxLength={8}
                  defaultValue={data?.zipcode}
                  required
                />
                <Spacer h="5" />
              </FormControl>
              <FormControl>
                <FormLabel>address1</FormLabel>
                <Input
                  id="address-address1"
                  name="address1"
                  type="string"
                  placeholder="ex) tokyo Shinjuku-ku Nishishinjuku 0-0-0"
                  defaultValue={data?.address1}
                  required
                />
                <Spacer h="5" />
              </FormControl>
              <FormControl>
                <FormLabel>address2</FormLabel>
                <Input
                  id="address-address2"
                  name="address2"
                  type="string"
                  placeholder="ex) yoru apartments #101"
                  defaultValue={data?.address2}
                  required
                />
                <Spacer h="5" />
              </FormControl>
              <FormControl className="flex justify-between">
                <FormLabel>set default address</FormLabel>
                <Switch id="address-isDefault" name="isDefault" />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                CLOSE
              </Button>
              <Button type="submit" variant="ghost">
                Edit
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default EditModal;
