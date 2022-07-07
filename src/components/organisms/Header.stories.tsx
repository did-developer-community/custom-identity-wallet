import { Meta, Story } from "@storybook/react/types-6-0";

import { Header as Component } from "./Header";

export default {
  title: "Organisms/Header",
  component: Component,
} as Meta;

const Template: Story = (args) => <Component {...args} />;

export const Header = Template.bind({});
