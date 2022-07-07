import { Meta, Story } from "@storybook/react/types-6-0";

import { Result as Component, ResultProps as Props } from "./Result";

export default {
  title: "Organisms/Result",
  component: Component,
} as Meta;

const Template: Story<Props> = (args) => <Component {...args} />;

export const Result = Template.bind({});

Result.args = {
  type: "issue",
  result: false,
  errorMessage: "This is an error message",
};
