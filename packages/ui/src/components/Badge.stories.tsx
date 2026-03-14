import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./Badge";

// Variants sourced from Figma "Badge" component set (node 1289:6514):
// Default | Success | Destructive | Outline

const meta = {
  title: "Components/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "success", "destructive", "outline"],
      description: "Visual style — maps to Figma `Variant` property",
      table: {
        defaultValue: { summary: "default" },
      },
    },
    children: { control: "text" },
  },
  args: {
    children: "Badge",
    variant: "default",
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Variants (maps 1-to-1 to Figma) ──────────────────────────────────────

/** Default — #F5F5F6 background, dark text */
export const Default: Story = {
  args: { variant: "default", children: "Default" },
};

/** Success — mint green background (#DCF9E6), dark green text (#16803D) */
export const Success: Story = {
  args: { variant: "success", children: "Success" },
};

/** Destructive — #D32F2F background, white text */
export const Destructive: Story = {
  args: { variant: "destructive", children: "Destructive" },
};

/** Outline — white background, #E0E1E3 border, dark text */
export const Outline: Story = {
  args: { variant: "outline", children: "Outline" },
};

// ── Overview ──────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  name: "Overview / All Variants",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
      <Badge variant="default">Default</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
};

export const CustomLabels: Story = {
  name: "Overview / Custom Labels",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
      <Badge variant="default">Draft</Badge>
      <Badge variant="success">Published</Badge>
      <Badge variant="destructive">Archived</Badge>
      <Badge variant="outline">Pending</Badge>
      <Badge variant="success">Active</Badge>
      <Badge variant="destructive">Overdue</Badge>
    </div>
  ),
};
