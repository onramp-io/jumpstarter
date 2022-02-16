import type { NextPage } from 'next';
import { Box, Button, Heading, Text, TextArea } from 'grommet';
import { Favorite } from 'grommet-icons';
import Comment from '@frontend/components/comment';
import SingleProjectInfo from '@frontend/components/singleprojectinfo';



const Project: NextPage = () => {
  const projectDetails = {
      projectTitle: 'Project XYZ',
      projectDescription: 'A brief description of what this project is. A second line for good measure. Maybe even a third line why not.',
      projectFundGoal: 1000,
      projectCurrFunds: 100,
      projectDeadline: new Date(),
      projectPictures: ["//v2.grommet.io/assets/Wilderpeople_Ricky.jpg"],
      projectInvestors: 12
    };

  const commentDetails = [
    {
      userName: "User Name",
      userIconURL: "//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80",
      commentText: "Nice project! I will be funding it."
    },
    {
      userName: "Other User",
      userIconURL: "//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80",
      commentText: "Bad project. I will not be funding it."
    }
  ];



  return (
    <>
      <SingleProjectInfo 
        projectTitle={projectDetails.projectTitle}
        projectDescription={projectDetails.projectDescription}
        projectFundGoal={projectDetails.projectFundGoal}
        projectCurrFunds={projectDetails.projectCurrFunds}
        projectDeadline={projectDetails.projectDeadline}
        projectPictures={projectDetails.projectPictures}
        projectInvestors={projectDetails.projectInvestors}
      />

      <Heading textAlign="center" fill={true} margin={{left: '2rem', top: '5rem'}}>Comments</Heading>
      <Box margin={{horizontal: '25rem'}} height="small">
        <TextArea placeholder="Leave a comment." resize={false} fill={true} size="medium" />
        <Button primary label="Submit" alignSelf="end" margin={{top: "1.5rem"}}/>
      </Box>
      {commentDetails.map(() => {
        return (
          <Comment />
        )
      })
      }
    </>
  );
};

export default Project;
