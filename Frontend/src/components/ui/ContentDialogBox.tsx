import { FC, MouseEvent, useRef, useState } from "react";
import CloseIcon from "../icons/CloseIcon";
import Input from "./Input";
import Button from "./Button";
import axios from "axios";

interface ContentDialogBoxProps {
  open: boolean;
  onClose: () => void;
}

const ContentDialogBox: FC<ContentDialogBoxProps> = ({ open, onClose }) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const typeRef = useRef<HTMLSelectElement>(null);
  const [tags, setTags] = useState<string[]>([]); // Tags as an array
  const [currentTag, setCurrentTag] = useState<string>(""); // Current tag input

  if (!open) {
    return null;
  }

  const handleOverlayClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleAddContent = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_LOCALHOST}/api/v1/content/create`,
        {
          title: titleRef.current?.value,
          typeOfContent: typeRef.current?.value,
          link: linkRef.current?.value,
          tags,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      console.log(
        titleRef.current?.value,
        typeRef.current?.value,
        linkRef.current?.value,
        tags
      );

      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags((prevTags) => [...prevTags, currentTag.trim()]);
      setCurrentTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags((prevTags) => prevTags.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <div className="bg-white rounded shadow-lg w-96 p-6 relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <CloseIcon size="sm" />
        </button>
        <h2 className="text-lg font-bold mb-4 text-center">Add Content</h2>
        <div className="flex flex-col items-center">
          <Input
            className="outline-mypurple-600"
            reference={titleRef}
            placeholder="Title"
          />
          <select
            ref={typeRef}
            className="outline-mypurple-600 w-full px-1 py-2 text-black bg-white border rounded my-2"
          >
            <option className="text-black" value="article">
              Article
            </option>
            <option className="text-black" value="tweet">
              Twitter
            </option>
            <option className="text-black" value="youtube">
              Youtube
            </option>
            <option className="text-black" value="link">
              Link
            </option>
          </select>
          <Input
            className="outline-mypurple-600"
            reference={linkRef}
            placeholder="Link/Text"
          />

        
          <div className="w-full mt-2">
            <label className="block text-sm font-medium text-gray-700">
              Tags
            </label>
            <div className="flex flex-wrap items-center gap-2 my-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-mypurple-600 text-white px-2 py-1 rounded-full text-sm flex items-center"
                >
                  {tag}
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyPress={handleKeyPress}
                className="outline-mypurple-600 w-full px-2 py-1 border rounded"
                placeholder="Add a tag and press Enter"
              />
              <button
                onClick={handleAddTag}
                className="px-4 py-2 bg-mypurple-600 text-white rounded hover:bg-mypurple-500"
              >
                Add
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <Button
            onClick={handleAddContent}
            size="md"
            variant="primary"
            text="Submit"
          />
        </div>
      </div>
    </div>
  );
};

export default ContentDialogBox;
