import { NextPageContext } from "next";
import axios from "axios";
import UserPreferences from "@frontend/components/preferencesComponent";

interface PreferencesPageProps {}

const PreferencesPage = function preferencesComponent<
  PreferencesPageProps
>({}) {
  return <UserPreferences />;
};

PreferencesPage.getInitialProps = async ({ req }: NextPageContext) => {
  return {};
};

export default PreferencesPage;
