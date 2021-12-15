import { componentGenerator } from "./generators";
import type { NodePlopAPI } from "plop";

export default function (p: NodePlopAPI) {
  p.setGenerator("component", componentGenerator());
  p.setGenerator("c", componentGenerator());
}
