import { Meta, Story } from "@storybook/react/types-6-0";

import { ScannerTemplate as Component } from "./Scanner";

export default {
  title: "Templates/Scanner",
  component: Component,
} as Meta;

const Template: Story = (args) => <Component {...args} />;

export const Scanner = Template.bind({});
