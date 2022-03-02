import type { NextPage } from "next";
import { Anchor, Box, Image, Meter, Text } from "grommet";
import { useRouter } from "next/router";

type projectType = {
  id: number; //added
  user_name: string;
  title: string;
  category: string;
  description: string;
  fund_goal: number;
  fund_raised: number;
  end_date: Date;
};

interface LargeProjectCardProps {
  projectData: projectType;
}

const LargeProjectCard: NextPage<LargeProjectCardProps> = ({
  projectData,
}): JSX.Element => {
  const router = useRouter();

  const goToProject = async (event: MouseEvent) => {
    console.log("go to project" + projectData.id);
    router.push("/app/project/" + projectData.id);
  };

  return (
    <Box
      className="card"
      style={{ cursor: "pointer" }}
      onClick={(event) => goToProject(event)}
      flex={{ shrink: 0 }}
      margin={{
        vertical: "small",
        horizontal: "0.8rem",
      }}
      align="center"
      pad="small"
      width="medium"
      max-height="min-content"
      elevation="medium"
    >
      <Box width="large" height="small">
        <Image
          fit="cover"
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80"
        />
      </Box>

      <Box
        className="card"
        direction="column"
        gap="small"
        margin={{ vertical: "medium", horizontal: "medium" }}
      >
        <Anchor
          href="#"
          label={projectData.category.toUpperCase()}
          size="small"
        />
        <Text weight="bold" size="large">
          {projectData.title}
        </Text>
        <Box max-height="min-content">
          <Text className="card">{projectData.description}</Text>
        </Box>
        <Box margin={{ top: "small", bottom: "medium" }}>
          <Text className="card" size="small">
            Created by
          </Text>
          <Anchor className="card" href="#" label={projectData.user_name} />
        </Box>
        <Meter
          type="bar"
          value={projectData.fund_raised}
          max={projectData.fund_goal}
        />
        <Box margin={{ bottom: "small" }}>
          <Text className="card">
            <strong>${projectData.fund_raised.toLocaleString()}</strong>{" "}
            <small>
              raised out of ${projectData.fund_goal.toLocaleString()}{" "}
            </small>
          </Text>
          <Text className="card" size="small">
            12 days left
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default LargeProjectCard;
