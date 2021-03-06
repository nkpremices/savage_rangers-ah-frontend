/* eslint-disable consistent-return */
const EVENTS = {};

const emit = (event, ...args) => {
  EVENTS[event].forEach(func => func(...args));
};

const socket = {
  on(event, func) {
    if (EVENTS[event]) {
      return EVENTS[event].push(func);
    }
    EVENTS[event] = [func];
  },
  emit
};

export const io = {
  connect() {
    return socket;
  }
};

// to emulate server emit.
export const serverSocket = { emit };

export default io;
