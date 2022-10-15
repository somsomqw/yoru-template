import { Box, HStack, Icon } from "@chakra-ui/react";
import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

type Props = {
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
};

const Stars: React.FC<Props> = ({ score, setScore }) => {
  return (
    <HStack>
      <Box>
        <Icon
          as={score >= 1 ? FaStar : FaRegStar}
          boxSize={8}
          color="yellow.300"
          onClick={() => setScore(1)}
        />
      </Box>
      <Box>
        <Icon
          as={score >= 2 ? FaStar : FaRegStar}
          boxSize={8}
          color="yellow.300"
          onClick={() => setScore(2)}
        />
      </Box>
      <Box>
        <Icon
          as={score >= 3 ? FaStar : FaRegStar}
          boxSize={8}
          color="yellow.300"
          onClick={() => setScore(3)}
        />
      </Box>
      <Box>
        <Icon
          as={score >= 4 ? FaStar : FaRegStar}
          boxSize={8}
          color="yellow.300"
          onClick={() => setScore(4)}
        />
      </Box>
      <Box>
        <Icon
          as={score >= 5 ? FaStar : FaRegStar}
          boxSize={8}
          color="yellow.300"
          onClick={() => setScore(5)}
        />
      </Box>
    </HStack>
  );
};

export default Stars;
