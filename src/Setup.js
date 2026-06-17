// Copyright © Connor deBoer 2026

import { execSync } from "child_process";
import { writeFileSync } from "fs";
import { userInfo } from "os";
import { resolve } from "path";

const user = userInfo().username;
// This assumes we call setup from inside the repo
const workingDir = resolve('.');
const nodePath = process.execPath;

const serviceFile = `
[Unit]
Description=Morning Job Finder
After=network-online.target
Wants=network-online.target

[Service]
Type=oneshot
User=${user}
WorkingDirectory=${workingDir}
ExecStart=${nodePath} --env-file=${workingDir}/.env ${workingDir}/src/Index.js
StandardOutput=append:/home/${user}/jobfinder.log
StandardError=append:/home/${user}/jobfinder.log

[Install]
WantedBy=default.target
`.trim();

const servicePath = "/etc/systemd/system/jobfinder.service";

try {
  if (!commandExists("ollama")) {
    execSync("curl -fsSL https://ollama.com/install.sh | sh", { stdio: "inherit" });
  }
  if (!modelExists("qwen2.5:14b")) {
    console.log("Pulling qwen2.5:14b (~9GB, this'll take a few minutes)...");
    execSync("ollama pull qwen2.5:14b", { stdio: "inherit" });
  }
  console.log("Local LLM Installed");
  // Write the service file
  writeFileSync("/tmp/jobfinder.service", serviceFile);
  execSync(`sudo cp /tmp/jobfinder.service ${servicePath}`);
  execSync("sudo systemctl daemon-reload");
  execSync("sudo systemctl enable jobfinder");

  console.log("Service installed successfully!");
  console.log("Run 'sudo systemctl start jobfinder' to test it now");
  console.log("Or reboot and it'll run automatically on startup");

} catch (error) {
  console.error("Setup failed:", error.message);
  console.error("Make sure you have sudo access");
}

function commandExists(cmd) {
  try {
    execSync(`command -v ${cmd}`, { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

function modelExists(modelName) {
  try {
    const output = execSync("ollama list", { encoding: "utf-8" });
    return output.includes(modelName);
  } catch {
    return false;
  }
}