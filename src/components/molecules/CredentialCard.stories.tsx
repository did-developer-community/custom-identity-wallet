import { Meta, Story } from "@storybook/react/types-6-0";

import { manifest } from "../../fixtures";
import { CredentialCard as Component, CredentialCardProps as Props } from "./CredentialCard";

export default {
  title: "Molecules/EmployeeCard",
  component: Component,
} as Meta;

const Template: Story<Props> = (args) => <Component {...args} />;

export const CredentialCard = Template.bind({});
CredentialCard.args = {
  manifest,
};
