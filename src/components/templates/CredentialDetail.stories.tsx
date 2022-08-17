import { Meta, Story } from "@storybook/react/types-6-0";

import { HomeTemplate as Component } from "./Home";

export default {
  title: "Templates/CredentialDetail",
  component: Component,
} as Meta;

const Template: Story = (args) => <Component {...args} />;

export const CredentialDetail = Template.bind({});
CredentialDetail.args = {};
