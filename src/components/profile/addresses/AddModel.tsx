import React, { useState } from "react";
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
import axios from "axios";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  email: string;
};

const AddModal: React.FC<Props> = ({ isOpen, onClose, email }) => {
  const [zipcode, setZipcodeMain] = React.useState();
  const [address, setAddress] = React.useState();

  const [toggleBtn, setToggleBtn] = React.useState(false);

  const handleToggle = () => {
    setToggleBtn(!toggleBtn);
  };

  const updateZipcodeMain = async (e: any) => {
    setZipcodeMain(e.target.value);
    try {
      const res = await axios.get("https://zipcloud.ibsnet.co.jp/api/search", {
        params: {
          zipcode: e.target.value,
        },
      });
      if (res.data.results) {
        const result = res.data.results[0];
        setAddress(result.address1 + result.address2 + result.address3);
      }
    } catch {
      toast({
        title: "Failed create.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  const onSubmit = (e: any) => {
    e.preventDefault();
    const registInfo = {
      userEmail: email,
      nameKanji: String(e.target.nameKanji.value),
      nameKana: String(e.target.nameKana.value),
      phone: String(e.target.phone.value),
      zipcode: String(e.target.zipcode.value),
      address1: String(e.target.address1.value),
      address2: String(e.target.address2.value),
      isDefault: toggleBtn,
    };
    mutate(registInfo);
  };

  const toast = useToast();

  const { mutate } = trpc.address.regist.useMutation({
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

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form method="POST" onSubmit={onSubmit}>
          <input type="hidden" className="p-country-name" value="Japan"></input>
          <ModalHeader>Create new address</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>name kanji</FormLabel>
              <Input
                id="address-name-kanji"
                name="nameKanji"
                type="text"
                maxLength={50}
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
                onChange={updateZipcodeMain}
                value={zipcode}
                placeholder="ex) 0000000"
                maxLength={8}
                required
              />
              <Spacer h="5" />
            </FormControl>
            <FormControl>
              <FormLabel>address1</FormLabel>
              <Input
                id="address-address1"
                name="address1"
                value={address}
                type="string"
                placeholder="ex) tokyo Shinjuku-ku Nishishinjuku 0-0-0"
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
                required
              />
              <Spacer h="5" />
            </FormControl>
            <FormControl className="flex justify-between">
              <FormLabel>set default address</FormLabel>
              <Switch
                id="address-isDefault"
                name="isDefault"
                onChange={handleToggle}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button type="submit" variant="ghost">
              Create
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};
export default AddModal;
