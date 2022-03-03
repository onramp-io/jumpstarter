import type { NextPage } from 'next';
import { Box, CheckBox, Heading, InfiniteScroll, Select, Sidebar, Text } from 'grommet';
import React, { useState, useEffect } from 'react';
import LargeProjectCard from '@frontend/components/largeprojectcard';
import axios from 'axios';
import { NotFoundError } from 'helpers/ErrorHandling/errors';
import { notFoundError } from 'helpers/ErrorHandling/messaging';

const Discover: NextPage = () => {
  const testState = {
    TECH: true
  }
  const [categories, setCategories] = useState({});
  const [categoryArray, setCategoryArray] = useState([]);
  const [projectData, setProjectData] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get('/api/categories');

        const categoryList = response.data.categoriesList.map(
          (categoryObj) => {
            return categoryObj.category;
          }
        );

        const categoryState = {};
        const testArray = ["TECH"];
        setCategoryArray([...categoryList, ...testArray]);

        for (const category of categoryList) {
          categoryState[category] = true;
        }

        setCategories({...categoryState, ...testState});
      } catch (error) {
        throw new NotFoundError(notFoundError);
      }
    }

    const getProjects = async() => {
      try {
        const response = await axios.get('/api/projects');

        setProjectData(response.data.data);
      } catch (error) {
        throw new NotFoundError(notFoundError);
      }
    }

    getProjects();
    getCategories();
  }, [])

  const onChangeHandler = (category) => {
    const checked = categories[category];
    const copyOfCategories = { ...categories };

    copyOfCategories[category] = !checked;

    setCategories(copyOfCategories);
  };

<<<<<<< HEAD
  const categoryList = ["Film", "Tech", "Literature", "Games", "Music", "Food"];

  const projectData = [
    {
      id: 1,
      user_name: "User 1",
      title: "New Film",
      category: "Film",
      description:
        "This is a new film description. It will be really good and fun to watch.",
      fund_goal: 10000,
      fund_raised: 1000,
      end_date: new Date(),
    },
    {
      id: 17,
      user_name: "User 2",
      title: "Smart Watch",
      category: "Tech",
      description:
        "This is a new smart watch description. It is very useful and high tech.",
      fund_goal: 20000,
      fund_raised: 15000,
      end_date: new Date(),
    },
    {
      id: 2,
      user_name: "User 3",
      title: "New Book",
      category: "Literature",
      description:
        "This is a new book description. It will have many pages and tell a fun story. Some other third line of text.",
      fund_goal: 5000,
      fund_raised: 1300,
      end_date: new Date(),
    },
    {
      id: 3,
      user_name: "User 4",
      title: "New Game",
      category: "Games",
      description:
        "This is a new game description. It will be really fun and have lots of mechanics.",
      fund_goal: 30000,
      fund_raised: 12000,
      end_date: new Date(),
    },
    {
      id: 4,
      user_name: "User 5",
      title: "New Album",
      category: "Music",
      description:
        "This is a new album description. It is made by New Singer and their new band.",
      fund_goal: 10000,
      fund_raised: 3000,
      end_date: new Date(),
    },
    {
      id: 5,
      user_name: "User 6",
      title: "New Snack",
      category: "Food",
      description:
        "This is a new snack description. It will be sold in grocery stores and be very delicious.",
      fund_goal: 10000,
      fund_raised: 5000,
      end_date: new Date(),
    },
  ];

  const { accessToken } = useAuth();

  const calculateTrendScore = async () => {
    try {
      var url = "/api/projects/trend";
      await axios.put(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    calculateTrendScore();
  }, []);

=======
>>>>>>> main
  return (
    <>
      <Box>
        <Heading alignSelf="center">Discover</Heading>
      </Box>

      <Box direction="column" width="100%">
        <Text alignSelf="end">
          Sort by
          <Select
            options={["Newest", "Trending"]}
            alignSelf="end"
            margin={{ left: "small", right: "11rem", bottom: "small" }}
            defaultValue={"Newest"}
          />
        </Text>
      </Box>

      <Box direction="row" margin={{ horizontal: "9rem" }}>
        <Sidebar margin={{right: "xlarge"}}>
          <Text weight="bold" margin={{top: "large", bottom: "medium"}}>Categories</Text>
          {categoryArray.map((category, index) => {
            return <CheckBox
              key={index}
              label={category}
              id={category}
              checked={categories[category]}
              onChange={(event) => onChangeHandler(event.target.id)}
            />
          })}
        </Sidebar>
        <Box
          direction="row"
          gap="small"
          wrap={true}
          margin={{ left: "1rem" }}
          width="100vw"
        >
          <InfiniteScroll
            items={projectData.filter(
              (project) => categories[project.category]
            )}
            step={3}
            onMore={() => {
            }}
          >
            {(item, index) => (
              <LargeProjectCard key={index} projectData={item} />
            )}
          </InfiniteScroll>
        </Box>
      </Box>
    </>
  );
};

export default Discover;
