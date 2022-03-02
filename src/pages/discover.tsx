import type { NextPage } from 'next';
import { Box, CheckBox, CheckBoxGroup, Heading, InfiniteScroll, NameValueList, Select, Sidebar, Text } from 'grommet';
import React, { useState, useEffect } from 'react';
import LargeProjectCard from '@frontend/components/largeprojectcard';
import axios from 'axios';
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

        const categoryList = response.data.response.map(
          (categoryObj) => {
            return categoryObj.category;
          }
        );

        const categoryState = {};
        const testArray = ["TECH"]
        setCategoryArray([...categoryList, ...testArray]);

        for (const category of categoryList) {
          categoryState[category] = true;
        }

        setCategories({...categoryState, ...testState});
      } catch (error) {
        console.log(error)
      }
    }

    const getProjects = async() => {
      try {
        const response = await axios.get('/api/projects');

        setProjectData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }

    getProjects();
    getCategories();
  }, [])

  const onChangeHandler = (category) => {
    const checked = categories[category];
    const copyOfCategories = { ...categories };

    copyOfCategories[category] = !checked;

    setCategories(copyOfCategories)
  }

  return (
    <>
      <Box margin={{top: "xlarge"}}>
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
        <Box direction="row" wrap={true} margin={{left: "1rem"}} width="100vw">
          <InfiniteScroll
            items={projectData.filter(project => categories[project.category])}
            step={3}
            onMore={() => {
              console.log()
            }}
          >
            {
              (item, index) => (
                <LargeProjectCard
                  key={index}
                  projectData = {item}
                />
              )
            }
          </InfiniteScroll>
        </Box>
      </Box>
    </>
  );
};

export default Discover;
