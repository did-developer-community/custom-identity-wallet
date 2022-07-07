import { Meta, Story } from "@storybook/react/types-6-0";

import { card } from "../../fixtures";
import { CredentialDetail as Component, CredentialDetailProps as Props } from "./CredentialDetail";

export default {
  title: "Organisms/Credential Detail",
  component: Component,
} as Meta;

const Template: Story<Props> = (args) => <Component {...args} />;

export const CredentialDetail = Template.bind({});
CredentialDetail.args = {
  card,
};
