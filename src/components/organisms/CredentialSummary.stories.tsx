import { Meta, Story } from "@storybook/react/types-6-0";

import { card } from "../../fixtures";
import { CredentialSummaryProps as Props, CredentialSummery as Component } from "./CredentialSummary";

export default {
  title: "Organisms/CredentialSummary",
  component: Component,
} as Meta;

const Template: Story<Props> = (args) => <Component {...args} />;

export const CredentialSummary = Template.bind({});
CredentialSummary.args = {
  card,
};
