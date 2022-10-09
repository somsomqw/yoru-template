import { Center, Icon, IconButton } from "@chakra-ui/react";
import Image from "next/image";
import React, { useState } from "react";
import { BsDot } from "react-icons/bs";

type Props = {};

const Banner = (props: Props) => {
  const [currentBanner, setCurrentBanner] = useState<number>(0);
  return (
    <div>
      <div className="w-screen h-96 overflow-hidden">
        <div
          style={{
            transform: `translate(-${currentBanner * 100}%)`,
          }}
          className="w-full h-full grid grid-flow-col transition-all"
        >
          <div className="bg-red-500 w-screen h-full"></div>
          <div className="bg-green-500 w-screen h-full"></div>
          <div className="bg-blue-500 w-screen h-full"></div>
        </div>
      </div>
      <Center>
        <Icon
          color={`gray.300`}
          boxSize={6}
          className="cursor-pointer"
          onClick={() => setCurrentBanner(0)}
          as={BsDot}
        />
        <Icon
          color={`gray.300`}
          boxSize={6}
          className="cursor-pointer"
          onClick={() => setCurrentBanner(1)}
          as={BsDot}
        />
        <Icon
          color={`gray.300`}
          boxSize={6}
          className="cursor-pointer"
          onClick={() => setCurrentBanner(2)}
          as={BsDot}
        />
      </Center>
    </div>
  );
};

export default Banner;
