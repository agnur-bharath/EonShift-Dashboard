import { type ReactElement } from "react";

import { CheckAuthProvider } from "~/providers";
import { TooltipProvider } from "~/shared/shadcn/ui/tooltip";

import CheckSelectedFacility from "~/app/(with-dashboard-layout)/components/check-selected-facility";
import Layout from "~/app/(with-dashboard-layout)/components/layout";

export default function WithDashboardLayout({
  children,
}: {
  children: ReactElement;
}) {
  return (
    <CheckAuthProvider>
      <TooltipProvider>
        <CheckSelectedFacility>
          <Layout>{children}</Layout>
        </CheckSelectedFacility>
      </TooltipProvider>
    </CheckAuthProvider>
  );
}
