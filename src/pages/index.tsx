/* eslint-disable react-hooks/rules-of-hooks */
import Section from '@frontend/components/sectionHeader';
import LandingComponent from '@frontend/components/landingComponent';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import SectionCard from '@frontend/components/sectionCard';
import { Heading, Text, Box } from 'grommet';
import { useEffect, useState } from 'react';
import urls from 'helpers/urls';

import styled from 'styled-components';

import { NextPageContext } from 'next';
import SectionMarquee from '@frontend/components/sectionMarquee';
import { useAuth } from '@frontend/context/AuthProvider';
import axios from 'axios';
import { getIdToken, onAuthStateChanged } from 'firebase/auth';
import { auth } from 'firebase/client/client';
import axiosInstance from '../axios/instance';
import { useRouter } from 'next/router';

interface indexProps {}

const Index: NextPage = function indexComponent<indexProps>({
  trendingProjects,
  recommendedProjects,
}) {
  const { firstName, accessToken } = useAuth();
  const router = useRouter();

  const landingImageUrl = `https://picsum.photos/${Math.floor(
    Math.random() * 1000
  )}`;

  return (
    <>
      <LandingComponent landingImageUrl={landingImageUrl} />
      {firstName && (
        <>
          <Box align="center" direction="column" margin="large">
            <Section
              sectionHeader="Personal Picks"
              sectionDescription="Here are some projects we think you'll love"
            />
          </Box>
          <Box
            className="marquee"
            align="center"
            direction="row"
            margin="small"
          >
            <SectionMarquee
              APIPayload={recommendedProjects}
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
      <Box className="marquee" align="center" direction="row" margin="small">
        <SectionMarquee
          APIPayload={trendingProjects}
          linkHref="/trending"
          linkCaption="See all trending projects >"
        />
      </Box>
    </>
  );
};
export async function getServerSideProps(context) {
  const trendingProjects = [];
  const recommendedProjects = [];

  try {
    const result = await axios.get('http://localhost:3000' + urls.trending);
    const body = {
      uid: '7Y1RadEe6XSfxdzexFWTsP8xtY33',
    };
    const res = await axios.put(
      'http://localhost:3000/api/users/recommend',
      body
    );

    result.data.data.forEach((element) => {
      trendingProjects.push({
        projectId: element.id,
        projectTitle: element.title,
        projectDescription: element.description,
        projectCreator: `${element.firstName} ${element.lastName}`,
        projectImageUrl: `https://picsum.photos/${Math.floor(
          Math.random() * 1000
        )}`,
      });
    });
    res.data.data.forEach((element) => {
      recommendedProjects.push({
        projectId: element.id,
        projectTitle: element.title,
        projectDescription: element.description,
        projectCreator: `${element.firstName} ${element.lastName}`,
        projectImageUrl: `https://picsum.photos/${Math.floor(
          Math.random() * 1000
        )}`,
      });
    });
  } catch (error) {
    console.log(`error === ${error}`);
  }

  return {
    props: {
      trendingProjects,
      recommendedProjects,
    },
  };
}

export default Index;
