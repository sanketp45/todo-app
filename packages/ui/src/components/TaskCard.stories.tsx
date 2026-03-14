import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { TaskCard } from "./TaskCard";

// States sourced from Figma "Task Card" component set (node 1289:18510):
// Default | Completed
//
// Updated design: Badge now absolute top-right, align-items center,
// Completed badge → variant="success", label="Success"

const meta = {
  title: "Components/TaskCard",
  component: TaskCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    dueDate: { control: "text" },
    completed: {
      control: "boolean",
      description:
        "Drives Completed state: checkbox checked, title muted + strikethrough, badge → success 'Success'",
    },
    badgeLabel: {
      control: "text",
      description: "Badge label shown when not completed",
    },
    badgeVariant: {
      control: "select",
      options: ["default", "success", "destructive", "outline"],
      description: "Badge variant shown when not completed",
    },
  },
  args: {
    title: "Buy groceries for the week",
    dueDate: "Dec 25, 2024",
    completed: false,
    badgeLabel: "High",
    badgeVariant: "outline",
    onToggle: fn(),
    onDelete: fn(),
  },
} satisfies Meta<typeof TaskCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── States (maps 1-to-1 to Figma variants) ────────────────────────────────

/** Default — unchecked checkbox, dark title, "High" outline badge (top-right) */
export const Default: Story = {};

/** Completed — checked checkbox, muted strikethrough title, "Success" badge (top-right) */
export const Completed: Story = {
  args: { completed: true },
};

// ── Badge variant permutations ────────────────────────────────────────────

export const BadgeOutline: Story = {
  name: "Badge / High (outline)",
  args: { badgeLabel: "High", badgeVariant: "outline" },
};

export const BadgeDestructive: Story = {
  name: "Badge / Urgent (destructive)",
  args: { badgeLabel: "Urgent", badgeVariant: "destructive" },
};

export const BadgeSuccess: Story = {
  name: "Badge / Low (success)",
  args: { badgeLabel: "Low", badgeVariant: "success" },
};

export const BadgeDefault: Story = {
  name: "Badge / Normal (default)",
  args: { badgeLabel: "Normal", badgeVariant: "default" },
};

// ── Edge cases ────────────────────────────────────────────────────────────

export const NoDueDate: Story = {
  name: "No Due Date",
  args: { dueDate: undefined },
};

export const LongTitle: Story = {
  name: "Long Title",
  args: {
    title: "Prepare quarterly financial report and send it to all stakeholders",
  },
};

// ── Overview ──────────────────────────────────────────────────────────────

export const AllStates: Story = {
  name: "Overview / All States",
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "360px" }}>
      <TaskCard
        {...args}
        completed={false}
        title="Buy groceries for the week"
        dueDate="Dec 25, 2024"
        badgeLabel="High"
        badgeVariant="outline"
      />
      <TaskCard
        {...args}
        completed={true}
        title="Buy groceries for the week"
        dueDate="Dec 25, 2024"
      />
    </div>
  ),
};

export const TaskList: Story = {
  name: "Overview / Task List",
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px", width: "360px" }}>
      <TaskCard
        {...args}
        title="Buy groceries for the week"
        dueDate="Dec 25, 2024"
        badgeLabel="Urgent"
        badgeVariant="destructive"
      />
      <TaskCard
        {...args}
        title="Schedule dentist appointment"
        dueDate="Jan 3, 2025"
        badgeLabel="High"
        badgeVariant="outline"
      />
      <TaskCard
        {...args}
        title="Read 'Atomic Habits'"
        dueDate="Jan 10, 2025"
        badgeLabel="Low"
        badgeVariant="success"
      />
      <TaskCard
        {...args}
        completed={true}
        title="Submit expense report"
        dueDate="Dec 20, 2024"
      />
    </div>
  ),
};
