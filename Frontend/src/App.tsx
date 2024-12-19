import React from "react";
import Button from "./components/ui/Button";
import ShareIcon from "./components/icons/ShareIcon";
import AddIcon from "./components/icons/AddIcon";

const App = () => {
  return (
    <>
      <div className="flex justify-between items-center">
        <h1>All Notes</h1>
        <div className="flex items-center gap-4">
          <Button
            variant="secondary"
            size="sm"
            text="Share Brain"
            startIcon={<ShareIcon size="md" />}
          />

          <Button
            variant="primary"
            size="sm"
            text="Add Content"
            startIcon={<AddIcon size="md" />}
          />
        </div>
      </div>
    </>
  );
};

export default App;
