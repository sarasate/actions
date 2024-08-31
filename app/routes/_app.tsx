import { Outlet } from "react-router-dom";

export default function BaseLayout() {
  return (
    <div className="h-screen w-full">
      <div className="navbar">
        <a href="/" className="btn btn-ghost">
          aCTiONS
        </a>
      </div>
      <Outlet />
    </div>
  );
}
