import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Button } from "./Button";

// Variants and sizes reflect the Figma "Button" component set exactly:
// Type: Primary | Secondary | Destructive
// Size: SM | MD (no LG variant exists in the Figma file)

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "destructive"],
      description: "Visual style — maps to Figma `Type` property",
      table: {
        defaultValue: { summary: "primary" },
      },
    },
    size: {
      control: "select",
      options: ["sm", "md"],
      description: "Button size — maps to Figma `Size` property",
      table: {
        defaultValue: { summary: "md" },
      },
    },
    disabled: {
      control: "boolean",
    },
    children: {
      control: "text",
    },
  },
  args: {
    onClick: fn(),
    children: "Button",
    variant: "primary",
    size: "md",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Variants ──────────────────────────────────────────────────────────────

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Destructive",
  },
};

// ── Sizes ─────────────────────────────────────────────────────────────────

export const SizeSM: Story = {
  name: "Size / SM",
  args: {
    size: "sm",
    children: "Small",
  },
};

export const SizeMD: Story = {
  name: "Size / MD",
  args: {
    size: "md",
    children: "Medium",
  },
};

// ── States ────────────────────────────────────────────────────────────────

export const Disabled: Story = {
  args: {
    variant: "primary",
    disabled: true,
    children: "Disabled",
  },
};

// ── Overview ──────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  name: "Overview / All Variants",
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
      <Button {...args} variant="primary">Primary</Button>
      <Button {...args} variant="secondary">Secondary</Button>
      <Button {...args} variant="destructive">Destructive</Button>
    </div>
  ),
};

export const AllSizes: Story = {
  name: "Overview / All Sizes",
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
      <Button {...args} size="sm">Small (SM)</Button>
      <Button {...args} size="md">Medium (MD)</Button>
    </div>
  ),
};

export const VariantsBySizes: Story = {
  name: "Overview / Variants × Sizes",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {(["primary", "secondary", "destructive"] as const).map((variant) => (
        <div key={variant} style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <Button variant={variant} size="md">{variant} MD</Button>
          <Button variant={variant} size="sm">{variant} SM</Button>
        </div>
      ))}
    </div>
  ),
};
