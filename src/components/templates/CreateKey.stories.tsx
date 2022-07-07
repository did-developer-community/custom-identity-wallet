import { Meta, Story } from "@storybook/react/types-6-0";

import { CreateKeyTemplate as Component } from "./CreateKey";

export default {
  title: "Templates/CreateKey",
  component: Component,
} as Meta;

const Template: Story = (args) => <Component {...args} />;

export const CreateKey = Template.bind({});
CreateKey.args = {};
