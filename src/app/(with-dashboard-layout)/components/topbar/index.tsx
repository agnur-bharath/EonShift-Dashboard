import { ThemeToggleButton } from "~/shared/custom";
import { Button } from "~/shared/shadcn/ui/button";

import TopbarFacilitySelector from "~/app/(with-dashboard-layout)/components/topbar/components/topbar-facility-selector";
import { UserBadgeNav } from "~/app/(with-dashboard-layout)/components/topbar/components/user-badge-nav";

import { Icons } from "~/lib/icons";

const TopBar = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background shadow-sm">
      <div className="flex h-16 items-center px-4 sm:justify-between sm:space-x-0 sm:px-[1rem]">
        <Button variant={"outline"} size={"icon"} className={"mr-2 xl:hidden"}>
          <Icons.menu className={"h-4 w-4"} />
        </Button>
        <div className={"flex flex-row items-center gap-2"}>
          <h3
            className={
              "text-xl font-black leading-none tracking-tight lg:text-3xl text-primary mr-4"
            }
          >
            EonShift
          </h3>
          <TopbarFacilitySelector />
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center gap-4">
            <ThemeToggleButton />
            <UserBadgeNav />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
