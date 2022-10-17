import { Text } from "@chakra-ui/react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React from "react";
import Category from "../../components/Category";
import ProductCard from "../../components/combination/ProductCard";
import { trpc } from "../../utils/trpc";

type Props = {
  id: string;
  name: string;
};

const CategoryDetail: React.FC<Props> = ({ id, name }) => {
  const { data } = trpc.product.getProductsByCategoryId.useQuery({
    id: Number(id),
  });
  console.log(data);
  return (
    <div className="p-10 flex">
      <Category />
      <div>
        <Text className="text-3xl font-bold">{name}</Text>
        <div className="p-6 flex flex-wrap gap-4">
          {data?.map((product) => (
            <ProductCard
              id={product.id}
              url={product.thumbnail}
              title={product.title}
              price={product.price}
              discount={product.discount}
              discountRate={product.discountRate}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryDetail;

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const id = ctx.params?.id;
  const name = ctx.query?.name;
  return {
    props: {
      id,
      name,
    },
  };
};
