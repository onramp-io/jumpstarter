import { Box, Button, DateInput, FileInput, Form, FormField, Heading, Select, Text, TextArea, TextInput } from 'grommet';
import type { NextPage } from 'next';
import { useState } from 'react';

const ProjectForm: NextPage = () => {
  const [projectInfo, setProjectInfo] = useState();
  const [category, setCategory] = useState('Film');

  return (
    <Box margin={{ horizontal: "15rem", vertical: "3rem" }}>
      <Heading alignSelf='center' margin={{ bottom: "3rem" }}>Create a new project</Heading>
      <Form
        value={projectInfo}
        onChange={info => setProjectInfo(info)}
        onSubmit={({ value }) => { }}
      >
        <Box direction="column" gap="xlarge">
          <FormField label="Upload cover image">
            <Box margin={{horizontal: "10rem"}}>
              <FileInput />
            </Box>
          </FormField>

          <FormField label="Project Title">
            <TextInput />
          </FormField>

          <FormField label="Project Category">
            <Select
              options={['Film', 'Tech', 'Games', 'Music', 'Literature', 'Food']}
              value={category}
              onChange={({ option }) => setCategory(option)}
            />
          </FormField>

          <FormField label="Project Description">
            <TextArea />
          </FormField>

          <FormField label="Target Date">
            <DateInput format="mm/dd/yyyy"/>
          </FormField>

          <FormField label="Funding Goal">
            <TextInput />
          </FormField>

          <FormField label="Funding Tiers">
            <Box margin={{left: "small"}}>
              <Text margin={{vertical: "small"}}>Tier 1</Text>
              <TextInput placeholder="$0"/>
              <Text margin={{ vertical: "small" }}>Tier 2</Text>
              <TextInput placeholder="$0"/>
            <Text margin={{ vertical: "small" }}>Tier 3</Text>
              <TextInput placeholder="$0"/>
            </Box>
          </FormField>

          <Button type="submit" primary label="Create project" />
        </Box>
      </Form>
    </Box>
  );
};

export default ProjectForm;
