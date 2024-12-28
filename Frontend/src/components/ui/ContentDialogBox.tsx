import { FC, MouseEvent } from "react";
import CloseIcon from "../icons/CloseIcon";
import Input from "./Input";
import Button from "./Button";

interface ContentDialogBoxProps {
  open: boolean;
  onClose: () => void;
}

const ContentDialogBox: FC<ContentDialogBoxProps> = ({ open, onClose }) => {
  if (!open) {
    return null;
  }
  const handleOverlayClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
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
          <Input placeholder="Title" />
          <select
            className="w-full px-1 py-2 text-gray-400 bg-white border rounded my-2"
            name=""
            id=""
          >
            <option className="text-black" value="article">Article</option>
            <option className="text-black" value="twitter">Twitter</option>
            <option className="text-black" value="youtube">Youtube</option>
          </select>
          <Input placeholder="Link" />
        </div>
        <div className="flex justify-center mt-4">
          <Button size="md" variant="primary" text="Submit" />
        </div>
      </div>
    </div>
  );
};

export default ContentDialogBox;
