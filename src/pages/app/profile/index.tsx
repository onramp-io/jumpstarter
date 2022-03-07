/* eslint-disable @next/next/link-passhref */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';

import { Box, Heading, Button, Text, Tab, Tabs, Avatar } from 'grommet';

import profile from '../../../styles/Profile.module.css';

import { useAuth } from '@frontend/context/AuthProvider';

import SectionMarquee from '@frontend/components/sectionMarquee';
import Link from 'next/link';
import axios from '../../../axios/instance';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import urls from 'helpers/urls';

function MyProfile() {
  const {
    firstName,
    lastName,
    bio,
    avatar,
    totalInvestments,
    balance,
    setUser,
    accessToken,
    isUserLoading,
  } = useAuth();

  const [error, setError] = useState('');
  const [investments, setInvestments] = useState([]);
  const [userProjects, setUserProjects] = useState([]);
  const [isMoneyTransfering, setMoneyTransferring] = useState(false);
  const [isMoneyTransferred, setMoneyTransferred] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlePayOut = async () => {
    try {
      setMoneyTransferring(true);
      const url = urls.payout;
      await axios.put(url, {});
      setMoneyTransferred(true);
      setMoneyTransferring(false);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    if (!firstName) return;
    if (firstName) {
      setIsLoading(true);
      const getUserInvestments = async () => {
        try {
          const response = await axios.get(urls.userInvestments);
          setInvestments(response.data.userInvestments);
        } catch (error) {
          console.log(error);
        }
      };
      const getUserProjects = async () => {
        const response = await axios.get(urls.getAllUserProjects);
        response.data.userProjects.forEach((element) => {
          userProjects.push({
            projectId: element.projectId,
            projectTitle: element.projectTitle,
            projectDescription: element.projectDescription,
            projectCreator: `${element.firstName} ${element.lastName}`,
          });
        });

        setUserProjects(response.data.userProjects);
      };
      getUserInvestments();
      getUserProjects();
      setIsLoading(false);
    }
  }, [firstName]);

  return (
    <>
      {!isUserLoading ? (
        <Box className={profile.wrapper}>
          <Box className={profile.userData}>
            {avatar ? (
              <>
                <Avatar src={process.env.AWS_BUCKET_URL + avatar} size="3xl" />
              </>
            ) : (
              <>
                <Avatar
                  src="//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80"
                  size="3xl"
                />
              </>
            )}
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
                <Box alignSelf="center">
                  <CircularProgress />
                </Box>
              ) : (
                <>
                  {balance <= 0 ? (
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
                    {isLoading && (
                      <Box alignSelf="center">
                        <CircularProgress />
                      </Box>
                    )}
                    {userProjects.length > 0 ? (
                      <>
                        <SectionMarquee
                          APIPayload={userProjects}
                          linkHref="/personalpicks"
                          linkCaption="See all recommended projects >"
                        />
                      </>
                    ) : (
                      <>
                        <Text>You have not launched a project yet.</Text>
                      </>
                    )}
                  </Box>
                </Box>
              </Tab>
              <Tab title="My Contribution">
                <Box pad="medium">
                  <Box alignSelf="center">
                    <Text>Total Investment: ${totalInvestments}</Text>
                  </Box>
                  <Box align="center" direction="row" margin="small">
                    {isLoading && (
                      <Box alignSelf="center">
                        <CircularProgress />
                      </Box>
                    )}
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
      ) : (
        <Box alignSelf="center">
          <CircularProgress />
        </Box>
      )}
    </>
  );
}

export default MyProfile;
