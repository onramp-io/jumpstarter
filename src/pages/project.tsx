import type { NextPage } from "next";
import { Box, Button, Heading, TextArea } from "grommet";
import Comment from "@frontend/components/comment";
import SingleProjectInfo from "@frontend/components/singleprojectinfo";
import { useState } from "react";

const Project: NextPage = () => {
  const [comment, setComment] = useState("");

  const submitComment = (event: MouseEvent) => {
    console.log("Submitted comment: " + comment);
  };

  const projectDetails = {
    title: "Project XYZ",
    description:
      "A brief description of what this project is. A second line for good measure. Maybe even a third line why not.",
    fund_goal: 1000,
    fund_raised: 100,
    end_date: new Date(),
    pictures: ["//v2.grommet.io/assets/Wilderpeople_Ricky.jpg"],
    investors: 12,
  };

  const commentDetails = [
    {
      userName: "User Name",
      userIconURL:
        "//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80",
      commentText: "Nice project! I will be funding it.",
    },
    {
      userName: "Other User",
      userIconURL:
        "//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80",
      commentText: "Bad project. I will not be funding it.",
    },
  ];

  return (
    <>
      <SingleProjectInfo projectDetails={projectDetails} />

      <Heading
        className="comment_title"
        margin={{
          top: "xlarge",
        }}
        textAlign="center"
        fill={true}
      >
        Comments
      </Heading>

      <Box margin={{ horizontal: "25rem" }} height="small">
        <TextArea
          placeholder="Leave a comment."
          resize={false}
          fill={true}
          size="medium"
          onChange={(event) => setComment(event.target.value)}
        />
        <Button
          primary
          label="Post comment"
          alignSelf="end"
          margin={{ top: "1.5rem" }}
          onClick={(event) => submitComment(event)}
        />
      </Box>

      {commentDetails.map((comment, index) => {
        return (
          <Comment
            key={index}
            userName={comment.userName}
            userIconURL={comment.userIconURL}
            commentText={comment.commentText}
          />
        );
      })}
    </>
  );
};

export default Project;
