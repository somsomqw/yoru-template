import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Spacer,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React, { useState } from "react";
import Stars from "../../../../components/review/Stars";
import useCloudinaryUpload from "../../../../hooks/useCloudinaryUpload";
import { trpc } from "../../../../utils/trpc";

type Props = {
  productId: string;
  orderId: string;
};

const RegistReview: React.FC<Props> = ({ productId, orderId }) => {
  //state
  const [score, setScore] = useState<number>(0);
  const [image, setImage] = useState<File>();
  const { isLoading, upload } = useCloudinaryUpload({ thumbnail: image });

  //trpc
  const { data } = trpc.product.getSingle.useQuery({ id: productId });

  //functions
  const onSubmit = async (e: any) => {
    e.preventDefault();
    if (image) {
      const uploadData = await upload();
      console.log(uploadData);
    }
  };
  return (
    <Container className="p-10">
      <Box className="p-6 border rounded-lg w-full">
        <FormLabel fontSize="xl" fontWeight="bold">
          商品名
        </FormLabel>
        <Text>{data?.title}</Text>
        <Spacer h={4} />
        <form className="w-full" onSubmit={onSubmit}>
          <FormControl>
            <FormLabel fontSize="xl" fontWeight="bold">
              評価
            </FormLabel>
            <Stars score={score} setScore={setScore} />
            <Spacer h={4} />

            <FormLabel fontSize="xl" fontWeight="bold">
              タイトル
            </FormLabel>
            <Input name="reviewTitle" type="text" maxLength={50} required />
            <Spacer h={4} />

            <FormLabel fontSize="xl" fontWeight="bold">
              商品画像
            </FormLabel>
            <input
              type="file"
              onChange={(e) => e.target.files && setImage(e.target.files[0])}
            />
            <Spacer h={4} />

            <FormLabel fontSize="xl" fontWeight="bold">
              内容
            </FormLabel>
            <Textarea
              className="resize-none"
              name="reviewDesc"
              maxLength={3000}
              rows={15}
              required
            />
          </FormControl>
          <Spacer h={4} />
          <Button type="submit" width="full" colorScheme="teal">
            提出
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default RegistReview;

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const productId = ctx.params?.productId;
  const orderId = ctx.params?.orderId;
  return {
    props: {
      productId,
      orderId,
    },
  };
};
