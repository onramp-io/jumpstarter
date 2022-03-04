import { NextPageContext } from "next";
import axios from "axios";
import { Box, Heading, Image, Meter, Text } from "grommet";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import urls from "helpers/urls";
import { motion } from "framer-motion";
import Animations from "utils/animations/motionObjects";

interface ProjectInfoProps {
  projectId: number;
  projectTitle: string;
  projectDescription: string;
  projectCreator: string;
}

export const ProjectInfo = function ProjectInfoComponent<sectionCardProps>({
  projectId,
  projectTitle,
  projectDescription,
  projectCreator,
}) {
  return (
    <Box className="card">
      <Box
        className="card"
        align="left"
        margin={{
          top: "small",
        }}
      >
        <Heading level={3}>{projectTitle}</Heading>
      </Box>
      <Box
        className="card"
        align="left"
        margin={{
          top: "small",
          bottom: "small",
        }}
      >
        <Text>{projectDescription}</Text>
        <CreatorText projectCreator={projectCreator} />
      </Box>
    </Box>
  );
};

ProjectInfo.getInitialProps = async ({ req }: NextPageContext) => {};

interface CardDescriptionProps {
  projectCreator: string;
}

export const CardDescription = function CardDescriptionComponent<
  sectionCardProps
>({ projectCreator }) {
  return (
    <Text color="dark-6">
      Created by <br /> {projectCreator}
    </Text>
  );
};

CardDescription.getInitialProps = async ({ req }: NextPageContext) => {};

interface CreatorTextProps {
  projectCreator: string;
}

export const CreatorText = function CreatorTextComponent<sectionCardProps>({
  projectCreator,
}) {
  return (
    <>
      <Box
        className="card"
        align="left"
        margin={{
          top: "small",
        }}
      >
        <Text color="dark-6">
          Created by <br /> {projectCreator}
        </Text>
      </Box>
    </>
  );
};

CreatorText.getInitialProps = async ({ req }: NextPageContext) => {};

interface SectionCardProps {
  projectId: number;
  projectTitle: string;
  projectDescription: string;
  projectCreator: string;
  projectImageUrl: string;
}

const SectionCard = function sectionCardsComponent({
  projectId,
  projectTitle,
  projectDescription,
  projectCreator,
  projectImageUrl,
}: SectionCardProps) {
  const [percentageFunded, setPercentageFunded] = useState(10);

  const router = useRouter();

  const goToProject = async (event: MouseEvent) => {
    router.push(urls.projectRedirect + projectId);
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      setPercentageFunded(percentageFunded + 2);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [percentageFunded]);

  return (
    <motion.div whileHover={Animations.scaleOnHover}>
      <Box
        className="card"
        margin={{
          top: "xsmall",
          left: "xsmall",
        }}
        align="center"
        pad="medium"
        width="medium"
        height="min-content"
        elevation="medium"
        style={{ cursor: "pointer" }}
        onClick={(event) => goToProject(event)}
      >
        <Box width="large" height="small">
          <Image
            className="section-card_img"
            fit="cover"
            src={projectImageUrl}
          />
        </Box>
        <Meter type="bar" value={percentageFunded} />
        <ProjectInfo
          projectId={projectId}
          projectTitle={projectTitle}
          projectDescription={projectDescription}
          projectCreator={projectCreator}
        />
      </Box>
    </motion.div>
  );
};

SectionCard.getInitialProps = async ({ req }: NextPageContext) => {
  return {};
};

export default SectionCard;
