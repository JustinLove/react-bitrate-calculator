import {clientId} from "./TwitchId.js"
import * as Calc from "./Calculator.js"
import * as actions from './actions.js'
import './tmi.js'

'use strict'

export function authorizeUrl(redirectUri) {
  return "https://api.twitch.tv/kraken/oauth2/authorize?"
    + [
        "client_id=" + encodeURIComponent(clientId),
        "redirect_uri=" + encodeURIComponent(redirectUri),
        "response_type=token",
        "scope=chat:read+chat:edit",
      ].join('&')
}

export function connectToChat({username, oauthToken, channel}, store) {
  if (username && oauthToken && channel) {
    let opts = {
      options: {
        clientId: clientId,
        //debug: true,
      },
      identity: {
        username: username,
        password: oauthToken,
      },
      channels: [ channel ],
    }
    console.log('creating client')
    let client = new tmi.client(opts)
    store.dispatch(actions.chatCreated(client))
    client.on('message', (...args) => {
        setTimeout(() => store.dispatch(actions.chatMessage(...args)))
      })
    client.on('connected', (...args) => store.dispatch(actions.chatConnected(...args)))
    client.connect()
    return client
  }
}

export function closeChat(client) {
  client.disconnect()
  //this.setState({addr: null, port: null})
}

export function reportCurrentSettings({client, channel}, calculator) {
  if (client) {
    client.say(`#${channel}`, `${calculator.resolution.value}p${calculator.framerate} at ${calculator.bitrate}kbps ${calculator.bpp.toFixed(3)}bpp`)
  }
}

export function onChatMessage({client}, calculator, {target, context, msg, self}) {
  if (self) return calculator

  const commandName = msg.trim()

  let match

  if (commandName == '!bitrate') {
    //this.client.say(target, `current bitrate is set at ${this.props.bitrate}`)
  } else if (commandName.startsWith('!calc')) {
    let [_, ...parts] = commandName.split(' ')

    let settings = {}

    parts.forEach(s => {
      let match
      if (match = s.match(/(\d+)p(\d+)/)) {
        const [_, inputHeight, inputFramerate] = match

        settings.resolution = Calc.resolutionOptions.find(res => res.h == inputHeight)
        if (!settings.resolution) {
          client.say(target, "resolution height not found")
          return calculator
        }

        settings.framerate = parseInt(inputFramerate, 10)
        if (isNaN(settings.framerate)) {
          client.say(target, "could not parse framerate")
          return calculator
        }
      } else if (match = s.match(/(\d+)x(\d+)/)) {
        const input = match[0]

        settings.resolution = Calc.resolutionOptions.find(res => res.value == input)
        if (!settings.resolution) {
          client.say(target, "resolution not found")
          return calculator
        }
      } else if (parseInt(s) == 0) {
        settings.bpp = parseFloat(s)
      } else if (!isNaN(parseInt(s))) {
        const value = parseInt(s)
        if (value <= 144) {
          settings.framerate = value
        } else {
          settings.bitrate = value
        }
      } else {
        client.say(target, "unrecognized parameter " + s)
      }
    })

    if (settings.bitrate == null
      && settings.resolution
      && settings.framerate
      && settings.bpp) {
      settings.target = 'bitrate'
      client.say(target, `${Calc.calculateBitrate(settings)}kbps`)
    } else if (settings.bitrate
      && settings.resolution == null
      && settings.framerate
      && settings.bpp) {
      settings.target = 'resolution'
      const res = Calc.calculateResolution(settings)
      client.say(target, `${res.w}x${res.h}`)
    } else if (settings.bitrate
      && settings.resolution
      && settings.framerate == null
      && settings.bpp) {
      settings.target = 'framerate'
      client.say(target, `${Calc.calculateFramerate(settings)} fps`)
    } else if (settings.bitrate
      && settings.resolution
      && settings.framerate
      && settings.bpp == null) {
      settings.target = 'bpp'
      client.say(target, `${Calc.calculateBpp(settings).toFixed(3)} bpp`)
    }

    return Object.assign({}, calculator, settings)
  } else {
    return calculator
    //console.log('unknown command')
  }
}


