"use client";

import { type ReactElement } from "react";

import LayoutContextProvider from "~/app/(with-dashboard-layout)/components/layout-context-provider";
import Sidebar from "~/app/(with-dashboard-layout)/components/sidebar";
import Topbar from "~/app/(with-dashboard-layout)/components/topbar";

const Layout = ({ children }: { children: ReactElement }) => {
  return (
    <LayoutContextProvider>
      <div className={"relative flex min-h-screen flex-col"}>
        <Topbar />
        <div className={"flex max-h-[calc(100vh-4.2rem)] flex-1"}>
          <Sidebar />
          <div id={"content"} className={"relative flex-1 overflow-auto"}>
            {children}
          </div>
        </div>
      </div>
    </LayoutContextProvider>
  );
};

export default Layout;
