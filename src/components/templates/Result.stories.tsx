import { Meta, Story } from "@storybook/react/types-6-0";

import { ResultTemplate as Component, ResultTemplateProps as Props } from "./Result";

export default {
  title: "Templates/Result",
  component: Component,
} as Meta;

const Template: Story<Props> = (args) => <Component {...args} />;

export const Scanner = Template.bind({});
