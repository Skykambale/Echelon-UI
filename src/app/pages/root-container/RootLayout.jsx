import "./root-layout.css";
import Navbar from "../../components/Navbar";
import { Outlet } from "react-router-dom";
import { SignedIn, UserButton, useUser } from "@clerk/clerk-react";

const RootLayout = () => {
  const user = useUser();
  console.log(user);
  return (
    <SignedIn>
      <div className="root-container bg-zinc-950 text-zinc-300">
        <header className="root-header h-[60px] flex justify-between items-center px-3">
          <h1 className="flex items-center py-2 px-4 text-3xl text-zinc-300">
            Echelon
          </h1>
          <UserButton />
        </header>
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
