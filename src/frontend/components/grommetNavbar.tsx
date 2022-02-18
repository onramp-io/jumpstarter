/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable @next/next/link-passhref */
import React from 'react';
import { Anchor, Box, Button, Header, Menu, ResponsiveContext } from 'grommet';
import { Grommet as GrommetIcon, Menu as MenuIcon } from 'grommet-icons';
import Link from 'next/link';
import { useAuth } from '@frontend/context/AuthProvider';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/client/client';
import { useRouter } from 'next/router';

export const NavBar = () => {
  const { firstName } = useAuth();

  const router = useRouter();

  const logOut = async () => {
    console.log('here');
    try {
      signOut(auth)
        .then(() => {
          router.push('/');
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Header
      background="light-2"
      pad="medium"
      height="xsmall"
      elevation="medium"
    >
      <ResponsiveContext.Consumer>
        {(size) =>
          size === 'small' ? (
            <>
              <Box />
              <Menu
                a11yTitle="Navigation Menu"
                dropProps={{ align: { top: 'bottom', right: 'right' } }}
                icon={<MenuIcon color="brand" />}
                items={[
                  {
                    label: <Box pad="small">JumpStarter</Box>,
                    href: '/',
                  },
                  {
                    label: <Box pad="small">Create a New Project</Box>,
                    href: '/project',
                  },
                  {
                    label: <Box pad="small">Discover</Box>,
                    href: '/discover',
                  },
                  {
                    label: <Box pad="small">Log In</Box>,
                    href: '/login',
                  },
                  {
                    label: <Box pad="small">Sign Up</Box>,
                    href: '/signup',
                  },
                ]}
              />
            </>
          ) : (
            <Box justify="end" flex="grow" direction="row" gap="medium">
              <Box direction="row" justify="start" gap="xlarge">
                <Link href="/project">
                  <Anchor href="/project" label="Create a New Project" />
                </Link>
                <Link href="/discover">
                  <Anchor href="/discover" label="Discover" />
                </Link>
              </Box>
              <Box
                flex="grow"
                align="center"
                margin={{
                  left: 'xlarge',
                  right: 'xlarge',
                }}
              >
                <Link href="/">
                  <Anchor href="/" label="JumpStarter" />
                </Link>
              </Box>
              <Box direction="row" justify="end" gap="xlarge">
                {firstName && (
                  <>
                    {firstName}
                    <Link href="/app/profile">
                      <Anchor href="/app/profile" label="Profile" />
                    </Link>
                    <Button label="Log Out" onClick={logOut} />
                  </>
                )}
                {!firstName && (
                  <>
                    <Link href="/login">
                      <Anchor href="/login" label="Log In" />
                    </Link>
                    <Link href="/signup">
                      <Anchor href="/signup" label="Sign Up" />
                    </Link>
                  </>
                )}
              </Box>
            </Box>
          )
        }
      </ResponsiveContext.Consumer>
    </Header>
  );
};

export default {
  title: 'Layout/Header/Responsive',
};
