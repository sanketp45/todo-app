import type { Meta, StoryObj } from "@storybook/react-vite";
import { ProgressPill } from "./ProgressPill";

// Figma: ProgressPill component (node 1383:7646)

const meta = {
  title: "Components/ProgressPill",
  component: ProgressPill,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/imyA6YjRkHdPzvWS0au9wA/Practice?node-id=1383-7646',
    },
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    completed: { control: { type: "number", min: 0 } },
    total: { control: { type: "number", min: 1 } },
    emoji: { control: "text" },
  },
  args: {
    completed: 2,
    total: 8,
    emoji: "🎉",
  },
} satisfies Meta<typeof ProgressPill>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllDone: Story = {
  args: { completed: 8, total: 8, emoji: "✅" },
};

export const Empty: Story = {
  args: { completed: 0, total: 5, emoji: "📋" },
};
