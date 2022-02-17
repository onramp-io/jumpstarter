import { NextPageContext } from "next";
import axios from "axios";
import PreferenceCard, {
  ProjectCategory,
} from "@frontend/components/preferenceCard";
import SectionHeader from "@frontend/components/sectionHeader";
import { Box, Button, ResponsiveContext } from "grommet";

interface UserPreferencesProps {}

const UserPreferences = function UserPreferencesComponent<
  UserPreferencesProps
>({}) {
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
            <Box>I am small or medium</Box>
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
                <PreferenceCard
                  imageUrl="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80"
                  projectCategory={ProjectCategory.CATEGORY_1}
                />
                <PreferenceCard
                  imageUrl="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80"
                  projectCategory={ProjectCategory.CATEGORY_2}
                />
                <PreferenceCard
                  imageUrl="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80"
                  projectCategory={ProjectCategory.CATEGORY_3}
                />
                <PreferenceCard
                  imageUrl="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80"
                  projectCategory={ProjectCategory.CATEGORY_4}
                />
                <PreferenceCard
                  imageUrl="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80"
                  projectCategory={ProjectCategory.CATEGORY_5}
                />
                <PreferenceCard
                  imageUrl="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80"
                  projectCategory={ProjectCategory.CATEGORY_6}
                />
                <Button primary label="Submit my preferences" />
              </Box>
            </Box>
          )
        }
      </ResponsiveContext.Consumer>
    </>
  );
};

UserPreferences.getInitialProps = async ({ req }: NextPageContext) => {
  return {};
};

export default UserPreferences;
