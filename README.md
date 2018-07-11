# BaeBot
A simple Discord bot with some stupid commands. [Invite BaeBot to a server](https://discordapp.com/api/oauth2/authorize?client_id=423155396342054912&permissions=0&scope=bot).

## Requirements
To run this bot locally you will need [Node.js](https://nodejs.org/) and [Discord.js](https://discord.js.org/), or you can do like me and host it on [Glitch](https://glitch.com/). [Here's a nice guide](https://anidiotsguide_old.gitbooks.io/discord-js-bot-guide/content/other-guides/hosting-on-glitchcom.html), and [here you can see my bot hosted on Glitch](https://glitch.com/edit/#!/baebot).

You will also need to change the IDs in config.json and put your bot's token somewhere. On line 3 in BaeBot.js the token imports from a file named token.json (not in this repository), but you can put it wherever you want, as long as you keep it hidden. If you host your bot on [Glitch](https://glitch.com/) the token should be put the .env file.

## Commands
#### Listed Commands (do ;help to get this list)
* **rainbow** - makes a rainbow of hearts
* **invite** - gives you the link to add BaeBot to a server
* **pridemojis** - sends links to some custom pride emojis
* **card** - draws a card
* **magic** - casts a random magical effect from https://centralia.aquest.com/downloads/NLRMEv2.pdf
* **magicac** - casts wild magic from Anime Campaign (http://animecampaign.tk/)
* **rate** - rates anything
* **8ball** - answers your question
* **roll** - rolls die of specified size, e.g. *roll 20* or *roll 73*
* **say** - repeats your message
* **shout** - sends your message to BaeBot's creator

#### Admin Commands
* **servers** - lists all servers the bot is a member of
* **play** - sets the bot's playing status, e.g. *play Tetris*
* **stream** - sets bot's streaming status, specify url first, e.g. *stream diefonk Tetris*
* **listen** - sets the bot's listening status, e.g. *listen Korobeiniki*
* **watch** - sets the bot's watching status, e.g. *watch Koyaanisqatsi*
* **exit** - logs the bot out and shuts it down
