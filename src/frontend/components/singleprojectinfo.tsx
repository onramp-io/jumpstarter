import type { NextPage } from "next";
import {
  Box,
  Button,
  Grid,
  Heading,
  Image,
  Meter,
  Paragraph,
  Table,
  TableRow,
  TableCell,
  Text,
} from "grommet";
import { Favorite } from "grommet-icons";

type projectType = {
  title: string;
  description: string;
  fund_goal: number;
  fund_raised: number;
  end_date: Date;
  pictures: string[];
  investors: number;
};

interface SingleProjectInfoProps {
  projectDetails: projectType;
}

const SingleProjectInfo: NextPage<SingleProjectInfoProps> = ({
  projectDetails,
}): JSX.Element => {
  return (
    <Box
      direction="column"
      alignContent="center"
      margin={{
        horizontal: "xlarge",
      }}
    >
      <Grid
        className="single-project-info_grid"
        rows={["0.3fr", "0.7fr", "1fr", "1.fr", "0.3fr"]}
        columns={["1.5fr", "1.5fr"]}
        gap={{
          column: "large",
        }}
        areas={[
          { name: "title", start: [0, 0], end: [1, 0] },
          { name: "image", start: [0, 1], end: [0, 4] },
          { name: "goal", start: [1, 1], end: [1, 1] },
          { name: "progress", start: [1, 2], end: [1, 2] },
          { name: "info", start: [1, 3], end: [1, 3] },
          { name: "button", start: [1, 4], end: [1, 4] },
        ]}
      >
        <Heading gridArea="title" textAlign="center" fill={true}>
          {projectDetails.title}
        </Heading>

        <Box gridArea="image">
          <Image
            fit="cover"
            width="100%"
            max-height="100%"
            src={projectDetails.pictures[0]}
          />
        </Box>

        <Box gridArea="goal">
          <Box margin="small" align="end">
            <Favorite size="large" />
          </Box>
          <Grid
            rows={["1fr"]}
            columns={["2fr", "0.5fr"]}
            areas={[
              { name: "text", start: [0, 0], end: [0, 0] },
              { name: "heart", start: [1, 0], end: [1, 0] },
            ]}
          >
            <Box gridArea="text">
              <Heading
                className="single-project-info_goal"
                size="xsmall"
                margin={{
                  vertical: "small",
                }}
              >
                Goal: ${projectDetails.fund_goal.toLocaleString()}
              </Heading>
              <Text>Target Date: {projectDetails.end_date.toDateString()}</Text>
            </Box>
          </Grid>
        </Box>

        <Box
          gridArea="progress"
          border={{ color: "lightgrey" }}
          round={true}
          pad="medium"
          margin={{
            top: "large",
            bottom: "medium",
          }}
        >
          <Table>
            <TableRow>
              <TableCell scope="col">
                <strong>Raised</strong>
              </TableCell>
              <TableCell scope="col">
                <strong>Remaining</strong>
              </TableCell>
              <TableCell scope="col">
                <strong>Investors</strong>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell scope="col">
                ${projectDetails.fund_raised.toLocaleString()}
              </TableCell>
              <TableCell scope="col">
                $
                {(
                  projectDetails.fund_goal - projectDetails.fund_raised
                ).toLocaleString()}
              </TableCell>
              <TableCell scope="col">
                {projectDetails.investors.toLocaleString()}
              </TableCell>
            </TableRow>
          </Table>
          <Meter
            max={projectDetails.fund_goal}
            value={projectDetails.fund_raised}
            background="light-3"
            size="full"
            margin={{
              top: "small",
            }}
            alignSelf="stretch"
          />
        </Box>

        <Box gridArea="info">
          <Heading
            className="single-project-info_info"
            size="small"
            margin={{
              bottom: "small",
            }}
          >
            Info
          </Heading>
          <Paragraph
            fill={true}
            margin={{
              top: "none",
              bottom: "large",
            }}
          >
            {projectDetails.description}
          </Paragraph>
        </Box>

        <Button
          className="single-project-info_CTA"
          primary
          size="large"
          gridArea="button"
          margin={{ horizontal: "large" }}
          label="JumpStart this project"
        />
      </Grid>
    </Box>
  );
};

export default SingleProjectInfo;
