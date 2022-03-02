import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Box, Button, Heading, TextArea } from 'grommet';
import Comment from '@frontend/components/comment';
import SingleProjectInfo from '@frontend/components/singleprojectinfo';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '@frontend/context/AuthProvider';


const Project: NextPage = () => {

  interface ProjectDetails {
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
  const [currentUser, setCurrentUser] = useState(0);
  const [projectOwner, setProjectOwner] = useState(0);
  const [projectDetails, setProjectDetails] = useState<ProjectDetails>({
        id: 64,
        title: '',
        description: '',
        fund_goal: 0,
        fund_raised: 0,
        end_date: new Date(),
        pictures: [],
        investors: 0,
        likesAmt: 0,
        remaining: ''
      });
  const router = useRouter();
  const { accessToken, firstName } = useAuth();

  const getComments = async (projectId) => {
    var url = '/api/comments/';
    const commentData = await axios.get(url + projectId, {headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}`}}) ;
    setCommentList(commentData.data.response);
  }

  const submitComment = async (event: MouseEvent) => {
    
    const body = {
      userId: currentUser,
      projectId: router.query.projectId,
      comment: comment
    }
    var commentsUrl = '/api/comments';
    await axios.post(commentsUrl, body, {headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}`}});
    getComments(router.query.projectId);
  }

  const addView = async () => {
    var url = '/api/projects/views/';
    await axios.put(url + router.query.projectId);
  }

  const getProject = async (projectId) => {
    var url = '/api/projects/';
    const project = await axios.get(url + router.query.projectId);
    const lastGoal = project.data.data.fundTiers[project.data.data.fundTiers.length - 1];
    let remainingGoal = "";
    if (project.data.data.fundRaised > lastGoal) {
      remainingGoal = "All goals Reached!"
    } else {
      remainingGoal = `$${lastGoal.toLocaleString()}`
    }

    setProjectOwner(project.data.data.userId);

    const data = {
      id: project.data.data.id,
      title: project.data.data.title,
      description: project.data.data.description,
      fund_goal: project.data.data.fundTiers[project.data.data.currFundGoal],
      fund_raised: project.data.data.fundRaised,
      end_date: new Date(),
      pictures: ["//v2.grommet.io/assets/Wilderpeople_Ricky.jpg"],
      investors: 0,
      likesAmt: project.data.data.likesAmt,
      remaining: remainingGoal
    }
    setProjectDetails(data);
  }

  const getCurrentUser = async () => {
    var userUrl = '/api/users/get';
    const user = await axios.get(userUrl, {headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}`}});
    setCurrentUser(user.data.userData['id']);
  }

  const goToEdit = async () => {
    var url = '/app/edit/';
    router.push(url + router.query.projectId);
  }

  useEffect(()=>{
    //make sure url is populated before pulling query params
    if(!router.isReady || !firstName) return;

    getCurrentUser()

    addView();

    getProject(router.query.projectId);

    getComments(router.query.projectId);

  }, [router.isReady, firstName]); 


  return (
    <>
      <SingleProjectInfo 
        projectDetails={projectDetails}
      />
        {(currentUser == projectOwner) && (
        <Box margin={{horizontal: '25rem'}} height="small">
          <Button primary label="Edit Project" alignSelf="end" margin={{top: "1.5rem"}} onClick={() => goToEdit()}/>
        </Box>
        )}
      <Heading textAlign="center" fill={true} margin={{left: '2rem', top: '5rem'}}>Comments</Heading>

      {(firstName) && (
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
      )}
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
