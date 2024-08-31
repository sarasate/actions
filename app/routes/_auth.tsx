import { Outlet } from "@remix-run/react";

export function PublicLayout() {
  return (
    <div className="h-screen w-full ">
      <Outlet />
    </div>
  );
}
