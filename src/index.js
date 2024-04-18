import bot from './bot.js';

bot.token = 'YOUR_BOT_TOKEN_HERE'

bot.commands["/start"] = (message) => {
  const chatId = message.chat.id;

  bot.call('sendMessage', {
    text: 'Привет!',
    chat_id: chatId
  })
}

bot.events.onGetEntities = (data) => {
  if (data.entities[0].type === 'bot_command') {
    const command = data.text.split(' ', 1)[0];

    if (bot.commands[command]) {
      bot.commands[command](data);
    }
  }
}

bot.startLongPolling()
