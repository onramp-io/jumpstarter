import { Box, Button, DateInput, FileInput, Form, FormField, Select, Text, TextArea, TextInput } from 'grommet';
import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { useAuth } from '@frontend/context/AuthProvider';
import { useRouter } from 'next/router';
import { NotFoundError } from 'helpers/ErrorHandling/errors';
import { notFoundError } from 'helpers/ErrorHandling/messaging';
import axios from 'axios';

type projectFormType = {
  title: string,
  category: string,
  description: string,
  launchDate: Date,
  fundTiers: number[],
  pictures: string[],
  currFundGoal: number,
}

interface ProjectFormProps {
    projectFormState: projectFormType
    createOrEdit: string
}

const ProjectForm: NextPage<ProjectFormProps> = ({ projectFormState, createOrEdit}): JSX.Element => {

  const [projectState, setProjectState] = useState(projectFormState);
  const [imageFile, setImageFile] = useState<File>();
  const { userId, accessToken } = useAuth();
  const router = useRouter();

  const onSubmitCreate = async (event) => {
    try {
      const headers = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const uploadConfig = await axios.get('/api/upload', headers);

      const projectImage = await axios.put(
        uploadConfig.data.uploadConfig.url,
        imageFile,
        {
          headers: {
            'Content-type': imageFile.type,
          },
        }
      );

      const pictureArray = [uploadConfig.data.uploadConfig.randomKey];

      const body = {
        title: projectState.title,
        category: projectState.category,
        description: projectState.description,
        fundTiers: projectState.fundTiers,
        currFundGoal: 0,
        user: userId,
        launchDate: projectState.launchDate,
        pictures: pictureArray
      }

      const createProject = await axios.post('/api/users/projects', body, headers);

      router.push('/discover')
    } catch (error) {
      throw new NotFoundError(notFoundError);
    }
    
  }

  const onSubmitEdit = async (event) => {
    try {
      const headers = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const uploadConfig = await axios.get('/api/upload', headers);

      const projectImage = await axios.put(
        uploadConfig.data.uploadConfig.url,
        imageFile,
        {
          headers: {
            'Content-type': imageFile.type,
          },
        }
      );

      const pictureArray = [uploadConfig.data.uploadConfig.randomKey];

      const body = {
        pictures: pictureArray,
        title: projectState.title,
        category: projectState.category,
        description: projectState.description,
        fundTiers: projectState.fundTiers,
        currFundGoal: projectState.currFundGoal,
        launchDate: projectState.launchDate,
      }

      const projectId = 66;

      const editProject = await axios.put(`/api/users/projects/${103}`, body, headers);

      router.push('/discover')
    } catch (error) {
      throw new NotFoundError(notFoundError);
    }
  }

  const updateTier = (newValue, index) => {
    const newTiers = projectState.fundTiers.map((tier, i) => {
      if (i === index) {
        return Number(newValue);
      } else {
        return tier;
      }
    })

    setProjectState({...projectState, fundTiers: newTiers})
  }

  const dateDifference = (dateString) => {
    const newDate = new Date(dateString);

    if ((newDate.getTime() - Date.now()) <= 0) {
      return true;
    }

    return false;
  }

  return (
    <Box margin={{ horizontal: "15rem", vertical: "3rem" }}>
      <Box margin="xlarge">
        <FileInput name="image" onChange={(event) => { setImageFile(event.target.files[0])}}/>
      </Box>
      <Form
        value={projectState}
        onSubmit={(event) => createOrEdit === "create" ? onSubmitCreate(event) : onSubmitEdit(event)}
        validate="blur"
      >
        <Box direction="column" gap="xlarge">

          <FormField
            name="title"
            htmlFor="title"
            label="Project Title"
            required
          >
            <TextInput name="title" onChange={(event) => { setProjectState({...projectState, title: event.target.value}) }}/>
          </FormField>

          <FormField
            label="Project Category">
            <Select
              name="category"
              options={['Arts', 'Design & Tech', 'Film', 'Food & Craft', 'Games', 'Music']}
              onChange={({ option }) => setProjectState({...projectState, category: option})}
            />
          </FormField>

          <FormField
            name="description"
            htmlFor="description"
            label="Project Description"
            required
          >
            <TextArea name="description" onChange={(event) => { setProjectState({...projectState, description: event.target.value}) }}/>
          </FormField>

          <FormField
            name="endDate"
            htmlFor="endDate"
            label="Target Date"
            validate={(val) => {
              val = projectState.launchDate;

              const dateOverflow = dateDifference(val);

              if (dateOverflow === true) {
                return { message: "Target date must be set after the current date", status: "error" }
              }
            }}
          >
            <DateInput name="endDate" format="mm/dd/yyyy" value={projectState.launchDate.toString()} onChange={(event) => setProjectState({...projectState, launchDate: new Date(event.value.toString())})} />
          </FormField>

          <Box margin={{left: "small"}}>
            <Text margin={{ vertical: "small" }}>Tier 1</Text>
            <FormField
              name="tier1"
              htmlFor="tier1"
              validate={(val) => {
                val = projectState.fundTiers[1]

                if (val <= 0) {
                  return {message: "Tier goals must be greater than 0."}
                }

                if (val >= projectState.fundTiers[3]) {
                  return {message: "Tier goals must not be equal to or surpass total project goal."}
                }

                if (val >= projectState.fundTiers[2] || val >= projectState.fundTiers[3]) {
                  return { message: "Tier 1 goal cannot be higher than tiers 2 and 3."}
                }
              }}
            >
              <TextInput
                name="tier1"
                type="number"
                value={projectState.fundTiers[1]}
                placeholder="$0"
                onChange={(event) => updateTier(event.target.value, 1)}
              />
            </FormField>

            <Text margin={{ vertical: "small" }}>Tier 2</Text>
            <FormField
              name="tier2"
              htmlFor="tier2"
              validate={(val) => {
                val = projectState.fundTiers[2]

                if (val <= 0) {
                  return {message: "Tier goals must be greater than 0."}
                }

                if (val >= projectState.fundTiers[3]) {
                  return {message: "Tier goals must not be equal to or surpass total project goal."}
                }

                if (val >= projectState.fundTiers[3]) {
                  return { message: "Tier 2 goal cannot be higher than tier 3."}
                }
              }}
            >
              <TextInput
                name="tier2"
                type="number"
                value={projectState.fundTiers[2]}
                placeholder="$0"
                onChange={(event) => updateTier(event.target.value, 2)}
                />
            </FormField>

            <Text margin={{ vertical: "small" }}>Final goal</Text>
            <FormField
              name="tier3"
              htmlFor="tier3"
              validate={(val) => {
                val = projectState.fundTiers[3]

                if (val <= 0) {
                  return {message: "Goal must be greater than 0."}
                }
              }}
            >
              <TextInput
                name="tier3"
                type="number"
                value={projectState.fundTiers[3]}
                placeholder="$0"
                onChange={(event) => updateTier(event.target.value, 3)}
              />
            </FormField>
          </Box>

          <Button type="submit" primary label={createOrEdit === "create" ? "Create project" : "Edit project"} />
        </Box>
      </Form>
    </Box>
  );
};

export default ProjectForm;
