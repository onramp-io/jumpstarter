import Section from '@frontend/components/sectionHeader';
import LandingComponent from '@frontend/components/landingComponent';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import SectionCard from '@frontend/components/sectionCard';
import { Heading, Text, Box } from 'grommet';

import styled from 'styled-components';

import { NextPageContext } from 'next';
import SectionMarquee from '@frontend/components/sectionMarquee';

interface indexProps {}

const index: NextPage = function indexComponent<indexProps>({}) {
  const personalPicks = [
    {
      projectTitle: 'Personal Picks Project 1',
      projectDescription:
        'A brief description of what this project is. A second line for good measure.',
      projectCreator: 'Example Creator 1',
    },
    {
      projectTitle: 'Personal Picks Project 2',
      projectDescription:
        'A brief description of what this project is. A second line for good measure.',
      projectCreator: 'Example Creator 2',
    },
    {
      projectTitle: 'Personal Picks Project 3',
      projectDescription:
        'A brief description of what this project is. A second line for good measure.',
      projectCreator: 'Example Creator 3',
    },
    {
      projectTitle: 'Personal Picks Project 4',
      projectDescription:
        'A brief description of what this project is. A second line for good measure.',
      projectCreator: 'Example Creator 4',
    },
  ];

  const trendingProjects = [
    {
      projectTitle: 'Trending Project 1',
      projectDescription:
        'A brief description of what this project is. A second line for good measure.',
      projectCreator: 'Example Creator 1',
    },
    {
      projectTitle: 'Trending Project 2',
      projectDescription:
        'A brief description of what this project is. A second line for good measure.',
      projectCreator: 'Example Creator 2',
    },
    {
      projectTitle: 'Trending Project 3',
      projectDescription:
        'A brief description of what this project is. A second line for good measure.',
      projectCreator: 'Example Creator 3',
    },
    {
      projectTitle: 'Trending Project 4',
      projectDescription:
        'A brief description of what this project is. A second line for good measure.',
      projectCreator: 'Example Creator 4',
    },
  ];
  return (
    <>
      <Head>
        <title>JumpStarter</title>
        <meta name="description" content="Lets JumpStart projects" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LandingComponent />
      <Box align="center" direction="column" margin="large">
        <Section
          sectionHeader="Personal Picks"
          sectionDescription="Here are some projects we think you'll love"
        />
      </Box>
      <Box align="center" direction="row" margin="small">
        <SectionMarquee
          APIPayload={personalPicks}
          linkHref="/personalpicks"
          linkCaption="See all recommended projects >"
        />
      </Box>
      <Box align="center" direction="column" margin="large">
        <Section
          sectionHeader="Trending Projects"
          sectionDescription="See what's popular now"
        />
      </Box>
      <Box align="center" direction="row" margin="small">
        <SectionMarquee
          APIPayload={trendingProjects}
          linkHref="/trending"
          linkCaption="See all trending projects >"
        />
      </Box>
    </>
  );
};

index.getInitialProps = async ({ req }: NextPageContext) => {
  return {};
};

export default index;
