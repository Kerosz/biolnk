#!/usr/bin/env node
import * as path from "path";
import minimist from "minimist";
import { Plop, run } from "plop";

const args = process.argv.slice(2);
const argv = minimist(args);

Plop.prepare(
  {
    cwd: argv.cwd,
    configPath: path.join(__dirname, "plopfile.js"),
    preload: argv.preload || [],
    completion: argv.completion,
  },
  (env) => {
    const options = {
      ...env,
      dest: process.cwd(),
    };
    return run(options, undefined, true);
  }
);
