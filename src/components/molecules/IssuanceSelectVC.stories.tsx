import { Meta, Story } from "@storybook/react/types-6-0";

import { manifest, presentationVCIDs } from "../../fixtures";
import { SelectVC as Component, SelectVCProps as Props } from "./IssueanceSelectVC";

export default {
  title: "Molecules/IssueanceSelectVC",
  component: Component,
} as Meta;

const Template: Story<Props> = (args) => <Component {...args} />;

export const IssueanceSelectVC = Template.bind({});
IssueanceSelectVC.args = {
  manifest,
  presentationVCIDs,
};
