import { Anchor, Box, Header, Menu, ResponsiveContext } from 'grommet';
import { Grommet as GrommetIcon, Menu as MenuIcon } from 'grommet-icons';
import Link from 'next/link';

import styled from 'styled-components';

export const NavBar = () => {
  return (
    <Header background="light-2" pad="medium" height="xsmall">
      Built by Team Blend 😎
      <ResponsiveContext.Consumer>
        {(size) =>
          size === 'small' ? (
            <>
              <Box justify="end" />
              <Menu
                a11yTitle="Navigation Menu"
                dropProps={{ align: { top: 'bottom', right: 'right' } }}
                icon={<MenuIcon color="brand" />}
                items={[
                  {
                    label: <Box pad="small">JumpStarter</Box>,
                    href: '/'
                  },
                  {
                    label: <Box pad="small">Create a New Project</Box>,
                    href: '/project'
                  },
                  {
                    label: <Box pad="small">Discover</Box>,
                    href: '/discover'
                  },
                  {
                    label: <Box pad="small">Log In</Box>,
                    href: '/login'
                  },
                  {
                    label: <Box pad="small">Sign Up</Box>,
                    href: '/signup'
                  },
                ]}
              />
            </>
          ) : (
            <Box justify="end" direction="row" gap="medium">
              <Link href="/project">
                <Anchor
                  href="/project"
                  /** 
                   * 
                   icon={<GrommetIcon color="brand" />}
                   */
                  label="Create a New Project"
                />
              </Link>
              <Link href="/discover">
                <Anchor
                  href="/discover"
                  /** 
                   * 
                   icon={<GrommetIcon color="brand" />}
                   */
                  label="Discover"
                />
              </Link>
              <Link href="/">
                <Anchor
                  href="/"
                  /** 
                   * 
                   icon={<GrommetIcon color="brand" />}
                   */
                  label="JumpStarter"
                />
              </Link>
              <Link href="/login">
                <Anchor
                  href="/login"
                  /** 
                   * 
                   icon={<GrommetIcon color="brand" />}
                   */
                  label="Log In"
                />
              </Link>
              <Link href="/signup">
                <Anchor
                  href="/signup"
                  /** 
                   * 
                   icon={<GrommetIcon color="brand" />}
                   */
                  label="Sign Up"
                />
              </Link>
            </Box>
          )
        }
      </ResponsiveContext.Consumer>
    </Header>
  )
};

export default {
  title: 'Layout/Header/Responsive',
};