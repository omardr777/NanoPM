import fetch from "node-fetch";
import * as fs from "fs";
import { REGISTRY_URL } from "../config/config";

export async function fetchPackageMetadata(packageName: string) {
  const meadataUrl = `${REGISTRY_URL}/${packageName}`;

  const response = await fetch(meadataUrl);

  if (!response.ok)
    throw new Error(
      `Failed to fetch the metadata for the package: ${packageName}, ${response.statusText}`
    );

  return response.json();
}

export async function downloadFile(url: string, dest: string) {
  const response = await fetch(url);
  if (!response.ok)
    throw new Error(`Failed to download the file: ${response.statusText}`);
  return new Promise((resolve, reject) => {
    const fileStream = fs.createWriteStream(dest);
    response.body.pipe(fileStream);
    response.body.on("end", () => {
      fileStream.close(resolve);
    });
    response.body.on("error", () => {
      fs.unlink(dest, (error: any) => reject(error));
    });
  });
}
