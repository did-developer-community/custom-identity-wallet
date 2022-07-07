import * as NextImage from "next/image";
import { addDecorator } from "@storybook/react";
import { AppWrapper } from "../src/components/utils/AppWrapper";

addDecorator((story) => <AppWrapper>{story()}</AppWrapper>);

const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, "default", {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});
