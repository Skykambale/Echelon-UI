import "./root-layout.css";
import Navbar from "../../components/Navbar";
import { Outlet } from "react-router-dom";
import { SignedIn, useUser } from "@clerk/clerk-react";

const RootLayout = () => {
  const user = useUser();
  console.log(user);
  return (
    <SignedIn>
      <div className="root-container bg-zinc-950 text-zinc-300">
        <div className="root-content flex">
          <aside className="main-side-panel">
            <Navbar />
          </aside>

          <main className="main-content-container">
            <Outlet />
          </main>
        </div>
      </div>
    </SignedIn>
  );
};

export default RootLayout;
