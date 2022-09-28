import { Meta, Story } from "@storybook/react/types-6-0";

import { RedirectTemplate as Component } from "./Redirect";

export default {
  title: "Template/Redirect",
  component: Component,
} as Meta;

const Template: Story = (args) => <Component {...args} />;

export const Redirect = Template.bind({});
