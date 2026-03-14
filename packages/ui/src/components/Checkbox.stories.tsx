import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Checkbox } from "./Checkbox";

// States sourced from Figma "Checkbox" component set (node 1289:2326):
// Unchecked | Checked | Indeterminate | Disabled

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    checked: { control: "boolean" },
    indeterminate: {
      control: "boolean",
      description:
        "Partial-selection state. Sets the DOM `.indeterminate` property. Visually: primary box with a white dash.",
    },
    disabled: { control: "boolean" },
  },
  args: {
    label: "Checkbox label",
    onChange: fn(),
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── States (maps 1-to-1 to Figma variants) ────────────────────────────────

/** Unchecked — white box, grey border */
export const Unchecked: Story = {
  args: {
    checked: false,
  },
};

/** Checked — primary box, white checkmark (11×8, stroke 1.5) */
export const Checked: Story = {
  args: {
    checked: true,
  },
};

/** Indeterminate — primary box, white dash (10×2, stroke 2) */
export const Indeterminate: Story = {
  args: {
    indeterminate: true,
  },
};

/** Disabled — grey background box, muted label, opacity 0.5 */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

// ── Additional states ──────────────────────────────────────────────────────

/** Disabled + checked */
export const DisabledChecked: Story = {
  name: "Disabled (checked)",
  args: {
    disabled: true,
    checked: true,
  },
};

/** No label — box only */
export const NoLabel: Story = {
  name: "No Label",
  args: {
    label: undefined,
  },
};

// ── Overview ──────────────────────────────────────────────────────────────

export const AllStates: Story = {
  name: "Overview / All States",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Checkbox label="Unchecked" />
      <Checkbox label="Checked" checked defaultChecked />
      <Checkbox label="Indeterminate" indeterminate />
      <Checkbox label="Disabled" disabled />
      <Checkbox label="Disabled (checked)" disabled checked defaultChecked />
    </div>
  ),
};
