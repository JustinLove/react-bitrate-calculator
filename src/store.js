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
  bitrate: 2500,
  resolution: Calc.resolutionOptions[0],
  framerate: 30,
  target: 'bpp',
}
initialState.bpp = Calc.calculateBpp(initialState)

function update(state = initialState, action) {
  //console.log(state, action)
  switch (action.type) {
    case Act.SET_BITRATE:
    case Act.SET_RESOLUTION:
    case Act.SET_FRAMERATE:
    case Act.SET_BPP:
    case Act.SET_TARGET:
      let s2 = Object.assign({}, state, action.payload)
      return Object.assign(s2, optimize(s2))
    default:
      return state
  }
}

export let store = Redux.createStore(update)
