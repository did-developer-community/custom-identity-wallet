import { Meta, Story } from "@storybook/react/types-6-0";

import { manifest } from "../../fixtures";
import { PreviewCredentialCard as Component, PreviewCredentialCardProps as Props } from "./PreviewCredentialCard";

export default {
  title: "Molecules/PreviewCredentialCard",
  component: Component,
} as Meta;

const Template: Story<Props> = (args) => <Component {...args} />;

export const PreviewCredentialCard = Template.bind({});
PreviewCredentialCard.args = {
  manifest,
};
