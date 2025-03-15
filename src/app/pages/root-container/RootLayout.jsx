import "./root-layout.css";
import Navbar from "../../components/Navbar";
import { Outlet } from "react-router-dom";
import { SignedIn, useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";

const RootLayout = () => {
  const user = useUser();
  console.log(user);
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    if (window.innerWidth <= 768) {
      console.log("Mobile device detected");
      setIsMobileView(true);
    }
  }, []);

  return (
    <SignedIn>
      <div className="root-container bg-zinc-950 text-zinc-300">
        <div className="root-content flex">
          <aside
            className={`main-side-panel ${
              isMobileView ? "w-[12%]" : "w-[145px]"
            }`}
          >
            <Navbar isMobileView={isMobileView} />
          </aside>

          <main
            className={`main-content-container ${
              isMobileView ? "w-[86%]" : "w-full"
            }`}
          >
            <Outlet />
          </main>
        </div>
      </div>
    </SignedIn>
  );
};

export default RootLayout;
