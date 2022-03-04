import type { NextPage } from "next";
import {
  Box,
  CheckBox,
  Heading,
  InfiniteScroll,
  Select,
  Sidebar,
  Text,
} from "grommet";
import React, { useState, useEffect } from "react";
import LargeProjectCard from "@frontend/components/largeprojectcard";
import axios from "axios";
import { NotFoundError } from "helpers/ErrorHandling/errors";
import { notFoundError } from "helpers/ErrorHandling/messaging";

const Discover: NextPage = ({ discoverCategories, discoverProjects }) => {
  const testState = {
    TECH: true,
  };
  const [categories, setCategories] = useState({});
  console.log(categories);
  const [categoryArray, setCategoryArray] = useState([]);
  const [projectData, setProjectData] = useState([]);

  useEffect(() => {
    // console.log(JSON.stringify(discoverProjects));
    const getCategories = async () => {
      try {
        const categoryList = discoverCategories.map((categoryObj) => {
          return categoryObj.category;
        });

        const categoryState = {};
        setCategoryArray(categoryList);

        for (const category of categoryList) {
          categoryState[category] = true;
          // setCategories({ ...categories, category: true });
        }

        setCategories(categoryState);
      } catch (error) {
        throw new NotFoundError(notFoundError);
      }
    };

    const getProjects = async () => {
      try {
        setProjectData(discoverProjects);
      } catch (error) {
        throw new NotFoundError(notFoundError);
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
        <Sidebar margin={{ right: "xlarge" }}>
          <Text weight="bold" margin={{ top: "large", bottom: "medium" }}>
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
          margin={{ left: "1rem" }}
          width="70vw"
        >
          <InfiniteScroll
            items={filterProjects(discoverProjects)}
            step={3}
            onMore={() => {}}
          >
            {(item, index) => (
              <LargeProjectCard key={index} projectData={item} />
            )}
          </InfiniteScroll>
          {/**
           *
           */}
          {/**
           *
           */}
        </Box>
      </Box>
    </>
  );
};

export async function getServerSideProps(context) {
  const categoriesResponse = await axios.get(
    "http://localhost:3000/api/categories"
  );
  const discoverCategories = categoriesResponse.data.categoriesList;

  const projectsResponse = await axios.get(
    "http://localhost:3000/api/projects"
  );

  const discoverProjects = projectsResponse.data.data;

  // const discoverCreatorName = await axios.get(`http://localhost:3000/api/project/${id}`);

  return {
    props: {
      discoverCategories,
      discoverProjects,
    }, // will be passed to the page component as props
  };
}

export default Discover;
