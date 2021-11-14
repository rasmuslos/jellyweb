export interface Header {
    Name: string;
    Value: string;
    Match: string;
}

export interface Identification {
    FriendlyName: string;
    ModelNumber: string;
    SerialNumber: string;
    ModelName: string;
    ModelDescription: string;
    ModelUrl: string;
    Manufacturer: string;
    ManufacturerUrl: string;
    Headers: Header[];
}

export interface XmlRootAttribute {
    Name: string;
    Value: string;
}

export interface DirectPlayProfile {
    Container: string;
    AudioCodec: string;
    VideoCodec: string;
    Type: string;
}

export interface TranscodingProfile {
    Container: string;
    Type: string;
    VideoCodec: string;
    AudioCodec: string;
    Protocol: string;
    EstimateContentLength: boolean;
    EnableMpegtsM2TsMode: boolean;
    TranscodeSeekInfo: string;
    CopyTimestamps: boolean;
    Context: string;
    EnableSubtitlesInManifest: boolean;
    MaxAudioChannels: string;
    MinSegments: number;
    SegmentLength: number;
    BreakOnNonKeyFrames: boolean;
}

export interface Condition {
    Condition: string;
    Property: string;
    Value: string;
    IsRequired: boolean;
}

export interface ContainerProfile {
    Type: string;
    Conditions: Condition[];
    Container: string;
}

export interface Condition2 {
    Condition: string;
    Property: string;
    Value: string;
    IsRequired: boolean;
}

export interface ApplyCondition {
    Condition: string;
    Property: string;
    Value: string;
    IsRequired: boolean;
}

export interface CodecProfile {
    Type: string;
    Conditions: Condition2[];
    ApplyConditions: ApplyCondition[];
    Codec: string;
    Container: string;
}

export interface Condition3 {
    Condition: string;
    Property: string;
    Value: string;
    IsRequired: boolean;
}

export interface ResponseProfile {
    Container: string;
    AudioCodec: string;
    VideoCodec: string;
    Type: string;
    OrgPn: string;
    MimeType: string;
    Conditions: Condition3[];
}

export interface SubtitleProfile {
    Format: string;
    Method: string;
    DidlMode: string;
    Language: string;
    Container: string;
}

export interface DeviceProfile {
    Name?: string;
    Id?: string;
    Identification?: Identification;
    FriendlyName?: string;
    Manufacturer?: string;
    ManufacturerUrl?: string;
    ModelName?: string;
    ModelDescription?: string;
    ModelNumber?: string;
    ModelUrl?: string;
    SerialNumber?: string;
    EnableAlbumArtInDidl?: boolean;
    EnableSingleAlbumArtLimit?: boolean;
    EnableSingleSubtitleLimit?: boolean;
    SupportedMediaTypes?: string;
    UserId?: string;
    AlbumArtPn?: string;
    MaxAlbumArtWidth?: number;
    MaxAlbumArtHeight?: number;
    MaxIconWidth?: number;
    MaxIconHeight?: number;
    MaxStreamingBitrate?: number;
    MaxStaticBitrate?: number;
    MusicStreamingTranscodingBitrate?: number;
    MaxStaticMusicBitrate?: number;
    SonyAggregationFlags?: string;
    ProtocolInfo?: string;
    TimelineOffsetSeconds?: number;
    RequiresPlainVideoItems?: boolean;
    RequiresPlainFolders?: boolean;
    EnableMSMediaReceiverRegistrar?: boolean;
    IgnoreTranscodeByteRangeRequests?: boolean;
    XmlRootAttributes?: XmlRootAttribute[];
    DirectPlayProfiles?: DirectPlayProfile[];
    TranscodingProfiles?: TranscodingProfile[];
    ContainerProfiles?: ContainerProfile[];
    CodecProfiles?: CodecProfile[];
    ResponseProfiles?: ResponseProfile[];
    SubtitleProfiles?: SubtitleProfile[];
}

export interface PlaybackInfoRequest {
    UserId?: string;
    MaxStreamingBitrate?: number;
    StartTimeTicks?: number;
    AudioStreamIndex?: number;
    SubtitleStreamIndex?: number;
    MaxAudioChannels?: number;
    MediaSourceId?: string;
    LiveStreamId?: string;
    DeviceProfile?: any;
    EnableDirectPlay?: boolean;
    EnableDirectStream?: boolean;
    EnableTranscoding?: boolean;
    AllowVideoStreamCopy?: boolean;
    AllowAudioStreamCopy?: boolean;
    AutoOpenLiveStream?: boolean;
}

export interface MediaStream {
    Codec: string;
    CodecTag: string;
    Language: string;
    ColorRange: string;
    ColorSpace: string;
    ColorTransfer: string;
    ColorPrimaries: string;
    Comment: string;
    TimeBase: string;
    CodecTimeBase: string;
    Title: string;
    VideoRange: string;
    localizedUndefined: string;
    localizedDefault: string;
    localizedForced: string;
    DisplayTitle: string;
    NalLengthSize: string;
    IsInterlaced: boolean;
    IsAVC: boolean;
    ChannelLayout: string;
    BitRate: number;
    BitDepth: number;
    RefFrames: number;
    PacketLength: number;
    Channels: number;
    SampleRate: number;
    IsDefault: boolean;
    IsForced: boolean;
    Height: number;
    Width: number;
    AverageFrameRate: number;
    RealFrameRate: number;
    Profile: string;
    Type: string;
    AspectRatio: string;
    Index: number;
    Score: number;
    IsExternal: boolean;
    DeliveryMethod: string;
    IsExternalUrl: boolean;
    IsTextSubtitleStream: boolean;
    SupportsExternalStream: boolean;
    Path: string;
    PixelFormat: string;
    Level: number;
    IsAnamorphic: boolean;
    DeliveryUrl: string;
}

export interface MediaAttachment {
    Codec: string;
    CodecTag: string;
    Comment: string;
    Index: number;
    FileName: string;
    MimeType: string;
    DeliveryUrl: string;
}

export interface RequiredHttpHeaders {
    property1: string;
    property2: string;
}

export interface MediaSource {
    Protocol: string;
    Id: string;
    Path: string;
    EncoderPath: string;
    EncoderProtocol: string;
    Type: string;
    Container: string;
    Size: number;
    Name: string;
    IsRemote: boolean;
    ETag: string;
    RunTimeTicks: number;
    ReadAtNativeFramerate: boolean;
    IgnoreDts: boolean;
    IgnoreIndex: boolean;
    GenPtsInput: boolean;
    SupportsTranscoding: boolean;
    SupportsDirectStream: boolean;
    SupportsDirectPlay: boolean;
    IsInfiniteStream: boolean;
    RequiresOpening: boolean;
    OpenToken: string;
    RequiresClosing: boolean;
    LiveStreamId: string;
    BufferMs: number;
    RequiresLooping: boolean;
    SupportsProbing: boolean;
    VideoType: string;
    IsoType: string;
    Video3DFormat: string;
    MediaStreams: MediaStream[];
    MediaAttachments: MediaAttachment[];
    Formats: string[];
    Bitrate: number;
    Timestamp: string;
    RequiredHttpHeaders: RequiredHttpHeaders;
    TranscodingUrl: string;
    TranscodingSubProtocol: string;
    TranscodingContainer: string;
    AnalyzeDurationMs: number;
    DefaultAudioStreamIndex: number;
    DefaultSubtitleStreamIndex: number;
    DeliveryUrl: string;
}

export interface PlaybackInfo {
    MediaSources: MediaSource[];
    PlaySessionId: string;
    ErrorCode: string;
}

export type ProgressSegment = {
    start: number,
    end: number,
}

export type SubtitleSegment = {
    "Id": string,
    "Text": string,
    "StartPositionTicks": number,
    "EndPositionTicks": number
}