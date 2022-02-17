import { NextPageContext } from "next";
import axios from "axios";
import Link from "next/link";
import { Anchor } from "grommet";

interface ReusableLinkProps {
  linkHref: string;
  linkCaption: string;
  className: string | undefined;
}

const ReusableLink = function reusableLinkComponent<ReusableLinkProps>({
  linkHref,
  linkCaption,
  className,
}) {
  return (
    <Link href={linkHref}>
      <Anchor className={className} href={linkHref} label={linkCaption} />
    </Link>
  );
};

ReusableLink.getInitialProps = async ({ req }: NextPageContext) => {};

export default ReusableLink;
