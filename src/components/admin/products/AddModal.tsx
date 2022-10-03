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
  useToast,
  Textarea,
  RadioGroup,
  Stack,
  Radio,
  Select,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Tag,
  TagLabel,
  TagCloseButton,
  VStack,
} from "@chakra-ui/react";
import { trpc } from "../../../utils/trpc";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  categories: Array<{ name: string }> | undefined;
};

const formDataInit = {
  id: "",
  title: "",
  description: "",
  discount: false,
  discountRate: null,
  thumbnail: null,
  images: null,
  price: 0,
  quantity: 0,
  category: "",
};
const optionsTextInit = { size: "", color: "" };
const optionsInit = { sizes: [], colors: [] };

const AddModal: React.FC<Props> = ({ isOpen, onClose, categories }) => {
  const toast = useToast();
  const [optionsText, setOptionsText] = useState<{
    size: string;
    color: string;
  }>(optionsTextInit);
  const [options, setOptions] = useState<{
    sizes: string[] | [];
    colors: string[] | [];
  }>(optionsInit);
  const [formData, setFormData] = useState<{
    id: string;
    title: string;
    description: string;
    discount: boolean;
    discountRate: number | null;
    thumbnail: string | null;
    images: string[] | null;
    price: number;
    quantity: number;
    category: string;
  }>(formDataInit);

  const { mutate } = trpc.product.regist.useMutation({
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
        title: "New product created.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
      setFormData(formDataInit);
      setOptions(optionsInit);
      setOptionsText(optionsTextInit);
    },
  });

  const onSubmit = (e: any) => {
    e.preventDefault();
    const date = new Date();
    const size = options.sizes;
    const color = options.colors;
    const createdAt = date.toDateString();
    const updatedAt = date.toDateString();
    mutate({ ...formData, size, color, createdAt, updatedAt });
  };
  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form method="POST" onSubmit={onSubmit}>
            <ModalHeader>Create new product</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>Product ID</FormLabel>
                <Input
                  id="product-id"
                  name="id"
                  type="text"
                  placeholder="please input unique id"
                  maxLength={12}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }))
                  }
                  required
                />
                <FormLabel>Product title</FormLabel>
                <Input
                  id="product-title"
                  name="title"
                  type="text"
                  maxLength={50}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }))
                  }
                  required
                />
                <FormLabel>Product description</FormLabel>
                <Textarea
                  className="resize-none"
                  id="product-description"
                  name="description"
                  rows={20}
                  maxLength={2000}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }))
                  }
                  required
                />
                <Spacer h="5" />
                <FormLabel>discount mode</FormLabel>
                <RadioGroup
                  name="productDiscount"
                  defaultValue="off"
                  onChange={(value) =>
                    value === "off"
                      ? setFormData((prev) => ({ ...prev, discount: false }))
                      : setFormData((prev) => ({ ...prev, discount: true }))
                  }
                >
                  <Stack direction="row">
                    <Radio value="off">off</Radio>
                    <Radio value="on">on</Radio>
                  </Stack>
                </RadioGroup>
                <Spacer h="5" />
                <FormLabel>discount price rate (%)</FormLabel>
                <Select
                  id="product-discount-rate"
                  name="discountRate"
                  placeholder="Select rate"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      [e.target.name]: Number(e.target.value),
                    }))
                  }
                >
                  <option value={5}>5%</option>
                  <option value={10}>10%</option>
                  <option value={15}>15%</option>
                  <option value={20}>20%</option>
                  <option value={25}>25%</option>
                  <option value={30}>30%</option>
                  <option value={35}>35%</option>
                  <option value={40}>40%</option>
                  <option value={45}>45%</option>
                  <option value={50}>50%</option>
                  <option value={55}>55%</option>
                  <option value={60}>60%</option>
                  <option value={65}>65%</option>
                  <option value={70}>70%</option>
                  <option value={75}>75%</option>
                  <option value={80}>80%</option>
                  <option value={85}>85%</option>
                  <option value={90}>90%</option>
                  <option value={95}>95%</option>
                </Select>
                <Spacer h="5" />
                <FormLabel>price</FormLabel>
                <Input
                  id="product-price"
                  name="price"
                  type="number"
                  placeholder="3500"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      [e.target.name]: Number(e.target.value),
                    }))
                  }
                  required
                />
                <Spacer h="5" />
                <FormLabel>quantity</FormLabel>
                <Input
                  id="product-quantity"
                  name="quantity"
                  type="number"
                  placeholder="20"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      [e.target.name]: Number(e.target.value),
                    }))
                  }
                  required
                />
                <Spacer h="5" />
                <FormLabel>category</FormLabel>
                <Select
                  id="product-category"
                  name="category"
                  placeholder="Select category"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }))
                  }
                  required
                >
                  {categories?.map((category, index) => (
                    <option key={index} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </Select>
                <Spacer h="5" />
                <FormLabel>thumbnail</FormLabel>
                <FormLabel>other images</FormLabel>
                <FormLabel>Other options</FormLabel>
                <Accordion allowToggle>
                  <AccordionItem>
                    <h2>
                      <AccordionButton>
                        <Box flex="1" textAlign="left">
                          Sizes
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel p={4}>
                      <Box
                        className="border-gray-200 border rounded mb-2 p-2"
                        minHeight="10"
                      >
                        <VStack spacing={4}>
                          {options.sizes.map((size, index) => (
                            <Tag key={index} size="sm">
                              <TagLabel>{size}</TagLabel>
                              <TagCloseButton
                                onClick={() =>
                                  setOptions((prev) => {
                                    const newOptions = prev.sizes.filter(
                                      (s) => s !== size
                                    );
                                    return { ...prev, sizes: newOptions };
                                  })
                                }
                              />
                            </Tag>
                          ))}
                        </VStack>
                      </Box>
                      <Stack direction="row" alignItems="center">
                        <Input
                          size="sm"
                          type="text"
                          placeholder="typing size"
                          value={optionsText.size}
                          onChange={(e) =>
                            setOptionsText((prev) => ({
                              ...prev,
                              size: e.target.value,
                            }))
                          }
                        />
                        <Button
                          size="sm"
                          onClick={() => {
                            setOptions((prev) => ({
                              ...prev,
                              sizes: [...prev.sizes, optionsText.size],
                            }));
                            setOptionsText((prev) => ({ ...prev, size: "" }));
                          }}
                        >
                          ADD
                        </Button>
                      </Stack>
                    </AccordionPanel>
                  </AccordionItem>

                  <AccordionItem>
                    <h2>
                      <AccordionButton>
                        <Box flex="1" textAlign="left">
                          Colors
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      <Box
                        className="border-gray-200 border rounded mb-2 p-2"
                        minHeight="10"
                      >
                        <VStack spacing={4}>
                          {options.colors.map((color, index) => (
                            <Tag key={index} size="sm">
                              <TagLabel>{color}</TagLabel>
                              <TagCloseButton
                                onClick={() =>
                                  setOptions((prev) => {
                                    const newOptions = prev.colors.filter(
                                      (c) => c !== color
                                    );
                                    return { ...prev, colors: newOptions };
                                  })
                                }
                              />
                            </Tag>
                          ))}
                        </VStack>
                      </Box>
                      <Stack direction="row" alignItems="center">
                        <Input
                          size="sm"
                          type="text"
                          placeholder="typing color"
                          value={optionsText.color}
                          onChange={(e) =>
                            setOptionsText((prev) => ({
                              ...prev,
                              color: e.target.value,
                            }))
                          }
                        />
                        <Button
                          size="sm"
                          onClick={() => {
                            setOptions((prev) => ({
                              ...prev,
                              colors: [...prev.colors, optionsText.color],
                            }));
                            setOptionsText((prev) => ({ ...prev, color: "" }));
                          }}
                        >
                          ADD
                        </Button>
                      </Stack>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
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
