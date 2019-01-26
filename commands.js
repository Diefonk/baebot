module.exports = [
	{
		command: "roll",
		description: "rolls die of specified size, e.g. `roll 20` or `roll 73`",
		handleMessage: function(aMessage, aInput, aBae) {
			var output;
			var dieSize = 0;
			if (aInput.length > 5) {
				dieSize = Number(aInput.substring(5, aInput.length));
			}
			if (!isNaN(dieSize) && dieSize > 0) {
				output = "🎲 " + aMessage.author.username + " rolls a **`" + (aBae.random(dieSize) + 1) + "`**";
			} else {
				output = "The `roll` command requires a number (larger than 0)\nFor example: `roll " + (aBae.random(100) + 1) + "`";
			}
			aMessage.channel.send(output);
		}
	},
	{
		command: "rate",
		description: "rates anything",
		vars: {
			words: [
				["I'd give ", " a "],
				["I think ", " deserves a solid "],
				["Hmm... ", " gets a "],
				["That's easy, ", " should definitely have a "],
				["Tricky, but I'd say ", " should not get more than "],
				["My programming tells me ", " is worth exactly "],
				["If it was up to me, which it is, ", " would get a strong "],
				["Everyone knows ", " is valued at "]
			]
		},
		handleMessage: function(aMessage, aInput, aBae) {
			var output;
			if (aInput.length > 5) {
				const input = aInput.substring(5, aInput.length);
				const total = aBae.random(100) + 1;
				const rating = aBae.random(total + 1);
				const words = this.vars.words[aBae.random(this.vars.words.length)];
				output = "📊 " + words[0] + input + words[1] + rating + "/" + total;
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
			],
			adjectives: [
				" stupid",
				" cute",
				" gay",
				" the best",
				" adorkable",
				" a dweeb",
				" real",
				" the meaning of life",
				" a pigeon",
				" even reading this"
			]
		},
		handleMessage: function(aMessage, aInput, aBae) {
			var output;
			if (aInput.length > 6) {
				output = "🎱 " + this.vars.answers[aBae.random(this.vars.answers.length)];
			} else {
				output = "The `8ball` command requires a question\nFor example: `8ball is ";
				output += aMessage.author.username + this.vars.adjectives[aBae.random(this.vars.adjectives.length)]+ "?`";
			}
			aMessage.channel.send(output);
		}
	},
	{
		command: "say",
		description: "repeats your message",
		handleMessage: function(aMessage, aInput, aBae) {
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
		handleMessage: function(aMessage, aInput, aBae) {
			if (aInput.length > 6) {
				var message = "\"";
				message += aInput.substring(6, aInput.length);
				message += "\" - ";
				message += aMessage.author.username;
				message += "#";
				message += aMessage.author.discriminator;
				if (aMessage.guild === null) {
					message += " ;dm ";
					message += aMessage.author.id;
				} else {
					message += " ;msg ";
					message += aMessage.guild.id;
					message += " ";
					message += aMessage.channel.id;
				}
				aBae.client.users.get(aBae.admin).send(message);
				aMessage.react("✅");
			} else {
				aMessage.channel.send("The `shout` command needs something to shout\nFor example: `shout Hello from the other side`");
			}
		}
	},
	//Admin commands
	{
		command: "dm",
		handleMessage: function(aMessage, aInput, aBae) {
			if (!aBae.isAdmin(aMessage.author)) {
				aBae.log("Admin command attempted: " + aInput);
				return;
			}
			if (aInput.length > 3) {
				aInput = aInput.substring(3, aInput.length);
				var spaceIndex = aInput.indexOf(" ");
				if (spaceIndex <= 0) {
					aMessage.react("❌");
					aMessage.channel.send("I need a message to send");
					return;
				}
				var user = aInput.substring(0, spaceIndex);
				aInput = aInput.substring(spaceIndex + 1, aInput.length);
				if (aBae.client.users.has(user)) {
					aBae.client.users.get(user).send(aInput);
					aMessage.react("✅");
				} else {
					aMessage.react("❌");
					aMessage.channel.send("I need a valid user id");
				}
			} else {
				aMessage.react("❌");
				aMessage.channel.send("I need a user id and a message");
			}
		}
	},
	{
		command: "msg",
		handleMessage: function(aMessage, aInput, aBae) {
			if (!aBae.isAdmin(aMessage.author)) {
				aBae.log("Admin command attempted: " + aInput);
				return;
			}
			if (aInput.length > 4) {
				aInput = aInput.substring(4, aInput.length);
				var spaceIndex = aInput.indexOf(" ");
				if (spaceIndex <= 0) {
					aMessage.react("❌");
					aMessage.channel.send("I need a channel id and a message");
					return;
				}
				var server = aInput.substring(0, spaceIndex);
				aInput = aInput.substring(spaceIndex + 1, aInput.length);
				var spaceIndex = aInput.indexOf(" ");
				if (spaceIndex <= 0 || !aBae.client.guilds.has(server)) {
					aMessage.react("❌");
					aMessage.channel.send("I need a valid server id and a message");
					return;
				}
				var channel = aInput.substring(0, spaceIndex);
				aInput = aInput.substring(spaceIndex + 1, aInput.length);
				if (aBae.client.guilds.get(server).channels.has(channel)) {
					aBae.client.guilds.get(server).channels.get(channel).send(aInput);
					aMessage.react("✅");
				} else {
					aMessage.react("❌");
					aMessage.channel.send("I need a valid channel id");
				}
			} else {
				aMessage.react("❌");
				aMessage.channel.send("I need a server id, a channel id, and a message");
			}
		}
	},
	{
		command: "servers",
		handleMessage: function(aMessage, aInput, aBae) {
			if (!aBae.isAdmin(aMessage.author)) {
				aBae.log("Admin command attempted: " + aInput);
				return;
			}
			var output = "I'm a member of " + aBae.client.guilds.size + " servers:";
			var servers = aBae.client.guilds.array();
			for (let index = 0; index < servers.length; index++) {
				output += "\n" + servers[index].name;
			}
			aMessage.channel.send(output);
		}
	},
	{
		command: "play",
		handleMessage: function(aMessage, aInput, aBae) {
			if (!aBae.isAdmin(aMessage.author)) {
				aBae.log("Admin command attempted: " + aInput);
				return;
			}
			if (aInput.length > 5) {
				aInput = aInput.substring(5, aInput.length);
				aBae.client.user.setPresence({
					status: "online",
					game: {
						name: aInput,
						type: "PLAYING"
					}
				});
			}
		}
	},
	{
		command: "stream",
		handleMessage: function(aMessage, aInput, aBae) {
			if (!aBae.isAdmin(aMessage.author)) {
				aBae.log("Admin command attempted: " + aInput);
				return;
			}
			if (aInput.length > 7) {
				aInput = aInput.substring(7, aInput.length);
				var spaceIndex = aInput.indexOf(" ");
				if (spaceIndex <= 0) {
					return;
				}
				var user = aInput.substring(0, spaceIndex);
				aInput = aInput.substring(spaceIndex + 1, aInput.length);
				aBae.client.user.setPresence({
					status: "online",
					game: {
						name: aInput,
						url: "https://twitch.tv/" + user,
						type: "STREAMING"
					}
				});
			}
		}
	},
	{
		command: "listen",
		handleMessage: function(aMessage, aInput, aBae) {
			if (!aBae.isAdmin(aMessage.author)) {
				aBae.log("Admin command attempted: " + aInput);
				return;
			}
			if (aInput.length > 7) {
				aInput = aInput.substring(7, aInput.length);
				aBae.client.user.setPresence({
					status: "online",
					game: {
						name: aInput,
						type: "LISTENING"
					}
				});
			}
		}
	},
	{
		command: "watch",
		handleMessage: function(aMessage, aInput, aBae) {
			if (!aBae.isAdmin(aMessage.author)) {
				aBae.log("Admin command attempted: " + aInput);
				return;
			}
			if (aInput.length > 6) {
				aInput = aInput.substring(6, aInput.length);
				aBae.client.user.setPresence({
					status: "online",
					game: {
						name: aInput,
						type: "WATCHING"
					}
				});
			}
		}
	},
	{
		command: "exit",
		handleMessage: function(aMessage, aInput, aBae) {
			if (!aBae.isAdmin(aMessage.author)) {
				aBae.log("Admin command attempted: " + aInput);
				return;
			}
			aBae.log("Good night!");
			aBae.client.destroy();
		}
	}/*, a work in progress
	{
		command: "paint",
		vars: {
			url: "http://colormind.io/api/",
			data: { model: "default" },
			XMLHttpRequest: null,
			PNGImage: null,
			paintPicture: function(aPalette) {
				var palette = [];
				for (let index = 0; index < aPalette.length; index++) {
					palette[index] = {
						red: aPalette[index][0],
						green: aPalette[index][1],
						blue: aPalette[index][2],
						alpha: 255
					}
				}
				var image = this.PNGImage.createImage(500, 500);
				image.fillRect(0, 0, 500, 500, palette[0]);
				image.writeImage('image.png', function (err) {
					if (err) throw err;
					console.log('Written to the file');
				});
			}
		},
		handleMessage: function(aMessage, aInput, aBae) {
			if (this.vars.XMLHttpRequest === null) {
				this.vars.XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
				this.vars.PNGImage = require('pngjs-image');
			}
			var xhr = new this.vars.XMLHttpRequest();
			var vars = this.vars;
			xhr.onreadystatechange = function() {
				if(xhr.readyState == 4 && xhr.status == 200) {
					var palette = JSON.parse(xhr.responseText).result;
					aMessage.channel.send(JSON.stringify(palette));
					vars.paintPicture(palette);
					//aMessage.channel.send('This is an embed', { files: ["./image.png"] });
					aMessage.channel.sendFile("image.png");
				}
			}
			xhr.open("POST", vars.url, true);
			xhr.send(JSON.stringify(vars.data));
		}
	}*/
]
