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
import urls from 'helpers/urls';

const Discover: NextPage = () => {
  const testState = {
    TECH: true,
  };
  const [categories, setCategories] = useState({});
  const [categoryArray, setCategoryArray] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [categoryLoaded, setCategoryLoaded] = useState(false);
  const [projectLoaded, setProjectLoaded] = useState(false);
  const [value, setValue] = React.useState('newest');

  useEffect(() => {
    const getCategories = async () => {
      try {
        const categoriesResponse = await axios.get(urls.categories);
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

    sortProjects(value);
    getCategories();
  }, [value]);

  const onChangeHandler = (category) => {
    const checked = categories[category];
    const copyOfCategories = { ...categories };

    copyOfCategories[category] = !checked;

    setCategories(copyOfCategories);
  };

  const sortProjects = async (option) => {
    setProjectData([]);
    if (option == 'newest') {
      try {
        const projectsResponse = await axios.get(urls.newest);
        const discoverProjects = projectsResponse.data.data;

        setProjectData(discoverProjects);
        setProjectLoaded(true);
      } catch (error) {
        console.log(error);
      }
    } else if (option == 'trending') {
      try {
        const projectsResponse = await axios.get(urls.trending);

        const discoverProjects = projectsResponse.data.data;

        setProjectData(discoverProjects);
        setProjectLoaded(true);
      } catch (error) {
        console.log(error);
      }
    }
    setValue(option);
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
            options={['newest', 'trending']}
            alignSelf="end"
            margin={{ left: 'small', right: '11rem', bottom: 'small' }}
            defaultValue={'newest'}
            value={value}
            onChange={({ option }) => setValue(option)}
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
          {projectData.map((project, index) => {
            return <LargeProjectCard key={index} projectData={project} />;
          })}
        </Box>
      </Box>
    </>
  );
};

export default Discover;
