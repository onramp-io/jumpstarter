import { Box, Button, Heading } from "grommet";

import { motion } from "framer-motion";
import styles from "../../styles/Preference.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import { AlertTitle, Alert } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Animations from "utils/animations/motionObjects";

import axios from "../../axios/instance";

interface UserPreferencesProps {
  categories: any;
}

const UserPreferences: React.FC<UserPreferencesProps> = ({ categories }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [errorMessage, setError] = useState("");
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
      await axios.put("/users/preferences/update", {
        categories: selectedCategories,
      });
      router.push("/app/profile");
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
          {categories &&
            categories.map((item) => (
              <motion.div key={item.id} whileHover={Animations.scaleOnHover}>
                <Box
                  elevation="medium"
                  margin={{
                    bottom: "large",
                    right: "medium",
                  }}
                  direction="column"
                  height="min(300px)"
                  width="max(300px)"
                  justify="center"
                  pad="medium"
                  align="center"
                  onClick={() => addPreference(item.category)}
                >
                  <div>{item.category}</div>
                </Box>
              </motion.div>
            ))}
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
              {errorMessage !== "" && (
                <Alert severity="error">
                  <AlertTitle>{errorMessage}</AlertTitle>
                </Alert>
              )}
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default UserPreferences;
