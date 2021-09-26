import {browser} from "$app/env";

// @ts-ignore
export const fullscreenSupport = browser && !!(document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled || false)
// @ts-ignore
export const exitFullscreen = browser && (document.exitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen || document.msExitFullscreen || (() => {})).bind(document)
// @ts-ignore
export const fullscreenElement = () => document.fullscreenElement || document.mozFullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement
// @ts-ignore
export const requestFullscreen = (element: Element) => (element.requestFullscreen || element.mozRequestFullScreen || element.webkitRequestFullscreen || element.msRequestFullscreen || (() => {})).bind(element)()