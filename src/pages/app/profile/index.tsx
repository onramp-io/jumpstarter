/* eslint-disable @next/next/link-passhref */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';

import { Box, Heading, Button, Text, Tab, Tabs, Avatar } from 'grommet';

import profile from '../../../styles/Profile.module.css';

import { useAuth } from '@frontend/context/AuthProvider';

import SectionMarquee from '@frontend/components/sectionMarquee';
import Link from 'next/link';
import axios from '../../../axios/instance';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

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
  const {
    firstName,
    lastName,
    bio,
    avatar,
    totalInvestments,
    balance,
    investments,
  } = useAuth();

  const [error, setError] = useState('');
  const [isMoneyTransfering, setMoneyTransferring] = useState(false);
  const [isMoneyTransferred, setMoneyTransferred] = useState(false);

  const handlePayOut = async () => {
    try {
      setMoneyTransferring(true);
      await axios.put('/users/payout', {});
      setMoneyTransferred(true);
      setMoneyTransferring(false);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <Box className={profile.wrapper}>
        <Box className={profile.userData}>
          <Avatar
            src="//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80"
            size="3xl"
          />
          <Heading className={profile.heading}>
            {firstName} {lastName}
          </Heading>
          <Text>{bio}</Text>
          <Link href="/app/profile/edit">
            <Button label="Edit" className={profile.editButton} />
          </Link>
          <Box className={profile.withdrawFunds}>
            <Text>My balance: ${balance}</Text>
            {isMoneyTransfering ? (
              <CircularProgress />
            ) : (
              <>
                {balance >= 0 ? (
                  <>
                    <Button
                      label="Withdraw"
                      className={profile.editButton}
                      disabled
                    />
                  </>
                ) : (
                  <>
                    <Button
                      label="Withdraw"
                      className={profile.editButton}
                      onClick={handlePayOut}
                      disabled={isMoneyTransferred}
                    />
                  </>
                )}
              </>
            )}
          </Box>
        </Box>
        {isMoneyTransferred && (
          <Alert severity="success">
            Your balance has been successfully transferred.
          </Alert>
        )}
        <Box className={profile.profileData}>
          <Tabs>
            <Tab title="My Projects">
              <Box pad="medium">
                <Box align="center" direction="row" margin="small">
                  {/* <SectionMarquee
                    APIPayload={userData2}
                    linkHref="/personalpicks"
                    linkCaption="See all recommended projects >"
                  /> */}
                </Box>
              </Box>
            </Tab>
            <Tab title="My Contribution">
              <Box pad="medium">
                <Text>Total Investment: ${totalInvestments}</Text>
                <Box align="center" direction="row" margin="small">
                  {investments.length > 0 ? (
                    <>
                      <SectionMarquee
                        APIPayload={investments}
                        linkHref="/personalpicks"
                        linkCaption="See all recommended projects >"
                      />
                    </>
                  ) : (
                    <>
                      <Text>You have not made any contributions yet.</Text>
                    </>
                  )}
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
