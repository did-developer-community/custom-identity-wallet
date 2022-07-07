import { Meta, Story } from "@storybook/react/types-6-0";

import { manifest, vcVerifyRequest } from "../../fixtures";
import { Present as Component, PresentProps as Props } from "./Present";

export default {
  title: "Organisms/Present",
  component: Component,
} as Meta;

const Template: Story<Props> = (args) => <Component {...args} />;

export const Present = Template.bind({});
Present.args = {
  vcRequest: vcVerifyRequest,
  manifest,
};
