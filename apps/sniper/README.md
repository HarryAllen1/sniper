# Sniper

This bot started as a replacement for the Dank Memer `pls snipe` command, but is gradually evolving into a economy bot.

## To self host

Prerequisites: Node.JS 16 and NPM (included with Node.JS) must be installed. [Here is a link to the download page.](https://nodejs.org/en/download/current/)

If you have Git installed:

- Run `git clone https://github.com/MajesticString/sniper.git`
- Run `cd sniper`
- Run `npm i` to flood your hard drive with files needed for the bot.
- create a `slappey.json` file, and include the following in it:

```json
{
  "name": "sniper",
  "language": "typescript",
  "manager": "npm",
  "token": "Your token. Can be obtained through https://discord.com/developers/applications . Create an app, head to the bot tab, and hit add a bot. Then, hit copy underneath the token field. ",
  "prefix": ",,"
}
```

- For most commands, you need firebase. Head to https://console.firebase.google.com/ and run through the process of making a new project.
- Go to the "firestore" tab in the console once you have created the project and run through the steps of creating a database.
- Right next to "Project Overview", hit the settings button then head to project settings.
- Go to "Service Accounts", and under "firebase admin sdk", hit "Generate new private key" and save it in the project root (this folder.)

- run `npm run dev` to start the bot (or `yarn dev` if you have yarn installed.

If you don't hav Git installed:

- hit Code > download .zip
- Extract the files
- Open a command line (on windows, the app is command prompt)

Windows 11:

- go into the directory with all the files
- right click "sniper" in the directory bar, and hit copy as text.

Windows 10:

- go into the directory with all the files in file explorer
- shift-click the url bar and hit "copy as path"

Then:

- in your command prompt, run `cd (then right click in this text field to paste the url.)`
- Run `npm i` to flood your hard drive with files needed for the bot.
- create a `slappey.json` file, and include the following in it:

```json
{
  "name": "sniper",
  "language": "typescript",
  "manager": "npm",
  "token": "Your token. Can be obtained through https://discord.com/developers/applications . Create an app, head to the bot tab, and hit add a bot. Then, hit copy underneath the token field. ",
  "prefix": ",,"
}
```

- For most commands, you need firebase. Head to https://console.firebase.google.com/ and run through the process of making a new project.
- Go to the "firestore" tab in the console once you have created the project and run through the steps of creating a database.
- Right next to "Project Overview", hit the settings button then head to project settings.
- Go to "Service Accounts", and under "firebase admin sdk", hit "Generate new private key" and save it in the project root (this folder.)

- run `npm run dev` to start the bot (or `yarn dev` if you have yarn installed.
