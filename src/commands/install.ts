import * as fs from "fs";
import * as path from "path";
import { fetchPackageMetadata, downloadFile } from "../services/fetch";
import { extractFile } from "../utils/extract";

export async function installPackage(packageName: string) {
  if (!packageName) {
    console.error("No package name provided!");
    process.exit(1);
  }

  try {
    const packageMetadata = await fetchPackageMetadata(packageName);
    const latestVersion = packageMetadata["dist-tags"].latest;
    const tarballUrl = packageMetadata.versions[latestVersion].dist.tarball;
    console.log(`installing ${packageName}@${latestVersion}...`);
    const ext = tarballUrl.endsWith(".tgz") ? ".tgz" : ".zip";

    const packagePath = path.resolve(
      __dirname,
      "../../node_modules",
      packageName
    );
    const filePath = path.join(packagePath, `package${ext}`);

    fs.mkdirSync(packagePath, { recursive: true });
    await downloadFile(tarballUrl, filePath);

    await extractFile(filePath, packagePath);
    fs.unlinkSync(filePath);
    console.log(`${packageName} installed successfully.`);
  } catch (e: any) {
    console.error(`Failed to install package: ${packageName}, ${e["message"]}`);
    process.exit(1);
  }
}
