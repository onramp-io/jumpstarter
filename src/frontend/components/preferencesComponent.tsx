import { Box, Button, Heading } from 'grommet';

import styles from '../../styles/Preference.module.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AlertTitle, Alert } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import axios from '../../axios/instance';
import { useAuth } from '@frontend/context/AuthProvider';

interface UserPreferencesProps {
  categories: any;
}

const UserPreferences: React.FC<UserPreferencesProps> = ({ categories }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [errorMessage, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { setUser } = useAuth();

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
      await axios.put('/users/preferences/update', {
        categories: selectedCategories,
      });
      router.push('/app/profile');
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
    setIsSubmitting(false);
  };

  useEffect(() => {
    setIsLoading(true);
    const getCategories = async () => {
      try {
        const response = await axios.get('/users/preferences/get');
        setUser({
          interests: response.data.categories,
        });
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
  }, []);

  return (
    <>
      <Box className={styles.wrapper}>
        <Heading className={styles.header}>Preferences</Heading>
        {!isLoading ? (
          <Box className={styles.container}>
            {categories &&
              categories.map((item) => (
                <div key={item.id}>
                  <Box
                    className={styles.cards}
                    onClick={() => addPreference(item.category)}
                  >
                    <div>{item.category}</div>
                  </Box>
                </div>
              ))}
          </Box>
        ) : (
          <>
            <CircularProgress />
          </>
        )}
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
    </>
  );
};

export default UserPreferences;
