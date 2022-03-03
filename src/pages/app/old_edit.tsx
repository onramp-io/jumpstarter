import { Box, Heading, Text } from 'grommet';
import type { NextPage } from 'next';
import ProjectForm from '@frontend/components/projectForm';
import { projectsUrl } from 'helpers/Urls';
import { useState, useEffect } from 'react';
import axios from 'axios';

const EditProject: NextPage = () => {
  const [projectFormDetails, setProjectFormDetails] = useState();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const getProject = async (id) => {
        const response = await axios.get(projectsUrl + id);
        setProjectFormDetails(response.data.data);
        setLoading(false);
      }

      getProject(103);
    } catch (error) {
      console.log(error)
    }
  }, [])

  if (isLoading) {
    return <Text>Loading....</Text>
  }

  return (
    <>
      <Box>
        <Heading alignSelf="center" margin={{top: "xlarge"}}>Edit project</Heading>
        <ProjectForm projectFormState={projectFormDetails} createOrEdit={"edit"}/>
      </Box>
    </>
  );
};

export default EditProject;
