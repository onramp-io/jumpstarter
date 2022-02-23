import { NextPageContext } from "next";
import axios from "axios";
import { Image, Grommet, Header, Main, Text, Box, Heading } from "grommet";
import styled from "styled-components";

interface SectionHeaderProps {
  sectionHeader: string;
  sectionDescription: string;
  margin: string;
}

const SectionHeader = function sectionComponent<sectionProps>({
  margin,
  sectionHeader,
  sectionDescription,
}) {
  return (
    <>
      <Box align="center" margin={margin}>
        <Heading level={2}>{sectionHeader.toUpperCase()}</Heading>
        <Main pad="small">{sectionDescription}</Main>
      </Box>
    </>
  );
};

SectionHeader.getInitialProps = async ({ req }: NextPageContext) => {
  return {};
};

export default SectionHeader;
