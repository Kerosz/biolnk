import { CONSUMER_PATH, TEMPLATES_PATH } from "../constants";
import { GeneratorConfig } from "../types";

export const componentGenerator = (): GeneratorConfig => ({
  description: "Create a react component",
  prompts: [
    {
      type: "input",
      name: "name",
      message: "What is the name of this component?",
    },
    {
      type: "checkbox",
      name: "style",
      message: "What styling option is needed for the component?",
      choices: ["css", "scss"],
    },
    {
      type: "confirm",
      name: "withTs",
      message: "Are you using TypeScript ?",
    },
    {
      type: "confirm",
      name: "withTest",
      message: "Will this component need a test file?",
    },
    {
      type: "confirm",
      name: "appendIndex",
      message: "Add component to the index file ?",
    },
  ],
  actions: (data) => {
    const actionList: GeneratorConfig["actions"] = [];

    if (data && data.style === "scss") {
      actionList.push({
        type: "add",
        path: `${CONSUMER_PATH}/src/components/{{pascalCase name}}/{{pascalCase name}}.module.scss`,
        templateFile: `${TEMPLATES_PATH}/component/component.scss.hbs`,
      });
    } else {
      actionList.push({
        type: "add",
        path: `${CONSUMER_PATH}/src/components/{{pascalCase name}}/{{pascalCase name}}.module.css`,
        templateFile: `${TEMPLATES_PATH}/component/component.css.hbs`,
      });
    }

    if (data && data.withTs) {
      actionList.push(
        {
          type: "add",
          path: `${CONSUMER_PATH}/src/components/{{pascalCase name}}/{{pascalCase name}}.tsx`,
          templateFile: `${TEMPLATES_PATH}/component/component.tsx.hbs`,
        },
        {
          type: "add",
          path: `${CONSUMER_PATH}/src/components/{{pascalCase name}}/index.tsx`,
          templateFile: `${TEMPLATES_PATH}/components/componentIndex.tsx.hbs`,
        },
        {
          type: "add",
          path: `${CONSUMER_PATH}/src/components/{{pascalCase name}}/{{pascalCase name}}.test.tsx`,
          templateFile: `${TEMPLATES_PATH}/components/componentTest.tsx.hbs`,
        }
      );

      if (data.appendIndex) {
        actionList.push({
          type: "append",
          path: `${CONSUMER_PATH}/src/components/index.ts`,
          templateFile: `${TEMPLATES_PATH}/components/index.ts.hbs`,
        });
      }
    } else {
      actionList.push(
        {
          type: "add",
          path: `${CONSUMER_PATH}/src/components/{{pascalCase name}}/{{pascalCase name}}.jsx`,
          templateFile: `${TEMPLATES_PATH}/component/component.jsx.hbs`,
        },
        {
          type: "add",
          path: `${CONSUMER_PATH}/src/components/{{pascalCase name}}/index.jsx`,
          templateFile: `${TEMPLATES_PATH}/components/componentIndex.jsx.hbs`,
        },
        {
          type: "add",
          path: `${CONSUMER_PATH}/src/components/{{pascalCase name}}/{{pascalCase name}}.test.jsx`,
          templateFile: `${TEMPLATES_PATH}/components/componentTest.jsx.hbs`,
        }
      );

      if (data?.appendIndex) {
        actionList.push({
          type: "append",
          path: `${CONSUMER_PATH}/src/components/index.js`,
          templateFile: `${TEMPLATES_PATH}/components/index.js.hbs`,
        });
      }
    }

    return actionList;
  },
});
