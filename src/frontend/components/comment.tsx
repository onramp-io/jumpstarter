import type { NextPage } from "next";
import { Avatar, Box, Grid, Text } from "grommet";

interface CommentProps {
  userName: string;
  userIconURL: string;
  commentText: string;
}

const Comment: NextPage<CommentProps> = ({
  userName,
  userIconURL,
  commentText,
}) => {
  return (
    <Box
      direction="column"
      alignContent="center"
      margin={{ horizontal: "25rem", vertical: "medium" }}
      pad={{ horizontal: "medium" }}
    >
      <Grid
        className="comment_grid"
        rows={["1fr", "2fr", "1fr"]}
        columns={["0.5fr", "1fr", "3fr"]}
        areas={[
          { name: "icon", start: [0, 1], end: [0, 1] },
          { name: "username", start: [1, 0], end: [1, 0] },
          { name: "comment", start: [1, 1], end: [2, 1] },
        ]}
      >
        <Avatar
          className="comment_avatar"
          gridArea="icon"
          size="large"
          alignSelf="start"
          margin={{
            right: "medium",
          }}
          src={userIconURL}
        />
        <Box className="comment_username" gridArea="username" direction="row">
          <Text
            className="comment_username-text"
            alignSelf="end"
            margin={{
              bottom: "small",
            }}
          >
            {userName}
          </Text>
        </Box>
        <Box
          className="comment_commentbox"
          gridArea="comment"
          border={true}
          fill={true}
        >
          <Text margin="medium">{commentText}</Text>
        </Box>
      </Grid>
    </Box>
  );
};

export default Comment;
