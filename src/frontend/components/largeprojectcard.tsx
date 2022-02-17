import type { NextPage } from 'next';
import { Anchor, Box, Card, Heading, Image, Meter, Text } from 'grommet';

interface LargeProjectCardProps {
  user_name: string,
  title: string,
  category: string,
  description: string,
  fund_goal: number,
  fund_raised: number
  end_date: Date,
}

const LargeProjectCard: NextPage<LargeProjectCardProps> = ({ user_name, title, category, description, fund_goal, fund_raised, end_date }) => {
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
        <Anchor href="#" label={ category.toUpperCase() } size="small"/>
        <Text weight="bold" size="large">{title}</Text>
        <Box max-height="min-content">
          <Text>{ description }</Text>
        </Box>
        <Box margin={{top: "small", bottom: "medium"}}>
          <Text size="small">Created by</Text>
          <Anchor href="#" label={ user_name } />
        </Box>
        <Meter type="bar" value={ fund_raised } max={ fund_goal }/>
        <Box margin={{bottom: "small"}}>
          <Text><strong>${fund_raised.toLocaleString()}</strong> <small>raised out of ${fund_goal.toLocaleString()} </small></Text>
          <Text size="small">12 days left</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default LargeProjectCard;
