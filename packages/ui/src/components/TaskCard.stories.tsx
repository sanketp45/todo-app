import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { TaskCard } from "./TaskCard";

// Figma: "Task Card" component set (node 1364:6655)
// State: Default | Completed
// Layout: Icon (48×48) + Content (title + time) + Checkbox (24×24 circle)

const meta = {
  title: "Components/TaskCard",
  component: TaskCard,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/imyA6YjRkHdPzvWS0au9wA/Practice?node-id=1364-6655',
    },
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    time: { control: "text" },
    completed: { control: "boolean" },
    icon: {
      control: "select",
      options: ["office", "reading", "water", "morning", "meeting", "break"],
    },
  },
  args: {
    title: "Booking Office Cab",
    time: "09:10 AM",
    icon: "office",
    completed: false,
    onToggle: fn(),
  },
} satisfies Meta<typeof TaskCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Completed: Story = {
  args: { completed: true },
};

export const AllIcons: Story = {
  name: "Overview / All Icons",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px", width: "360px" }}>
      {(["office", "reading", "water", "morning", "meeting", "break"] as const).map((icon) => (
        <TaskCard
          key={icon}
          title={icon.charAt(0).toUpperCase() + icon.slice(1)}
          time="09:10 AM"
          icon={icon}
        />
      ))}
    </div>
  ),
};

export const AllStates: Story = {
  name: "Overview / All States",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px", width: "360px" }}>
      <TaskCard title="Booking Office Cab" time="09:10 AM" icon="office" completed={false} />
      <TaskCard title="Booking Office Cab" time="09:10 AM" icon="reading" completed={true} />
    </div>
  ),
};
