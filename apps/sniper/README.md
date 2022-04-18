# Sniper

This bot started as a replacement for the Dank Memer `pls snipe` command, but is gradually evolving into a economy bot.

## To self host

Prerequisites: Node.JS 16 and NPM (included with Node.JS) must be installed. [Here is a link to the download page.](https://nodejs.org/en/download/current/). Git must also be installed

- Clone this repo
- cd into `apps/sniper`
- Run `npx pnpm i` to flood your hard drive with files needed for the bot.
- create a `slappey-prod.json` file, and include the following in it:

```json
{
  "name": "sniper",
  "language": "typescript",
  "manager": "npm",
  "token": "Your token. Can be obtained through https://discord.com/developers/applications . Create an app, head to the bot tab, and hit add a bot. Then, hit copy underneath the token field. ",
  "prefixes": ["all", "prefixes", "here"]
}
```

- For most commands, you need firebase. Head to https://console.firebase.google.com/ and run through the process of making a new project.
- Go to the "firestore" tab in the console once you have created the project and run through the steps of creating a database.
- Right next to "Project Overview", hit the settings button then head to project settings.
- Go to "Service Accounts", and under "firebase admin sdk", hit "Generate new private key" and save it in the project root (this folder.)

- run `npm run start`. If you want to start a dev server, run `npm run dev`.
