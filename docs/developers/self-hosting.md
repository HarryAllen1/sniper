# Self Hosting

::: danger
It is not recommended to self-host this bot. It is also assumed that basic developer tools (like Git) are already installed, as well as basic developer knowledge (like how to use a terminal).
:::
::: warning
Node.JS 17 (or higher) and NPM (included with Node.JS) must be installed. [Here is a link to the download page.](https://nodejs.org/en/download/current/)
:::

- Run `git clone https://github.com/MajesticString/sniper.git`
- Run `cd sniper/apps/sniper`
- Run `npx pnpm i` to flood your hard drive with dependencies needed for the bot.
- Rename `src/config.ts.example` to `src/config.ts` and fill the contents with actual values.
- For most commands, you need firebase. Head to [the Firebase console](https://console.firebase.google.com/) and run through the process of making a new project.
- Go to the "firestore" tab in the console once you have created the project and run through the steps of creating a database.
- Right next to "Project Overview", hit the settings button then head to project settings.
- Go to "Service Accounts", and under "firebase admin sdk", hit "Generate new private key" and copy the contents of that file into the `config.firebase` object.

- run `npm run start`
