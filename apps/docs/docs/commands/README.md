---
lang: en-US
title: Command Reference
description: A guide for every command that Sniper has.
---

# Command Reference

Understanding the arguments:

- `[argument]` Optional argument
- `<argument>` Required argument
- `[argument] ...` Repeat the argument as many times as needed
- `[argument] <argument>` If the first argument is specified, the second argument _must_ be specified.

[Jump to Snipe Command](#snipe)\
[Jump to Edit Snipe Command](#editsnipe)\
[Jump to Reaction Snipe Command](#reactionsnipe)

<!-- DO NOT EDIT ANYTHING BELOW THIS LINE!!! -->
<!-- start generation -->
## General

### changelog



**Arguments/Usage:** <DiscordMessages><DiscordMessage profile="user">$changelog [number of changes to get. defaults to 5. this argument cannot go above 10.]</DiscordMessage></DiscordMessages>\
**Cooldown:** 5 seconds\
**Permissions:** `send messages`, `read message history`, `view channel`

### coinflip



**Arguments/Usage:** <DiscordMessages><DiscordMessage profile="user">$coinflip [heads or tails]</DiscordMessage></DiscordMessages>\
**Cooldown:** 500 ms\
**Permissions:** `send messages`, `read message history`, `view channel`

### createissue

Submits an issue for this bot.\
**Aliases:** issue, createproblem, problem\
**Arguments/Usage:** <DiscordMessages><DiscordMessage profile="user">$createissue \<issue\>: The issue with the bot.</DiscordMessage></DiscordMessages>\
**Cooldown:** 15 minutes\
**Permissions:** `send messages`, `read message history`, `view channel`

### define



**Arguments/Usage:** <DiscordMessages><DiscordMessage profile="user">$define \<word or term\> [dictionary to use (can be oxford, urban, or mw (which stands for Merriam Webster)). Defaults to Oxford]</DiscordMessage></DiscordMessages>\
**Cooldown:** 1 second\
**Permissions:** `send messages`, `read message history`, `view channel`

### deletealldata

Deletes all data associated with the bot. The only thing that will remain is your user ID.\
**Aliases:** deletemydata\
**Arguments/Usage:** None\
**Cooldown:** 500 ms\
**Permissions:** `send messages`, `read message history`, `view channel`

### faq



**Arguments/Usage:** None\
**Cooldown:** 1 second\
**Permissions:** `send messages`, `read message history`, `view channel`

### feature

Requests a feature\
**Aliases:** requestfeature, featurerequest\
**Arguments/Usage:** <DiscordMessages><DiscordMessage profile="user">$feature \<feature\>: The requested bot feature.</DiscordMessage></DiscordMessages>\
**Cooldown:** 15 minutes\
**Permissions:** `send messages`, `read message history`, `view channel`

### github



**Arguments/Usage:** None\
**Cooldown:** 5 seconds\
**Permissions:** `send messages`, `read message history`, `view channel`

### help

Shows all commands and their descriptions\
**Aliases:** commands, command\
**Arguments/Usage:** <DiscordMessages><DiscordMessage profile="user">$help [category or command name]</DiscordMessage></DiscordMessages>\
**Cooldown:** 1 second\
**Permissions:** `send messages`, `read message history`, `view channel`

### invite



**Arguments/Usage:** None\
**Cooldown:** 1 second\
**Permissions:** `send messages`, `read message history`, `view channel`

### meme



**Arguments/Usage:** None\
**Cooldown:** 3 seconds\
**Permissions:** `send messages`, `read message history`, `view channel`

### prefix

Shows the prefixes that this bot has. Can also be used to set the prefixes. Prefixes must be separated by a space.\
**Aliases:** prefixes\
**Arguments/Usage:** <DiscordMessages><DiscordMessage profile="user">$prefix [prefix] [prefix] ...</DiscordMessage></DiscordMessages>\
**Cooldown:** 5 seconds\
**Permissions:** `send messages`, `read message history`, `view channel`

### pronounce



**Arguments/Usage:** None\
**Cooldown:** 1 second\
**Permissions:** `send messages`, `read message history`, `view channel`

### say



**Arguments/Usage:** None\
**Cooldown:** 10 seconds\
**Permissions:** `send messages`, `read message history`, `view channel`

### support

Gives an invite for the support server.\
**Aliases:** server, community\
**Arguments/Usage:** None\
**Cooldown:** 5 seconds\
**Permissions:** `send messages`, `read message history`, `view channel`

### vote



**Arguments/Usage:** None\
**Cooldown:** 3 seconds\
**Permissions:** `send messages`, `read message history`, `view channel`

## Moderation

### ban



**Arguments/Usage:** <DiscordMessages><DiscordMessage profile="user">$ban \<@user or userID\> \<user\> \<user\> ...</DiscordMessage></DiscordMessages>\
**Cooldown:** 100 ms\
**Permissions:** `ban members`

### clear

Clears messages from a channel\
**Aliases:** purge\
**Arguments/Usage:** <DiscordMessages><DiscordMessage profile="user">$clear \<# of messages to clear\></DiscordMessage></DiscordMessages>\
**Cooldown:** 0 ms\
**Permissions:** `send messages`, `read message history`, `view channel`

### kick



**Arguments/Usage:** <DiscordMessages><DiscordMessage profile="user">$kick \<user (user mention or username or id)\> ....</DiscordMessage></DiscordMessages>\
**Cooldown:** 100 ms\
**Permissions:** `kick members`

## Giveaways

### ~~gcreate~~
::: warning
This command is disabled
:::


**Arguments/Usage:** <DiscordMessages><DiscordMessage profile="user">$gcreate [time] [amount of winners] [prize]</DiscordMessage></DiscordMessages>\
**Cooldown:** 3 seconds\
**Permissions:** `send messages`, `read message history`, `view channel`

### ~~gEnd~~
::: warning
This command is disabled
:::


**Arguments/Usage:** <DiscordMessages><DiscordMessage profile="user">$gEnd \<message id\></DiscordMessage></DiscordMessages>\
**Cooldown:** 0 ms\
**Permissions:** `send messages`, `read message history`, `view channel`

## Restricted

### addcoins



**Arguments/Usage:** <DiscordMessages><DiscordMessage profile="user">$addcoins \<userID OR mentioned user\></DiscordMessage></DiscordMessages>\
**Cooldown:** 0 ms\
**Permissions:** `send messages`, `read message history`, `view channel`

### eval



**Arguments/Usage:** None\
**Cooldown:** 0 ms\
**Permissions:** `send messages`, `read message history`, `view channel`

### sudo



**Arguments/Usage:** <DiscordMessages><DiscordMessage profile="user">$sudo \<userID\> \<command\> [...args]</DiscordMessage></DiscordMessages>\
**Cooldown:** 0 ms\
**Permissions:** `send messages`, `read message history`, `view channel`

## Currency

### balance

Shows the current amount of coins you or someone else has.\
**Aliases:** bal\
**Arguments/Usage:** <DiscordMessages><DiscordMessage profile="user">$balance [mentioned user OR user ID]</DiscordMessage></DiscordMessages>\
**Cooldown:** 1 second\
**Permissions:** `send messages`, `read message history`, `view channel`

### bet



**Arguments/Usage:** None\
**Cooldown:** 500 ms\
**Permissions:** `send messages`, `read message history`, `view channel`

### buy



**Arguments/Usage:** <DiscordMessages><DiscordMessage profile="user">$buy \<item\></DiscordMessage></DiscordMessages>\
**Cooldown:** 250 ms\
**Permissions:** `send messages`, `read message history`, `view channel`

### crime



**Arguments/Usage:** None\
**Cooldown:** 1 minute\
**Permissions:** `send messages`, `read message history`, `view channel`

### daily



**Arguments/Usage:** None\
**Cooldown:** 1 day\
**Permissions:** `send messages`, `read message history`, `view channel`

### fortnite



**Arguments/Usage:** None\
**Cooldown:** 5 seconds\
**Permissions:** `send messages`, `read message history`, `view channel`

### give



**Arguments/Usage:** <DiscordMessages><DiscordMessage profile="user">$give \<user ID or mentioned user\> \<amount of coins\></DiscordMessage></DiscordMessages>\
**Cooldown:** 5 seconds\
**Permissions:** `send messages`, `read message history`, `view channel`

### inv



**Arguments/Usage:** <DiscordMessages><DiscordMessage profile="user">$inv [userID or mentioned user]</DiscordMessage></DiscordMessages>\
**Cooldown:** 0 ms\
**Permissions:** `send messages`, `read message history`, `view channel`

### jailbreak



**Arguments/Usage:** None\
**Cooldown:** 15 minutes\
**Permissions:** `send messages`, `read message history`, `view channel`

### lb

Ranks people in order of wealth\
**Aliases:** leaderboards, leaderboard, rich, richest\
**Arguments/Usage:** None\
**Cooldown:** 3 seconds\
**Permissions:** `send messages`, `read message history`, `view channel`

### rob



**Arguments/Usage:** <DiscordMessages><DiscordMessage profile="user">$rob \<user ID or mentioned user to rob\></DiscordMessage></DiscordMessages>\
**Cooldown:** 1 minute\
**Permissions:** `send messages`, `read message history`, `view channel`

### shop



**Arguments/Usage:** <DiscordMessages><DiscordMessage profile="user">$shop [category]</DiscordMessage></DiscordMessages>\
**Cooldown:** 1 ms\
**Permissions:** `send messages`, `read message history`, `view channel`

### use



**Arguments/Usage:** None\
**Cooldown:** 5 seconds\
**Permissions:** `send messages`, `read message history`, `view channel`

## Util

### bot



**Arguments/Usage:** None\
**Cooldown:** 15 seconds\
**Permissions:** `send messages`, `read message history`, `view channel`

### editsnipe

After a message is edited, you can use this command to see the old message.\
**Aliases:** esnipe\
**Arguments/Usage:** None\
**Cooldown:** 0 ms\
**Permissions:** `send messages`, `read message history`, `view channel`

### ping



**Arguments/Usage:** None\
**Cooldown:** 5 seconds\
**Permissions:** `send messages`, `read message history`, `view channel`

### poll



**Arguments/Usage:** <DiscordMessages><DiscordMessage profile="user">$poll \<the poll\></DiscordMessage></DiscordMessages>\
**Cooldown:** 10 seconds\
**Permissions:** `send messages`, `read message history`, `view channel`

### reactionsnipe

Shows the last removed reaction from a message in this channel\
**Aliases:** rsnipe\
**Arguments/Usage:** None\
**Cooldown:** 0 ms\
**Permissions:** `send messages`, `read message history`, `view channel`

### role



**Arguments/Usage:** <DiscordMessages><DiscordMessage profile="user">$role [mentioned role OR role id OR role name. defaults to @everyone]</DiscordMessage></DiscordMessages>\
**Cooldown:** 5 seconds\
**Permissions:** `send messages`, `read message history`, `view channel`

### roles



**Arguments/Usage:** None\
**Cooldown:** 3 seconds\
**Permissions:** `send messages`, `read message history`, `view channel`

### snipe



**Arguments/Usage:** <DiscordMessages><DiscordMessage profile="user">$snipe [type: embeds | attachments | messages]</DiscordMessage></DiscordMessages>\
**Cooldown:** 3 seconds\
**Permissions:** `send messages`, `read message history`, `view channel`

### tex

Turns text into math\
**Aliases:** math, latex\
**Arguments/Usage:** None\
**Cooldown:** 1 second\
**Permissions:** `send messages`, `read message history`, `view channel`

### timer



**Arguments/Usage:** <DiscordMessages><DiscordMessage profile="user">$timer \<timer length\>\<unit (short or long)\> [timer description]</DiscordMessage></DiscordMessages>\
**Cooldown:** 5 seconds\
**Permissions:** `send messages`, `read message history`, `view channel`

### unsnipe



**Arguments/Usage:** None\
**Cooldown:** 1 second\
**Permissions:** `send messages`, `read message history`, `view channel`

### vote2



**Arguments/Usage:** <DiscordMessages><DiscordMessage profile="user">$vote2 \<title\> ...options separated by commas</DiscordMessage></DiscordMessages>\
**Cooldown:** 5 seconds\
**Permissions:** `send messages`, `read message history`, `view channel`

### weather



**Arguments/Usage:** <DiscordMessages><DiscordMessage profile="user">$weather \<city\> [time period (hourly, daily. defaults to daily)]</DiscordMessage></DiscordMessages>\
**Cooldown:** 5 seconds\
**Permissions:** `send messages`, `read message history`, `view channel`

### whois



**Arguments/Usage:** None\
**Cooldown:** 3 seconds\
**Permissions:** `send messages`, `read message history`, `view channel`
