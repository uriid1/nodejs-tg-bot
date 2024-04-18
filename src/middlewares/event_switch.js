let event_switch = {};

event_switch.init = (bot) => {
  event_switch.bot = bot;
}

event_switch.call = (result) => {
  const bot = event_switch.bot;

  // Entities
  //
  // https://core.telegram.org/bots/api#messageentity
  if (result.message?.entities) {
    return bot.events.onGetEntities(result.message);
  }
}

export default event_switch;