import { showHelpMessage } from "./help";
import { handleInstall } from "./install";

export const handleCommand = (command: "install" | "help", args: string[]) => {
  switch (command) {
    case "install":
      handleInstall(command);
      break;

    case "help":
      showHelpMessage();
      break;

    default:
      console.log(`unkonw command :${command}`);
      showHelpMessage();
  }
};
