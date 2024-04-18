// Event handling module
import events_list from '../enums/events_list.js'

let events = {}

for (let i = 0; i < events_list.leight; i++) {
  const name = events_list[i];

  events[name] = () => {
    console.log(`Called event: ${name}`)
  }
}

export default events;
