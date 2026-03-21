import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { FAB } from "./FAB";

const meta = {
  title: "Components/FAB",
  component: FAB,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/imyA6YjRkHdPzvWS0au9wA/Practice?node-id=1384-7655',
    },
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    onClick: fn(),
    "aria-label": "Add task",
  },
} satisfies Meta<typeof FAB>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithCustomLabel: Story = {
  args: { "aria-label": "Create new item" },
};
