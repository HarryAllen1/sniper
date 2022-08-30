# Upcoming Update

Discord is currently [recommending that all Discord bots switch to slash commands](https://support-dev.discord.com/hc/en-us/articles/4404772028055).
As the result, Sniper will stop supporting message commands.

## Changes you need to make

As a server owner, the only changes that will need to be made is ensuring that your users have the right permissions to use commands.
This can be checked in `Server Settings`/`Integrations`.

## Full Changelog

### Removed Commands

- `deletealldata` (since currency commands were deleted)
- `faq` (wasn't helpful at all)
- `feature` and `github` (if you know, you know)
- `prefix` (bot now uses slash commands)
- `say` (just say it yourself)
- `sudo` (it never worked)
- `bot` (you don't need it)

### Other Changes

- `roleinfo` and `roles` were merged into one command
