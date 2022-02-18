import { NextPageContext } from 'next';
import axios from 'axios';
import { Box, Heading, Image, Meter, Text } from 'grommet';
import { useState, useEffect } from 'react';

interface ProjectInfoProps {
  projectTitle: string;
  projectDescription: string;
  projectCreator: string;
}

export const ProjectInfo = function ProjectInfoComponent<sectionCardProps>({
  projectTitle,
  projectDescription,
  projectCreator,
}) {
  return (
    <Box>
      <Box
        align="left"
        margin={{
          top: 'small',
          bottom: 'small',
        }}
      >
        <Heading level={3}>{projectTitle}</Heading>
      </Box>
      <Box
        align="left"
        margin={{
          top: 'small',
          bottom: 'small',
        }}
      >
        <Text>{projectDescription}</Text>
        <CreatorText projectCreator={projectCreator} />
      </Box>
    </Box>
  );
};

ProjectInfo.getInitialProps = async ({ req }: NextPageContext) => {};

interface CardDescriptionProps {
  projectCreator: string;
}

export const CardDescription = function CardDescriptionComponent<
  sectionCardProps
>({ projectCreator }) {
  return (
    <Text color="dark-6">
      Created by <br /> {projectCreator}
    </Text>
  );
};

CardDescription.getInitialProps = async ({ req }: NextPageContext) => {};

interface CreatorTextProps {
  projectCreator: string;
}

export const CreatorText = function CreatorTextComponent<sectionCardProps>({
  projectCreator,
}) {
  return (
    <>
      <Box
        align="left"
        margin={{
          top: 'small',
        }}
      >
        <Text color="dark-6">
          Created by <br /> {projectCreator}
        </Text>
      </Box>
    </>
  );
};

CreatorText.getInitialProps = async ({ req }: NextPageContext) => {};

interface SectionCardProps {
  projectTitle: string;
  projectDescription: string;
  projectCreator: string;
}

const SectionCard = function sectionCardsComponent<sectionCardsProps>({
  projectTitle,
  projectDescription,
  projectCreator,
}) {
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
      margin={{
        top: 'xsmall',
        left: 'xsmall',
      }}
      align="center"
      pad="small"
      width="medium"
      height="min-content"
      elevation="medium"
    >
      <Box width="large" height="small">
        <Image
          fit="cover"
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80"
        />
      </Box>
      <Meter type="bar" value={percentageFunded} />
      <ProjectInfo
        projectTitle={projectTitle}
        projectDescription={projectDescription}
        projectCreator={projectCreator}
      />
    </Box>
  );
};

SectionCard.getInitialProps = async ({ req }: NextPageContext) => {
  return {};
};

export default SectionCard;
