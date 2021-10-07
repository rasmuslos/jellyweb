import {browser} from "$app/env";
import {getBrowserName} from "$lib/helper/utils";

const canPlay = (element: HTMLVideoElement, type: string, codec: string) => !!(element.canPlayType && element.canPlayType(`${type}; codecs="${codec}"`).replace(/no/, ''))
const canPlayType = (element: HTMLVideoElement, type: string) => !!(element.canPlayType && element.canPlayType(type).replace(/no/, ''))

const hasWebMVideoSupport = (element: HTMLVideoElement, codec) => canPlay(element, "video/webm", codec)
const getWebMVideosCodecs = (element: HTMLVideoElement): string[] => {
    let codec: string[] = []
    if(hasWebMVideoSupport(element, "vp8")) codec.push("vp8")
    if(hasWebMVideoSupport(element, "vp9")) codec.push("vp9")
    if(hasWebMVideoSupport(element, "av01.0.15M.10")) codec.push("av1")

    return codec
}
const getWebMAudioCodecs = (element: HTMLVideoElement): string[] => {
    let codec: string[] = []

    codec.push("vorbis")
    if(canPlay(element, "audio/ogg", "opus")) codec.push("opus")

    return codec
}

const hasH264Support = (element: HTMLVideoElement) => canPlay(element, "video/mp4", "avc1.42E01E, mp4a.40.2")
const hasHevcSupport = (element: HTMLVideoElement) => canPlay(element, "video/mp4", "hvc1.1.L120") || canPlay(element, "video/mp4", "hev1.1.L120") || canPlay(element, "video/mp4", "hvc1.1.0.L120") || canPlay(element, "video/mp4", "hev1.1.0.L120")

const getMP4VideoCodecs = (element: HTMLVideoElement): string[] => {
    let codec: string[] = []

    if(hasH264Support(element)) codec.push("h264")
    if(hasHevcSupport(element) && getBrowserName() !== "Safari") codec.push("hevc")
    if(canPlay(element, "video/mp4", "vc-1")) codec.push("vc1")
    if(hasWebMVideoSupport(element, "vp8")) codec.push("vp8")
    if(hasWebMVideoSupport(element, "vp9")) codec.push("vp9")
    if(hasWebMVideoSupport(element, "av01.0.15M.10")) codec.push("av1")

    return codec
}
const getMP4AudioCodecs = (element: HTMLVideoElement): string[] => {
    let codec: string[] = []

    if(canPlay(element, "video/mp4", "avc1.640029, mp4a.40.2")) codec.push("aac")
    if(canPlay(element, "video/mp4", "avc1.640029, mp4a.69") || canPlay(element, "video/mp4", "avc1.640029, mp4a.6B") || canPlay(element, "video/mp4", "avc1.640029, mp3")) codec.push("mp3")
    if(canPlay(element, "video/mp4", "ac-3")) {
        codec.push("ac3")
        if(canPlay(element, "video/mp4", "ec-3")) codec.push("eac3")
    }
    if(canPlay(element, "video/mp4", "dts-") || canPlay(element, "video/mp4", "dts+")) {
        codec.push("dca")
        codec.push("dts")
    }
    if (!!document.createElement('audio').canPlayType("audio/ogg; codecs=\"opus\"").replace(/no/, '')) codec.push('opus')
    if (getBrowserName() === "Safari") codec.push('alac')
    if(hasWebMVideoSupport(element, "vp8")) codec.push("vorbis")

    return codec
}

export const getDeviceProfile = (bitrate) => {
    if(!browser) return

    const video = document.createElement("video")

    let direct = []

    const webMVideoCodecs = getWebMVideosCodecs(video)
    const webMAudioCodecs = getWebMAudioCodecs(video)

    const mp4VideoCodecs = getMP4VideoCodecs(video)
    const mp4AudioCodecs = getMP4AudioCodecs(video)

    if(webMVideoCodecs.length) direct.push({
            Container: "webm",
            Type: "Video",
            VideoCodec: webMVideoCodecs.join(","),
            AudioCodec: webMAudioCodecs.join(","),
        })
    if(mp4VideoCodecs.length) direct.push({
            Container: "mp4,m4v",
            Type: "Video",
            VideoCodec: mp4VideoCodecs.join(","),
            AudioCodec: mp4AudioCodecs.join(","),
        })
    if(mp4VideoCodecs.length && canPlayType(video, "video/x-matroska") || canPlayType(video, "video/mkv")) direct.push({
        Container: "mkv",
        Type: "Video",
        VideoCodec: mp4VideoCodecs.join(","),
        AudioCodec: mp4AudioCodecs.join(","),
    })

    return {
        MaxStreamingBitrate: bitrate,
        MaxStaticBitrate: bitrate,

        DirectPlayProfiles: direct,
        "TranscodingProfiles":[{"Container":"aac","Type":"Audio","AudioCodec":"aac","Context":"Streaming","Protocol":"hls","MaxAudioChannels":"6","MinSegments":"2","BreakOnNonKeyFrames":true},{"Container":"aac","Type":"Audio","AudioCodec":"aac","Context":"Streaming","Protocol":"http","MaxAudioChannels":"6"},{"Container":"mp3","Type":"Audio","AudioCodec":"mp3","Context":"Streaming","Protocol":"http","MaxAudioChannels":"6"},{"Container":"wav","Type":"Audio","AudioCodec":"wav","Context":"Streaming","Protocol":"http","MaxAudioChannels":"6"},{"Container":"mp3","Type":"Audio","AudioCodec":"mp3","Context":"Static","Protocol":"http","MaxAudioChannels":"6"},{"Container":"aac","Type":"Audio","AudioCodec":"aac","Context":"Static","Protocol":"http","MaxAudioChannels":"6"},{"Container":"wav","Type":"Audio","AudioCodec":"wav","Context":"Static","Protocol":"http","MaxAudioChannels":"6"},{"Container":"ts","Type":"Video","AudioCodec":"aac,mp3,ac3,eac3","VideoCodec":"h264","Context":"Streaming","Protocol":"hls","MaxAudioChannels":"6","MinSegments":"2","BreakOnNonKeyFrames":true},{"Container":"webm","Type":"Video","AudioCodec":"vorbis","VideoCodec":"vpx","Context":"Streaming","Protocol":"http","MaxAudioChannels":"6"},{"Container":"mp4","Type":"Video","AudioCodec":"aac,mp3,ac3,eac3,flac,alac,vorbis","VideoCodec":"h264","Context":"Static","Protocol":"http"}],
        "CodecProfiles":[{"Type":"Video","Codec":"h264","Conditions":[{"Condition":"NotEquals","Property":"IsAnamorphic","Value":"true","IsRequired":false},{"Condition":"EqualsAny","Property":"VideoProfile","Value":"high|main|baseline|constrained baseline","IsRequired":false},{"Condition":"LessThanEqual","Property":"VideoLevel","Value":"51","IsRequired":false},{"Condition":"NotEquals","Property":"IsInterlaced","Value":"true","IsRequired":false}]},{"Type":"Video","Codec":"hevc","Conditions":[{"Condition":"NotEquals","Property":"IsAnamorphic","Value":"true","IsRequired":false},{"Condition":"EqualsAny","Property":"VideoProfile","Value":"main|main 10","IsRequired":false},{"Condition":"LessThanEqual","Property":"VideoLevel","Value":"183","IsRequired":false},{"Condition":"NotEquals","Property":"IsInterlaced","Value":"true","IsRequired":false}]}],

        "ResponseProfiles":[
            {
                "Type":"Video",
                "Container":"m4v",
                "MimeType":"video/mp4"
            }
        ],
        "ContainerProfiles":[],
        "SubtitleProfiles": [],
    }
}