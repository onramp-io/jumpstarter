import { Box, Button, DateInput, FileInput, Form, FormField, Select, Text, TextArea, TextInput } from 'grommet';
import type { NextPage } from 'next';
import { useState } from 'react';

type projectFormType = {
  title: string,
  category: string,
  description: string,
  end_date: string,
  fund_goal: number,
  fund_tiers: number[],
  pictures: string[],
}

interface ProjectFormProps {
    projectFormState: projectFormType
}

const ProjectForm: NextPage<ProjectFormProps> = ({ projectFormState }): JSX.Element => {

  const [projectState, setProjectState] = useState(projectFormState);
  const [imageFile, setImageFile] = useState<File>();

  const onSubmit = (event) => {
    event.preventDefault();

    console.log(JSON.stringify(event.value));
  }

  console.log(projectState.fund_goal)

  const updateTier = (newValue, index) => {
    const newTiers = projectState.fund_tiers.map((tier, i) => {
      if (i === index) {
        return Number(newValue);
      } else {
        return tier;
      }
    })

    setProjectState({...projectState, fund_tiers: newTiers})
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
        onSubmit={(event) => onSubmit(event)}
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
              options={['Film', 'Tech', 'Games', 'Music', 'Literature', 'Food']}
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
              val = projectState.end_date;

              const dateOverflow = dateDifference(val);

              if (dateOverflow === true) {
                return { message: "Target date must be set after the current date", status: "error" }
              }
            }}
          >
            <DateInput name="endDate" format="mm/dd/yyyy" onChange={(event) => setProjectState({...projectState, end_date: event.value.toString()})} />
          </FormField>

          <FormField
            name="goal"
            htmlFor="goal"
            label="Funding Goal"
            validate={(val) => {
              val = projectState.fund_goal
              if (val <= 0) {
                return { message: "Funding goal must be greater than 0.", status: "error"}
              }
            }}
          >
            <TextInput name="goal" type="number" value={projectState.fund_goal} onChange={(event) => { setProjectState({...projectState, fund_goal: Number(event.target.value)}) }}/>
          </FormField>


          <Box margin={{left: "small"}}>
            <Text margin={{ vertical: "small" }}>Tier 1</Text>
            <FormField
              name="tier1"
              htmlFor="tier1"
              validate={(val) => {
                val = projectState.fund_tiers[1]

                if (val <= 0) {
                  return {message: "Tier goals must be greater than 0."}
                }

                if (val >= projectState.fund_goal) {
                  return {message: "Tier goals must not be equal to or surpass total project goal."}
                }

                if (val >= projectState.fund_tiers[2] || val >= projectState.fund_tiers[3]) {
                  return { message: "Tier 1 goal cannot be higher than tiers 2 and 3."}
                }
              }}
            >
              <TextInput
                name="tier1"
                type="number"
                placeholder="$0"
                value={projectState.fund_tiers[1]}
                onChange={(event) => updateTier(event.target.value, 1)}
              />
            </FormField>

            <Text margin={{ vertical: "small" }}>Tier 2</Text>
            <FormField
              name="tier2"
              htmlFor="tier2"
              validate={(val) => {
                val = projectState.fund_tiers[2]

                if (val <= 0) {
                  return {message: "Tier goals must be greater than 0."}
                }

                if (val >= projectState.fund_goal) {
                  return {message: "Tier goals must not be equal to or surpass total project goal."}
                }

                if (val >= projectState.fund_tiers[3]) {
                  return { message: "Tier 2 goal cannot be higher than tier 3."}
                }
              }}
            >
              <TextInput
                name="tier2"
                type="number"
                placeholder="$0"
                value={projectState.fund_tiers[2]}
                onChange={(event) => updateTier(event.target.value, 2)}
                />
            </FormField>

            <Text margin={{ vertical: "small" }}>Tier 3</Text>
            <FormField
              name="tier3"
              htmlFor="tier3"
              validate={(val) => {
                val = projectState.fund_tiers[2]

                if (val <= 0) {
                  return {message: "Tier goals must be greater than 0."}
                }

                if (val >= projectState.fund_goal) {
                  return {message: "Tier goals must not be equal to or surpass total project goal."}
                }
              }}
            >
              <TextInput
                name="tier3"
                type="number"
                placeholder="$0"
                value={projectState.fund_tiers[3]}
                onChange={(event) => updateTier(event.target.value, 3)}
              />
            </FormField>
          </Box>

          <Button type="submit" primary label="Create project" />
        </Box>
      </Form>
    </Box>
  );
};

export default ProjectForm;
