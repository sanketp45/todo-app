import type { Meta, StoryObj } from "@storybook/react-vite";
import { SectionHeader } from "./SectionHeader";

// Figma: SectionHeader component (node 1384:7649)

const meta = {
  title: "Components/SectionHeader",
  component: SectionHeader,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/imyA6YjRkHdPzvWS0au9wA?node-id=1384-7649',
    },
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    emoji: { control: "text" },
  },
  args: {
    label: "MORNING (3)",
    emoji: "🌅",
  },
} satisfies Meta<typeof SectionHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Morning: Story = {};

export const Afternoon: Story = {
  args: { label: "AFTERNOON (2)", emoji: "☀️" },
};

export const Evening: Story = {
  args: { label: "EVENING (1)", emoji: "🌙" },
};

export const AllSections: Story = {
  name: "Overview / All Sections",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <SectionHeader label="MORNING (3)" emoji="🌅" />
      <SectionHeader label="AFTERNOON (2)" emoji="☀️" />
      <SectionHeader label="EVENING (1)" emoji="🌙" />
    </div>
  ),
};
