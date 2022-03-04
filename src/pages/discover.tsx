import type { NextPage } from 'next';
import {
  Box,
  CheckBox,
  Heading,
  InfiniteScroll,
  Select,
  Sidebar,
  Text,
} from 'grommet';
import React, { useState, useEffect } from 'react';
import LargeProjectCard from '@frontend/components/largeprojectcard';
import axios from 'axios';
import { NotFoundError } from 'helpers/ErrorHandling/errors';
import { notFoundError } from 'helpers/ErrorHandling/messaging';
import { CircularProgress } from '@mui/material';

const Discover: NextPage = () => {
  const testState = {
    TECH: true,
  };
  const [categories, setCategories] = useState({});
  const [categoryArray, setCategoryArray] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [categoryLoaded, setCategoryLoaded] = useState(false);
  const [projectLoaded, setProjectLoaded] = useState(false);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const categoriesResponse = await axios.get(
          'http://localhost:3000/api/categories'
        );
        const discoverCategories = categoriesResponse.data.categoriesList;

        const categoryList = discoverCategories.map((categoryObj) => {
          return categoryObj.category;
        });

        const categoryState = {};
        setCategoryArray(categoryList);

        for (const category of categoryList) {
          categoryState[category] = true;
        }

        setCategories(categoryState);
        setCategoryLoaded(true);
      } catch (error) {
        console.log(error);
      }
    };

    const getProjects = async () => {
      try {
        const projectsResponse = await axios.get('/api/projects');
        console.log(projectsResponse.data.data);

        const discoverProjects = projectsResponse.data.data;
        //setProjectData(discoverProjects);

        setProjectData(discoverProjects);
        setProjectLoaded(true);
      } catch (error) {
        console.log(error);
        // throw new NotFoundError(notFoundError);
      }
    };

    getProjects();
    getCategories();
  }, []);

  const onChangeHandler = (category) => {
    const checked = categories[category];
    const copyOfCategories = { ...categories };

    copyOfCategories[category] = !checked;

    setCategories(copyOfCategories);
  };

  const filterProjects = (discoverProjects) => {
    return discoverProjects.filter((project) => categories[project.category]);
  };

  if (!categoryLoaded || !projectLoaded) {
    return (
      <>
        <CircularProgress />
      </>
    );
  }

  return (
    <>
      <Box>
        <Heading alignSelf="center">Discover</Heading>
      </Box>

      <Box direction="column" width="100%">
        <Text alignSelf="end">
          Sort by
          <Select
            options={['Newest', 'Trending']}
            alignSelf="end"
            margin={{ left: 'small', right: '11rem', bottom: 'small' }}
            defaultValue={'Newest'}
          />
        </Text>
      </Box>

      <Box direction="row" margin={{ horizontal: '9rem' }}>
        <Sidebar margin={{ right: 'xlarge' }}>
          <Text weight="bold" margin={{ top: 'large', bottom: 'medium' }}>
            Categories
          </Text>
          {categoryArray.map((category, index) => {
            return (
              <CheckBox
                key={index}
                label={category}
                id={category}
                checked={categories[category]}
                onChange={(event) => onChangeHandler(event.target.id)}
              />
            );
          })}
        </Sidebar>
        <Box
          direction="row"
          gap="small"
          wrap={true}
          margin={{ left: '1rem' }}
          width="100vw"
        >
          {console.log('@discover page on 137: ', projectData)}
          {projectData.map((project, index) => {
            return <LargeProjectCard key={index} projectData={project} />;
          })}
        </Box>
      </Box>
    </>
  );
};

export default Discover;
