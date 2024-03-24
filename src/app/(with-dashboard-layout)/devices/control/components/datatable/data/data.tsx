import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  RadiobuttonIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";

export const labels = [
  {
    value: "appliance",
    label: "Appliance",
  },
  {
    value: "sensor",
    label: "Sensor",
  },
  {
    value: "type_1",
    label: "Type 1",
  },
  {
    value: "type_2",
    label: "Type 2",
  },
  {
    value: "heating",
    label: "Heating",
  },
  {
    value: "cooling",
    label: "Cooling",
  },
  {
    value: "other",
    label: "Other",
  },
];

export const statuses = [
  {
    value: "active",
    label: "Active",
    icon: RadiobuttonIcon,
  },
  {
    value: "inactive",
    label: "Inactive",
    icon: CircleIcon,
  },
];

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDownIcon,
  },
  {
    label: "Medium",
    value: "medium",
    icon: ArrowRightIcon,
  },
  {
    label: "High",
    value: "high",
    icon: ArrowUpIcon,
  },
];
