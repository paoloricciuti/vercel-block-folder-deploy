import { it, expect } from "vitest";
import {
  ABORT_BUILD_CODE,
  CONTINUE_BUILD_CODE,
  check,
} from "./src/abort_or_continue";

it("Should abort if every file in the name list is in the folders in folders", () => {
  const file_name_list = ["/docs/test.js", "/docs/test_again.js"];
  const folders = ["docs"];
  const not_folders = [];
  const exit_code = check({
    file_name_list,
    folders,
    not_folders,
  });
  expect(exit_code).toBe(ABORT_BUILD_CODE);
});

it("Should continue if not every file in the name list is in the folders in folders", () => {
  const file_name_list = ["/docs/test.js", "/test/test.js"];
  const folders = ["docs"];
  const not_folders = [];
  const exit_code = check({
    file_name_list,
    folders,
    not_folders,
  });
  expect(exit_code).toBe(CONTINUE_BUILD_CODE);
});

it("Should continue if every file in the name list is not in the folders in folders", () => {
  const file_name_list = ["/test/test.js", "/test/test_again.js"];
  const folders = ["docs"];
  const not_folders = [];
  const exit_code = check({
    file_name_list,
    folders,
    not_folders,
  });
  expect(exit_code).toBe(CONTINUE_BUILD_CODE);
});

it("Should abort if every file in the name list is in the folders in folders (multiple folders)", () => {
  const file_name_list = [
    "/docs/test.js",
    "/docs/test_again.js",
    "/test/index.js",
  ];
  const folders = ["docs", "test"];
  const not_folders = [];
  const exit_code = check({
    file_name_list,
    folders,
    not_folders,
  });
  expect(exit_code).toBe(ABORT_BUILD_CODE);
});

it("Should continue if not every file in the name list is in the folders in folders (multiple folders)", () => {
  const file_name_list = ["/docs/test.js", "/test/test.js", "/another/test.js"];
  const folders = ["docs", "test"];
  const not_folders = [];
  const exit_code = check({
    file_name_list,
    folders,
    not_folders,
  });
  expect(exit_code).toBe(CONTINUE_BUILD_CODE);
});

it("Should continue if every file in the name list is not in the folders in folders (multiple folders)", () => {
  const file_name_list = ["/another/test.js", "/another/test_again.js"];
  const folders = ["docs", "test"];
  const not_folders = [];
  const exit_code = check({
    file_name_list,
    folders,
    not_folders,
  });
  expect(exit_code).toBe(CONTINUE_BUILD_CODE);
});

it("Should abort if every file in the name list is not in the folders in not_folders", () => {
  const file_name_list = ["/test.js", "/test_again.js", "/another/test.js"];
  const folders = [];
  const not_folders = ["docs"];
  const exit_code = check({
    file_name_list,
    folders,
    not_folders,
  });
  expect(exit_code).toBe(ABORT_BUILD_CODE);
});

it("Should continue if at least one file in the name list is in the folders in not_folders", () => {
  const file_name_list = ["/test.js", "/test_again.js", "/docs/test.js"];
  const folders = [];
  const not_folders = ["docs"];
  const exit_code = check({
    file_name_list,
    folders,
    not_folders,
  });
  expect(exit_code).toBe(CONTINUE_BUILD_CODE);
});

it("Should continue if at least one file in the name list is in the folders in not_folders (multiple folders)", () => {
  const file_name_list = ["/test.js", "/test/test_again.js"];
  const folders = [];
  const not_folders = ["docs", "test"];
  const exit_code = check({
    file_name_list,
    folders,
    not_folders,
  });
  expect(exit_code).toBe(CONTINUE_BUILD_CODE);
});
