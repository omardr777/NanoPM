#!/usr/bin/env node

import * as fs from "fs";

console.log("Welcome to your mini package manager!");

const args = process.argv.slice(2);

if (args.length === 0) {
  console.log("No command provided.");
} else {
  console.log(`Command received: ${args[0]}`);
}
