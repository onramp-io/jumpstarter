import { Box, Button, DateInput, FileInput, Form, FormField, Heading, Select, Text, TextArea, TextInput } from 'grommet';
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
  const [valid, setValid] = useState('false');

  const submitProject = () => {

  }

  const validateForm = () => {
    const tier1 = projectState.fund_tiers[1];
    const tier2 = projectState.fund_tiers[2];
    const tier3 = projectState.fund_tiers[3];
    const goal = projectState.fund_goal;
    let errors = [];

    if (tier1 >= tier2) {
      errors.push("Tier 1 must be less than Tier 2.")
    }

    if (tier1 >= tier3) {
      errors.push("Tier 1 must be less than Tier 3.")
    }

    if (tier2 >= tier3) {
      errors.push("Tier 2 must be less than Tier 3.")
    }

    if (tier1 >= goal || tier2 >= goal || tier3 >= goal) {
      errors.push("Fund tier amounts must not exceed fund goal amount.")
    }

    if (tier1 <= 0 || tier2 <= 0 || tier3 <= 0) {
      errors.push("Fund tiers must be greater than 0.")
    }
  }

  return (
    <Box margin={{ horizontal: "15rem", vertical: "3rem" }}>
      <Form
        value={projectState}
        onSubmit={({ value }) => { }}
        validate="blur"
        onValidate={() => { }}
      >
        <Box direction="column" gap="xlarge">
          <FormField label="Upload cover image" required>
            <Box margin={{horizontal: "10rem"}}>
              <FileInput onChange={(event) => { setImageFile(event.target.files[0])}}/>
            </Box>
          </FormField>

          <FormField label="Project Title" required>
            <TextInput onChange={(event) => { setProjectState({...projectState, title: event.target.value}) }}/>
          </FormField>

          <FormField label="Project Category" required>
            <Select
              options={['Film', 'Tech', 'Games', 'Music', 'Literature', 'Food']}
              onChange={({ option }) => setProjectState({...projectState, category: option})}
            />
          </FormField>

          <FormField label="Project Description" required>
            <TextArea onChange={(event) => { setProjectState({...projectState, description: event.target.value}) }}/>
          </FormField>

          <FormField label="Target Date" required>
            <DateInput format="mm/dd/yyyy" onChange={(event) => setProjectState({...projectState, end_date: event.value.toString()})} />
          </FormField>

          <FormField label="Funding Goal"required>
            <TextInput type="number" onChange={(event) => { setProjectState({...projectState, fund_goal: Number(event.target.value)}) }}/>
          </FormField>

          <FormField
            label="Funding Tiers"
            required
            validate={[]}>
            <Box margin={{left: "small"}}>
              <Text margin={{vertical: "small"}}>Tier 1</Text>
              <TextInput type="number" placeholder="$0" value={projectState.fund_tiers[1]}/>
              <Text margin={{ vertical: "small" }}>Tier 2</Text>
              <TextInput type="number" placeholder="$0" value={projectState.fund_tiers[2]}/>
            <Text margin={{ vertical: "small" }}>Tier 3</Text>
              <TextInput type="number" placeholder="$0" value={projectState.fund_tiers[3]}/>
            </Box>
          </FormField>

          <Button type="submit" primary label="Create project" />
        </Box>
      </Form>
    </Box>
  );
};

export default ProjectForm;
