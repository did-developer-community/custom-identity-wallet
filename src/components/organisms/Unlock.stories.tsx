import { Meta, Story } from "@storybook/react/types-6-0";

import { KeyPair } from "../../lib/signer";
import { Unlock as Component, UnlockProps as Props } from "./Unlock";
export default {
  title: "Organisms/Unlock",
  component: Component,
} as Meta;

const Template: Story<Props> = (args) => <Component {...args} />;

export const Unlock = Template.bind({});
Unlock.args = {
  onUnlock: (key: KeyPair) => {
    console.log("unlocked", key);
  },
};
