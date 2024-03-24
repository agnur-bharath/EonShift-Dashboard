"use client";

import * as React from "react";
import { useState } from "react";

import { Cross2Icon } from "@radix-ui/react-icons";
import { type Table } from "@tanstack/react-table";

import { Button } from "~/shared/shadcn/ui/button";
import { Input } from "~/shared/shadcn/ui/input";

import {
  priorities,
  statuses,
} from "~/app/(with-dashboard-layout)/devices/control/components/datatable/data/data";

import { Icons } from "~/lib/icons";

import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { DataTableViewOptions } from "./data-table-view-options";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  toggleAllDevices: (toggleStatus: string) => void;
}

export function DataTableToolbar<TData>({
  table,
  toggleAllDevices,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const [status, setStatus] = useState("inactive");

  const [loadingDeviceId] = useState<string | null>(null);

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter tasks..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        <Button
          size={"sm"}
          onClick={() => {
            setStatus("active");
            toggleAllDevices("active");
          }}
        >
          {/*<Icons.spinner className="h-4 w-4" />*/}
          Turn On All Devices
        </Button>
        <Button
          size={"sm"}
          onClick={() => {
            setStatus("inactive");
            toggleAllDevices("inactive");
          }}
        >
          {/*<Icons.spinner className="h-4 w-4" />*/}
          Turn Off All Devices
        </Button>
        {/*<Button*/}
        {/*  size={"sm"}*/}
        {/*  onClick={() => {*/}
        {/*    if (status === "active") {*/}
        {/*      setStatus("inactive");*/}
        {/*      toggleAllDevices("inactive");*/}
        {/*    } else {*/}
        {/*      setStatus("active");*/}
        {/*      toggleAllDevices("active");*/}
        {/*    }*/}
        {/*  }}*/}
        {/*  disabled={loadingDeviceId !== null}*/}
        {/*>*/}
        {/*  {loadingDeviceId !== null && (*/}
        {/*    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />*/}
        {/*  )}*/}
        {/*  {status === "active" ? "Turn off all devices" : "Turn On All Devices"}*/}
        {/*</Button>{" "}*/}
        {/*<Button*/}
        {/*  size={"sm"}*/}
        {/*  onClick={() => toggleAllDevices("inactive")}*/}
        {/*  disabled={loadingDeviceId !== null}*/}
        {/*>*/}
        {/*  Turn Off All Devices*/}
        {/*</Button>*/}
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        {table.getColumn("priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={priorities}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
