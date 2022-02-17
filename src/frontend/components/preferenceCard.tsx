import { NextPageContext } from "next";
import axios from "axios";
import { Box, Heading, Image, ResponsiveContext } from "grommet";

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
  return (
    <Box
      elevation="medium"
      margin={{
        bottom: "small",
        right: "small",
      }}
      direction="column"
      height="min(350px, 100%)"
      width="max(300px)"
      pad="medium"
      align="center"
    >
      <Box flex={false} width="small" height="small">
        {/** 
       https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80
       * 
      */}
        <Image fit="cover" src={imageUrl} />
      </Box>
      <Heading className="no-text-wrap" level={2} margin="medium">
        {projectCategory}
      </Heading>
    </Box>
  );
};

PreferenceCard.getInitialProps = async ({ req }: NextPageContext) => {};

export default PreferenceCard;
