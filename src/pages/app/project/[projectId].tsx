import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Box, Button, Heading, TextArea } from 'grommet';
import Comment from '@frontend/components/comment';
import SingleProjectInfo from '@frontend/components/singleprojectinfo';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Project: NextPage = () => {
  const [comment, setComment] = useState('');
  const [commentList, setCommentList] = useState([]);
  const router = useRouter();

  const projectDetails = {
      title: 'Project XYZ',
      description: 'A brief description of what this project is. A second line for good measure. Maybe even a third line why not.',
      fund_goal: 1000,
      fund_raised: 100,
      end_date: new Date(),
      pictures: ["//v2.grommet.io/assets/Wilderpeople_Ricky.jpg"],
      investors: 12
    };

  const getComments = async (projectId) => {
    const commentData = await axios.get('/api/comments/' + projectId);
    setCommentList(commentData.data.response);
  }

  const submitComment = async (event: MouseEvent) => {
    const body = {
      userId: 1,
      projectId: router.query.projectId,
      comment: comment
    }
    await axios.post('/api/comments', body);
    getComments(router.query.projectId);
  }

  useEffect(()=>{
    //make sure url is populated before pulling query params
    if(!router.isReady) return;

    //projectId = router.query.projectId;
    getComments(router.query.projectId);

  }, [router.isReady]); 


  return (
    <>
      <SingleProjectInfo 
        projectDetails={projectDetails}
      />

      <Heading textAlign="center" fill={true} margin={{left: '2rem', top: '5rem'}}>Comments</Heading>

      <Box margin={{horizontal: '25rem'}} height="small">
        <TextArea 
            placeholder="Leave a comment." 
            resize={false} 
            fill={true} 
            size="medium"
            onChange={event => setComment(event.target.value)}
        />
        <Button primary label="Post comment" alignSelf="end" margin={{top: "1.5rem"}} onClick={(event) => submitComment(event)}/>
      </Box>

      {commentList.map((comment, index) => {
        return (
          <Comment 
            key={index} 
            userName={comment.firstName} 
            userIconURL="//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80" 
            commentText={comment.comment}/>
        )
      })
      }
    </>
  );
};

export default Project;
