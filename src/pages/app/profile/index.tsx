/* eslint-disable @next/next/link-passhref */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';

import { Box, Heading, Button, Text, Tab, Tabs } from 'grommet';

import styles from '../../../styles/Signup.module.css';
import home from '../../../styles/Home.module.css';

import { useAuth } from '@frontend/context/AuthProvider';

import { Image } from 'grommet';
import SectionMarquee from '@frontend/components/sectionMarquee';
import Link from 'next/link';

const userData = {
  name: 'John Doe',
  image: '//v2.grommet.io/assets/Wilderpeople_Ricky.jpg',
  bio: 'A blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah',
};

const userData2 = [
  {
    projectTitle: 'Example Project 1',
    projectDescription:
      'A brief description of what this project is. A second line for good measure.',
    projectCreator: 'Example Creator 1',
  },
  {
    projectTitle: 'Example Project 2',
    projectDescription:
      'A brief description of what this project is. A second line for good measure.',
    projectCreator: 'Example Creator 2',
  },
  {
    projectTitle: 'Example Project 3',
    projectDescription:
      'A brief description of what this project is. A second line for good measure.',
    projectCreator: 'Example Creator 3',
  },
  {
    projectTitle: 'Example Project 4',
    projectDescription:
      'A brief description of what this project is. A second line for good measure.',
    projectCreator: 'Example Creator 4',
  },
];

function MyProfile() {
  const { firstName, lastName, bio, avatar, total_investments } = useAuth();

  return (
    <>
      <Box className={styles.signup_wrapper}>
        <Box height="small" width="small">
          <Heading>
            {firstName} {lastName}
          </Heading>
          <Image fit="cover" src={userData.image} />
          <Text>{bio}</Text>
          <Link href="/app/profile/edit">
            <Button label="Edit" />
          </Link>
        </Box>
        <Tabs>
          <Tab title="My Projects">
            <Box pad="medium">
              <Box align="center" direction="row" margin="small">
                <SectionMarquee
                  APIPayload={userData2}
                  linkHref="/personalpicks"
                  linkCaption="See all recommended projects >"
                />
              </Box>
            </Box>
          </Tab>
          <Tab title="My Contribution">
            <Box pad="medium">
              <Text>Total Investment: ${total_investments}</Text>
              <Box align="center" direction="row" margin="small">
                <SectionMarquee
                  APIPayload={userData2}
                  linkHref="/personalpicks"
                  linkCaption="See all recommended projects >"
                />
              </Box>
            </Box>
          </Tab>
        </Tabs>
      </Box>
    </>
  );
}

export default MyProfile;
