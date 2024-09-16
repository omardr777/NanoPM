import * as fs from "fs";
import * as tar from "tar";
import * as unzipper from "unzipper";

export const extractTarball = async (
  tarballPath: string,
  extractPath: string
) => {
  return tar.extract({
    file: tarballPath,
    C: extractPath,
  });
};

export const extractZip = (zipPath: string, extractPath: string) => {
  return fs
    .createReadStream(zipPath)
    .pipe(unzipper.Extract({ path: extractPath }))
    .promise();
};
