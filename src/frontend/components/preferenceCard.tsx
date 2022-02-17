import { NextPageContext } from "next";
import axios from "axios";
import { motion } from "framer-motion";
import { Box, Heading, Image, ResponsiveContext } from "grommet";
import Animations from "utils/animations/motionObjects";

export enum ProjectCategory {
  CATEGORY_1 = "Arts",
  CATEGORY_2 = "Design & Tech",
  CATEGORY_3 = "Film",
  CATEGORY_4 = "Food & Craft",
  CATEGORY_5 = "Games",
  CATEGORY_6 = "Music",
}

interface PreferenceCardProps {
  imageUrl: string;
  projectCategory: ProjectCategory;
}

const PreferenceCard = function preferenceCardComponent<PreferenceCardProps>({
  imageUrl,
  projectCategory,
}) {
  const handleSelectCategory = (event) => {
    console.log(event);
  };

  return (
    <motion.div
      whileHover={Animations.scaleOnHover}
      onClick={handleSelectCategory}
    >
      <Box
        elevation="medium"
        margin={{
          bottom: "large",
          right: "medium",
        }}
        direction="column"
        height="min(350px, 100%)"
        width="max(300px)"
        pad="medium"
        align="center"
      >
        <Box flex={false} width="min(small, 100rem)" height="small">
          <Image fit="cover" src={imageUrl} />
        </Box>
        <Heading className="no-text-wrap" level={2} margin="medium">
          {projectCategory}
        </Heading>
      </Box>
    </motion.div>
  );
};

PreferenceCard.getInitialProps = async ({ req }: NextPageContext) => {};

export default PreferenceCard;
