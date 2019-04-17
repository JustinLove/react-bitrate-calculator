import * as Calc from './Calculator.js'
import * as Act from './actionTypes.js'

'use strict'

const optimize = function(state) {
  switch (state.target) {
    case 'bitrate': return {bitrate: Calc.calculateBitrate(state)}
    case 'resolution': return {resolution: Calc.calculateResolution(state)}
    case 'framerate': return {framerate: Calc.calculateFramerate(state)}
    case 'bpp': return {bpp: Calc.calculateBpp(state)}
    default: console.warn('unknown optimize target'); return {}
  }
}

let initialState = {
  calculator: {
    bitrate: 2500,
    resolution: Calc.resolutionOptions[0],
    framerate: 30,
    target: 'bpp',
  },
}
initialState.calculator.bpp = Calc.calculateBpp(initialState.calculator)

function update(state = initialState, action) {
  //console.log(state, action)
  switch (action.type) {
    case Act.SET_BITRATE:
    case Act.SET_RESOLUTION:
    case Act.SET_FRAMERATE:
    case Act.SET_BPP:
    case Act.SET_TARGET:
    case Act.SET_SETTINGS:
      return Object.assign({}, state, {calculator: calculate(state.calculator, action)})
    default:
      return state
  }
}

function calculate(state = initialState.calculator, action) {
  let c2 = Object.assign({}, state, action.payload)
  return Object.assign(c2, optimize(c2))
}

export let store = Redux.createStore(update)
