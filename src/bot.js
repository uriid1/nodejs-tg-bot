import util from 'node:util';
import request from './modules/request.js';
import events from './middlewares/events.js';
import event_switch from './middlewares/event_switch.js';

let bot = {
  events: events,
  commands: {},
}

// Init
event_switch.init(bot);

bot.call = (method, options) => {
  const postData = JSON.stringify(options)

  return request.sendJson({
    method: method,
    post_data: postData,
    token: bot.token
  })
}

bot.startLongPolling = async function(offset, timeout) {
  offset = offset ? offset : -1;
  timeout = timeout ? timeout : 60;

  const options = new URL(
    util.format('https://api.telegram.org/bot%s/getUpdates?offset=%s&timeout=%s', bot.token, offset, timeout)
  );

  try {
    // Выполняется запрос
    const data = await request.getUpdates(options);

    // Парсим полученный json
    const jsonData = JSON.parse(data);

    // Обработка обновлений
    if (jsonData.ok) {
      for (let i = 0; i < jsonData.result.length; i++) {
        const update = jsonData.result[i]

        // console.log(jsonData.result[i].message)
        event_switch.call(jsonData.result[i]);

        // Инкремент оффсета
        offset = update.update_id + 1
      }
    }

    return this.startLongPolling(offset, timeout);
  } catch (error) {
    console.log(error);
  }
}

export default bot;
