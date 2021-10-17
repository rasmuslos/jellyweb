import {browser} from "$app/env";
import {getBrowserName} from "$lib/helper/utils";

/**
 * God is dead - and we killed him
 */

const canPlay = (element: HTMLVideoElement, type: string, codec: string) => !!(element.canPlayType && element.canPlayType(`${type}; codecs="${codec}"`).replace(/no/, ''))
const canPlayType = (element: HTMLVideoElement, type: string) => !!(element.canPlayType && element.canPlayType(type).replace(/no/, ''))

const canPlayMkv = (element: HTMLVideoElement) => canPlayType(element, "video/x-matroska") || canPlayType(element, "video/mkv")

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

const createCodecCondition = (Property: string, Condition: string, Value: string, IsRequired = false) => { return { Property, Condition, Value, IsRequired } }
const getAacConditions = (element: HTMLVideoElement) => {
    const conditions = [];

    if(!canPlay(element, "video/mp4", "avc1.640029, mp4a.40.5")) conditions.push(createCodecCondition("AudioProfile", "NotEquals", "HE-AAC"))
    conditions.push(createCodecCondition("IsSecondaryAudio", "Equals", "false"))

    return conditions
}

const canPlayNativeHls = (element: HTMLVideoElement) => canPlayType(element, "application/x-mpegURL") || canPlayType(element, "application/vnd.apple.mpegURL")
const getSupportedFmp4VideoCodecs = (element: HTMLVideoElement) => {
    let codec = []

    if(hasHevcSupport(element)) codec.push("hevc")
    if(hasH264Support(element)) codec.push("h264")

    return codec
}
const getSupportedFmp4AudioCodecs = (element: HTMLVideoElement) => {
    let codec = []

    if(canPlay(element, "video/mp4", "avc1.640029, mp4a.40.2")) codec.push("aac")
    if(canPlay(element, "video/mp4", "avc1.640029, mp4a.69") || canPlay(element, "video/mp4", "avc1.640029, mp4a.6B") || canPlay(element, "video/mp4", "avc1.640029, mp3")) codec.push("mp3")
    if(canPlay(element, "video/mp4", "ac-3")) {
        codec.push("ac3")
        if(canPlay(element, "video/mp4", "ec-3")) codec.push("eac3")
    }
    if(getBrowserName() === "Safari") codec.push('alac')

    return codec
}
const getSupportedTsVideoCodecs = (element: HTMLVideoElement) => {
    const codecs = []

    if(hasH264Support(element)) codecs.push('h264')

    return codecs
}
const getSupportedTsAudioCodecs = (element: HTMLVideoElement) => {
    let codec = []

    if(canPlay(element, "video/mp4", "avc1.640029, mp4a.40.2")) codec.push("aac")
    if(canPlay(element, "video/mp4", "avc1.640029, mp4a.69") || canPlay(element, "video/mp4", "avc1.640029, mp4a.6B") || canPlay(element, "video/mp4", "avc1.640029, mp3")) codec.push("mp3")
    if(canPlay(element, "video/mp4", "ac-3")) {
        codec.push("ac3")
        if(canPlay(element, "video/mp4", "ec-3")) codec.push("eac3")
    }

    return codec
}

export const getDeviceProfile = (bitrate) => {
    if(!browser) return

    const video = document.createElement("video")

    let direct = []
    let codec = []
    let transcode = []

    // Direct

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
    if(mp4VideoCodecs.length && canPlayMkv(video)) direct.push({
        Container: "mkv",
        Type: "Video",
        VideoCodec: mp4VideoCodecs.join(","),
        AudioCodec: mp4AudioCodecs.join(","),
    })

    // Codec

    const aacProfileConditions = getAacConditions(video)
    codec.push({ Type: "VideoAudio", Conditions: [createCodecCondition("IsSecondaryAudio", "Equals", "false")] })
    if(aacProfileConditions.length > 0) codec.push({ Type: "VideoAudio", Codec: "aac", Conditions: aacProfileConditions })

    let maxH264Level = 42
    let h264Profiles = "high|main|baseline|constrained baseline"

    if(canPlay(video, "video/mp4", "avc1.640833")) maxH264Level = 51
    if(canPlay(video, "video/mp4", "avc1.640834")) maxH264Level = 52

    let maxHevcLevel = 120
    let hevcProfiles = "main"

    if(canPlay(video, "video/mp4", "hvc1.1.4.L123")) maxHevcLevel = 123
    if(canPlay(video, "video/mp4", "hev1.2.4.L123")) {
        maxHevcLevel = 123
        hevcProfiles = 'main|main 10'
    }
    if(canPlay(video, "video/mp4", "hev1.2.4.L153")) {
        maxHevcLevel = 153
        hevcProfiles = 'main|main 10'
    }
    if(canPlay(video, "video/mp4", "hev1.2.4.L183")) {
        maxHevcLevel = 183
        hevcProfiles = 'main|main 10'
    }

    const hevcConditions = [
        createCodecCondition("IsAnamorphic", "NotEquals", "true"),
        createCodecCondition("VideoProfile", "EqualsAny", hevcProfiles),
        createCodecCondition("VideoLevel", "LessThanEqual", maxHevcLevel.toString()),
        createCodecCondition("IsInterlaced", "NotEquals", "true"),
        createCodecCondition("VideoBitrate", "LessThanEqual", bitrate.toString(), true),
    ]
    const h264Conditions = [
        createCodecCondition("IsAnamorphic", "NotEquals", "true"),
        createCodecCondition("VideoProfile", "EqualsAny", h264Profiles),
        createCodecCondition("VideoLevel", "LessThanEqual", maxH264Level.toString()),
        createCodecCondition("IsInterlaced", "NotEquals", "true"),
        createCodecCondition("VideoBitrate", "LessThanEqual", bitrate.toString(), true),
    ]

    codec.push({
        Type: "Video",
        Codec: "h264",
        Conditions: h264Conditions,
    })
    codec.push({
        Type: "Video",
        Codec: "hevc",
        Conditions: hevcConditions,
    })

    // Transcoding
    const hlsBreakOnNonKeyFrames = getBrowserName() === "Safari" || !canPlayNativeHls(video)
    const canPlayHls = canPlayNativeHls(video) || window.MediaSource

    if(canPlayHls) {
        transcode.push({
            Container: canPlayNativeHls(video) ? "aac" : "ts",
            Type: "Audio",
            AudioCodec: "aac",
            Context: "Streaming",
            Protocol: "hls",
            MaxAudioChannels: 2,
            MinSegments: getBrowserName() === "Safari" ? 2 : 1,
            BreakOnNonKeyFrames: hlsBreakOnNonKeyFrames,
        })
    }

    const hlsInFmp4VideoCodecs = getSupportedFmp4VideoCodecs(video)
    const hlsInFmp4AudioCodecs = getSupportedFmp4AudioCodecs(video)
    const hlsInTsVideoCodecs = getSupportedTsVideoCodecs(video)
    const hlsInTsAudioCodecs = getSupportedTsAudioCodecs(video)

    if(canPlayHls) {
        if(hlsInFmp4VideoCodecs.length > 0 && hlsInFmp4AudioCodecs.length > 0) transcode.push({
            Container: "mp4",
            Type: "Video",
            AudioCodec: hlsInFmp4AudioCodecs.join(","),
            VideoCodec: hlsInFmp4VideoCodecs.join(","),
            Context: "Streaming",
            Protocol: "hls",
            MaxAudioChannels: 2,
            MinSegments: getBrowserName() === "Safari" ? 2 : 1,
            BreakOnNonKeyFrames: hlsBreakOnNonKeyFrames,
        })
        if(hlsInTsVideoCodecs.length > 0 && hlsInTsAudioCodecs.length > 0) transcode.push({
            Container: "ts",
            Type: "Video",
            AudioCodec: hlsInTsAudioCodecs.join(","),
            VideoCodec: hlsInTsVideoCodecs.join(","),
            Context: "Streaming",
            Protocol: "hls",
            MaxAudioChannels: 2,
            MinSegments: getBrowserName() === "Safari" ? 2 : 1,
            BreakOnNonKeyFrames: hlsBreakOnNonKeyFrames,
        })
    }
    if(canPlayMkv(video)) {
        transcode.push({
            Container: "mkv",
            Type: "Video",
            AudioCodec: mp4AudioCodecs.join(","),
            VideoCodec: mp4VideoCodecs.join(","),
            Context: "Streaming",
            MaxAudioChannels: 2,
            CopyTimestamps: true,
        })
    }
    if(hasWebMVideoSupport(video, "vp8")) {
        transcode.push({
            Container: "webm",
            Type: "Video",
            AudioCodec: "vorbis",
            VideoCodec: "vpx",
            Context: "Streaming",
            Protocol: "http",
            MaxAudioChannels: 2,
        })
    }

    return {
        MaxStreamingBitrate: bitrate,
        MaxStaticBitrate: bitrate,

        DirectPlayProfiles: direct,
        TranscodingProfiles: transcode,
        CodecProfiles: codec,

        ResponseProfiles:[
            {
                "Type":"Video",
                "Container":"m4v",
                "MimeType":"video/mp4"
            }
        ],
        ContainerProfiles:[],
        SubtitleProfiles: [
            {
                "Format": "vtt",
                "Method": "External"
            },
            {
                "Format": "ass",
                "Method": "External"
            },
            {
                "Format": "ssa",
                "Method": "External"
            }
        ],
    }
}