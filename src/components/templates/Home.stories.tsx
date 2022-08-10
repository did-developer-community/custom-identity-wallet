import { Meta, Story } from "@storybook/react/types-6-0";

import { storedVC } from "../../fixtures";
import { HomeTemplate as Component, HomeTemplateProps as Props } from "./Home";

export default {
  title: "Templates/Home",
  component: Component,
} as Meta;

const Template: Story<Props> = (args) => <Component {...args} />;

export const Home = Template.bind({});
Home.args = {
  storedVCs: [storedVC, storedVC, storedVC],
};
