import { Meta, Story } from "@storybook/react/types-6-0";

import { presentationVCIDs, vcVerifyRequest } from "../../fixtures";
import { SelectVC as Component, SelectVCProps as Props } from "./PresentationSelectVC";

export default {
  title: "Molecules/PresentationSelectVC",
  component: Component,
} as Meta;

const Template: Story<Props> = (args) => <Component {...args} />;

export const PresentationSelectVC = Template.bind({});
PresentationSelectVC.args = {
  vcRequest: vcVerifyRequest,
  presentationVCIDs,
};
