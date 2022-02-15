import { NextPageContext } from 'next';
import axios from 'axios';
import SectionCard from './sectionCard';
import styled from 'styled-components';
import { Box } from 'grommet';

const SectionMarqueeContainer = styled.div`
  display: flex;
`;

interface ISingleAPIPayload {
  projectTitle: string,
  projectDescription: string,
  projectCreator: string,
}

interface SectionMarqueeProps {
  APIPayload: ISingleAPIPayload[],
}

const SectionMarquee = function sectionMarqueeComponent<sectionMarqueeProps>({ APIPayload }) {
  /**
  * first 4 JSON payload from our API
  */

  return (
    <Box flex="grow" gap="medium" direction="row">
      {APIPayload.map(({
        projectTitle,
        projectDescription,
        projectCreator,
      }) => {
        return (
          < SectionCard projectTitle={projectTitle} projectDescription={projectDescription} projectCreator={projectCreator} />
        )
      })}
    </Box>
  );
}

SectionMarquee.getInitialProps = async ({ req }: NextPageContext) => {
  return {

  };
};

export default SectionMarquee;