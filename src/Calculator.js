'use strict'

export const resolutionOptions = [
  {w: 640, h: 360},
  {w: 969, h: 392},
  {w: 768, h: 432},
  {w: 852, h: 480},
  {w: 960, h: 540},
  {w: 1096, h: 616},
  {w: 1152, h: 648},
  {w: 1280, h: 720},
  {w: 1140, h: 810},
  {w: 1536, h: 864},
  {w: 1600, h: 900},
  {w: 1920, h: 1080}
]
resolutionOptions.forEach((res) => res.value = `${res.w}x${res.h}`)

export const framerateOptions = [10, 15, 20, 30, 45, 60]

const preparePps = function() {
  let videoOptions = []
  for (let resolution of resolutionOptions) {
    for (let framerate of framerateOptions) {
      videoOptions.push({
        resolution,
        framerate,
        pps: resolution.w * resolution.h * framerate,
      })
    }
  }

  return videoOptions
}

const videoOptions = preparePps()

export const calculateBitrate = function({resolution: {w, h}, framerate, bpp}) {
  return w * h * framerate * bpp / 1000
}

export const calculateResolution = function({bitrate, framerate, bpp}) {
  let targetPps = bitrate * 1000 / bpp
  return videoOptions
    .filter(({framerate: fps}) => fps == framerate)
    .sort((a, b) => Math.abs(targetPps - a.pps) - Math.abs(targetPps - b.pps))[0].resolution
}

export const calculateFramerate = function({bitrate, resolution, bpp}) {
  let targetPps = bitrate * 1000 / bpp
  return videoOptions
    .filter(({resolution: res}) => res == resolution)
    .sort((a, b) => Math.abs(targetPps - a.pps) - Math.abs(targetPps - b.pps))[0].framerate
}

export const calculateBpp = function({bitrate, resolution: {w, h}, framerate}) {
  return bitrate * 1000 / (w * h * framerate)
}
