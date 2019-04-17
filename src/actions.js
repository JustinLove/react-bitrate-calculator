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

export const setBpi = bpi => ({
  type: Act.SET_BPI,
  payload: {
    bpi: bpi,
  },
})

export const setTarget = target => ({
  type: Act.SET_TARGET,
  payload: {
    target: target,
  },
})

export const setSettings = settings => ({
  type: Act.SET_SETTINGS,
  payload: settings,
})

export const chatCreated = client => ({
  type: Act.CHAT_CREATED,
  payload: {
    client,
  },
})


export const chatMessage = (target, context, msg, self) => ({
  type: Act.CHAT_MESSAGE,
  payload: {
    target,
    context,
    msg,
    self,
  },
})

export const chatConnected = (addr, port) => ({
  type: Act.CHAT_CONNECTED,
  payload: {
    addr,
    port,
  },
})

export const reportCurrentSettings = () => ({
  type: Act.REPORT_CURRENT_SETTINGS,
})
