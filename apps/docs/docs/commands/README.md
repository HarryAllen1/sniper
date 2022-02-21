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

<!-- <Toc /> -->

<!-- DO NOT EDIT ANYTHING BELOW THIS LINE!!! -->
<!-- start generation -->
## General

### changelog



**Arguments/Usage:** 
<div class="discord-messages">
  <div class="discord-message">
    <div class="discord-message-content">
      <div class="discord-author-avatar">
				<img src="https://cdn.discordapp.com/embed/avatars/0.png" alt="" />
			</div>
      <div class="discord-message-body">
          <span class="discord-author-info">
            <span class="discord-author-username">
              User
            </span>
          </span>
          <span class="discord-message-timestamp">
            {{ new Date().toLocaleDateString() }}
					</span><br />
      &#36;changelog [number of changes to get. defaults to 5. this argument cannot go above 10.]
            </div>
          </div>
</div>
</div>

**Cooldown:** 5 seconds\
**Permissions:** `send messages`, `read message history`, `view channel`

### coinflip



**Arguments/Usage:** 
<div class="discord-messages">
  <div class="discord-message">
    <div class="discord-message-content">
      <div class="discord-author-avatar">
				<img src="https://cdn.discordapp.com/embed/avatars/0.png" alt="" />
			</div>
      <div class="discord-message-body">
          <span class="discord-author-info">
            <span class="discord-author-username">
              User
            </span>
          </span>
          <span class="discord-message-timestamp">
            {{ new Date().toLocaleDateString() }}
					</span><br />
      &#36;coinflip [heads or tails]
            </div>
          </div>
</div>
</div>

**Cooldown:** 500 ms\
**Permissions:** `send messages`, `read message history`, `view channel`

### createissue

Don't use this command. Just [submit a Github issue](https://github.com/MajesticString/sniper/issues).\
**Aliases:** issue, createproblem, problem\
**Arguments/Usage:** 
<div class="discord-messages">
  <div class="discord-message">
    <div class="discord-message-content">
      <div class="discord-author-avatar">
				<img src="https://cdn.discordapp.com/embed/avatars/0.png" alt="" />
			</div>
      <div class="discord-message-body">
          <span class="discord-author-info">
            <span class="discord-author-username">
              User
            </span>
          </span>
          <span class="discord-message-timestamp">
            {{ new Date().toLocaleDateString() }}
					</span><br />
      &#36;createissue &lt;issue&gt;: The issue with the bot.
            </div>
          </div>
</div>
</div>

**Cooldown:** 15 minutes\
**Permissions:** `send messages`, `read message history`, `view channel`

### define



**Arguments/Usage:** 
<div class="discord-messages">
  <div class="discord-message">
    <div class="discord-message-content">
      <div class="discord-author-avatar">
				<img src="https://cdn.discordapp.com/embed/avatars/0.png" alt="" />
			</div>
      <div class="discord-message-body">
          <span class="discord-author-info">
            <span class="discord-author-username">
              User
            </span>
          </span>
          <span class="discord-message-timestamp">
            {{ new Date().toLocaleDateString() }}
					</span><br />
      &#36;define &lt;word or term&gt; [dictionary to use (can be oxford, urban, or mw (which stands for Merriam Webster)). Defaults to Oxford]
            </div>
          </div>
</div>
</div>

**Cooldown:** 1 second\
**Permissions:** `send messages`, `read message history`, `view channel`

### deletealldata

Deletes all data associated with the bot. The only thing that will remain is your user ID.\
**Aliases:** deletemydata\
**Arguments/Usage:** None

**Cooldown:** 500 ms\
**Permissions:** `send messages`, `read message history`, `view channel`

### faq



**Arguments/Usage:** None

**Cooldown:** 1 second\
**Permissions:** `send messages`, `read message history`, `view channel`

### feature

Requests a feature\
**Aliases:** requestfeature, featurerequest\
**Arguments/Usage:** 
<div class="discord-messages">
  <div class="discord-message">
    <div class="discord-message-content">
      <div class="discord-author-avatar">
				<img src="https://cdn.discordapp.com/embed/avatars/0.png" alt="" />
			</div>
      <div class="discord-message-body">
          <span class="discord-author-info">
            <span class="discord-author-username">
              User
            </span>
          </span>
          <span class="discord-message-timestamp">
            {{ new Date().toLocaleDateString() }}
					</span><br />
      &#36;feature &lt;feature&gt;: The requested bot feature.
            </div>
          </div>
</div>
</div>

**Cooldown:** 15 minutes\
**Permissions:** `send messages`, `read message history`, `view channel`

### github



**Arguments/Usage:** None

**Cooldown:** 5 seconds\
**Permissions:** `send messages`, `read message history`, `view channel`

### help

Shows all commands and their descriptions\
**Aliases:** commands, command\
**Arguments/Usage:** 
<div class="discord-messages">
  <div class="discord-message">
    <div class="discord-message-content">
      <div class="discord-author-avatar">
				<img src="https://cdn.discordapp.com/embed/avatars/0.png" alt="" />
			</div>
      <div class="discord-message-body">
          <span class="discord-author-info">
            <span class="discord-author-username">
              User
            </span>
          </span>
          <span class="discord-message-timestamp">
            {{ new Date().toLocaleDateString() }}
					</span><br />
      &#36;help [category or command name]
            </div>
          </div>
</div>
</div>

**Cooldown:** 1 second\
**Permissions:** `send messages`, `read message history`, `view channel`

### invite



**Arguments/Usage:** None

**Cooldown:** 1 second\
**Permissions:** `send messages`, `read message history`, `view channel`

### meme



**Arguments/Usage:** None

**Cooldown:** 3 seconds\
**Permissions:** `send messages`, `read message history`, `view channel`

### prefix

Shows the prefixes that this bot has. Can also be used to set the prefixes. Prefixes must be separated by a space.\
**Aliases:** prefixes\
**Arguments/Usage:** 
<div class="discord-messages">
  <div class="discord-message">
    <div class="discord-message-content">
      <div class="discord-author-avatar">
				<img src="https://cdn.discordapp.com/embed/avatars/0.png" alt="" />
			</div>
      <div class="discord-message-body">
          <span class="discord-author-info">
            <span class="discord-author-username">
              User
            </span>
          </span>
          <span class="discord-message-timestamp">
            {{ new Date().toLocaleDateString() }}
					</span><br />
      &#36;prefix [prefix] [prefix] ...
            </div>
          </div>
</div>
</div>

**Cooldown:** 5 seconds\
**Permissions:** `send messages`, `read message history`, `view channel`

### pronounce



**Arguments/Usage:** None

**Cooldown:** 1 second\
**Permissions:** `send messages`, `read message history`, `view channel`

### say



**Arguments/Usage:** None

**Cooldown:** 10 seconds\
**Permissions:** `send messages`, `read message history`, `view channel`

### support

Gives an invite for the support server.\
**Aliases:** server, community\
**Arguments/Usage:** None

**Cooldown:** 5 seconds\
**Permissions:** `send messages`, `read message history`, `view channel`

### vote



**Arguments/Usage:** None

**Cooldown:** 3 seconds\
**Permissions:** `send messages`, `read message history`, `view channel`

## Restricted

### addcoins



**Arguments/Usage:** 
<div class="discord-messages">
  <div class="discord-message">
    <div class="discord-message-content">
      <div class="discord-author-avatar">
				<img src="https://cdn.discordapp.com/embed/avatars/0.png" alt="" />
			</div>
      <div class="discord-message-body">
          <span class="discord-author-info">
            <span class="discord-author-username">
              User
            </span>
          </span>
          <span class="discord-message-timestamp">
            {{ new Date().toLocaleDateString() }}
					</span><br />
      &#36;addcoins &lt;userID OR mentioned user&gt;
            </div>
          </div>
</div>
</div>

**Cooldown:** 0 ms\
**Permissions:** `send messages`, `read message history`, `view channel`

### eval



**Arguments/Usage:** None

**Cooldown:** 0 ms\
**Permissions:** `send messages`, `read message history`, `view channel`

### sudo



**Arguments/Usage:** 
<div class="discord-messages">
  <div class="discord-message">
    <div class="discord-message-content">
      <div class="discord-author-avatar">
				<img src="https://cdn.discordapp.com/embed/avatars/0.png" alt="" />
			</div>
      <div class="discord-message-body">
          <span class="discord-author-info">
            <span class="discord-author-username">
              User
            </span>
          </span>
          <span class="discord-message-timestamp">
            {{ new Date().toLocaleDateString() }}
					</span><br />
      &#36;sudo &lt;userID&gt; &lt;command&gt; [...args]
            </div>
          </div>
</div>
</div>

**Cooldown:** 0 ms\
**Permissions:** `send messages`, `read message history`, `view channel`

## Moderation

### ban



**Arguments/Usage:** 
<div class="discord-messages">
  <div class="discord-message">
    <div class="discord-message-content">
      <div class="discord-author-avatar">
				<img src="https://cdn.discordapp.com/embed/avatars/0.png" alt="" />
			</div>
      <div class="discord-message-body">
          <span class="discord-author-info">
            <span class="discord-author-username">
              User
            </span>
          </span>
          <span class="discord-message-timestamp">
            {{ new Date().toLocaleDateString() }}
					</span><br />
      &#36;ban &lt;@user or userID&gt; &lt;user&gt; &lt;user&gt; ...
            </div>
          </div>
</div>
</div>

**Cooldown:** 100 ms\
**Permissions:** `ban members`

### clear

Clears messages from a channel\
**Aliases:** purge\
**Arguments/Usage:** 
<div class="discord-messages">
  <div class="discord-message">
    <div class="discord-message-content">
      <div class="discord-author-avatar">
				<img src="https://cdn.discordapp.com/embed/avatars/0.png" alt="" />
			</div>
      <div class="discord-message-body">
          <span class="discord-author-info">
            <span class="discord-author-username">
              User
            </span>
          </span>
          <span class="discord-message-timestamp">
            {{ new Date().toLocaleDateString() }}
					</span><br />
      &#36;clear &lt;# of messages to clear&gt;
            </div>
          </div>
</div>
</div>

**Cooldown:** 0 ms\
**Permissions:** `send messages`, `read message history`, `view channel`

### kick



**Arguments/Usage:** 
<div class="discord-messages">
  <div class="discord-message">
    <div class="discord-message-content">
      <div class="discord-author-avatar">
				<img src="https://cdn.discordapp.com/embed/avatars/0.png" alt="" />
			</div>
      <div class="discord-message-body">
          <span class="discord-author-info">
            <span class="discord-author-username">
              User
            </span>
          </span>
          <span class="discord-message-timestamp">
            {{ new Date().toLocaleDateString() }}
					</span><br />
      &#36;kick &lt;user (user mention or username or id)&gt; ....
            </div>
          </div>
</div>
</div>

**Cooldown:** 100 ms\
**Permissions:** `kick members`

## Giveaways

### ~~gcreate~~
::: warning
This command is disabled
:::


**Arguments/Usage:** 
<div class="discord-messages">
  <div class="discord-message">
    <div class="discord-message-content">
      <div class="discord-author-avatar">
				<img src="https://cdn.discordapp.com/embed/avatars/0.png" alt="" />
			</div>
      <div class="discord-message-body">
          <span class="discord-author-info">
            <span class="discord-author-username">
              User
            </span>
          </span>
          <span class="discord-message-timestamp">
            {{ new Date().toLocaleDateString() }}
					</span><br />
      &#36;gcreate [time] [amount of winners] [prize]
            </div>
          </div>
</div>
</div>

**Cooldown:** 3 seconds\
**Permissions:** `send messages`, `read message history`, `view channel`

### ~~gEnd~~
::: warning
This command is disabled
:::


**Arguments/Usage:** 
<div class="discord-messages">
  <div class="discord-message">
    <div class="discord-message-content">
      <div class="discord-author-avatar">
				<img src="https://cdn.discordapp.com/embed/avatars/0.png" alt="" />
			</div>
      <div class="discord-message-body">
          <span class="discord-author-info">
            <span class="discord-author-username">
              User
            </span>
          </span>
          <span class="discord-message-timestamp">
            {{ new Date().toLocaleDateString() }}
					</span><br />
      &#36;gEnd &lt;message id&gt;
            </div>
          </div>
</div>
</div>

**Cooldown:** 0 ms\
**Permissions:** `send messages`, `read message history`, `view channel`

## Currency

### balance

Shows the current amount of coins you or someone else has.\
**Aliases:** bal\
**Arguments/Usage:** 
<div class="discord-messages">
  <div class="discord-message">
    <div class="discord-message-content">
      <div class="discord-author-avatar">
				<img src="https://cdn.discordapp.com/embed/avatars/0.png" alt="" />
			</div>
      <div class="discord-message-body">
          <span class="discord-author-info">
            <span class="discord-author-username">
              User
            </span>
          </span>
          <span class="discord-message-timestamp">
            {{ new Date().toLocaleDateString() }}
					</span><br />
      &#36;balance [mentioned user OR user ID]
            </div>
          </div>
</div>
</div>

**Cooldown:** 1 second\
**Permissions:** `send messages`, `read message history`, `view channel`

### bet



**Arguments/Usage:** None

**Cooldown:** 500 ms\
**Permissions:** `send messages`, `read message history`, `view channel`

### buy



**Arguments/Usage:** 
<div class="discord-messages">
  <div class="discord-message">
    <div class="discord-message-content">
      <div class="discord-author-avatar">
				<img src="https://cdn.discordapp.com/embed/avatars/0.png" alt="" />
			</div>
      <div class="discord-message-body">
          <span class="discord-author-info">
            <span class="discord-author-username">
              User
            </span>
          </span>
          <span class="discord-message-timestamp">
            {{ new Date().toLocaleDateString() }}
					</span><br />
      &#36;buy &lt;item&gt;
            </div>
          </div>
</div>
</div>

**Cooldown:** 250 ms\
**Permissions:** `send messages`, `read message history`, `view channel`

### crime



**Arguments/Usage:** None

**Cooldown:** 1 minute\
**Permissions:** `send messages`, `read message history`, `view channel`

### daily



**Arguments/Usage:** None

**Cooldown:** 1 day\
**Permissions:** `send messages`, `read message history`, `view channel`

### fortnite



**Arguments/Usage:** None

**Cooldown:** 5 seconds\
**Permissions:** `send messages`, `read message history`, `view channel`

### give



**Arguments/Usage:** 
<div class="discord-messages">
  <div class="discord-message">
    <div class="discord-message-content">
      <div class="discord-author-avatar">
				<img src="https://cdn.discordapp.com/embed/avatars/0.png" alt="" />
			</div>
      <div class="discord-message-body">
          <span class="discord-author-info">
            <span class="discord-author-username">
              User
            </span>
          </span>
          <span class="discord-message-timestamp">
            {{ new Date().toLocaleDateString() }}
					</span><br />
      &#36;give &lt;user ID or mentioned user&gt; &lt;amount of coins&gt;
            </div>
          </div>
</div>
</div>

**Cooldown:** 5 seconds\
**Permissions:** `send messages`, `read message history`, `view channel`

### inv



**Arguments/Usage:** 
<div class="discord-messages">
  <div class="discord-message">
    <div class="discord-message-content">
      <div class="discord-author-avatar">
				<img src="https://cdn.discordapp.com/embed/avatars/0.png" alt="" />
			</div>
      <div class="discord-message-body">
          <span class="discord-author-info">
            <span class="discord-author-username">
              User
            </span>
          </span>
          <span class="discord-message-timestamp">
            {{ new Date().toLocaleDateString() }}
					</span><br />
      &#36;inv [userID or mentioned user]
            </div>
          </div>
</div>
</div>

**Cooldown:** 0 ms\
**Permissions:** `send messages`, `read message history`, `view channel`

### jailbreak



**Arguments/Usage:** None

**Cooldown:** 15 minutes\
**Permissions:** `send messages`, `read message history`, `view channel`

### lb

Ranks people in order of wealth\
**Aliases:** leaderboards, leaderboard, rich, richest\
**Arguments/Usage:** None

**Cooldown:** 3 seconds\
**Permissions:** `send messages`, `read message history`, `view channel`

### rob



**Arguments/Usage:** 
<div class="discord-messages">
  <div class="discord-message">
    <div class="discord-message-content">
      <div class="discord-author-avatar">
				<img src="https://cdn.discordapp.com/embed/avatars/0.png" alt="" />
			</div>
      <div class="discord-message-body">
          <span class="discord-author-info">
            <span class="discord-author-username">
              User
            </span>
          </span>
          <span class="discord-message-timestamp">
            {{ new Date().toLocaleDateString() }}
					</span><br />
      &#36;rob &lt;user ID or mentioned user to rob&gt;
            </div>
          </div>
</div>
</div>

**Cooldown:** 1 minute\
**Permissions:** `send messages`, `read message history`, `view channel`

### shop



**Arguments/Usage:** 
<div class="discord-messages">
  <div class="discord-message">
    <div class="discord-message-content">
      <div class="discord-author-avatar">
				<img src="https://cdn.discordapp.com/embed/avatars/0.png" alt="" />
			</div>
      <div class="discord-message-body">
          <span class="discord-author-info">
            <span class="discord-author-username">
              User
            </span>
          </span>
          <span class="discord-message-timestamp">
            {{ new Date().toLocaleDateString() }}
					</span><br />
      &#36;shop [category]
            </div>
          </div>
</div>
</div>

**Cooldown:** 1 ms\
**Permissions:** `send messages`, `read message history`, `view channel`

### use



**Arguments/Usage:** None

**Cooldown:** 5 seconds\
**Permissions:** `send messages`, `read message history`, `view channel`

## Util

### bot



**Arguments/Usage:** None

**Cooldown:** 15 seconds\
**Permissions:** `send messages`, `read message history`, `view channel`

### editsnipe

After a message is edited, you can use this command to see the old message.\
**Aliases:** esnipe\
**Arguments/Usage:** None

**Cooldown:** 0 ms\
**Permissions:** `send messages`, `read message history`, `view channel`

### ping



**Arguments/Usage:** None

**Cooldown:** 5 seconds\
**Permissions:** `send messages`, `read message history`, `view channel`

### poll



**Arguments/Usage:** 
<div class="discord-messages">
  <div class="discord-message">
    <div class="discord-message-content">
      <div class="discord-author-avatar">
				<img src="https://cdn.discordapp.com/embed/avatars/0.png" alt="" />
			</div>
      <div class="discord-message-body">
          <span class="discord-author-info">
            <span class="discord-author-username">
              User
            </span>
          </span>
          <span class="discord-message-timestamp">
            {{ new Date().toLocaleDateString() }}
					</span><br />
      &#36;poll &lt;the poll&gt;
            </div>
          </div>
</div>
</div>

**Cooldown:** 10 seconds\
**Permissions:** `send messages`, `read message history`, `view channel`

### reactionsnipe

Shows the last removed reaction from a message in this channel\
**Aliases:** rsnipe\
**Arguments/Usage:** None

**Cooldown:** 0 ms\
**Permissions:** `send messages`, `read message history`, `view channel`

### role



**Arguments/Usage:** 
<div class="discord-messages">
  <div class="discord-message">
    <div class="discord-message-content">
      <div class="discord-author-avatar">
				<img src="https://cdn.discordapp.com/embed/avatars/0.png" alt="" />
			</div>
      <div class="discord-message-body">
          <span class="discord-author-info">
            <span class="discord-author-username">
              User
            </span>
          </span>
          <span class="discord-message-timestamp">
            {{ new Date().toLocaleDateString() }}
					</span><br />
      &#36;role [mentioned role OR role id OR role name. defaults to @everyone]
            </div>
          </div>
</div>
</div>

**Cooldown:** 5 seconds\
**Permissions:** `send messages`, `read message history`, `view channel`

### roles



**Arguments/Usage:** None

**Cooldown:** 3 seconds\
**Permissions:** `send messages`, `read message history`, `view channel`

### snipe



**Arguments/Usage:** 
<div class="discord-messages">
  <div class="discord-message">
    <div class="discord-message-content">
      <div class="discord-author-avatar">
				<img src="https://cdn.discordapp.com/embed/avatars/0.png" alt="" />
			</div>
      <div class="discord-message-body">
          <span class="discord-author-info">
            <span class="discord-author-username">
              User
            </span>
          </span>
          <span class="discord-message-timestamp">
            {{ new Date().toLocaleDateString() }}
					</span><br />
      &#36;snipe [type: embeds | attachments | messages]
            </div>
          </div>
</div>
</div>

**Cooldown:** 3 seconds\
**Permissions:** `send messages`, `read message history`, `view channel`

### tex

Turns text into math\
**Aliases:** math, latex\
**Arguments/Usage:** None

**Cooldown:** 1 second\
**Permissions:** `send messages`, `read message history`, `view channel`

### timer



**Arguments/Usage:** 
<div class="discord-messages">
  <div class="discord-message">
    <div class="discord-message-content">
      <div class="discord-author-avatar">
				<img src="https://cdn.discordapp.com/embed/avatars/0.png" alt="" />
			</div>
      <div class="discord-message-body">
          <span class="discord-author-info">
            <span class="discord-author-username">
              User
            </span>
          </span>
          <span class="discord-message-timestamp">
            {{ new Date().toLocaleDateString() }}
					</span><br />
      &#36;timer &lt;timer length&gt;&lt;unit (short or long)&gt; [timer description]
            </div>
          </div>
</div>
</div>

**Cooldown:** 5 seconds\
**Permissions:** `send messages`, `read message history`, `view channel`

### unsnipe



**Arguments/Usage:** None

**Cooldown:** 1 second\
**Permissions:** `send messages`, `read message history`, `view channel`

### vote2



**Arguments/Usage:** 
<div class="discord-messages">
  <div class="discord-message">
    <div class="discord-message-content">
      <div class="discord-author-avatar">
				<img src="https://cdn.discordapp.com/embed/avatars/0.png" alt="" />
			</div>
      <div class="discord-message-body">
          <span class="discord-author-info">
            <span class="discord-author-username">
              User
            </span>
          </span>
          <span class="discord-message-timestamp">
            {{ new Date().toLocaleDateString() }}
					</span><br />
      &#36;vote2 &lt;title&gt; ...options separated by commas
            </div>
          </div>
</div>
</div>

**Cooldown:** 5 seconds\
**Permissions:** `send messages`, `read message history`, `view channel`

### weather



**Arguments/Usage:** 
<div class="discord-messages">
  <div class="discord-message">
    <div class="discord-message-content">
      <div class="discord-author-avatar">
				<img src="https://cdn.discordapp.com/embed/avatars/0.png" alt="" />
			</div>
      <div class="discord-message-body">
          <span class="discord-author-info">
            <span class="discord-author-username">
              User
            </span>
          </span>
          <span class="discord-message-timestamp">
            {{ new Date().toLocaleDateString() }}
					</span><br />
      &#36;weather &lt;city&gt; [time period (hourly, daily. defaults to daily)]
            </div>
          </div>
</div>
</div>

**Cooldown:** 5 seconds\
**Permissions:** `send messages`, `read message history`, `view channel`

### whois



**Arguments/Usage:** None

**Cooldown:** 3 seconds\
**Permissions:** `send messages`, `read message history`, `view channel`
