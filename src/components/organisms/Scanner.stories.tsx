import { Meta, Story } from "@storybook/react/types-6-0";

import { Scanner as Component } from "./Scanner";

export default {
  title: "Organisms/Scanner",
  component: Component,
} as Meta;

const Template: Story = (args) => <Component {...args} />;

export const Scanner = Template.bind({});

Scanner.args = {
  onQRCodeScanned: (requestUrl: string) => {
    console.log("scanned", requestUrl);
  },
};
