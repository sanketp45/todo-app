import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "./Input";

// Figma: "Input" component set (node 1287:10540)
// States: Default | Focused | Error | Disabled | Multiline | Text area focused | Text area filled

const meta = {
  title: "Components/Input",
  component: Input,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/imyA6YjRkHdPzvWS0au9wA?node-id=1287-10540',
    },
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    helperText: { control: "text" },
    error: { control: "text" },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    multiline: { control: "boolean" },
  },
  args: {
    label: "Label",
    placeholder: "Placeholder text",
    helperText: "Helper text",
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Focused: Story = {
  // eslint-disable-next-line jsx-a11y/no-autofocus
  args: { autoFocus: true },
};

export const Error: Story = {
  args: { error: "This field is required", helperText: undefined },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Multiline: Story = {
  args: { multiline: true, placeholder: "Add notes..." },
};

export const AllStates: Story = {
  name: "Overview / All States",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", width: "343px" }}>
      <Input label="Default" placeholder="Placeholder text" helperText="Helper text" />
      <Input label="Error" placeholder="Placeholder text" error="This field is required" />
      <Input label="Disabled" placeholder="Placeholder text" disabled helperText="Cannot edit" />
      <Input label="Multiline" placeholder="Add notes..." multiline helperText="Supports multiple lines" />
    </div>
  ),
};
