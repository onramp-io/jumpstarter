import type { NextPage } from 'next';
import { Box, CheckBoxGroup, Heading, InfiniteScroll, Select, Sidebar, Text } from 'grommet';
import LargeProjectCard from '@frontend/components/largeprojectcard';

const Discover: NextPage = () => {
  const projectData = [
    {
      user_name: "User 1",
      title: "New Film",
      category: "Film",
      description: "This is a new film description. It will be really good and fun to watch.",
      fund_goal: 10000,
      fund_raised: 1000,
      end_date: new Date(),
    },
    {
      user_name: "User 2",
      title: "Smart Watch",
      category: "Tech",
      description: "This is a new smart watch description. It is very useful and high tech.",
      fund_goal: 20000,
      fund_raised: 15000,
      end_date: new Date(),
    },
    {
      user_name: "User 3",
      title: "New Book",
      category: "Literature",
      description: "This is a new book description. It will have many pages and tell a fun story. Some other third line of text.",
      fund_goal: 5000,
      fund_raised: 1300,
      end_date: new Date(),
    },
    {
      user_name: "User 4",
      title: "New Game",
      category: "Games",
      description: "This is a new game description. It will be really fun and have lots of mechanics.",
      fund_goal: 30000,
      fund_raised: 12000,
      end_date: new Date(),
    },
    {
      user_name: "User 5",
      title: "New Album",
      category: "Music",
      description: "This is a new album description. It is made by New Singer and their new band.",
      fund_goal: 10000,
      fund_raised: 3000,
      end_date: new Date(),
    },
    {
      user_name: "User 6",
      title: "New Snack",
      category: "Food",
      description: "This is a new snack description. It will be sold in grocery stores and be very delicious.",
      fund_goal: 10000,
      fund_raised: 5000,
      end_date: new Date(),
    },
  ];

  return (
    <>
      <Box>
        <Heading alignSelf='center'>Discover</Heading>
      </Box>

      <Box direction="column" width="100%">
        <Text alignSelf="end">Sort by 
          <Select options={['Newest', 'Trending']} alignSelf="end" margin={{ left: "small",right: "11rem", bottom: "small" }} defaultValue={'Newest'}/>
        </Text>
      </Box>

      <Box direction="row" margin={{ horizontal: "9rem" }}>
        <Sidebar margin={{right: "xlarge"}}>
          <Text weight="bold" margin={{top: "large", bottom: "medium"}}>Categories</Text>
          <CheckBoxGroup options={["Film", "Tech", "Literature", "Games", "Music", "Food"]} alignSelf="center"/>
        </Sidebar>
        <Box direction="row" gap="small" wrap={true} margin={{left: "1rem"}}>
          <InfiniteScroll
            items={projectData}
            step={3}
            onMore={() => {
              console.log('On more triggered')
            }}
          >
            {
              (item, index) => (
                <LargeProjectCard />
              )
            }
          </InfiniteScroll>
        </Box>
      </Box>
    </>
  );
};

export default Discover;
