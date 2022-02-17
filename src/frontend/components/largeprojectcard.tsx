import type { NextPage } from 'next';
import { Anchor, Box, Card, Heading, Image, Meter, Text } from 'grommet';



const LargeProjectCard: NextPage = () => {
  return (
    <Box
      flex={{shrink: 0}}
      margin={{
        vertical: "small",
        horizontal: "0.8rem",
      }}
      align="center"
      pad="small"
      width="medium"
      height="min-content"
      elevation="medium"
    >
      <Box
        width="large"
        height="small"
      >
        <Image fit="cover" src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80" />
      </Box>

      <Box direction="column" gap="small" margin={{vertical: "medium", horizontal: "medium"}}>
        <Anchor href="#" label="LITERATURE" size="small"/>
        <Text weight="bold" size="large">Title</Text>
        <Text>A brief description of what this project is. A second line for good measure. Maybe even a third line why not.</Text>
        <Box margin={{top: "small", bottom: "medium"}}>
          <Text size="small">Created by</Text>
          <Anchor href="#" label="User Name" />
        </Box>
        <Meter type="bar" value={10} />
        <Box>
          <Text><strong>$100</strong> raised</Text>
          <Text size="small">12 days left</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default LargeProjectCard;
