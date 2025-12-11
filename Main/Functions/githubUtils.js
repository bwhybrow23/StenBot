import { Octokit } from "@octokit/rest";
import fs from "fs";
const settings = JSON.parse(fs.readFileSync('./Main/settings.json', 'utf8'));

const octokit = new Octokit({
  auth: settings.connections.github.token,
});

export async function createGithubIssue(error, context = {}) {

  // If in development mode, don't send issues
  if (settings.mode === "development") return;

  // Check if token is present in config
  if (!settings.connections.github.token) {
    console.log("GitHub Token is not set; skipping issue creation.")
    return;
  }

  // Basic dedup key to avoid spamming identical issues
  const errorSignature = (error && error.message) ? error.message.slice(0, 100) : "Unknown error";

  // Build contents of Github Issue
  let title = `[Bot Error] ${errorSignature}`;
  let body = `An error occurred in the Discord bot.\n\n`;

  if (context.commandName) {
    body += `**Command:** \`${context.commandName}\`\n`;
  }
  if (context.userTag) {
    body += `**User:** ${context.userTag}\n`;
  }
  if (context.fileName) {
    body += `**File Name:** ${context.fileName}\n`
  }
  if (context.additionalInfo) {
    body += `**Additional info:** ${context.additionalInfo}\n`;
  }

  body += `\n**Error message:**\n\`\`\`\n${error && error.message}\n\`\`\`\n`;

  if (error && error.stack) {
    body += `\n**Stack trace:**\n\`\`\`\n${error.stack.slice(0, 6000)}\n\`\`\`\n`; // avoid hitting size limit
  }

  // Send issue to GitHub repo
  try {
    const res = await octokit.issues.create({
      owner: settings.connections.github.owner,
      repo: settings.connections.github.repo,
      title,
      body,
      labels: ["bug", "auto-generated"],
    });

    console.log(`Created GitHub issue: ${res.data.html_url}`);
  } catch (err) {
    console.error("Failed to create GitHub issue:", err);
  }

}