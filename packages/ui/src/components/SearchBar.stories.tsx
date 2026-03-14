import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { useState } from "react";
import { SearchBar } from "./SearchBar";

// States sourced from Figma "SearchBar" component set (node 1309:6551):
// Default | Focused | Active

const meta = {
  title: "Components/SearchBar",
  component: SearchBar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: "343px" }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    placeholder: { control: "text" },
    value: { control: "text" },
  },
  args: {
    placeholder: "Search a task...",
    onClear: fn(),
  },
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── States (maps 1-to-1 to Figma variants) ────────────────────────────────

/** Default — empty input, grey border, muted icon */
export const Default: Story = {
  args: { value: "" },
};

/** Focused — primary border, primary icon (click into the input to see) */
export const Focused: Story = {
  args: { value: "", autoFocus: true },
};

/** Active — has a value, clear × button visible */
export const Active: Story = {
  args: { value: "Design new landing page" },
};

// ── Interactive ───────────────────────────────────────────────────────────

export const Interactive: Story = {
  name: "Interactive (controlled)",
  parameters: { controls: { disable: true } },
  render: () => {
    const [value, setValue] = useState("");
    return (
      <div style={{ width: "343px" }}>
        <SearchBar
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onClear={() => setValue("")}
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
    <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "343px" }}>
      <div>
        <p style={{ fontSize: "11px", color: "#757575", margin: "0 0 4px" }}>Default</p>
        <SearchBar value="" onChange={fn()} />
      </div>
      <div>
        <p style={{ fontSize: "11px", color: "#757575", margin: "0 0 4px" }}>Active (has value)</p>
        <SearchBar value="Design new landing page" onChange={fn()} onClear={fn()} />
      </div>
    </div>
  ),
};
