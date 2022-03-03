import { NextPageContext } from "next";
import axios from "axios";
import SectionCard from "./sectionCard";
import styled from "styled-components";
import { Anchor, Box, Pagination } from "grommet";
import Link from "next/link";
import JumpstarterLink from "./jumpstarterLink";

interface SingleAPIPayload {
  projectId: number;
  projectTitle: string;
  projectDescription: string;
  projectCreator: string;
  projectImageUrl: string;
}

interface SectionMarqueeProps {
  APIPayload: SingleAPIPayload[];
  linkCaption: string;
  linkHref: string;
}

const SectionMarquee = function SectionMarqueeComponent({
  APIPayload,
  linkCaption,
  linkHref,
}: SectionMarqueeProps) {
  /**
   * first 4 JSON payload from our API
   */
  const handlePageChange = () => {
    console.log("Changed page numbers!");
  };

  let numberOfPages = 40;

  return (
    <>
      <Box>
        <Box
          align="end"
          gap="small"
          margin={{
            bottom: "small",
            right: "large",
          }}
        >
          <Pagination onChange={handlePageChange} numberItems={numberOfPages} />
        </Box>
        <Box
          className="sectionMarquee_container"
          margin={{
            left: "large",
            right: "large",
          }}
          gap="medium"
          direction="row"
        >
          {APIPayload.map(
            (
              {
                projectId,
                projectTitle,
                projectDescription,
                projectCreator,
                projectImageUrl,
              },
              i
            ) => {
              return (
                <SectionCard
                  key={i}
                  projectId={projectId}
                  projectTitle={projectTitle}
                  projectDescription={projectDescription}
                  projectCreator={projectCreator}
                  projectImageUrl={projectImageUrl}
                />
              );
            }
          )}
        </Box>
        <Box
          direction="row"
          justify="end"
          margin={{
            top: "medium",
            right: "large",
          }}
        >
          <JumpstarterLink
            className=""
            linkHref={linkHref}
            linkCaption={linkCaption}
          />
        </Box>
      </Box>
    </>
  );
};

export default SectionMarquee;
