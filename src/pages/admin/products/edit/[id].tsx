import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import {
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
  Text,
} from "@chakra-ui/react";
import { trpc } from "../../../../utils/trpc";
import { EditProductInput } from "../../../../schema/product.schema";
import { useRouter } from "next/router";

type Props = {
  id: number;
};

const ProductEdit: React.FC<Props> = ({ id }) => {
  const toast = useToast();
  const router = useRouter();
  const { data: categoriesData } = trpc.category.get.useQuery();
  const { data } = trpc.product.getSingle.useQuery({ id: Number(id) });
  const { mutate } = trpc.product.edit.useMutation({
    onError: (error) =>
      toast({
        title: "Failed.",
        status: "error",
        description: error.message,
        duration: 5000,
        isClosable: true,
      }),
    onSuccess: () => {
      toast({
        title: "Product edited.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      router.push("/admin/products");
    },
  });
  const [options, setOptions] = useState<{
    sizes?: string[];
    colors?: string[];
  }>({ sizes: data?.size ?? [], colors: data?.color ?? [] });
  const [optionsText, setOptionsText] = useState<{
    sizes: string;
    colors: string;
  }>({
    sizes: "",
    colors: "",
  });
  const [selectValue, setSelectValue] = useState<{
    discount?: boolean;
    discountRate?: number | null;
    categoryId?: number;
  }>();

  useEffect(() => {
    console.log(data);
    setOptions({ sizes: data?.size, colors: data?.color });
    setSelectValue({
      discount: data?.discount,
      discountRate: data?.discountRate,
      categoryId: data?.categoryId,
    });
  }, [data]);

  const onSubmit = (e: any) => {
    e.preventDefault();
    const editInfo = {
      id: Number(id),
      title: String(e.target.title.value) ?? "",
      description: String(e.target.description.value) ?? "",
      discount: selectValue?.discount ?? false,
      discountRate: selectValue?.discountRate ?? null,
      price: Number(e.target.price.value),
      quantity: Number(e.target.quantity.value),
      categoryId: selectValue?.categoryId ?? 0,
      size: options.sizes ?? [],
      color: options.colors ?? [],
      thumbnail:
        "https://i.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI",
      images: [],
    };
    mutate(editInfo);
  };
  return (
    <div className="p-10">
      <Text className="text-3xl">Edit Product</Text>
      <Spacer h="10" />
      <form method="POST" onSubmit={onSubmit}>
        <FormControl>
          <FormLabel>Product ID</FormLabel>
          <Input
            id="product-id"
            name="id"
            type="text"
            placeholder="please input unique id"
            defaultValue={data?.id}
            maxLength={12}
            disabled
          />
          <FormLabel>Product title</FormLabel>
          <Input
            id="product-title"
            name="title"
            type="text"
            maxLength={50}
            defaultValue={data?.title}
            required
          />
          <FormLabel>Product description</FormLabel>
          <Textarea
            className="resize-none"
            id="product-description"
            name="description"
            rows={20}
            maxLength={2000}
            defaultValue={data?.description}
            required
          />
          <Spacer h="5" />
          <FormLabel>discount mode</FormLabel>
          <RadioGroup
            id="product-productDiscount"
            name="discount"
            value={selectValue?.discount ? "on" : "off"}
            onChange={(value) =>
              setSelectValue((prev) => ({
                ...prev,
                discount: value === "on" ? true : false,
              }))
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
            value={selectValue?.discountRate ?? ""}
            onChange={(e) =>
              setSelectValue((prev) => ({
                ...prev,
                discountRate: Number(e.target.value),
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
            defaultValue={data?.price}
            required
          />
          <Spacer h="5" />
          <FormLabel>quantity</FormLabel>
          <Input
            id="product-quantity"
            name="quantity"
            type="number"
            placeholder="20"
            defaultValue={data?.quantity}
            required
          />
          <Spacer h="5" />
          <FormLabel>category</FormLabel>
          <Select
            id="product-category"
            name="category"
            placeholder="Select category"
            value={selectValue?.categoryId}
            onChange={(e) =>
              setSelectValue((prev) => ({
                ...prev,
                categoryId: Number(e.target.value),
              }))
            }
            required
          >
            {categoriesData?.map((category) => (
              <option key={category.id} value={category.id}>
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
                  className="border-gray-200 border rounded mb-2 p-2 flex flex-wrap gap-2"
                  minHeight="10"
                >
                  {options?.sizes?.map((size, index) => (
                    <Tag key={index} size="sm">
                      <TagLabel>{size}</TagLabel>
                      <TagCloseButton
                        onClick={() =>
                          setOptions((prev) => {
                            const newOptions = prev.sizes?.filter(
                              (s) => s !== size
                            );
                            return { ...prev, sizes: newOptions };
                          })
                        }
                      />
                    </Tag>
                  ))}
                </Box>
                <Stack direction="row" alignItems="center">
                  <Input
                    size="sm"
                    type="text"
                    placeholder="typing size"
                    onChange={(e) =>
                      setOptionsText((prev) => ({
                        ...prev,
                        sizes: e.target.value,
                      }))
                    }
                  />
                  <Button
                    size="sm"
                    onClick={() =>
                      setOptions((prev) => {
                        if (prev.sizes) {
                          return {
                            ...prev,
                            sizes: [...prev.sizes, optionsText.sizes],
                          };
                        } else {
                          return { ...prev };
                        }
                      })
                    }
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
                  className="border-gray-200 border rounded mb-2 p-2 flex flex-wrap gap-2"
                  minHeight="10"
                >
                  {options?.colors?.map((color, index) => (
                    <Tag key={index} size="sm">
                      <TagLabel>{color}</TagLabel>
                      <TagCloseButton
                        onClick={() =>
                          setOptions((prev) => {
                            const newOptions = prev.colors?.filter(
                              (c) => c !== color
                            );
                            return { ...prev, colors: newOptions };
                          })
                        }
                      />
                    </Tag>
                  ))}
                </Box>
                <Stack direction="row" alignItems="center">
                  <Input
                    size="sm"
                    type="text"
                    placeholder="typing color"
                    onChange={(e) =>
                      setOptionsText((prev) => ({
                        ...prev,
                        colors: e.target.value,
                      }))
                    }
                  />
                  <Button
                    size="sm"
                    onClick={() =>
                      setOptions((prev) => {
                        if (prev.colors) {
                          return {
                            ...prev,
                            colors: [...prev.colors, optionsText.colors],
                          };
                        } else {
                          return { ...prev };
                        }
                      })
                    }
                  >
                    ADD
                  </Button>
                </Stack>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </FormControl>
        <Spacer h="10" />
        <Button type="submit" className="w-full" colorScheme="teal">
          EDIT
        </Button>
      </form>
    </div>
  );
};

export default ProductEdit;

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const session = await getSession(ctx);
  const isAdmin = session?.isAdmin;
  if (!isAdmin)
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  return {
    props: {
      isAdmin: isAdmin,
      id: ctx.params?.id,
    },
  };
};
