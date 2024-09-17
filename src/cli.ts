#!/usr/bin/env node
import { Command } from "commander";
import { installPackage } from "./commands";

const program = new Command();

program
  .name("Nano Package Manager")
  .description("A package manager built with TypeScript")
  .version("0.0.1");

program
  .command("install <packageName>")
  .description("Install a package by name")
  .action(async (packageName: string) => {
    try {
      await installPackage(packageName);
    } catch (error: any) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
  });

program.parse(process.argv);
