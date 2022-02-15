import { NextPageContext } from 'next';
import axios from 'axios';
import { Box, Heading, Image, Meter, Text } from 'grommet';
import styled from 'styled-components';
import { useState, useEffect } from 'react';

interface SectionCardProps {
  projectTitle: string,
  projectDescription: string,
  projectCreator: string,
}

const SectionCard = function sectionCardsComponent<sectionCardsProps>({ projectTitle, projectDescription, projectCreator }) {
  const [percentageFunded, setPercentageFunded] = useState(10);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setPercentageFunded(percentageFunded + 2);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [percentageFunded]);

  return (
    <Box
      align="center"
    >
      <Box
        margin={{
          left: "xsmall",
          right: "xsmall",
        }}
        width="medium"
        height="medium"
        elevation="large"
      >
        <Box width="large" height="small">
          <Image fit="cover" src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80" />
        </Box>
        <Meter type="bar" value={percentageFunded} />
        <Box pad="small">
          <Box align="left">
            <Heading level={3}>{projectTitle}</Heading>
          </Box>
          <Box
            align="left"
            margin={{
              top: 'small'
            }}
          >
            <Text>{projectDescription}</Text>
          </Box>
          <Box
            align="left"
            margin={{
              top: "medium"
            }}
          >
            <Text
              color="dark-6"
            >
              Created by <br /> {projectCreator}
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

SectionCard.getInitialProps = async ({ req }: NextPageContext) => {
  return {};
};

export default SectionCard;