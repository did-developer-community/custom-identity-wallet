import { Meta, Story } from "@storybook/react/types-6-0";

import { Container as Component, ContainerProps as Props } from "./Container";

export default {
  title: "Atoms/Container",
  component: Component,
} as Meta;

const Template: Story<Props> = (args) => <Component {...args} />;

export const Container = Template.bind({});
Container.args = {
  children: "children",
};
