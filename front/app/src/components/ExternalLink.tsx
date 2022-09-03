import NextLink from "next/link";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Link, LinkProps } from "@chakra-ui/react";

type Props = {
  href: string;
  text: string;
} & LinkProps;

const ExternalLink = ({ href, text, ...linkProps }: Props) => (
  <NextLink href={href} passHref>
    <Link pl={7} isExternal {...linkProps}>
      {text}
      <ExternalLinkIcon mx="2px" />
    </Link>
  </NextLink>
);

export default ExternalLink;
