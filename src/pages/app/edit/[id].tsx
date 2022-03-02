import { Box, Heading } from 'grommet';
import type { NextPage } from 'next';
import ProjectForm from '@frontend/components/projectForm';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '@frontend/context/AuthProvider';

const EditProject: NextPage = () => {
  const projectFormDetails = {
    title: "Current Title",
    category: "Film",
    description: "Current description.",
    end_date: "01/01/2030",
    fund_goal: 10000,
    fund_tiers: [0, 100, 1000, 2000],
    pictures: ["weh"]
  }
  const { firstName } = useAuth();
  const router = useRouter();

  useEffect(()=>{
    //make sure url is populated before pulling query params
    if(!router.isReady || !firstName) return;

    console.log(router.query.projectId);

  }, [router.isReady, firstName]); 

  return (
    <>
      <Box>
        <Heading alignSelf="center" margin={{top: "xlarge"}}>Create a new project</Heading>
        <ProjectForm projectFormState={projectFormDetails}/>
      </Box>
    </>
  );
};

export default EditProject;
