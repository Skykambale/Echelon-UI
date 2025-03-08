import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsStars } from "react-icons/bs";
import { FaChartSimple } from "react-icons/fa6";
import { FaTasks } from "react-icons/fa";

const navOptions = [
  { label: "Visualize", path: "/visualize", icon: <FaChartSimple size={24} /> },
  { label: "Tasks", path: "/", icon: <FaTasks /> },
  { label: "AI", path: "/ai", icon: <BsStars /> },
];

const Navbar = () => {
  const [selectedTab, setSelectedTab] = useState("/");
  const navigate = useNavigate();
  const showTabLabel = true;

  const handleNavLinkClick = (tab) => {
    setSelectedTab(tab);
    navigate(tab);
  };
  return (
    <div className="w-full h-full flex flex-col justify-center px-3">
      <ul className="text-2xl  text-zinc-500">
        {navOptions.map((link) => (
          <li
            className={`my-4 py-1 cursor-pointer w-full flex items-center gap-3 ${
              selectedTab === link.path ? "text-zinc-300" : ""
            }`}
            key={link.path}
            onClick={() => handleNavLinkClick(link.path)}
          >
            <p>{link.icon}</p>
            {showTabLabel && <p>{link.label}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
