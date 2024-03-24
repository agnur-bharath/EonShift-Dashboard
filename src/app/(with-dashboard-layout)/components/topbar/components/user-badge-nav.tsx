import { useRouter } from "next/navigation";

import { signOut } from "firebase/auth";
import { useUser } from "reactfire";

import { Avatar, AvatarFallback, AvatarImage } from "~/shared/shadcn/ui/avatar";
import { Button } from "~/shared/shadcn/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "~/shared/shadcn/ui/dropdown-menu";
import { Skeleton } from "~/shared/shadcn/ui/skeleton";

import { auth } from "~/lib/firebase";

const getInitials = (name: string) => {
  const [firstName, lastName] = name.split(" ");
  return `${firstName?.[0]}${lastName?.[0]}`;
};

export function UserBadgeNav() {
  const router = useRouter();

  const { data: user, status } = useUser();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        router.push("/");
      })
      .catch((error) => {
        console.error(error);
        console.log("Error signing out");
      });
  };

  if (status === "loading") {
    return <Skeleton className="h-24 w-24 rounded-full" />;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-9 w-9 cursor-pointer hover:border-primary/75 duration:300 hover:border-2">
            <AvatarImage src="/avatars/01.png" alt="@shadcn" />
            <AvatarFallback>
              {getInitials(user?.displayName ?? "User")}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56"
        align="end"
        forceMount
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium leading-none">
              {user?.displayName}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              router.push("/settings");
            }}
          >
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              router.push("/settings-configuration/system");
            }}
          >
            Configuration
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              router.push("/settings");
            }}
          >
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
