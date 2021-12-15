import type { PlopGenerator } from "plop";

export interface GeneratorConfig {
  description: PlopGenerator["description"];
  prompts: PlopGenerator["prompts"];
  actions: PlopGenerator["actions"];
}
