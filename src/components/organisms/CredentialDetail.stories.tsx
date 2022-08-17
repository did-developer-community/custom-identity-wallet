import { Meta, Story } from "@storybook/react/types-6-0";

import { CredentialDetail as Component } from "./CredentialDetail";

export default {
  title: "Organisms/CredentialDetail",
  component: Component,
} as Meta;

const Template: Story = (args) => <Component {...args} />;

export const CredentialDetail = Template.bind({});
CredentialDetail.args = {};
