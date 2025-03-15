import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsStars } from "react-icons/bs";
import { FaChartSimple } from "react-icons/fa6";
import { FaTasks } from "react-icons/fa";
import { UserButton } from "@clerk/clerk-react";

const navOptions = [
  { label: "Visualize", path: "/visualize", icon: <FaChartSimple size={24} /> },
  { label: "Tasks", path: "/", icon: <FaTasks /> },
  { label: "AI", path: "/ai", icon: <BsStars /> },
];

const Navbar = () => {
  const [selectedTab, setSelectedTab] = useState("/");
  const navigate = useNavigate();
  const [showTabLabel, setShowTabLabel] = useState(true);

  const handleNavLinkClick = (tab) => {
    setSelectedTab(tab);
    navigate(tab);
  };

  useEffect(() => {
    if (window.innerWidth <= 768) {
      console.log("Mobile device detected");
      setShowTabLabel(false);
    }
  }, []);
  return (
    <div className="h-full flex flex-col justify-between py-2">
      {/* Header */}
      <h1 className="flex items-center py-2 px-4 text-3xl text-zinc-300">
        Echelon
      </h1>

      {/* Nav links */}
      <div className="w-full h-full flex flex-col justify-center px-3">
        <ul className="text-xl  text-zinc-500">
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

      {/* User button */}
      <div className="pl-4 p-2 ">
        <UserButton />
      </div>
    </div>
  );
};

export default Navbar;
