import { Meta, Story } from "@storybook/react/types-6-0";

import { acquiredIdToken, manifest, vcIssueRequest } from "../../fixtures";
import { Issue as Component, IssueProps as Props } from "./Issue";

export default {
  title: "Organisms/Issue",
  component: Component,
} as Meta;

const Template: Story<Props> = (args) => <Component {...args} />;

export const IssueBeforeAuthorization = Template.bind({});
IssueBeforeAuthorization.args = {
  vcRequest: vcIssueRequest,
  manifest,
  acquiredAttestation: {},
};

export const IssueAfterAuthorization = Template.bind({});
IssueAfterAuthorization.args = {
  vcRequest: vcIssueRequest,
  manifest,
  acquiredAttestation: acquiredIdToken,
};
