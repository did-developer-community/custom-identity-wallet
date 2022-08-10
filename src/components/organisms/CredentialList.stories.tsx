import { Meta, Story } from "@storybook/react/types-6-0";

import { storedVC } from "../../fixtures";
import { CredentialList as Component, CredentialListProps as Props } from "./CredentialList";

export default {
  title: "Organisms/Credential List",
  component: Component,
} as Meta;

const Template: Story<Props> = (args) => <Component {...args} />;

export const CredentialList = Template.bind({});
CredentialList.args = { storedVCs: [storedVC, storedVC] };
