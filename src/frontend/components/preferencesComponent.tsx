import { Box, Button, Heading } from "grommet";

import { motion } from "framer-motion";
import styles from "../../styles/Preference.module.css";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    console.log(selectedCategories);
  }, [selectedCategories]);

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

  const tick = 0.1;
  const staggerTotalDuration = 6 * tick;
  const pulse = {
    scale: [1, 0.9, 1.1, 1],
    transition: {
      duration: tick * 40,
      delay: staggerTotalDuration,
      repeat: Infinity,
      repeatDelay: tick * 10,
    },
  };

  return (
    <>
      <Box
        className="preferencesComponent_container"
        align="center"
        height="100vh"
      >
        <Box align="center" width="80vw" direction="column">
          <Heading className={styles.header}>Preferences</Heading>
          <Box
            className={`${styles.container} preferencesComponent_cardBox`}
            height="min-content"
            margin="large"
          >
            {categories &&
              categories.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={Animations.scaleOnHover}
                  whileTap={pulse}
                  onClick={() => addPreference(item.category)}
                >
                  <Box
                    className="card"
                    elevation="medium"
                    margin="medium"
                    direction="column"
                    height="min(300px)"
                    width="max(300px)"
                    justify="center"
                    pad="medium"
                    align="center"
                  >
                    <Box className="preferencesComponent_itemCategory card">
                      {item.category}
                    </Box>
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
                  margin={{ top: "large" }}
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
      </Box>
    </>
  );
};

export default UserPreferences;
