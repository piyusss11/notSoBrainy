import BrainIcon from "../icons/BrainIcon";
import SideBarItems from "./SideBarItems";

const SideBar = () => {
  return (
    <div className="md:absolute p-4 w-full md:w-72 md:h-screen bg-white border-r border-gray-200 left-0 top-0">
      <div className="flex items-center gap-2 justify-center md:justify-start">
        <BrainIcon size="lg" />
        <h1 className="text-xl tracking-tighter font-sans">Not so Brainy</h1>
      </div>
      <SideBarItems />
    </div>
  );
};

export default SideBar;
