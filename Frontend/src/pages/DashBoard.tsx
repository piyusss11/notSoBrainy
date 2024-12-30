import { useState } from "react";
import Button from "../components/ui/Button";
import ShareIcon from "../components/icons/ShareIcon";
import AddIcon from "../components/icons/AddIcon";
import Card from "../components/ui/Card";
import ContentDialogBox from "../components/ui/ContentDialogBox";
import SideBar from "../components/ui/SideBar";
import useContent from "../hooks/useContent";

const DashBoard = () => {
  const [contentBoxOpen, setContentBoxOpen] = useState(false);
  const myContents = useContent();
  const lorem =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum exercitationem laborum dolor explicabo quas eaque quo dicta placeat! Veniam, hic eum inventore sapiente ducimus voluptas";
  return (
    <>
      <SideBar />
      <div className="p-10 min-h-screen md:ml-72 bg-gray-100">
        <ContentDialogBox
          open={contentBoxOpen}
          onClose={() => setContentBoxOpen(false)}
        />
        <div className="flex justify-between items-center">
          <h1 className=" md:text-3xl">All Notes</h1>
          <div className="flex items-center gap-4">
            <Button
              variant="secondary"
              size="sm"
              text="Share Brain"
              startIcon={<ShareIcon size="sm" />}
            />

            <Button
              variant="primary"
              size="sm"
              text="Add Content"
              startIcon={<AddIcon size="sm" />}
              onClick={() => {
                setContentBoxOpen(true);
              }}
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-4 mt-4 justify-center md:justify-normal">
          <Card
            contentType="article"
            title="Project Ideas"
            tags={["react", "nextjs", "tailwind", "GSap", "faasfasfasf"]}
            date="28/12/24"
            content={lorem}
          />
          <Card
            contentType="youtube"
            title="firstVideo"
            tags={["react", "nextjs", "tailwind", "GSap", "faasfasfasf"]}
            date="28/12/24"
            content="https://www.youtube.com/watch?v=x1TwQWWSedw"
          />
          <Card
            contentType="twitter"
            title="first tweet"
            tags={["react", "nextjs", "tailwind", "GSap", "faasfasfasf"]}
            date="28/12/24"
            content="https://x.com/piyusss11/status/1870073317937549501"
          />
        </div>
      </div>
    </>
  );
};

export default DashBoard;
