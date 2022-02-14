import React from 'react';

import { Anchor, Box, Header, Menu, ResponsiveContext } from 'grommet';
import { Grommet as GrommetIcon, Menu as MenuIcon } from 'grommet-icons';
import Link from 'next/link';

export const NavBar = () => {
  return (
    <Header background="light-1" pad="medium" height="xsmall">
      <Link href="/">
        <Anchor
          href="/"
          icon={<GrommetIcon color="brand" />}
          label="Home"
        />
      </Link>
      <Link href="/project">
        <Anchor
          href="/project"
          icon={<GrommetIcon color="brand" />}
          label="Create New Project"
        />
      </Link>
      <Link href="/discover">
        <Anchor
          href="/discover"
          icon={<GrommetIcon color="brand" />}
          label="Discover"
        />
      </Link>
      <Link href="/login">
        <Anchor
          href="/login"
          icon={<GrommetIcon color="brand" />}
          label="Log In"
        />
      </Link>
      <Link href="/signup">
        <Anchor
          href="/signup"
          icon={<GrommetIcon color="brand" />}
          label="Sign Up"
        />
      </Link>
    </Header>
  )
};

export default {
  title: 'Layout/Header/Responsive',
};