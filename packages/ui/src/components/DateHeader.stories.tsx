import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { DateHeader } from "./DateHeader";

// Figma: DateHeader component (node 1384:7659)
// Navigation header with day name, date string, and prev/next arrows

const meta = {
  title: "Components/DateHeader",
  component: DateHeader,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    dayName: { control: "text" },
    dateStr: { control: "text" },
  },
  args: {
    dayName: "Thursday",
    dateStr: "January 15th, 2026",
    onPrev: fn(),
    onNext: fn(),
  },
} satisfies Meta<typeof DateHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Weekend: Story = {
  args: {
    dayName: "Saturday",
    dateStr: "March 15th, 2026",
  },
};
