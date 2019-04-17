import * as Calc from './Calculator.js'
import * as Act from './actionTypes.js'
import * as ChatBot from './ChatBot.js'

'use strict'

const optimize = function(state) {
  switch (state.target) {
    case 'bitrate': return {bitrate: Calc.calculateBitrate(state), bpi: Calc.calculateBpi(state)}
    case 'resolution': return {resolution: Calc.calculateResolution(state), bpi: Calc.calculateBpi(state)}
    case 'framerate': return {framerate: Calc.calculateFramerate(state), bpi: Calc.calculateBpi(state)}
    case 'bpp': return {bpp: Calc.calculateBpp(state), bpi: Calc.calculateBpi(state)}
    case 'bpi': return {bpp: Calc.calculateBpp(state), bpi: Calc.calculateBpi(state)}
    default: console.warn('unknown optimize target'); return {}
  }
}

let match = window.location.hash.match(/access_token=([^&]+)&/)

let initialState = {
  calculator: {
    bitrate: 2500,
    resolution: Calc.resolutionOptions[0],
    framerate: 30,
    target: 'bpp',
  },
  chatbot: {
    username: 'wondibot',
    oauthToken: match && match[1],
    channel: 'wondible',
    client: null,
    addr: null,
    port: null,
  }
}
initialState.calculator.bpp = Calc.calculateBpp(initialState.calculator)
initialState.calculator.bpi = Calc.calculateBpi(initialState.calculator)

function update(state = initialState, action) {
  //console.log(state, action)
  switch (action.type) {
    case Act.SET_BITRATE:
    case Act.SET_RESOLUTION:
    case Act.SET_FRAMERATE:
    case Act.SET_BPP:
    case Act.SET_BPI:
    case Act.SET_TARGET:
    case Act.SET_SETTINGS:
      return Object.assign({}, state, {calculator: calculate(state.calculator, action)})
    case Act.CHAT_CREATED:
      return Object.assign({}, state,
        {chatbot: Object.assign({}, state.chatbot, {client: action.payload.client})})
    case Act.CHAT_MESSAGE:
      return {...state, calculator: ChatBot.onChatMessage(state.chatbot, state.calculator, action.payload)}
    case Act.CHAT_CONNECTED:
      return Object.assign({}, state, {chatbot: Object.assign({}, state.chatbot, action.payload)})
    case Act.REPORT_CURRENT_SETTINGS:
      ChatBot.reportCurrentSettings(state.chatbot, state.calculator)
      return state
    default:
      return state
  }
}

function calculate(state = initialState.calculator, action) {
  let c2 = Object.assign({}, state, action.payload)
  return Object.assign(c2, optimize(c2))
}

export let store = Redux.createStore(update,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
