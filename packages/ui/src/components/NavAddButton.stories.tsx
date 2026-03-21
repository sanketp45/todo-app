import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { NavAddButton } from "./NavAddButton";

// Figma: NavAddButton component (node 1384:7657)
// Top-nav "+" button — 38×38 circle, purple "+"

const meta = {
  title: "Components/NavAddButton",
  component: NavAddButton,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/imyA6YjRkHdPzvWS0au9wA?node-id=1384-7657',
    },
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    onClick: fn(),
    "aria-label": "Add task",
  },
} satisfies Meta<typeof NavAddButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
