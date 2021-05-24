const Discord = require("discord.js");
const token = require("./token.json").token;

var bae = {};
bae.client = new Discord.Client();
bae.reactions = require("./reactions.json");
bae.replies = {};
bae.randomReplies = {};
bae.commands = {};
bae.helpCommand = "help";
bae.commandList = "Available commands:";

bae.client.on("ready", init);
bae.client.on("message", handleMessage);
bae.client.login(token);

function init() {
	const config = require("./config.json");
	bae.admin = config.admin;
	bae.logChannel = config.logChannel;
	bae.prefix = config.prefix;

	const replies = require("./replies.json");
	for (let index = 0; index < replies.length; index++) {
		bae.replies[replies[index].command.toLowerCase()] = replies[index].reply;
		if ("description" in replies[index]) {
			bae.commandList += "\n`" + replies[index].command +
				"` - " + replies[index].description;
		}
	}

	const randomReplies = require("./randomReplies.json");
	for (let index = 0; index < randomReplies.length; index++) {
		bae.randomReplies[randomReplies[index].command.toLowerCase()] = randomReplies[index].replies;
		if ("description" in randomReplies[index]) {
			bae.commandList += "\n`" + randomReplies[index].command +
				"` - " + randomReplies[index].description;
		}
	}

	const commands = require("./commands.js");
	for (let index = 0; index < commands.length; index++) {
		let command = commands[index].command.toLowerCase();
		bae.commands[command] = {};
		if ("vars" in commands[index]) {
			bae.commands[command].vars = commands[index].vars;
		}
		bae.commands[command].handleMessage = commands[index].handleMessage;
		if ("description" in commands[index]) {
			bae.commandList += "\n`" + commands[index].command +
				"` - " + commands[index].description;
		}
	}

	bae.client.user.setPresence({
		status: "online",
		activity: {
			name: bae.prefix + bae.helpCommand
		}
	});
	bae.log("*Yawn* Good morning!");
}

function handleMessage(aMessage) {
	if (aMessage.content.substring(0, bae.prefix.length) !== bae.prefix) {
		const message = aMessage.content.toLowerCase();
		for (let index = 0; index < bae.reactions.length; index++) {
			if (message.includes(bae.reactions[index].word))
			{
				aMessage.react(bae.reactions[index].emoji[bae.random(bae.reactions[index].emoji.length)]);
			}
		}
		if (message.includes("gay")) {
			aMessage.react(bae.reactions[1].emoji[bae.random(bae.reactions[1].emoji.length)]);
		}
		if (message.includes("ace")) {
			aMessage.react(bae.reactions[5].emoji[bae.random(bae.reactions[5].emoji.length)]);
		}
		if (message.includes("bi") && !message.includes("binary") && !message.includes("lesbian")) {
			aMessage.react(bae.reactions[6].emoji[bae.random(bae.reactions[6].emoji.length)]);
		}
		if (message.includes("wlw")) {
			aMessage.react(bae.reactions[14].emoji[bae.random(bae.reactions[14].emoji.length)]);
		}
		if (message.includes("enby") || message.includes("non-binary")) {
			aMessage.react(bae.reactions[15].emoji[bae.random(bae.reactions[15].emoji.length)]);
		}
		if (message.includes("demi") && !(message.includes("demigender") ||
			message.includes("demiromantic") || message.includes("demisexual"))) {
			let index = bae.random(3) + 7;
			aMessage.react(bae.reactions[index].emoji[bae.random(bae.reactions[index].emoji.length)]);
		}
		return;
	}

	const input = aMessage.content.substring(bae.prefix.length, aMessage.content.length);
	var command = input.toLowerCase();

	if (command === "ping") {
		aMessage.channel.send("pong");
	} else if (command === bae.helpCommand) {
		aMessage.channel.send(bae.commandList);
	} else if (command in bae.replies) {
		aMessage.channel.send(bae.replies[command]);
	} else if (command in bae.randomReplies) {
		aMessage.channel.send(bae.randomReplies[command][bae.random(bae.randomReplies[command].length)]);
	} else {
		let spaceIndex = input.indexOf(" ");
		if (spaceIndex > 0) {
			command = input.substring(0, spaceIndex);
		}
		if (command in bae.commands) {
			bae.commands[command].handleMessage(aMessage, input, bae);
		}
	}
}

bae.random = function(aMax) {
	return Math.floor(Math.random() * aMax);
}

bae.log = function(aString) {
	console.log(aString);
	this.msg(this.logChannel, aString);
}

bae.isAdmin = function(aUser) {
	return aUser.id === this.admin;
}

bae.msg = function(aChannel, aString) {
	this.client.channels.fetch(aChannel).then(channel => {
		channel.send(aString);
	});
}

bae.dm = function(aUser, aString) {
	this.client.users.fetch(aUser).then(user => {
		user.send(aString);
	});
}
