import { Meta, Story } from "@storybook/react/types-6-0";

import { Body as Component, BodyProps as Props } from "./Body";

export default {
  title: "Atoms/Body",
  component: Component,
} as Meta;

const Template: Story<Props> = (args) => <Component {...args} />;

export const Body = Template.bind({});
Body.args = {
  children: "children",
};
