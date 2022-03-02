import Section from "@frontend/components/sectionHeader";
import LandingComponent from "@frontend/components/landingComponent";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import SectionCard from "@frontend/components/sectionCard";
import { Heading, Text, Box } from "grommet";
import { useEffect, useState } from 'react';

import styled from "styled-components";

import { NextPageContext } from "next";
import SectionMarquee from "@frontend/components/sectionMarquee";
import { useAuth } from '@frontend/context/AuthProvider';
import axios from 'axios';

interface indexProps {}

const index: NextPage = function indexComponent<indexProps>({}) {
  const { firstName } = useAuth();

  const [trendingProjects, setTrendingProjects] = useState([]);

  const getTrendingProjects = async () => {
    const url = '/api/projects/sort/TRENDING'
    const result = await axios.get(url) ;
    result.data.data.forEach(element => {
      trendingProjects.push({
        projectId: element.id,
        projectTitle: element.title,
        projectDescription: element.description,
        projectCreator: element.firstName,
        projectImageUrl: `https://picsum.photos/${Math.floor(
          Math.random() * 1000
        )}`
      })
    });
    setTrendingProjects(trendingProjects)
  }

  useEffect(()=>{
    getTrendingProjects();
  }, []); 

  const personalPicks = [
    {
      projectId: 1,
      projectTitle: "Personal Picks Project 1",
      projectDescription:
        "A brief description of what this project is. A second line for good measure.",
      projectCreator: "Example Creator 1",
      projectImageUrl: `https://picsum.photos/${Math.floor(
        Math.random() * 1000
      )}`
    },
    {
      projectId: 2,
      projectTitle: "Personal Picks Project 2",
      projectDescription:
        "A brief description of what this project is. A second line for good measure.",
      projectCreator: "Example Creator 2",
      projectImageUrl: `https://picsum.photos/${Math.floor(
        Math.random() * 1000
      )}`,
    },
    {
      projectId: 3,
      projectTitle: "Personal Picks Project 3",
      projectDescription:
        "A brief description of what this project is. A second line for good measure.",
      projectCreator: "Example Creator 3",
      projectImageUrl: `https://picsum.photos/${Math.floor(
        Math.random() * 1000
      )}`,
    },
    {
      projectId: 4,
      projectTitle: "Personal Picks Project 4",
      projectDescription:
        "A brief description of what this project is. A second line for good measure.",
      projectCreator: "Example Creator 4",
      projectImageUrl: `https://picsum.photos/${Math.floor(
        Math.random() * 1000
      )}`,
    },
  ];

  const landingImageUrl = `https://picsum.photos/${Math.floor(
    Math.random() * 1000
  )}`;

  return (
    <>
      <LandingComponent landingImageUrl={landingImageUrl} />
      {(firstName) && (
        <>
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
        </>
      )}
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
