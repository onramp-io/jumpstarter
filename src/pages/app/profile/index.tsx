/* eslint-disable @next/next/link-passhref */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';

import { Box, Heading, Button, Text, Tab, Tabs, Avatar } from 'grommet';

import profile from '../../../styles/Profile.module.css';

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
      <Box className={profile.wrapper}>
        <Box className={profile.user_data}>
          <Avatar
            src="//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80"
            size="3xl"
          />
          <Heading className={profile.heading}>
            {firstName} {lastName}
          </Heading>
          <Text>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </Text>
          <Link href="/app/profile/edit">
            <Button label="Edit" className={profile.edit_button} />
          </Link>
        </Box>
        <Box className={profile.profile_data}>
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
      </Box>
    </>
  );
}

export default MyProfile;
