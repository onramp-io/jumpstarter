import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Box, Button, Heading, TextArea } from 'grommet';
import Comment from '@frontend/components/comment';
import SingleProjectInfo from '@frontend/components/singleprojectinfo';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '@frontend/context/AuthProvider';
import urls from 'helpers/urls';
import CircularProgress from '@mui/material/CircularProgress';

const Project: NextPage = () => {
  interface ProjectDetails {
    userId: number;
    id: number;
    title: string;
    description: string;
    fund_goal: number;
    fund_raised: number;
    end_date: Date;
    pictures: string[];
    investors: number;
    likesAmt: number;
    remaining: string;
  }

  const [comment, setComment] = useState('');
  const [commentList, setCommentList] = useState([]);
  const [IsCommenting, setIsCommenting] = useState(false);
  const [finishRendering, setFinishRendering] = useState(false);
  const [currentUser, setCurrentUser] = useState(0);
  const [projectDetails, setProjectDetails] = useState<ProjectDetails>({
    userId: 0,
    id: 64,
    title: '',
    description: '',
    fund_goal: 0,
    fund_raised: 0,
    end_date: new Date(),
    pictures: [],
    investors: 0,
    likesAmt: 0,
    remaining: '',
  });
  const router = useRouter();
  const { accessToken, firstName, userId, avatar } = useAuth();

  const getComments = async (projectId) => {
    try {
      setFinishRendering(true);
      const commentData = await axios.get(urls.comments + projectId);
      setCommentList(commentData.data.response);
      setFinishRendering(false);
    } catch (error) {
      console.log(error);
    }
  };

  const submitComment = async (event: MouseEvent) => {
    try {
      setIsCommenting(true);
      const body = {
        userId: currentUser,
        projectId: router.query.projectId,
        comment: comment,
      };
      await axios.post(urls.comments, body, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      getComments(router.query.projectId);
      setComment('');
      setIsCommenting(false);
    } catch (error) {
      console.log(error);
    }
  };

  const addView = async () => {
    try {
      await axios.put(urls.projectView + router.query.projectId);
    } catch (error) {
      console.log(error);
    }
  };

  // HERE
  const getProject = async (projectId) => {
    const project = await axios.get(urls.projects + router.query.projectId);
    const lastGoal =
      project.data.data.fundTiers[project.data.data.fundTiers.length - 1];
    let remainingGoal = '';
    if (project.data.data.fundRaised > lastGoal) {
      remainingGoal = 'All goals Reached!';
    } else {
      remainingGoal = `$${(
        lastGoal - project.data.data.fundRaised
      ).toLocaleString()}`;
    }
    const data = {
      userId: project.data.data.userId,
      id: project.data.data.id,
      title: project.data.data.title,
      description: project.data.data.description,
      fund_goal: lastGoal,
      fund_raised: project.data.data.fundRaised,
      end_date: new Date(project.data.data.launchDate),
      pictures: project.data.data.pictures,
      investors: project.data.data.investors,
      likesAmt: project.data.data.likesAmt,
      remaining: remainingGoal,
    };

    setProjectDetails(data);
  };

  const getCurrentUser = async () => {
    setCurrentUser(userId);
  };

  useEffect(() => {
    if (!router.isReady) return;

    getProject(router.query.projectId);
    addView();
    getComments(router.query.projectId);

    if (firstName) {
      getCurrentUser();
    }
  }, [router.isReady, firstName]);

  return (
    <>
      <SingleProjectInfo projectDetails={projectDetails} />

      <Heading
        textAlign="center"
        fill={true}
        margin={{ left: '2rem', top: '5rem' }}
      >
        Comments
      </Heading>

      {firstName && (
        <Box margin={{ horizontal: '25rem' }} height="small">
          <TextArea
            placeholder="Leave a comment."
            resize={false}
            fill={true}
            size="medium"
            onChange={(event) => setComment(event.target.value)}
            value={comment}
          />
          {!IsCommenting && !finishRendering ? (
            <>
              <Button
                primary
                label="Post comment"
                alignSelf="end"
                margin={{ top: '1.5rem' }}
                onClick={(event) => submitComment(event)}
              />
            </>
          ) : (
            <>
              <CircularProgress />
            </>
          )}
        </Box>
      )}
      {commentList.map((comment, index) => {
        return (
          <Comment
            key={index}
            userName={comment.firstName}
            userIconURL={process.env.AWS_BUCKET_URL + avatar}
            commentText={comment.comment}
          />
        );
      })}
    </>
  );
};

export default Project;
