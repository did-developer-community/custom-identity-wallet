import { Meta, Story } from "@storybook/react/types-6-0";

import { HomeTemplate as Component } from "./Home";

export default {
  title: "Templates/Home",
  component: Component,
} as Meta;

const Template: Story = (args) => <Component {...args} />;

export const Home = Template.bind({});
Home.args = {};
