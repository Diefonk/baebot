module.exports = [
	{
		command: "rate",
		description: "rates anything",
		vars: {
			random: function(aMax) {
				return Math.floor(Math.random() * aMax);
			}
		},
		handleMessage: function(aMessage, aInput, aClient) {
			var output;
			if (aInput.length > 5) {
				const input = aInput.substring(5, aInput.length);
				//TODO - make more interesting
				const total = this.vars.random(100) + 1;
				const rating = this.vars.random(total + 1);
				output = "📊 I'd give " + input + " a " + rating + "/" + total;
			} else {
				output = "The `rate` command requires something to rate\nFor example: `rate " + aMessage.author.username + "`";
			}
			aMessage.channel.send(output);
		}
	},
	{
		command: "8ball",
		description: "answers your question",
		vars: {
			random: function(aMax) {
				return Math.floor(Math.random() * aMax);
			},
			answers: [
				"Maybe",
				"I don't know",
				"Reply hazy try again",
				"Ask again later",
				"Better not tell you now",
				"Cannot predict now",
				"Concentrate and ask again",
				"That's a very difficult question",
				"I have no idea",
				"Hmm...",
				"Why would you ask that?"
			]
		},
		handleMessage: function(aMessage, aInput, aClient) {
			var output;
			if (aInput.length > 6) {
				output = "🎱 " + this.vars.answers[this.vars.random(this.vars.answers.length)];
			} else {
				output = "The `8ball` command requires a question\nFor example: `8ball is " + aMessage.author.username + " stupid?`";
			}
			aMessage.channel.send(output);
		}
	},
	{
		command: "roll",
		description: "rolls die of specified size, e.g. `roll 20` or `roll 73`",
		vars: {
			random: function(aMax) {
				return Math.floor(Math.random() * aMax);
			}
		},
		handleMessage: function(aMessage, aInput, aClient) {
			var output;
			var dieSize = 0;
			if (aInput.length > 5) {
				dieSize = Number(aInput.substring(5, aInput.length));
			}
			if (!isNaN(dieSize) && dieSize > 0) {
				output = "🎲 " + aMessage.author.username + " rolled a `" + (this.vars.random(dieSize) + 1) + "`";
			} else {
				output = "The `roll` command requires a number (larger than 0)\nFor example: `roll " + (this.vars.random(100) + 1) + "`";
			}
			aMessage.channel.send(output);
		}
	},
	{
		command: "say",
		description: "repeats your message",
		handleMessage: function(aMessage, aInput, aClient) {
			var output;
			if (aInput.length > 4) {
				output = aInput.substring(4, aInput.length);
		    } else {
				output = "The `say` command needs something to say\nFor example: `say supercalifragilisticexpialidocious`";
		    }
			aMessage.channel.send(output);
		}
	},
	{
		command: "shout",
		description: "sends your message to BaeBot's creator",
		handleMessage: function(aMessage, aInput, aClient) {
			if (aInput.length > 6) {
				aInput = aInput.substring(6, aInput.length);
				aClient.users.get("110880316444381184").send("\"" + aInput + "\"" + " - " + aMessage.author.username + "#" + aMessage.author.discriminator);
				aMessage.react("✅");
			} else {
				aMessage.channel.send("The `shout` command needs something to shout\nFor example: `shout Hello from the other side`");
			}
		}
	},
	{
		command: "servers",
		handleMessage: function(aMessage, aInput, aClient) {
			if (aMessage.author.id !== "110880316444381184") {
				console.log("Admin command attempted");
				aClient.guilds.get("167731523200483328").channels.get("250383758602141697").send("Admin command attempted: " + aInput);
				return;
			}
			var output = "I'm a member of " + aClient.guilds.size + " servers:";
			var servers = aClient.guilds.array();
			for (let index = 0; index < servers.length; index++) {
				output += "\n" + servers[index].name;
			}
			aMessage.channel.send(output);
		}
	},
	{
		command: "play",
		handleMessage: function(aMessage, aInput, aClient) {
			if (aMessage.author.id !== "110880316444381184") {
				console.log("Admin command attempted");
				aClient.guilds.get("167731523200483328").channels.get("250383758602141697").send("Admin command attempted: " + aInput);
				return;
			}
			if (aInput.length > 5) {
				aInput = aInput.substring(5, aInput.length);
				aClient.user.setPresence({ status: "online", game: { name: aInput, type: "PLAYING" } });
			}
		}
	},
	{
		command: "stream",
		handleMessage: function(aMessage, aInput, aClient) {
			if (aMessage.author.id !== "110880316444381184") {
				console.log("Admin command attempted");
				aClient.guilds.get("167731523200483328").channels.get("250383758602141697").send("Admin command attempted: " + aInput);
				return;
			}
			if (aInput.length > 7) {
				aInput = aInput.substring(7, aInput.length);
				aClient.user.setPresence({ status: "online", game: { name: aInput, url: "https://twitch.tv/diefonk", type: "STREAMING" } });
			}
		}
	},
	{
		command: "listen",
		handleMessage: function(aMessage, aInput, aClient) {
			if (aMessage.author.id !== "110880316444381184") {
				console.log("Admin command attempted");
				aClient.guilds.get("167731523200483328").channels.get("250383758602141697").send("Admin command attempted: " + aInput);
				return;
			}
			if (aInput.length > 7) {
				aInput = aInput.substring(7, aInput.length);
				aClient.user.setPresence({ status: "online", game: { name: aInput, type: "LISTENING" } });
			}
		}
	},
	{
		command: "watch",
		handleMessage: function(aMessage, aInput, aClient) {
			if (aMessage.author.id !== "110880316444381184") {
				console.log("Admin command attempted");
				aClient.guilds.get("167731523200483328").channels.get("250383758602141697").send("Admin command attempted: " + aInput);
				return;
			}
			if (aInput.length > 6) {
				aInput = aInput.substring(6, aInput.length);
				aClient.user.setPresence({ status: "online", game: { name: aInput, type: "WATCHING" } });
			}
		}
	},
	{
		command: "exit",
		handleMessage: function(aMessage, aInput, aClient) {
			if (aMessage.author.id !== "110880316444381184") {
				console.log("Admin command attempted");
				aClient.guilds.get("167731523200483328").channels.get("250383758602141697").send("Admin command attempted: " + aInput);
				return;
			}
			process.exit();
		}
	}
]
