import { Image, Heading, Grommet, Header, Main, Text, Box } from 'grommet';
// import Image from 'next/image';
import styled from 'styled-components';

import { NextPageContext } from 'next';

const textMargin = '1rem';

const LandingComponentContainer = styled.div`
// display: flex;
// flex-direction: column;
// align-items: center;
/** 
& > main {
  // word-break: break-all;
  // white-space: normal;
  max-width: 34em;
 */
}
`;

interface LandingComponentProps {

}

const LandingComponent = function landingComponentComponent<landingComponentProps>({ }) {
  return (
    <LandingComponentContainer>
      <Box
        direction="column"
        align="center"
        margin={{
          top: "large"
        }}
      >
        <Box height="medium" width="large">
          <Image fit="cover" src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80" />
        </Box>
        <Heading margin="small" fill={true} level={1}>
          Welcome to JumpStarter!
        </Heading>
        <Main pad="small">
          JumpStarter is a platform for people to jumpstart their projects, way
          better than kicking. Join today!
        </Main>
      </Box>
    </LandingComponentContainer>
  );
}

LandingComponent.getInitialProps = async ({ req }: NextPageContext) => {

};

export default LandingComponent;