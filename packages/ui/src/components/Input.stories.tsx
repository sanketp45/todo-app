import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "./Input";

// States sourced directly from Figma "Input" component set (node 1287:10540):
// Default | Focused | Error | Disabled

const meta = {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    helperText: { control: "text" },
    error: { control: "text", description: "Non-empty string triggers Error state" },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
  },
  args: {
    label: "Label",
    placeholder: "Placeholder text",
    helperText: "Helper text",
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── States (maps 1-to-1 to Figma variants) ────────────────────────────────

/** Default — grey border, dark label, muted helper */
export const Default: Story = {};

/** Focused — blue border + label. Use autoFocus to preview in canvas. */
export const Focused: Story = {
  args: {
    // eslint-disable-next-line jsx-a11y/no-autofocus
    autoFocus: true,
  },
};

/** Error — red border, red label, red error message below */
export const Error: Story = {
  args: {
    error: "Error message",
    helperText: undefined,
  },
};

/** Disabled — muted label, grey background, no interaction */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

// ── Filled value ─────────────────────────────────────────────────────────

/** Shows how the field looks with an actual value typed in */
export const WithValue: Story = {
  args: {
    defaultValue: "user@example.com",
  },
};

// ── No label / no helper ──────────────────────────────────────────────────

export const FieldOnly: Story = {
  name: "Field Only (no label, no helper)",
  args: {
    label: undefined,
    helperText: undefined,
  },
};

// ── Overview ─────────────────────────────────────────────────────────────

export const AllStates: Story = {
  name: "Overview / All States",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <Input
        label="Label"
        placeholder="Placeholder text"
        helperText="Helper text"
      />
      <Input
        label="Label"
        placeholder="Placeholder text"
        helperText="Helper text"
        autoFocus
      />
      <Input
        label="Label"
        placeholder="Placeholder text"
        error="Error message"
      />
      <Input
        label="Label"
        placeholder="Placeholder text"
        helperText="Helper text"
        disabled
      />
    </div>
  ),
};
