#!/usr/bin/env node
import child_process from "node:child_process";
import { ABORT_BUILD_CODE, check } from "./src/abort_or_continue";

const args = process.argv.filter((arg) => arg !== "--debug");

const is_debug = args.length !== process.argv.length;

const dash_dash_not_index = args.findIndex((arg) => arg === "--not");

const theres_a_not = dash_dash_not_index !== -1;

const folders = args.slice(2, theres_a_not ? dash_dash_not_index : undefined);

let not_folders = [] as string[];
if (theres_a_not) {
  not_folders = args.slice(dash_dash_not_index + 1);
}

// get all file names changed in last commit
const file_name_list = child_process
  .execSync("git diff --name-only HEAD~1")
  .toString()
  .trim()
  .split("\n");

const exit_code = check({
  file_name_list,
  folders,
  not_folders,
});

if (is_debug) {
  console.log(exit_code === ABORT_BUILD_CODE ? "abort" : "continue");
}

process.exit(exit_code);
