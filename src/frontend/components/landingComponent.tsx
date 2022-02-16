import { Image, Heading, Grommet, Header, Main, Text, Box } from 'grommet';
import styled from 'styled-components';

import { NextPageContext } from 'next';

const textMargin = '1rem';

interface LandingComponentProps {}

const LandingComponent = function landingComponentComponent<
  landingComponentProps
>({}) {
  return (
    <Box direction="column" align="center" margin="large">
      <Box
        height="medium"
        width="large"
        margin={{
          bottom: 'xsmall',
        }}
      >
        <Image
          fit="cover"
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80"
        />
      </Box>
      <Heading margin="medium" fill={true} level={1}>
        Welcome to JumpStarter!
      </Heading>
      <Main
        margin={{
          bottom: 'medium',
        }}
      >
        JumpStarter is a platform for people to jumpstart their projects, way
        better than kicking. Join today!
      </Main>
    </Box>
  );
};

LandingComponent.getInitialProps = async ({ req }: NextPageContext) => {};

export default LandingComponent;
