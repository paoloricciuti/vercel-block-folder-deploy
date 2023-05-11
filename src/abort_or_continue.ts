export const ABORT_BUILD_CODE = 0;
export const CONTINUE_BUILD_CODE = 1;

export function check({
  file_name_list,
  folders,
  not_folders,
}: {
  file_name_list: string[];
  folders: string[];
  not_folders: string[];
}) {
  // get all file names changed in last commit
  //   const fileNameList = child_process
  //     .execSync("git diff --name-only HEAD~1")
  //     .toString()
  //     .trim()
  //     .split("\n");

  // check if every file is in the docs folder
  const every_file_in_folders =
    folders.length > 0 &&
    !file_name_list.every((file) =>
      folders.some((folder) => file.startsWith(`${folder}/`))
    );

  const some_file_not_in_not_folders =
    not_folders.length > 0 &&
    file_name_list.some((file) =>
      not_folders.some((folder) => file.startsWith(`${folder}/`))
    );

  if (every_file_in_folders || some_file_not_in_not_folders) {
    return CONTINUE_BUILD_CODE;
  }

  return ABORT_BUILD_CODE;
}
