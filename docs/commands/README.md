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
