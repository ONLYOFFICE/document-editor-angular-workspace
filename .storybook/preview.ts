import type { Preview } from "@storybook/angular";
import { setCompodocJson } from "@storybook/addon-docs/angular";
import docJson from "../documentation.json";
setCompodocJson(docJson);

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (storyFn, context) => {
      const newArgs = {
        ...context.args,
        id: `${context.args['id']}-${Date.now()}`,
      };

      return {
        ...storyFn(),
        props: {
          ...storyFn().props,
          ...newArgs,
        },
        template: `
          <div style="display: grid; height: 100%; min-height: 400px;">
            ${storyFn().template}
          </div>
        `,
      };
    },
  ],
};

export default preview;
