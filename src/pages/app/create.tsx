import { Box, Heading } from "grommet";
import type { NextPage } from "next";
import ProjectForm from "@frontend/components/projectForm";

const CreateProject: NextPage = () => {
  const projectFormDetails = {
    id: 0,
    title: "",
    category: "",
    description: "",
    launchDate: new Date(),
    fundTiers: [0, 0, 0, 0],
    pictures: [],
    currFundGoal: 0,
  };

  return (
    <>
      <Box>
        <Heading alignSelf="center">Create a new project</Heading>
        <ProjectForm
          projectFormState={projectFormDetails}
          createOrEdit="create"
        />
      </Box>
    </>
  );
};

export default CreateProject;
