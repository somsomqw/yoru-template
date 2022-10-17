import {
  Button,
  Center,
  Divider,
  FormLabel,
  Select,
  Spacer,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Category from "../../components/Category";
import Counter from "../../components/combination/Counter";
import ProductImages from "../../components/product/ProductImages";
import ReviewItem from "../../components/review/ReviewItem";
import ReviewSelector from "../../components/review/ReviewSelector";
import { useCartCounter } from "../../context/CartContext";
import { trpc } from "../../utils/trpc";

type Props = {
  id: string;
  cartId: string | null;
};

const ProductDetail: React.FC<Props> = ({ id, cartId }) => {
  const toast = useToast();
  const router = useRouter();

  //state
  const [score, setScore] = useState<number>(-1);
  //trpc
  const { data } = trpc.product.getSingle.useQuery({ id });
  const { data: reviewData } = trpc.review.getProductReviews.useQuery({ id });
  const { data: reviewByScoreData } =
    trpc.review.getProductReviewsByScore.useQuery({ id, score });
  const { mutate } = trpc.cart.regist.useMutation({
    onError: () =>
      toast({
        title: "System error is occured",
        status: "error",
        duration: 5000,
        isClosable: true,
      }),
    onSuccess: () => {
      toast({
        title: "Product added in cart",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      action.increase();
    },
  });
  const [, action] = useCartCounter();
  const [options, setOptions] = useState<{
    size: string | null;
    color: string | null;
    quantity: number;
  }>({ size: null, color: null, quantity: 1 });

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (e.nativeEvent.submitter.name === "cart" && data) {
      cartId
        ? mutate({
            cartId,
            productId: id,
            ...options,
            title: data.title,
            price: options.quantity * data.price,
          })
        : router.push("/");
    }
  };
  return (
    <div>
      <div className="p-10 flex mobile:flex-col mobile:items-center laptop:justify-center">
        <div className="mobile:hidden">
          <Category />
        </div>
        <div>
          <Text className="text-2xl font-bold mb-2 laptop:hidden">
            {data?.title}
          </Text>
          <ProductImages thumbnail={data?.thumbnail} images={data?.images} />
          <Center>
            <Text className="laptop:w-112">{data?.description}</Text>
          </Center>
        </div>
        <form method="POST" onSubmit={onSubmit}>
          <div className="p-12 laptop:w-128 mobile:w-96">
            <Text className="text-2xl font-bold mb-2 mobile:hidden">
              {data?.title}
            </Text>
            <Text className="text-2xl font-bold">￥{data?.price}</Text>
            {data?.size && data.size.length > 0 && (
              <div>
                <Spacer h={6} />
                <Text className="font-bold">サイズ</Text>
                <Select
                  placeholder="選択してください"
                  onChange={(e) =>
                    setOptions((prev) => ({ ...prev, size: e.target.value }))
                  }
                  required
                >
                  {data.size.map((s: string) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </Select>
              </div>
            )}
            {data?.color && data.color.length > 0 && (
              <div>
                <Spacer h={6} />
                <Text className="font-bold">色</Text>
                <Select
                  placeholder="選択してください"
                  onChange={(e) =>
                    setOptions((prev) => ({ ...prev, color: e.target.value }))
                  }
                  required
                >
                  {data.color.map((c: string) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </Select>
              </div>
            )}
            <Spacer h={6} />
            <div>
              <Text className="font-bold">数量</Text>
              <Center>
                <Counter
                  count={options.quantity}
                  onDecrease={() => {
                    if (options.quantity > 1)
                      setOptions((prev) => ({
                        ...prev,
                        quantity: prev.quantity - 1,
                      }));
                  }}
                  onIncrease={() => {
                    if (data?.quantity && options.quantity < data?.quantity)
                      setOptions((prev) => ({
                        ...prev,
                        quantity: prev.quantity + 1,
                      }));
                  }}
                />
              </Center>
            </div>
            <Spacer h={6} />
            <VStack spacing={4}>
              <Button
                type="submit"
                name="cart"
                className="w-full"
                colorScheme="teal"
              >
                ADD CART
              </Button>
              <Button
                type="submit"
                name="purchase"
                className="w-full"
                colorScheme="teal"
              >
                PURCHASE
              </Button>
            </VStack>
          </div>
        </form>
      </div>
      <div className="p-12">
        <Divider />
        <Spacer h={6} />
        <Text className="font-bold text-2xl">顧客レビュー</Text>
        <Spacer h={4} />
        <div className="flex mobile:flex-col mobile:items-center">
          <div className="p-6">
            <ReviewSelector reviewData={reviewData} />
          </div>
          <div className="p-6">
            <Text className="font-bold text-xl">フィルター</Text>
            <Spacer h={4} />
            <Select
              defaultValue={-1}
              onChange={(e) => {
                setScore(Number(e.target.value));
              }}
            >
              <option value={-1}>全て</option>
              <option value={5}>星5</option>
              <option value={4}>星4</option>
              <option value={3}>星3</option>
              <option value={2}>星2</option>
              <option value={1}>星1</option>
            </Select>
            <div className="p-6">
              {reviewByScoreData?.map((review) => (
                <ReviewItem
                  key={review.id}
                  title={review.title}
                  description={review.description}
                  image={review.image}
                  score={review.score}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const id = ctx.params?.id;
  const session = await getSession(ctx);
  const cartId = session?.cartId ?? null;
  return {
    props: {
      id,
      cartId,
    },
  };
};
