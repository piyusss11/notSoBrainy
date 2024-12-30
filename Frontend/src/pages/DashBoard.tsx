import { useState } from "react";
import Button from "../components/ui/Button";
import ShareIcon from "../components/icons/ShareIcon";
import AddIcon from "../components/icons/AddIcon";
import Card from "../components/ui/Card";
import ContentDialogBox from "../components/ui/ContentDialogBox";
import SideBar from "../components/ui/SideBar";
import useContent from "../hooks/useContent";
import { MyContent } from "../types/myTypes";

const DashBoard = () => {
  const [contentBoxOpen, setContentBoxOpen] = useState(false);
  const myContents = useContent();
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
          {myContents && myContents.map((content: MyContent) => (
            <Card
              key={content?._id}
              id ={content?._id}
              typeOfContent={content?.typeOfContent}
              title={content?.title}
              tags={content?.tags}
              createdAt={content?.createdAt}
              link={content?.link}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default DashBoard;
