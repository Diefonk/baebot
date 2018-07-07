const Discord = require("discord.js");
const myClient = new Discord.Client();
const myToken = require("./token.json").token;

const myReactions = require("./reactions.json");
var myReplies = {};
var myRandomReplies = {};
var myCommands = {};
var myCommandList = "Available commands:";

const myPrefix = ";";
const myHelpCommand = "help";

myClient.on("ready", init);
myClient.on("message", handleMessage);
myClient.login(myToken);

function init() {
	myCommandList += "\n`ping` - replies \"pong\"";

	const replies = require("./replies.json");
	for (let index = 0; index < replies.length; index++) {
		myReplies[replies[index].command.toLowerCase()] = replies[index].reply;
		if ("description" in replies[index]) {
			myCommandList += "\n`" + replies[index].command +
				"` - " + replies[index].description;
		}
	}

	const randomReplies = require("./randomReplies.json");
	for (let index = 0; index < randomReplies.length; index++) {
		myRandomReplies[randomReplies[index].command.toLowerCase()] = randomReplies[index].replies;
		if ("description" in randomReplies[index]) {
			myCommandList += "\n`" + randomReplies[index].command +
				"` - " + randomReplies[index].description;
		}
	}

	const commands = require("./commands.js");
	for (let index = 0; index < commands.length; index++) {
		let command = commands[index].command.toLowerCase();
		myCommands[command] = {};
		if ("vars" in commands[index]) {
			myCommands[command].vars = commands[index].vars;
		}
		myCommands[command].handleMessage = commands[index].handleMessage;
		if ("description" in commands[index]) {
			myCommandList += "\n`" + commands[index].command +
				"` - " + commands[index].description;
		}
	}

	myClient.user.setPresence({ status: "online", game: { name: myPrefix + myHelpCommand } });
	console.log("*Yawn* Good morning!");
	myClient.guilds.get("167731523200483328").channels.get("250383758602141697").send("*Yawn* Good morning!");
}

function handleMessage(aMessage) {
	if (aMessage.content.substring(0, myPrefix.length) !== myPrefix) {
		for (let index = 0; index < myReactions.length; index++) {
			if (aMessage.content.toLowerCase().includes(myReactions[index].word))
			{
				aMessage.react(myReactions[index].emojis[random(myReactions[index].emojis.length)]);
			}
		}
		return;
	}

	const input = aMessage.content.substring(myPrefix.length, aMessage.content.length);
	console.log("Command received: " + input);
	if (aMessage.author.id !== "110880316444381184") {
		myClient.guilds.get("167731523200483328").channels.get("250383758602141697").send("Command received: " + input);
	}
	var command = input.toLowerCase();

	if (command === "ping") {
		aMessage.channel.send("pong");
	} else if (command === myHelpCommand) {
		aMessage.channel.send(myCommandList);
	} else if (command in myReplies) {
		aMessage.channel.send(myReplies[command]);
	} else if (command in myRandomReplies) {
		aMessage.channel.send(myRandomReplies[command][random(myRandomReplies[command].length)]);
	} else {
		let spaceIndex = input.indexOf(" ");
		if (spaceIndex > 0) {
			command = input.substring(0, spaceIndex);
		}
		if (command in myCommands) {
			myCommands[command].handleMessage(aMessage, input, myClient);
		}
	}
}

function random(aMax) {
	return Math.floor(Math.random() * aMax);
}
