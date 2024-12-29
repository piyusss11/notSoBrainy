import React from "react";
import ArticleIcon from "../icons/ArticleIcon";
import YoutubeIcon from "../icons/YoutubeIcon";
import TwitterIcon from "../icons/TwitterIcon";

const SideBarItems = () => {
  return (
    <div className="flex md:flex-col mt-4 gap-8 p-4 justify-center border-t-2 md:border-none border-mypurple-600">
      <div className="flex items-center gap-2 cursor-pointer hover:scale-110 duration-300 ">
        <ArticleIcon size="md" />
        Article
      </div>
      <div className="flex items-center gap-2 cursor-pointer hover:scale-110 duration-300 ">
        <YoutubeIcon size="md" />
        Videos
      </div>
      <div className="flex items-center gap-2 cursor-pointer hover:scale-110 duration-300 ">
        <TwitterIcon size="md" />
        Tweets
      </div>
    </div>
  );
};

export default SideBarItems;
