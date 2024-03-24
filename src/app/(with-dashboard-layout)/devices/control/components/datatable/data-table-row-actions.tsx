"use client";

import { useMemo } from "react";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { type Row } from "@tanstack/react-table";
import { doc, setDoc } from "firebase/firestore";
import { useSelector } from "react-redux";

import { Button } from "~/shared/shadcn/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "~/shared/shadcn/ui/dropdown-menu";

import { labels } from "~/app/(with-dashboard-layout)/devices/control/components/datatable/data/data";
import { deviceSchema } from "~/app/(with-dashboard-layout)/devices/control/components/datatable/data/schema";

import { db } from "~/lib/firebase";
import { type RootState } from "~/redux/store";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const { id: facilityId } = useSelector((state: RootState) => state.facility);

  const task = deviceSchema.parse(row.original);

  const docRef = useMemo(() => {
    return doc(db, "facilities", facilityId, "devices", task.id);
  }, [facilityId]);

  const handlePinDevice = async () => {
    await setDoc(docRef, { pinned: true }, { merge: true });
    // console.log("Pin device", deviceId);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem
          onClick={async (event) => {
            event.stopPropagation();
            await handlePinDevice();
          }}
        >
          Pin
        </DropdownMenuItem>
        {/*<DropdownMenuItem>Make a copy</DropdownMenuItem>*/}
        {/*<DropdownMenuItem>Favorite</DropdownMenuItem>*/}
        {/*<DropdownMenuSeparator />*/}
        {/*<DropdownMenuSub>*/}
        {/*  <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>*/}
        {/*  <DropdownMenuSubContent>*/}
        {/*    <DropdownMenuRadioGroup value={task.label}>*/}
        {/*      {labels.map((label) => (*/}
        {/*        <DropdownMenuRadioItem key={label.value} value={label.value}>*/}
        {/*          {label.label}*/}
        {/*        </DropdownMenuRadioItem>*/}
        {/*      ))}*/}
        {/*    </DropdownMenuRadioGroup>*/}
        {/*  </DropdownMenuSubContent>*/}
        {/*</DropdownMenuSub>*/}
        {/*<DropdownMenuSeparator />*/}
        {/*<DropdownMenuItem>*/}
        {/*  Delete*/}
        {/*  <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>*/}
        {/*</DropdownMenuItem>*/}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
