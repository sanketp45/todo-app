import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { useState } from "react";
import { TabItem, TabBar } from "./TabItem";

// States sourced from Figma "TabItem" component set (node 1309:6556):
// Active | Inactive
//
// Designed for use on primary blue (#5B68D8) header background.

const meta = {
  title: "Components/TabItem",
  component: TabItem,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "blue",
      values: [
        { name: "blue", value: "#5B68D8" },
        { name: "light", value: "#F5F5F6" },
      ],
    },
  },
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    active: { control: "boolean" },
  },
  args: {
    label: "Pending",
    active: false,
    onClick: fn(),
  },
} satisfies Meta<typeof TabItem>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── States ────────────────────────────────────────────────────────────────

/** Active — white pill background, primary blue text */
export const Active: Story = {
  args: { active: true, label: "Pending" },
};

/** Inactive — transparent background, white 75% text */
export const Inactive: Story = {
  args: { active: false, label: "Completed" },
};

// ── TabBar ────────────────────────────────────────────────────────────────

export const TabBarDefault: Story = {
  name: "TabBar / Pending active (default)",
  parameters: { controls: { disable: true } },
  render: () => {
    const [active, setActive] = useState("pending");
    return (
      <div style={{ width: "343px" }}>
        <TabBar
          tabs={[
            { id: "pending", label: "Pending" },
            { id: "completed", label: "Completed" },
            { id: "overdue", label: "Overdue" },
          ]}
          activeTab={active}
          onTabChange={setActive}
        />
      </div>
    );
  },
};

export const TabBarCompleted: Story = {
  name: "TabBar / Completed active",
  parameters: { controls: { disable: true } },
  render: () => {
    const [active, setActive] = useState("completed");
    return (
      <div style={{ width: "343px" }}>
        <TabBar
          tabs={[
            { id: "pending", label: "Pending" },
            { id: "completed", label: "Completed" },
            { id: "overdue", label: "Overdue" },
          ]}
          activeTab={active}
          onTabChange={setActive}
        />
      </div>
    );
  },
};

// ── Overview ──────────────────────────────────────────────────────────────

export const AllStates: Story = {
  name: "Overview / All States",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: "8px" }}>
      <TabItem label="Active" active={true} onClick={fn()} />
      <TabItem label="Inactive" active={false} onClick={fn()} />
    </div>
  ),
};
