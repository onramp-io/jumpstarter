import { NextPageContext } from 'next';
import axios from 'axios';
import PreferenceCard, {
  ProjectCategory,
} from '@frontend/components/preferenceCard';
import SectionHeader from '@frontend/components/sectionHeader';
import { Box, Button, Heading, ResponsiveContext } from 'grommet';
import JumpstarterLink from '@frontend/components/jumpstarterLink';

import styles from '../../styles/Preference.module.css';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { AlertTitle, Alert } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

interface UserPreferencesProps {
  categories: any;
}

const UserPreferences: React.FC<UserPreferencesProps> = ({ categories }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [errorMessage, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const addPreference = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const submitPreferences = async () => {
    setIsSubmitting(true);
    try {
      await axios.put('/api/categories', {
        categories: selectedCategories,
      });
      router.push('/app/profile');
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
    setIsSubmitting(false);
  };

  return (
    <>
      <Box className={styles.wrapper}>
        <Heading className={styles.header}>Preferences</Heading>
        <Box className={styles.container}>
          {categories.map((item) => (
            <>
              <Box
                className={styles.cards}
                onClick={() => addPreference(item.category)}
                key={item.id}
              >
                <div>{item.category}</div>
              </Box>
            </>
          ))}
        </Box>
        {isSubmitting ? (
          <>
            <CircularProgress />
          </>
        ) : (
          <>
            <Button
              primary
              label="Submit my preferences"
              onClick={submitPreferences}
              disabled={isSubmitting}
            />
            {errorMessage !== '' && (
              <Alert severity="error">
                <AlertTitle>{errorMessage}</AlertTitle>
              </Alert>
            )}
          </>
        )}
      </Box>
      {/* 
      <SectionHeader
        margin="large"
        sectionHeader="Welcome to JumpStarter!"
        sectionDescription="To get started, let us know what kinds of projects you're interested in seeing."
      />
      <ResponsiveContext.Consumer>
        {(size) =>
          size === 'small' ? (
            <Box align="center">
              <Box
                justify="center"
                align="center"
                width="min(95vw, 1000px)"
                height="min(60vw, min-content)"
                wrap={true}
                direction="row"
              >
                <Box width="70%" margin="medium" gap="medium">
                  <Button primary label="Submit my preferences" />
                  <JumpstarterLink
                    linkHref="/"
                    linkCaption="Skip (you can set up your preferences later in your User Settings) >"
                    className="grey-text"
                  />
                </Box>
              </Box>
            </Box>
          ) : (
            <Box align="center">
              <Box
                justify="center"
                align="center"
                width="min(95vw, 1000px)"
                height="min(60vw, min-content)"
                wrap={true}
                direction="row"
              >
                {APIPayload.map(({ imageUrl, projectCategory }, i) => {
                  <PreferenceCard
                    key={i}
                    imageUrl={imageUrl}
                    projectCategory={projectCategory}
                  />;
                })}
                <Box margin="medium" gap="medium">
                  <Button primary label="Submit my preferences" />
                  <JumpstarterLink
                    linkHref="/"
                    linkCaption="Skip (you can set up your preferences later in your User Settings) >"
                    className="grey-text"
                  />
                </Box>
              </Box>
            </Box>
          )
        }
      </ResponsiveContext.Consumer>
       */}
    </>
  );
};

export default UserPreferences;
