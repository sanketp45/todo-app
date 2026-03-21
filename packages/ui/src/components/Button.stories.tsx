import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Button } from "./Button";

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/imyA6YjRkHdPzvWS0au9wA?node-id=1287-2346',
    },
    layout: "centered",
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#f5f5f5" },
        { name: "dark",  value: "#1a1a1a" },
      ],
    },
    docs: {
      description: {
        component:
          "3D button — black-only design system. Sora SemiBold + framer-motion press animation. Three variants: **Primary** (dark grey), **Secondary** (medium grey), **Ghost** (white + black border).",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost"],
      description: "Visual style",
      table: { defaultValue: { summary: "primary" } },
    },
    size: {
      control: "select",
      options: ["md", "sm"],
      description: "Button size",
      table: { defaultValue: { summary: "md" } },
    },
    disabled: {
      control: "boolean",
    },
    children: {
      control: "text",
      description: "Button label",
    },
  },
  args: {
    onClick: fn(),
    children: "BUTTON",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Primary ───────────────────────────────────────────────────────────────

export const Primary: Story = {
  args: { variant: "primary", size: "md", children: "GET STARTED" },
};

export const PrimarySmall: Story = {
  name: "Primary / SM",
  args: { variant: "primary", size: "sm", children: "GET STARTED" },
};

// ── Secondary ─────────────────────────────────────────────────────────────

export const Secondary: Story = {
  args: { variant: "secondary", size: "md", children: "LEARN MORE" },
};

export const SecondarySmall: Story = {
  name: "Secondary / SM",
  args: { variant: "secondary", size: "sm", children: "LEARN MORE" },
};

// ── Ghost ─────────────────────────────────────────────────────────────────

export const Ghost: Story = {
  args: { variant: "ghost", size: "md", children: "CANCEL" },
};

export const GhostSmall: Story = {
  name: "Ghost / SM",
  args: { variant: "ghost", size: "sm", children: "CANCEL" },
};

// ── States ────────────────────────────────────────────────────────────────

export const Disabled: Story = {
  args: { variant: "primary", size: "md", children: "DISABLED", disabled: true },
};

export const DisabledSecondary: Story = {
  name: "Disabled / Secondary",
  args: { variant: "secondary", size: "md", children: "DISABLED", disabled: true },
};

export const DisabledGhost: Story = {
  name: "Disabled / Ghost",
  args: { variant: "ghost", size: "md", children: "DISABLED", disabled: true },
};

// ── Overview ──────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  name: "Overview / All Variants",
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
      <Button {...args} variant="primary">Primary</Button>
      <Button {...args} variant="secondary">Secondary</Button>
      <Button {...args} variant="ghost">Ghost</Button>
    </div>
  ),
};

export const AllSizes: Story = {
  name: "Overview / All Sizes",
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <Button {...args} size="md">Medium (MD)</Button>
      <Button {...args} size="sm">Small (SM)</Button>
    </div>
  ),
  args: { variant: "primary" },
};

export const VariantsBySizes: Story = {
  name: "Overview / Variants × Sizes",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {(["primary", "secondary", "ghost"] as const).map((variant) => (
        <div key={variant} style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <Button variant={variant} size="md">{variant} MD</Button>
          <Button variant={variant} size="sm">{variant} SM</Button>
        </div>
      ))}
    </div>
  ),
};

export const AllDisabled: Story = {
  name: "Overview / All Disabled",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
      <Button variant="primary" disabled>Primary</Button>
      <Button variant="secondary" disabled>Secondary</Button>
      <Button variant="ghost" disabled>Ghost</Button>
    </div>
  ),
};
