import { Meta, Story } from "@storybook/react/types-6-0";

import { LoadRequestTemplate as Component } from "./LoadRequest";

export default {
  title: "Templates/LoadRequest",
  component: Component,
} as Meta;

const Template: Story = (args) => <Component {...args} />;

export const LoadRequest = Template.bind({});
LoadRequest.args = {};
