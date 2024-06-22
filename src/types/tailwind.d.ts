declare module "tailwindcss/plugin" {
  import { PluginCreator } from "tailwindcss/types/config";
  const plugin: PluginCreator;
  export = plugin;
}

type NestedObject = {
  [key: string]: string | NestedObject;
};

export interface AddUtilities {
  (utilities: { [key: string]: NestedObject }, variants?: string[]): void;
}
