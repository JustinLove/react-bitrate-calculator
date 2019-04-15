import * as Act from './actionTypes.js'

'use strict'

export const setBitrate = bitrate => ({
  type: Act.SET_BITRATE,
  payload: {
    bitrate: bitrate,
  },
})

export const setResolution = res => ({
  type: Act.SET_RESOLUTION,
  payload: {
    resolution: res,
  },
})

export const setFramerate = framerate => ({
  type: Act.SET_FRAMERATE,
  payload: {
    framerate: framerate,
  },
})

export const setBpp = bpp => ({
  type: Act.SET_BPP,
  payload: {
    bpp: bpp,
  },
})

export const setTarget = target => ({
  type: Act.SET_TARGET,
  payload: {
    target: target,
  },
})
