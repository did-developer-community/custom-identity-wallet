import { Meta, Story } from "@storybook/react/types-6-0";

import { card } from "../../fixtures";
import { CredentialCard as Component, CredentialCardProps as Props } from "./CredentialCard";

export default {
  title: "Molecules/CredentialCard",
  component: Component,
} as Meta;

const Template: Story<Props> = (args) => <Component {...args} />;

export const CredentialCard = Template.bind({});
CredentialCard.args = {
  card,
};
