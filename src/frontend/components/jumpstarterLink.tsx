import { NextPageContext } from "next";
import axios from "axios";
import Link from "next/link";
import { Anchor } from "grommet";

interface JumpstarterLinkProps {
  linkHref: string;
  linkCaption: string;
  className: string | undefined;
}

const JumpstarterLink = function reusableLinkComponent({
  linkHref,
  linkCaption,
  className,
}: JumpstarterLinkProps) {
  return (
    <Link href={linkHref}>
      <Anchor className={className} href={linkHref} label={linkCaption} />
    </Link>
  );
};

export default JumpstarterLink;
