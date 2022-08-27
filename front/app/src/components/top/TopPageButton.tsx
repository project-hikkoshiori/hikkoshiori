import NextLink from "next/link";
import { Button } from "@chakra-ui/react";

type ButtonProps = React.ComponentProps<typeof Button>;

type Props = {
  link: string;
  text: string;
} & ButtonProps;

const TopPageButton = ({ link, text, ...buttonProps }: Props) => (
  <NextLink href={link} passHref>
    <Button as="a" colorScheme="brand" size="lg" height="64px" {...buttonProps}>
      {text}
    </Button>
  </NextLink>
);

export default TopPageButton;
