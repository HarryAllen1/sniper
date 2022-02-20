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
- `[argument] <argument>` If the first argument is specified, the second
  argument _must_ be specified.

[Jump to Snipe Command](#snipe)\
[Jump to Edit Snipe Command](#editsnipe)\
[Jump to Reaction Snipe Command](#reactionsnipe)

<Toc />

<!-- DO NOT EDIT ANYTHING BELOW THIS LINE!!! -->
<!-- start generation -->

## General

### changelog

**Arguments/Usage:**
<DiscordMessages>
<DiscordMessage profile="user"> &#36;changelog [number of changes to get.
defaults to 5. this argument cannot go above 10.]
</DiscordMessage>
</DiscordMessages>
**Cooldown:** 5 seconds\
**Permissions:** `send messages`, `read message history`, `view channel`

### coinflip

**Arguments/Usage:**
<DiscordMessages>
<DiscordMessage profile="user"> &#36;coinflip \[heads or tails\]
</DiscordMessage>
</DiscordMessages>\
**Cooldown:** 500 ms\
**Permissions:** `send messages`, `read message history`, `view channel`

### createissue

Submits an issue for this bot.\
**Aliases:** issue, createproblem, problem\
**Arguments/Usage:**
<DiscordMessages>
<DiscordMessage profile="user"> &#36;createissue &lt;issue&gt;: The issue with
the bot.
</DiscordMessage>
</DiscordMessages>\
**Cooldown:** 15 minutes\
**Permissions:** `send messages`, `read message history`, `view channel`

### define

**Arguments/Usage:**
<DiscordMessages>
<DiscordMessage profile="user"> &#36;define &lt;word or term&gt; \[dictionary to
use (can be oxford, urban, or mw (which stands for Merriam Webster)). Defaults
to Oxford\]
</DiscordMessage>
</DiscordMessages>\
**Cooldown:** 1 second\
**Permissions:** `send messages`, `read message history`, `view channel`

### deletealldata

Deletes all data associated with the bot. The only thing that will remain is
your user ID.\
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
**Arguments/Usage:**
<DiscordMessages>
<DiscordMessage profile="user"> &#36;feature &lt;feature&gt;: The requested bot
feature.
</DiscordMessage>
</DiscordMessages>\
**Cooldown:** 15 minutes\
**Permissions:** `send messages`, `read message history`, `view channel`

### github

**Arguments/Usage:** None\
**Cooldown:** 5 seconds\
**Permissions:** `send messages`, `read message history`, `view channel`

### help

Shows all commands and their descriptions\
**Aliases:** commands, command\
**Arguments/Usage:**
<DiscordMessages>
<DiscordMessage profile="user"> &#36;help \[category or command name\]
</DiscordMessage>
</DiscordMessages>\
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

Shows the prefixes that this bot has. Can also be used to set the prefixes.
Prefixes must be separated by a space.\
**Aliases:** prefixes\
**Arguments/Usage:**
<DiscordMessages>
<DiscordMessage profile="user"> &#36;prefix \[prefix\] \[prefix\] ...
</DiscordMessage>
</DiscordMessages>\
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

**Arguments/Usage:**
<DiscordMessages>
<DiscordMessage profile="user"> &#36;ban &lt;@user or userID&gt; &lt;user&gt;
&lt;user&gt; ...
</DiscordMessage>
</DiscordMessages>\
**Cooldown:** 100 ms\
**Permissions:** `ban members`

### clear

Clears messages from a channel\
**Aliases:** purge\
**Arguments/Usage:**
<DiscordMessages>
<DiscordMessage profile="user"> &#36;clear &lt;# of messages to clear&gt;
</DiscordMessage>
</DiscordMessages>\
**Cooldown:** 0 ms\
**Permissions:** `send messages`, `read message history`, `view channel`

### kick

**Arguments/Usage:**
<DiscordMessages>
<DiscordMessage profile="user"> &#36;kick &lt;user (user mention or username or
id)&gt; ....
</DiscordMessage>
</DiscordMessages>\
**Cooldown:** 100 ms\
**Permissions:** `kick members`

## Giveaways

### ~~gcreate~~

::: warning

This command is disabled

:::

**Arguments/Usage:**
<DiscordMessages>
<DiscordMessage profile="user"> &#36;gcreate \[time\] \[amount of winners\]
\[prize\]
</DiscordMessage>
</DiscordMessages>\
**Cooldown:** 3 seconds\
**Permissions:** `send messages`, `read message history`, `view channel`

### ~~gEnd~~

::: warning

This command is disabled

:::

**Arguments/Usage:**
<DiscordMessages>
<DiscordMessage profile="user"> &#36;gEnd &lt;message id&gt;
</DiscordMessage>
</DiscordMessages>\
**Cooldown:** 0 ms\
**Permissions:** `send messages`, `read message history`, `view channel`

## Restricted

### addcoins

**Arguments/Usage:**
<DiscordMessages>
<DiscordMessage profile="user"> &#36;addcoins &lt;userID OR mentioned user&gt;
</DiscordMessage>
</DiscordMessages>\
**Cooldown:** 0 ms\
**Permissions:** `send messages`, `read message history`, `view channel`

### eval

**Arguments/Usage:** None\
**Cooldown:** 0 ms\
**Permissions:** `send messages`, `read message history`, `view channel`

### sudo

**Arguments/Usage:**
<DiscordMessages>
<DiscordMessage profile="user"> &#36;sudo &lt;userID&gt; &lt;command&gt;
\[...args\]
</DiscordMessage>
</DiscordMessages>\
**Cooldown:** 0 ms\
**Permissions:** `send messages`, `read message history`, `view channel`

## Currency

### balance

Shows the current amount of coins you or someone else has.\
**Aliases:** bal\
**Arguments/Usage:**
<DiscordMessages>
<DiscordMessage profile="user"> &#36;balance \[mentioned user OR user ID\]
</DiscordMessage>
</DiscordMessages>\
**Cooldown:** 1 second\
**Permissions:** `send messages`, `read message history`, `view channel`

### bet

**Arguments/Usage:** None\
**Cooldown:** 500 ms\
**Permissions:** `send messages`, `read message history`, `view channel`

### buy

**Arguments/Usage:**
<DiscordMessages>
<DiscordMessage profile="user"> &#36;buy &lt;item&gt;
</DiscordMessage>
</DiscordMessages>\
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

**Arguments/Usage:**
<DiscordMessages>
<DiscordMessage profile="user"> &#36;give &lt;user ID or mentioned user&gt;
&lt;amount of coins&gt;
</DiscordMessage>
</DiscordMessages>\
**Cooldown:** 5 seconds\
**Permissions:** `send messages`, `read message history`, `view channel`

### inv

**Arguments/Usage:**
<DiscordMessages>
<DiscordMessage profile="user"> &#36;inv \[userID or mentioned user\]
</DiscordMessage>
</DiscordMessages>\
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

**Arguments/Usage:**
<DiscordMessages>
<DiscordMessage profile="user"> &#36;rob &lt;user ID or mentioned user to
rob&gt;
</DiscordMessage>
</DiscordMessages>\
**Cooldown:** 1 minute\
**Permissions:** `send messages`, `read message history`, `view channel`

### shop

**Arguments/Usage:**
<DiscordMessages>
<DiscordMessage profile="user"> &#36;shop \[category\]
</DiscordMessage>
</DiscordMessages>\
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

**Arguments/Usage:**
<DiscordMessages>
<DiscordMessage profile="user"> &#36;poll &lt;the poll&gt;
</DiscordMessage>
</DiscordMessages>\
**Cooldown:** 10 seconds\
**Permissions:** `send messages`, `read message history`, `view channel`

### reactionsnipe

Shows the last removed reaction from a message in this channel\
**Aliases:** rsnipe\
**Arguments/Usage:** None\
**Cooldown:** 0 ms\
**Permissions:** `send messages`, `read message history`, `view channel`

### role

**Arguments/Usage:**
<DiscordMessages>
<DiscordMessage profile="user"> &#36;role \[mentioned role OR role id OR role
name. defaults to @everyone\]
</DiscordMessage>
</DiscordMessages>\
**Cooldown:** 5 seconds\
**Permissions:** `send messages`, `read message history`, `view channel`

### roles

**Arguments/Usage:** None\
**Cooldown:** 3 seconds\
**Permissions:** `send messages`, `read message history`, `view channel`

### snipe

**Arguments/Usage:**
<DiscordMessages>
<DiscordMessage profile="user"> &#36;snipe \[type: embeds | attachments |
messages\]
</DiscordMessage>
</DiscordMessages>\
**Cooldown:** 3 seconds\
**Permissions:** `send messages`, `read message history`, `view channel`

### tex

Turns text into math\
**Aliases:** math, latex\
**Arguments/Usage:** None\
**Cooldown:** 1 second\
**Permissions:** `send messages`, `read message history`, `view channel`

### timer

**Arguments/Usage:**
<DiscordMessages>
<DiscordMessage profile="user"> &#36;timer &lt;timer length&gt;&lt;unit (short
or long)&gt; \[timer description\]
</DiscordMessage>
</DiscordMessages>\
**Cooldown:** 5 seconds\
**Permissions:** `send messages`, `read message history`, `view channel`

### unsnipe

**Arguments/Usage:** None\
**Cooldown:** 1 second\
**Permissions:** `send messages`, `read message history`, `view channel`

### vote2

**Arguments/Usage:**
<DiscordMessages>
<DiscordMessage profile="user"> &#36;vote2 &lt;title&gt; ...options separated by
commas
</DiscordMessage>
</DiscordMessages>\
**Cooldown:** 5 seconds\
**Permissions:** `send messages`, `read message history`, `view channel`

### weather

**Arguments/Usage:**
<DiscordMessages>
<DiscordMessage profile="user"> &#36;weather &lt;city&gt; \[time period (hourly,
daily. defaults to daily)\]
</DiscordMessage>
</DiscordMessages>\
**Cooldown:** 5 seconds\
**Permissions:** `send messages`, `read message history`, `view channel`

### whois

**Arguments/Usage:** None\
**Cooldown:** 3 seconds\
**Permissions:** `send messages`, `read message history`, `view channel`
