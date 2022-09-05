import { useState } from "react";
import { Box, Text } from "@chakra-ui/react";

type Props = {
  src: string;
  onClick: () => void;
};

const LayoutImage = ({ src, onClick }: Props) => {
  const [isOnHover, setIsOnHover] = useState(false);
  return (
    <Box
      pos="relative"
      as="button"
      bg="gray.200"
      height="320px"
      width="240px"
      onClick={onClick}
      onMouseOver={() => {
        setIsOnHover(true);
      }}
      onMouseLeave={() => setIsOnHover(false)}
      _hover={{ boxShadow: "md", border: "1px", borderColor: "brand.500" }}
    >
      画像
      <Text
        pos="absolute"
        top="5"
        left="5"
        zIndex="docked"
        transform="rotate(-9deg)"
        pointerEvents="none"
        display={isOnHover ? "block" : "none"}
      >
        Click!
      </Text>
    </Box>
  );
};

export default LayoutImage;
