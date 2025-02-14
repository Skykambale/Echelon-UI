import "./root-layout.css";
import Navbar from "../../components/Navbar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="root-container bg-zinc-950 text-zinc-300">
      <header className="root-header h-[60px]">
        <h1 className="flex items-center py-2 px-4 text-3xl text-zinc-300">
          Lumina
        </h1>
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
  );
};

export default RootLayout;
