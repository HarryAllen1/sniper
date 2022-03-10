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
 
<details>
  <summary>Source</summary>

  [Source on Github](https://github.com/MajesticString/sniper/blob/main/apps/sniper/src/commands/general/ChangelogCommand.ts)
  
  [Edit in Github](https://github.com/MajesticString/sniper/edit/main/apps/sniper/src/commands/general/ChangelogCommand.ts)

  [Edit in Github.dev](https://github.dev/MajesticString/sniper/blob/main/apps/sniper/src/commands/general/ChangelogCommand.ts)

@[code ts](../../apps/sniper/src//commands/general/ChangelogCommand.ts)

</details>

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
 
<details>
  <summary>Source</summary>

  [Source on Github](https://github.com/MajesticString/sniper/blob/main/apps/sniper/src/commands/general/CoinflipCommand.ts)
  
  [Edit in Github](https://github.com/MajesticString/sniper/edit/main/apps/sniper/src/commands/general/CoinflipCommand.ts)

  [Edit in Github.dev](https://github.dev/MajesticString/sniper/blob/main/apps/sniper/src/commands/general/CoinflipCommand.ts)

@[code ts](../../apps/sniper/src//commands/general/CoinflipCommand.ts)

</details>

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
 
<details>
  <summary>Source</summary>

  [Source on Github](https://github.com/MajesticString/sniper/blob/main/apps/sniper/src/commands/general/CreateIssueCommand.ts)
  
  [Edit in Github](https://github.com/MajesticString/sniper/edit/main/apps/sniper/src/commands/general/CreateIssueCommand.ts)

  [Edit in Github.dev](https://github.dev/MajesticString/sniper/blob/main/apps/sniper/src/commands/general/CreateIssueCommand.ts)

@[code ts](../../apps/sniper/src//commands/general/CreateIssueCommand.ts)

</details>

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
 
<details>
  <summary>Source</summary>

  [Source on Github](https://github.com/MajesticString/sniper/blob/main/apps/sniper/src/commands/general/DefineCommand.ts)
  
  [Edit in Github](https://github.com/MajesticString/sniper/edit/main/apps/sniper/src/commands/general/DefineCommand.ts)

  [Edit in Github.dev](https://github.dev/MajesticString/sniper/blob/main/apps/sniper/src/commands/general/DefineCommand.ts)

@[code ts](../../apps/sniper/src//commands/general/DefineCommand.ts)

</details>

### deletealldata

Deletes all data associated with the bot. The only thing that will remain is your user ID.\
**Aliases:** deletemydata\
**Arguments/Usage:** None

**Cooldown:** 500 ms\
**Permissions:** `send messages`, `read message history`, `view channel`
 
<details>
  <summary>Source</summary>

  [Source on Github](https://github.com/MajesticString/sniper/blob/main/apps/sniper/src/commands/general/DeleteAllDataCommand.ts)
  
  [Edit in Github](https://github.com/MajesticString/sniper/edit/main/apps/sniper/src/commands/general/DeleteAllDataCommand.ts)

  [Edit in Github.dev](https://github.dev/MajesticString/sniper/blob/main/apps/sniper/src/commands/general/DeleteAllDataCommand.ts)

@[code ts](../../apps/sniper/src//commands/general/DeleteAllDataCommand.ts)

</details>

### faq



**Arguments/Usage:** None

**Cooldown:** 1 second\
**Permissions:** `send messages`, `read message history`, `view channel`
 
<details>
  <summary>Source</summary>

  [Source on Github](https://github.com/MajesticString/sniper/blob/main/apps/sniper/src/commands/general/FaqCommand.ts)
  
  [Edit in Github](https://github.com/MajesticString/sniper/edit/main/apps/sniper/src/commands/general/FaqCommand.ts)

  [Edit in Github.dev](https://github.dev/MajesticString/sniper/blob/main/apps/sniper/src/commands/general/FaqCommand.ts)

@[code ts](../../apps/sniper/src//commands/general/FaqCommand.ts)

</details>

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
 
<details>
  <summary>Source</summary>

  [Source on Github](https://github.com/MajesticString/sniper/blob/main/apps/sniper/src/commands/general/FeatureCommand.ts)
  
  [Edit in Github](https://github.com/MajesticString/sniper/edit/main/apps/sniper/src/commands/general/FeatureCommand.ts)

  [Edit in Github.dev](https://github.dev/MajesticString/sniper/blob/main/apps/sniper/src/commands/general/FeatureCommand.ts)

@[code ts](../../apps/sniper/src//commands/general/FeatureCommand.ts)

</details>

### github



**Arguments/Usage:** None

**Cooldown:** 5 seconds\
**Permissions:** `send messages`, `read message history`, `view channel`
 
<details>
  <summary>Source</summary>

  [Source on Github](https://github.com/MajesticString/sniper/blob/main/apps/sniper/src/commands/general/GithubCommand.ts)
  
  [Edit in Github](https://github.com/MajesticString/sniper/edit/main/apps/sniper/src/commands/general/GithubCommand.ts)

  [Edit in Github.dev](https://github.dev/MajesticString/sniper/blob/main/apps/sniper/src/commands/general/GithubCommand.ts)

@[code ts](../../apps/sniper/src//commands/general/GithubCommand.ts)

</details>

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
 
<details>
  <summary>Source</summary>

  [Source on Github](https://github.com/MajesticString/sniper/blob/main/apps/sniper/src/commands/general/HelpCommand.ts)
  
  [Edit in Github](https://github.com/MajesticString/sniper/edit/main/apps/sniper/src/commands/general/HelpCommand.ts)

  [Edit in Github.dev](https://github.dev/MajesticString/sniper/blob/main/apps/sniper/src/commands/general/HelpCommand.ts)

@[code ts](../../apps/sniper/src//commands/general/HelpCommand.ts)

</details>

### invite



**Arguments/Usage:** None

**Cooldown:** 1 second\
**Permissions:** `send messages`, `read message history`, `view channel`
 
<details>
  <summary>Source</summary>

  [Source on Github](https://github.com/MajesticString/sniper/blob/main/apps/sniper/src/commands/general/InviteCommand.ts)
  
  [Edit in Github](https://github.com/MajesticString/sniper/edit/main/apps/sniper/src/commands/general/InviteCommand.ts)

  [Edit in Github.dev](https://github.dev/MajesticString/sniper/blob/main/apps/sniper/src/commands/general/InviteCommand.ts)

@[code ts](../../apps/sniper/src//commands/general/InviteCommand.ts)

</details>

### meme



**Arguments/Usage:** None

**Cooldown:** 3 seconds\
**Permissions:** `send messages`, `read message history`, `view channel`
 
<details>
  <summary>Source</summary>

  [Source on Github](https://github.com/MajesticString/sniper/blob/main/apps/sniper/src/commands/general/MemeCommand.ts)
  
  [Edit in Github](https://github.com/MajesticString/sniper/edit/main/apps/sniper/src/commands/general/MemeCommand.ts)

  [Edit in Github.dev](https://github.dev/MajesticString/sniper/blob/main/apps/sniper/src/commands/general/MemeCommand.ts)

@[code ts](../../apps/sniper/src//commands/general/MemeCommand.ts)

</details>

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
 
<details>
  <summary>Source</summary>

  [Source on Github](https://github.com/MajesticString/sniper/blob/main/apps/sniper/src/commands/general/PrefixCommand.ts)
  
  [Edit in Github](https://github.com/MajesticString/sniper/edit/main/apps/sniper/src/commands/general/PrefixCommand.ts)

  [Edit in Github.dev](https://github.dev/MajesticString/sniper/blob/main/apps/sniper/src/commands/general/PrefixCommand.ts)

@[code ts](../../apps/sniper/src//commands/general/PrefixCommand.ts)

</details>

### pronounce



**Arguments/Usage:** None

**Cooldown:** 1 second\
**Permissions:** `send messages`, `read message history`, `view channel`
 
<details>
  <summary>Source</summary>

  [Source on Github](https://github.com/MajesticString/sniper/blob/main/apps/sniper/src/commands/general/PronounceCommand.ts)
  
  [Edit in Github](https://github.com/MajesticString/sniper/edit/main/apps/sniper/src/commands/general/PronounceCommand.ts)

  [Edit in Github.dev](https://github.dev/MajesticString/sniper/blob/main/apps/sniper/src/commands/general/PronounceCommand.ts)

@[code ts](../../apps/sniper/src//commands/general/PronounceCommand.ts)

</details>

### say



**Arguments/Usage:** None

**Cooldown:** 10 seconds\
**Permissions:** `send messages`, `read message history`, `view channel`
 
<details>
  <summary>Source</summary>

  [Source on Github](https://github.com/MajesticString/sniper/blob/main/apps/sniper/src/commands/general/SayCommand.ts)
  
  [Edit in Github](https://github.com/MajesticString/sniper/edit/main/apps/sniper/src/commands/general/SayCommand.ts)

  [Edit in Github.dev](https://github.dev/MajesticString/sniper/blob/main/apps/sniper/src/commands/general/SayCommand.ts)

@[code ts](../../apps/sniper/src//commands/general/SayCommand.ts)

</details>

### support

Gives an invite for the support server.\
**Aliases:** server, community\
**Arguments/Usage:** None

**Cooldown:** 5 seconds\
**Permissions:** `send messages`, `read message history`, `view channel`
 
<details>
  <summary>Source</summary>

  [Source on Github](https://github.com/MajesticString/sniper/blob/main/apps/sniper/src/commands/general/SupportCommand.ts)
  
  [Edit in Github](https://github.com/MajesticString/sniper/edit/main/apps/sniper/src/commands/general/SupportCommand.ts)

  [Edit in Github.dev](https://github.dev/MajesticString/sniper/blob/main/apps/sniper/src/commands/general/SupportCommand.ts)

@[code ts](../../apps/sniper/src//commands/general/SupportCommand.ts)

</details>

### vote



**Arguments/Usage:** None

**Cooldown:** 3 seconds\
**Permissions:** `send messages`, `read message history`, `view channel`
 
<details>
  <summary>Source</summary>

  [Source on Github](https://github.com/MajesticString/sniper/blob/main/apps/sniper/src/commands/general/VoteCommand.ts)
  
  [Edit in Github](https://github.com/MajesticString/sniper/edit/main/apps/sniper/src/commands/general/VoteCommand.ts)

  [Edit in Github.dev](https://github.dev/MajesticString/sniper/blob/main/apps/sniper/src/commands/general/VoteCommand.ts)

@[code ts](../../apps/sniper/src//commands/general/VoteCommand.ts)

</details>

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
 
<details>
  <summary>Source</summary>

  [Source on Github](https://github.com/MajesticString/sniper/blob/main/apps/sniper/src/commands/moderation/BanCommand.ts)
  
  [Edit in Github](https://github.com/MajesticString/sniper/edit/main/apps/sniper/src/commands/moderation/BanCommand.ts)

  [Edit in Github.dev](https://github.dev/MajesticString/sniper/blob/main/apps/sniper/src/commands/moderation/BanCommand.ts)

@[code ts](../../apps/sniper/src//commands/moderation/BanCommand.ts)

</details>

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
 
<details>
  <summary>Source</summary>

  [Source on Github](https://github.com/MajesticString/sniper/blob/main/apps/sniper/src/commands/moderation/ClearCommand.ts)
  
  [Edit in Github](https://github.com/MajesticString/sniper/edit/main/apps/sniper/src/commands/moderation/ClearCommand.ts)

  [Edit in Github.dev](https://github.dev/MajesticString/sniper/blob/main/apps/sniper/src/commands/moderation/ClearCommand.ts)

@[code ts](../../apps/sniper/src//commands/moderation/ClearCommand.ts)

</details>

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
 
<details>
  <summary>Source</summary>

  [Source on Github](https://github.com/MajesticString/sniper/blob/main/apps/sniper/src/commands/moderation/KickCommand.ts)
  
  [Edit in Github](https://github.com/MajesticString/sniper/edit/main/apps/sniper/src/commands/moderation/KickCommand.ts)

  [Edit in Github.dev](https://github.dev/MajesticString/sniper/blob/main/apps/sniper/src/commands/moderation/KickCommand.ts)

@[code ts](../../apps/sniper/src//commands/moderation/KickCommand.ts)

</details>

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
 
<details>
  <summary>Source</summary>

  [Source on Github](https://github.com/MajesticString/sniper/blob/main/apps/sniper/src/commands/giveaways/GCreateCommand.ts)
  
  [Edit in Github](https://github.com/MajesticString/sniper/edit/main/apps/sniper/src/commands/giveaways/GCreateCommand.ts)

  [Edit in Github.dev](https://github.dev/MajesticString/sniper/blob/main/apps/sniper/src/commands/giveaways/GCreateCommand.ts)

@[code ts](../../apps/sniper/src//commands/giveaways/GCreateCommand.ts)

</details>

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
 
<details>
  <summary>Source</summary>

  [Source on Github](https://github.com/MajesticString/sniper/blob/main/apps/sniper/src/commands/giveaways/GEndCommand.ts)
  
  [Edit in Github](https://github.com/MajesticString/sniper/edit/main/apps/sniper/src/commands/giveaways/GEndCommand.ts)

  [Edit in Github.dev](https://github.dev/MajesticString/sniper/blob/main/apps/sniper/src/commands/giveaways/GEndCommand.ts)

@[code ts](../../apps/sniper/src//commands/giveaways/GEndCommand.ts)

</details>

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
 
<details>
  <summary>Source</summary>

  [Source on Github](https://github.com/MajesticString/sniper/blob/main/apps/sniper/src/commands/restricted/AddCoinsCommand.ts)
  
  [Edit in Github](https://github.com/MajesticString/sniper/edit/main/apps/sniper/src/commands/restricted/AddCoinsCommand.ts)

  [Edit in Github.dev](https://github.dev/MajesticString/sniper/blob/main/apps/sniper/src/commands/restricted/AddCoinsCommand.ts)

@[code ts](../../apps/sniper/src//commands/restricted/AddCoinsCommand.ts)

</details>

### eval



**Arguments/Usage:** None

**Cooldown:** 0 ms\
**Permissions:** `send messages`, `read message history`, `view channel`
 
<details>
  <summary>Source</summary>

  [Source on Github](https://github.com/MajesticString/sniper/blob/main/apps/sniper/src/commands/restricted/EvalCommand.ts)
  
  [Edit in Github](https://github.com/MajesticString/sniper/edit/main/apps/sniper/src/commands/restricted/EvalCommand.ts)

  [Edit in Github.dev](https://github.dev/MajesticString/sniper/blob/main/apps/sniper/src/commands/restricted/EvalCommand.ts)

@[code ts](../../apps/sniper/src//commands/restricted/EvalCommand.ts)

</details>

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
 
<details>
  <summary>Source</summary>

  [Source on Github](https://github.com/MajesticString/sniper/blob/main/apps/sniper/src/commands/restricted/SudoCommand.ts)
  
  [Edit in Github](https://github.com/MajesticString/sniper/edit/main/apps/sniper/src/commands/restricted/SudoCommand.ts)

  [Edit in Github.dev](https://github.dev/MajesticString/sniper/blob/main/apps/sniper/src/commands/restricted/SudoCommand.ts)

@[code ts](../../apps/sniper/src//commands/restricted/SudoCommand.ts)

</details>

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
 
<details>
  <summary>Source</summary>

  [Source on Github](https://github.com/MajesticString/sniper/blob/main/apps/sniper/src/commands/currency/BalanceCommand.ts)
  
  [Edit in Github](https://github.com/MajesticString/sniper/edit/main/apps/sniper/src/commands/currency/BalanceCommand.ts)

  [Edit in Github.dev](https://github.dev/MajesticString/sniper/blob/main/apps/sniper/src/commands/currency/BalanceCommand.ts)

@[code ts](../../apps/sniper/src//commands/currency/BalanceCommand.ts)

</details>

### bet



**Arguments/Usage:** None

**Cooldown:** 500 ms\
**Permissions:** `send messages`, `read message history`, `view channel`
 
<details>
  <summary>Source</summary>

  [Source on Github](https://github.com/MajesticString/sniper/blob/main/apps/sniper/src/commands/currency/BetCommand.ts)
  
  [Edit in Github](https://github.com/MajesticString/sniper/edit/main/apps/sniper/src/commands/currency/BetCommand.ts)

  [Edit in Github.dev](https://github.dev/MajesticString/sniper/blob/main/apps/sniper/src/commands/currency/BetCommand.ts)

@[code ts](../../apps/sniper/src//commands/currency/BetCommand.ts)

</details>

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
 
<details>
  <summary>Source</summary>

  [Source on Github](https://github.com/MajesticString/sniper/blob/main/apps/sniper/src/commands/currency/BuyCommand.ts)
  
  [Edit in Github](https://github.com/MajesticString/sniper/edit/main/apps/sniper/src/commands/currency/BuyCommand.ts)

  [Edit in Github.dev](https://github.dev/MajesticString/sniper/blob/main/apps/sniper/src/commands/currency/BuyCommand.ts)

@[code ts](../../apps/sniper/src//commands/currency/BuyCommand.ts)

</details>

### crime



**Arguments/Usage:** None

**Cooldown:** 1 minute\
**Permissions:** `send messages`, `read message history`, `view channel`
 
<details>
  <summary>Source</summary>

  [Source on Github](https://github.com/MajesticString/sniper/blob/main/apps/sniper/src/commands/currency/CrimeCommand.ts)
  
  [Edit in Github](https://github.com/MajesticString/sniper/edit/main/apps/sniper/src/commands/currency/CrimeCommand.ts)

  [Edit in Github.dev](https://github.dev/MajesticString/sniper/blob/main/apps/sniper/src/commands/currency/CrimeCommand.ts)

@[code ts](../../apps/sniper/src//commands/currency/CrimeCommand.ts)

</details>

### daily



**Arguments/Usage:** None

**Cooldown:** 1 day\
**Permissions:** `send messages`, `read message history`, `view channel`
 
<details>
  <summary>Source</summary>

  [Source on Github](https://github.com/MajesticString/sniper/blob/main/apps/sniper/src/commands/currency/DailyCommand.ts)
  
  [Edit in Github](https://github.com/MajesticString/sniper/edit/main/apps/sniper/src/commands/currency/DailyCommand.ts)

  [Edit in Github.dev](https://github.dev/MajesticString/sniper/blob/main/apps/sniper/src/commands/currency/DailyCommand.ts)

@[code ts](../../apps/sniper/src//commands/currency/DailyCommand.ts)

</details>

### fortnite



**Arguments/Usage:** None

**Cooldown:** 5 seconds\
**Permissions:** `send messages`, `read message history`, `view channel`
 
<details>
  <summary>Source</summary>

  [Source on Github](https://github.com/MajesticString/sniper/blob/main/apps/sniper/src/commands/currency/FortniteCommand.ts)
  
  [Edit in Github](https://github.com/MajesticString/sniper/edit/main/apps/sniper/src/commands/currency/FortniteCommand.ts)

  [Edit in Github.dev](https://github.dev/MajesticString/sniper/blob/main/apps/sniper/src/commands/currency/FortniteCommand.ts)

@[code ts](../../apps/sniper/src//commands/currency/FortniteCommand.ts)

</details>

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
 
<details>
  <summary>Source</summary>

  [Source on Github](https://github.com/MajesticString/sniper/blob/main/apps/sniper/src/commands/currency/GiveCommand.ts)
  
  [Edit in Github](https://github.com/MajesticString/sniper/edit/main/apps/sniper/src/commands/currency/GiveCommand.ts)

  [Edit in Github.dev](https://github.dev/MajesticString/sniper/blob/main/apps/sniper/src/commands/currency/GiveCommand.ts)

@[code ts](../../apps/sniper/src//commands/currency/GiveCommand.ts)

</details>

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
 
<details>
  <summary>Source</summary>

  [Source on Github](https://github.com/MajesticString/sniper/blob/main/apps/sniper/src/commands/currency/InvCommand.ts)
  
  [Edit in Github](https://github.com/MajesticString/sniper/edit/main/apps/sniper/src/commands/currency/InvCommand.ts)

  [Edit in Github.dev](https://github.dev/MajesticString/sniper/blob/main/apps/sniper/src/commands/currency/InvCommand.ts)

@[code ts](../../apps/sniper/src//commands/currency/InvCommand.ts)

</details>

### jailbreak



**Arguments/Usage:** None

**Cooldown:** 15 minutes\
**Permissions:** `send messages`, `read message history`, `view channel`
 
<details>
  <summary>Source</summary>

  [Source on Github](https://github.com/MajesticString/sniper/blob/main/apps/sniper/src/commands/currency/JailBreakCommand.ts)
  
  [Edit in Github](https://github.com/MajesticString/sniper/edit/main/apps/sniper/src/commands/currency/JailBreakCommand.ts)

  [Edit in Github.dev](https://github.dev/MajesticString/sniper/blob/main/apps/sniper/src/commands/currency/JailBreakCommand.ts)

@[code ts](../../apps/sniper/src//commands/currency/JailBreakCommand.ts)

</details>

### lb

Ranks people in order of wealth\
**Aliases:** leaderboards, leaderboard, rich, richest\
**Arguments/Usage:** None

**Cooldown:** 3 seconds\
**Permissions:** `send messages`, `read message history`, `view channel`
 
<details>
  <summary>Source</summary>

  [Source on Github](https://github.com/MajesticString/sniper/blob/main/apps/sniper/src/commands/currency/LbCommand.ts)
  
  [Edit in Github](https://github.com/MajesticString/sniper/edit/main/apps/sniper/src/commands/currency/LbCommand.ts)

  [Edit in Github.dev](https://github.dev/MajesticString/sniper/blob/main/apps/sniper/src/commands/currency/LbCommand.ts)

@[code ts](../../apps/sniper/src//commands/currency/LbCommand.ts)

</details>

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
 
<details>
  <summary>Source</summary>

  [Source on Github](https://github.com/MajesticString/sniper/blob/main/apps/sniper/src/commands/currency/RobCommand.ts)
  
  [Edit in Github](https://github.com/MajesticString/sniper/edit/main/apps/sniper/src/commands/currency/RobCommand.ts)

  [Edit in Github.dev](https://github.dev/MajesticString/sniper/blob/main/apps/sniper/src/commands/currency/RobCommand.ts)

@[code ts](../../apps/sniper/src//commands/currency/RobCommand.ts)

</details>

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
 
<details>
  <summary>Source</summary>

  [Source on Github](https://github.com/MajesticString/sniper/blob/main/apps/sniper/src/commands/currency/ShopCommand.ts)
  
  [Edit in Github](https://github.com/MajesticString/sniper/edit/main/apps/sniper/src/commands/currency/ShopCommand.ts)

  [Edit in Github.dev](https://github.dev/MajesticString/sniper/blob/main/apps/sniper/src/commands/currency/ShopCommand.ts)

@[code ts](../../apps/sniper/src//commands/currency/ShopCommand.ts)

</details>

### use



**Arguments/Usage:** None

**Cooldown:** 5 seconds\
**Permissions:** `send messages`, `read message history`, `view channel`
 
<details>
  <summary>Source</summary>

  [Source on Github](https://github.com/MajesticString/sniper/blob/main/apps/sniper/src/commands/currency/UseCommand.ts)
  
  [Edit in Github](https://github.com/MajesticString/sniper/edit/main/apps/sniper/src/commands/currency/UseCommand.ts)

  [Edit in Github.dev](https://github.dev/MajesticString/sniper/blob/main/apps/sniper/src/commands/currency/UseCommand.ts)

@[code ts](../../apps/sniper/src//commands/currency/UseCommand.ts)

</details>

## Util

### bot



**Arguments/Usage:** None

**Cooldown:** 15 seconds\
**Permissions:** `send messages`, `read message history`, `view channel`
 
<details>
  <summary>Source</summary>

  [Source on Github](https://github.com/MajesticString/sniper/blob/main/apps/sniper/src/commands/util/BotCommand.ts)
  
  [Edit in Github](https://github.com/MajesticString/sniper/edit/main/apps/sniper/src/commands/util/BotCommand.ts)

  [Edit in Github.dev](https://github.dev/MajesticString/sniper/blob/main/apps/sniper/src/commands/util/BotCommand.ts)

@[code ts](../../apps/sniper/src//commands/util/BotCommand.ts)

</details>

### editsnipe

After a message is edited, you can use this command to see the old message.\
**Aliases:** esnipe\
**Arguments/Usage:** None

**Cooldown:** 0 ms\
**Permissions:** `send messages`, `read message history`, `view channel`
 
<details>
  <summary>Source</summary>

  [Source on Github](https://github.com/MajesticString/sniper/blob/main/apps/sniper/src/commands/util/EditsnipeCommand.ts)
  
  [Edit in Github](https://github.com/MajesticString/sniper/edit/main/apps/sniper/src/commands/util/EditsnipeCommand.ts)

  [Edit in Github.dev](https://github.dev/MajesticString/sniper/blob/main/apps/sniper/src/commands/util/EditsnipeCommand.ts)

@[code ts](../../apps/sniper/src//commands/util/EditsnipeCommand.ts)

</details>

### ping



**Arguments/Usage:** None

**Cooldown:** 5 seconds\
**Permissions:** `send messages`, `read message history`, `view channel`
 
<details>
  <summary>Source</summary>

  [Source on Github](https://github.com/MajesticString/sniper/blob/main/apps/sniper/src/commands/util/PingCommand.ts)
  
  [Edit in Github](https://github.com/MajesticString/sniper/edit/main/apps/sniper/src/commands/util/PingCommand.ts)

  [Edit in Github.dev](https://github.dev/MajesticString/sniper/blob/main/apps/sniper/src/commands/util/PingCommand.ts)

@[code ts](../../apps/sniper/src//commands/util/PingCommand.ts)

</details>

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
 
<details>
  <summary>Source</summary>

  [Source on Github](https://github.com/MajesticString/sniper/blob/main/apps/sniper/src/commands/util/PollCommand.ts)
  
  [Edit in Github](https://github.com/MajesticString/sniper/edit/main/apps/sniper/src/commands/util/PollCommand.ts)

  [Edit in Github.dev](https://github.dev/MajesticString/sniper/blob/main/apps/sniper/src/commands/util/PollCommand.ts)

@[code ts](../../apps/sniper/src//commands/util/PollCommand.ts)

</details>

### reactionsnipe

Shows the last removed reaction from a message in this channel\
**Aliases:** rsnipe\
**Arguments/Usage:** None

**Cooldown:** 0 ms\
**Permissions:** `send messages`, `read message history`, `view channel`
 
<details>
  <summary>Source</summary>

  [Source on Github](https://github.com/MajesticString/sniper/blob/main/apps/sniper/src/commands/util/ReactionsnipeCommand.ts)
  
  [Edit in Github](https://github.com/MajesticString/sniper/edit/main/apps/sniper/src/commands/util/ReactionsnipeCommand.ts)

  [Edit in Github.dev](https://github.dev/MajesticString/sniper/blob/main/apps/sniper/src/commands/util/ReactionsnipeCommand.ts)

@[code ts](../../apps/sniper/src//commands/util/ReactionsnipeCommand.ts)

</details>

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
 
<details>
  <summary>Source</summary>

  [Source on Github](https://github.com/MajesticString/sniper/blob/main/apps/sniper/src/commands/util/RoleCommand.ts)
  
  [Edit in Github](https://github.com/MajesticString/sniper/edit/main/apps/sniper/src/commands/util/RoleCommand.ts)

  [Edit in Github.dev](https://github.dev/MajesticString/sniper/blob/main/apps/sniper/src/commands/util/RoleCommand.ts)

@[code ts](../../apps/sniper/src//commands/util/RoleCommand.ts)

</details>

### roles



**Arguments/Usage:** None

**Cooldown:** 3 seconds\
**Permissions:** `send messages`, `read message history`, `view channel`
 
<details>
  <summary>Source</summary>

  [Source on Github](https://github.com/MajesticString/sniper/blob/main/apps/sniper/src/commands/util/RolesCommand.ts)
  
  [Edit in Github](https://github.com/MajesticString/sniper/edit/main/apps/sniper/src/commands/util/RolesCommand.ts)

  [Edit in Github.dev](https://github.dev/MajesticString/sniper/blob/main/apps/sniper/src/commands/util/RolesCommand.ts)

@[code ts](../../apps/sniper/src//commands/util/RolesCommand.ts)

</details>

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
 
<details>
  <summary>Source</summary>

  [Source on Github](https://github.com/MajesticString/sniper/blob/main/apps/sniper/src/commands/util/SnipeCommand.ts)
  
  [Edit in Github](https://github.com/MajesticString/sniper/edit/main/apps/sniper/src/commands/util/SnipeCommand.ts)

  [Edit in Github.dev](https://github.dev/MajesticString/sniper/blob/main/apps/sniper/src/commands/util/SnipeCommand.ts)

@[code ts](../../apps/sniper/src//commands/util/SnipeCommand.ts)

</details>

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
 
<details>
  <summary>Source</summary>

  [Source on Github](https://github.com/MajesticString/sniper/blob/main/apps/sniper/src/commands/util/TimerCommand.ts)
  
  [Edit in Github](https://github.com/MajesticString/sniper/edit/main/apps/sniper/src/commands/util/TimerCommand.ts)

  [Edit in Github.dev](https://github.dev/MajesticString/sniper/blob/main/apps/sniper/src/commands/util/TimerCommand.ts)

@[code ts](../../apps/sniper/src//commands/util/TimerCommand.ts)

</details>

### unsnipe



**Arguments/Usage:** None

**Cooldown:** 1 second\
**Permissions:** `send messages`, `read message history`, `view channel`
 
<details>
  <summary>Source</summary>

  [Source on Github](https://github.com/MajesticString/sniper/blob/main/apps/sniper/src/commands/util/UnSnipeCommand.ts)
  
  [Edit in Github](https://github.com/MajesticString/sniper/edit/main/apps/sniper/src/commands/util/UnSnipeCommand.ts)

  [Edit in Github.dev](https://github.dev/MajesticString/sniper/blob/main/apps/sniper/src/commands/util/UnSnipeCommand.ts)

@[code ts](../../apps/sniper/src//commands/util/UnSnipeCommand.ts)

</details>

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
 
<details>
  <summary>Source</summary>

  [Source on Github](https://github.com/MajesticString/sniper/blob/main/apps/sniper/src/commands/util/VoteCommand.ts)
  
  [Edit in Github](https://github.com/MajesticString/sniper/edit/main/apps/sniper/src/commands/util/VoteCommand.ts)

  [Edit in Github.dev](https://github.dev/MajesticString/sniper/blob/main/apps/sniper/src/commands/util/VoteCommand.ts)

@[code ts](../../apps/sniper/src//commands/util/VoteCommand.ts)

</details>

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
 
<details>
  <summary>Source</summary>

  [Source on Github](https://github.com/MajesticString/sniper/blob/main/apps/sniper/src/commands/util/WeatherCommand.ts)
  
  [Edit in Github](https://github.com/MajesticString/sniper/edit/main/apps/sniper/src/commands/util/WeatherCommand.ts)

  [Edit in Github.dev](https://github.dev/MajesticString/sniper/blob/main/apps/sniper/src/commands/util/WeatherCommand.ts)

@[code ts](../../apps/sniper/src//commands/util/WeatherCommand.ts)

</details>

### whois



**Arguments/Usage:** None

**Cooldown:** 3 seconds\
**Permissions:** `send messages`, `read message history`, `view channel`
 
<details>
  <summary>Source</summary>

  [Source on Github](https://github.com/MajesticString/sniper/blob/main/apps/sniper/src/commands/util/WhoisCommand.ts)
  
  [Edit in Github](https://github.com/MajesticString/sniper/edit/main/apps/sniper/src/commands/util/WhoisCommand.ts)

  [Edit in Github.dev](https://github.dev/MajesticString/sniper/blob/main/apps/sniper/src/commands/util/WhoisCommand.ts)

@[code ts](../../apps/sniper/src//commands/util/WhoisCommand.ts)

</details>
