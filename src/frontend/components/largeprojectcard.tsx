import type { NextPage } from 'next';
import { Anchor, Box, Image, Meter, Text } from 'grommet';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';

type projectType = {
  id: number, //added
  user_name: string,
  title: string,
  category: string,
  description: string,
  currFundGoal: number,
  fundRaised: number
  launchDate: Date,
}

interface LargeProjectCardProps {
  projectData: projectType
}

const LargeProjectCard: NextPage<LargeProjectCardProps> = ({projectData}): JSX.Element => {
  const [state, setState] = useState(projectData);
  useEffect(() => {
    const getUser = async (id) => {
      const projectInfo = await axios.get(`/api/projects//project/${id}`);

      setState({...state, user_name: projectInfo.data.data.firstName + " " + projectInfo.data.data.lastName});
    }

    getUser(projectData.id);
  }, [])

  console.log(projectData.fundRaised)
  const router = useRouter();
  
  const goToProject = async (event: MouseEvent) => {
    router.push('/app/project/' + projectData.id);
  }

  return (
    <Box
      style={{cursor: "pointer"}}
      onClick={(event) => goToProject(event)}
      flex={{shrink: 0}}
      margin={{
        vertical: "small",
        horizontal: "0.5rem",
      }}
      align="center"
      pad="small"
      width="medium"
      max-height="min-content"
      elevation="medium"
    >
      <Box
        width="large"
        height="small"
      >
        <Image fit="cover" src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80" />
      </Box>

      <Box direction="column" gap="small" margin={{vertical: "medium", horizontal: "medium"}}>
        <Anchor href="#" label={ projectData.category.toUpperCase() } size="small"/>
        <Text weight="bold" size="large">{ projectData.title }</Text>
        <Box max-height="min-content">
          <Text>{ projectData.description }</Text>
        </Box>
        <Box margin={{top: "small", bottom: "medium"}}>
          <Text size="small">Created by</Text>
          <Anchor href="#" label={ state.user_name } />
        </Box>
        <Meter type="bar" value={ projectData.fundRaised } max={ projectData.currFundGoal }/>
        <Box margin={{bottom: "small"}}>
          <Text><strong>${projectData.fundRaised.toLocaleString()}</strong> <small>raised out of ${projectData.currFundGoal[-1].toLocaleString()} </small></Text>
          <Text size="small">12 days left</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default LargeProjectCard;
