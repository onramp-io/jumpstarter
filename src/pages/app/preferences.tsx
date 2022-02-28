import type { NextPage } from 'next';
import { Box, Heading } from 'grommet';
import styles from '../../styles/Signup.module.css';
import UserPreferences from '@frontend/components/preferencesComponent';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Preferences: NextPage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await axios.get('/api/categories');
        setCategories(res.data['categoriesList']);
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
  }, []);

  return (
    <>
      <UserPreferences categories={categories} />
    </>
  );
};

export default Preferences;
