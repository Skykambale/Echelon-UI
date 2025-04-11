import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BsStars } from "react-icons/bs";
import { FaChartSimple } from "react-icons/fa6";
import { FaTasks, FaFire } from "react-icons/fa";
import { useAuth, UserButton } from "@clerk/clerk-react";
import PropTypes from "prop-types";
import { useRestSecurityClient } from "@/app/hooks/securityClient";
const navOptions = [
	{ label: "Visualize", path: "/visualize", icon: <FaChartSimple size={24} /> },
	{ label: "Tasks", path: "/", icon: <FaTasks /> },
	{ label: "AI", path: "/ai", icon: <BsStars /> },
];

const Navbar = ({ isMobileView }) => {
	const [selectedTab, setSelectedTab] = useState("/");
	const [streak, setStreak] = useState(0);
	const restClient = useRestSecurityClient();
	const navigate = useNavigate();
	const auth = useAuth();
	const location = useLocation();

	const handleNavLinkClick = (tab) => {
		setSelectedTab(tab);
		navigate(tab);
	};

	const getStreak = async () => {
		const userId = auth.userId;
		const response = await restClient.get("/day/streak?userId=" + userId);
		setStreak(response?.result?.streak || 0);
	};

	useEffect(() => {
		setSelectedTab(location.pathname);
	}, [location.pathname]);

	useEffect(() => {
		getStreak();
	}, []);

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
			<div className="px-1 flex flex-col items-start gap-6">
				<div className="flex flex-col lg:flex-row items-center gap-2">
					<FaFire className="text-red-500 " size={26} />
					<span>{streak}</span>
				</div>
				<UserButton />
			</div>
		</div>
	);
};

Navbar.propTypes = {
	isMobileView: PropTypes.bool.isRequired,
};

export default Navbar;
