import { NextPageContext } from "next";
import axios from "axios";
import PreferenceCard, {
  ProjectCategory,
} from "@frontend/components/preferenceCard";
import SectionHeader from "@frontend/components/sectionHeader";
import { Box, Button, ResponsiveContext } from "grommet";
import JumpstarterLink from "@frontend/components/jumpstarterLink";

interface UserPreferencesProps {}

const UserPreferences = function UserPreferencesComponent<
  UserPreferencesProps
>({}) {
  const APIPayload = [
    {
      imageUrl: `https://picsum.photos/${Math.floor(Math.random() * 1000)}`,
      projectCategory: ProjectCategory.CATEGORY_1,
    },
    {
      imageUrl: `https://picsum.photos/${Math.floor(Math.random() * 1000)}`,
      projectCategory: ProjectCategory.CATEGORY_2,
    },
    {
      imageUrl: `https://picsum.photos/${Math.floor(Math.random() * 1000)}`,
      projectCategory: ProjectCategory.CATEGORY_3,
    },
    {
      imageUrl: `https://picsum.photos/${Math.floor(Math.random() * 1000)}`,
      projectCategory: ProjectCategory.CATEGORY_4,
    },
    {
      imageUrl: `https://picsum.photos/${Math.floor(Math.random() * 1000)}`,
      projectCategory: ProjectCategory.CATEGORY_5,
    },
    {
      imageUrl: `https://picsum.photos/${Math.floor(Math.random() * 1000)}`,
      projectCategory: ProjectCategory.CATEGORY_6,
    },
  ];

  return (
    <>
      <SectionHeader
        margin="large"
        sectionHeader="Welcome to JumpStarter!"
        sectionDescription="To get started, let us know what kinds of projects you're interested in seeing."
      />

      <ResponsiveContext.Consumer>
        {(size) =>
          size === "small" ? (
            <Box align="center">
              {/** 
               edit the Box right below this comment if you need
               to troubleshoot the cards on the
               /preference page
               */}
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
              {/** 
               edit the Box right below this comment if you need
               to troubleshoot the cards on the
               /preference page
               */}
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
    </>
  );
};

export default UserPreferences;
