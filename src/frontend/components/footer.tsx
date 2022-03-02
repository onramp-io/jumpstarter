import { Box } from "grommet";
import type { NextPage } from "next";
import home from "../../styles/Home.module.css";

const Footer: NextPage = () => {
  return (
    <Box
      className="footer"
      margin={{
        top: "xlarge",
      }}
    >
      {/**
       * className={home.footer}
       */}
      <footer className={`${home.footer} card`}>Built by Team Blend 😎</footer>
    </Box>
  );
};

export default Footer;
