import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsStars } from "react-icons/bs";
import { FaChartSimple } from "react-icons/fa6";
import { FaTasks } from "react-icons/fa";
import { UserButton } from "@clerk/clerk-react";
import PropTypes from "prop-types";

const navOptions = [
	{ label: "Visualize", path: "/visualize", icon: <FaChartSimple size={24} /> },
	{ label: "Tasks", path: "/", icon: <FaTasks /> },
	{ label: "AI", path: "/ai", icon: <BsStars /> },
];

const Navbar = ({ isMobileView }) => {
	const [selectedTab, setSelectedTab] = useState("/");
	const navigate = useNavigate();

	const handleNavLinkClick = (tab) => {
		setSelectedTab(tab);
		navigate(tab);
	};

	return (
		<div className="h-full flex flex-col justify-between py-4">
			{/* Header */}

			<h1
				className="flex items-center py-2 px-1 text-3xl text-zinc-300 cursor-pointer font-cursive"
				onClick={() => navigate("/")}
			>
				{isMobileView ? "E" : "Echelon"}
			</h1>

			{/* Nav links */}
			<div className="w-full h-full flex flex-col justify-center  px-1">
				<ul className="text-xl  text-zinc-500">
					{navOptions.map((link) => (
						<li
							className={`my-4 py-1 cursor-pointer w-full flex items-center gap-3 ${
								selectedTab === link.path ? "text-zinc-300" : ""
							}`}
							key={link.path}
							onClick={() => handleNavLinkClick(link.path)}
						>
							<p title={link.label}>{link.icon}</p>
							{!isMobileView && <p>{link.label}</p>}
						</li>
					))}
				</ul>
			</div>

			{/* User button */}
			<div className="px-1 ">
				<UserButton />
			</div>
		</div>
	);
};

Navbar.propTypes = {
	isMobileView: PropTypes.bool.isRequired,
};

export default Navbar;
