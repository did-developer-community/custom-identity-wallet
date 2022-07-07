import { Meta, Story } from "@storybook/react/types-6-0";

import { card } from "../../fixtures";
import { CredentialTemplate as Component, CredentialTemplateProps as Props } from "./Credential";

export default {
  title: "Templates/Credential",
  component: Component,
} as Meta;

const Template: Story<Props> = (args) => <Component {...args} />;

export const Credential = Template.bind({});
Credential.args = {
  card,
};
