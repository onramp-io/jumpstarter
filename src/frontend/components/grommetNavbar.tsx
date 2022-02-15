import React from 'react';

import { Anchor, Box, Header, Menu, ResponsiveContext } from 'grommet';
import { Grommet as GrommetIcon, Menu as MenuIcon } from 'grommet-icons';
import Link from 'next/link';

import styled from 'styled-components';

//const HeaderComponent = styled.Header`
//display: flex;
//`;

/** 
 * 
 const NavContainer = styled.div`
 display: flex;
 flex-grow: 1;
 background-color: #addddf;
 `;
 
 const JumpStarterIconContainer = styled.div`
 margin-left: 4rem;
 margin-right: 4rem;
 `;
 
 const SideIconContainer = styled.div`
 display: flex;
 flex-wrap: wrap;
 justify-content: space-between;
 // background-color: yellow;
 & > *:not(:last-child) {
   margin-right: 3rem;
   //background-color: red;
 }
 `;
 */


export const NavBar = () => {
  return (
    <Header background="light-2" pad="medium" height="xsmall">
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
            <Box justify="end" flex="grow" direction="row" gap="medium">
              <Box direction="row" justify="start" gap="xlarge">
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
              </Box>
              <Box flex="grow" align="center" margin={{
                left: "xlarge",
                right: "xlarge"
              }}>
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
              </Box>
              <Box direction="row" justify="end" gap="xlarge">
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