import { Box, Heading, Text } from 'grommet';
import type { NextPage } from 'next';
import ProjectForm from '@frontend/components/projectForm';
import { useState, useEffect } from 'react';
import { NotFoundError } from 'helpers/ErrorHandling/errors';
import { notFoundError } from 'helpers/ErrorHandling/messaging';
import axios from 'axios';
import { useRouter } from 'next/router';
import urls from 'helpers/urls';

const EditProject: NextPage = () => {
  const [projectFormDetails, setProjectFormDetails] = useState();
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    try {
      const getProject = async (id) => {
        const response = await axios.get(urls.projects + id);
        setProjectFormDetails(response.data.data);
        setLoading(false);
      };
      getProject(router.query.id);
    } catch (error) {
      throw new NotFoundError(notFoundError);
    }
  }, [router.isReady]);

  if (isLoading) {
    return <Text>Loading....</Text>;
  }

  return (
    <>
      <Box>
        <Heading alignSelf="center" margin={{ top: 'xlarge' }}>
          Edit project
        </Heading>
        <ProjectForm
          projectFormState={projectFormDetails}
          createOrEdit={'edit'}
        />
      </Box>
    </>
  );
};

export default EditProject;
