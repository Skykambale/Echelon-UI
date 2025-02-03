import { useState } from "react";

const navOptions = [
  { label: "Charts", path: "/charts" },
  { label: "Tasks", path: "/" },
  { label: "AI", path: "/ai" },
];

const Navbar = () => {
  const [selectedTab, setSelectedTab] = useState("/");
  const handleNavLinkClick = (tab) => {
    setSelectedTab(tab);
  };
  return (
    <div className="w-full h-full flex flex-col justify-center px-3">
      <ul className="text-2xl text-center text-zinc-500">
        {navOptions.map((link) => (
          <li
            className={`my-4 py-1 cursor-pointer w-full ${
              selectedTab === link.path ? "text-zinc-300 text-3xl" : ""
            }`}
            key={link.path}
            onClick={() => handleNavLinkClick(link.path)}
          >
            {link.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
