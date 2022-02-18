export type ExternalUrl = {
    Name: string;
    Url: string;
}

export type RequiredHttpHeaders = {
}

export type MediaSource = {
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
    MediaStreams: any[];
    MediaAttachments: any[];
    Formats: any[];
    Bitrate: number;
    Timestamp: string;
    RequiredHttpHeaders: RequiredHttpHeaders;
    TranscodingUrl: string;
    TranscodingSubProtocol: string;
    TranscodingContainer: string;
    AnalyzeDurationMs: number;
    DefaultAudioStreamIndex: number;
    DefaultSubtitleStreamIndex: number;
}

export type RemoteTrailer = {
    Url: string;
    Name: string;
}

export type ProviderIds = {
    [x: string]: string;
}

export type ImageBlurHashes = {
    Primary: {
        [x: string]: string,
    },
    Backdrop: {
        [x: string]: string,
    },
}

export type Person = {
    Name: string;
    Id: string;
    Role: string;
    Type: string;
    PrimaryImageTag: string;
    ImageBlurHashes: ImageBlurHashes;
}

export type Studio = {
    Name: string;
    Id: string;
}

export type GenreItem = {
    Name: string;
    Id: string;
}

export type UserData = {
    Rating: number;
    PlayedPercentage: number;
    UnplayedItemCount: number;
    PlaybackPositionTicks: number;
    PlayCount: number;
    IsFavorite: boolean;
    Likes: boolean;
    LastPlayedDate: Date;
    Played: boolean;
    Key: string;
    ItemId: string;
}

export type ArtistItem = {
    Name: string;
    Id: string;
}

export type AlbumArtist = {
    Name: string;
    Id: string;
}

export type MediaStream = {
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
    DeliveryUrl: string;
    IsExternalUrl: boolean;
    IsTextSubtitleStream: boolean;
    SupportsExternalStream: boolean;
    Path: string;
    PixelFormat: string;
    Level: number;
    IsAnamorphic: boolean;
}

export type ImageTags = {
    [x: string]: string,
}
export type Chapter = {
    StartPositionTicks: number,
    Name: string,
    ImagePath: string,
    ImageDateModified: string,
    ImageTag: string,
}

export type BoxRear = {
    property1: string;
    property2: string;
}

export type Profile = {
    property1: string;
    property2: string;
}

export type CurrentProgram = {
}

export type JellyfinItem = {
    Name: string;
    OriginalTitle: string;
    ServerId: string;
    Id: string;
    Etag: string;
    SourceType: string;
    PlaylistItemId: string;
    DateCreated: Date;
    DateLastMediaAdded: Date;
    ExtraType: string;
    AirsBeforeSeasonNumber: number;
    AirsAfterSeasonNumber: number;
    AirsBeforeEpisodeNumber: number;
    CanDelete: boolean;
    CanDownload: boolean;
    HasSubtitles: boolean;
    PreferredMetadataLanguage: string;
    PreferredMetadataCountryCode: string;
    SupportsSync: boolean;
    Container: string;
    SortName: string;
    ForcedSortName: string;
    Video3DFormat: string;
    PremiereDate: Date;
    ExternalUrls: ExternalUrl[];
    MediaSources: MediaSource[];
    CriticRating: number;
    ProductionLocations: string[];
    Path: string;
    EnableMediaSourceDisplay: boolean;
    OfficialRating: string;
    CustomRating: string;
    ChannelId: string;
    ChannelName: string;
    Overview: string;
    Taglines: string[];
    Genres: string[];
    CommunityRating: number;
    CumulativeRunTimeTicks: number;
    RunTimeTicks: number;
    PlayAccess: string;
    AspectRatio: string;
    ProductionYear: number;
    IsPlaceHolder: boolean;
    Number: string;
    ChannelNumber: string;
    IndexNumber: number;
    IndexNumberEnd: number;
    ParentIndexNumber: number;
    RemoteTrailers: RemoteTrailer[];
    ProviderIds: ProviderIds;
    IsHD: boolean;
    IsFolder: boolean;
    ParentId: string;
    Type: string;
    People: Person[];
    Studios: Studio[];
    GenreItems: GenreItem[];
    ParentLogoItemId: string;
    ParentBackdropItemId: string;
    ParentBackdropImageTags: string[];
    LocalTrailerCount: number;
    UserData: UserData;
    RecursiveItemCount: number;
    ChildCount: number;
    SeriesName: string;
    SeriesId: string;
    SeasonId: string;
    SpecialFeatureCount: number;
    DisplayPreferencesId: string;
    Status: string;
    AirTime: string;
    AirDays: string[];
    Tags: string[];
    PrimaryImageAspectRatio: number;
    Artists: string[];
    ArtistItems: ArtistItem[];
    Album: string;
    CollectionType: string;
    DisplayOrder: string;
    AlbumId: string;
    AlbumPrimaryImageTag: string;
    SeriesPrimaryImageTag: string;
    AlbumArtist: string;
    AlbumArtists: AlbumArtist[];
    SeasonName: string;
    MediaStreams: MediaStream[];
    VideoType: string;
    PartCount: number;
    MediaSourceCount: number;
    ImageTags: ImageTags;
    BackdropImageTags: string[];
    ScreenshotImageTags: string[];
    ParentLogoImageTag: string;
    ParentArtItemId: string;
    ParentArtImageTag: string;
    SeriesThumbImageTag: string;
    ImageBlurHashes: ImageBlurHashes;
    SeriesStudio: string;
    ParentThumbItemId: string;
    ParentThumbImageTag: string;
    ParentPrimaryImageItemId: string;
    ParentPrimaryImageTag: string;
    Chapters: Chapter[];
    LocationType: string;
    IsoType: string;
    MediaType: string;
    EndDate: Date;
    LockedFields: string[];
    TrailerCount: number;
    MovieCount: number;
    SeriesCount: number;
    ProgramCount: number;
    EpisodeCount: number;
    SongCount: number;
    AlbumCount: number;
    ArtistCount: number;
    MusicVideoCount: number;
    LockData: boolean;
    Width: number;
    Height: number;
    CameraMake: string;
    CameraModel: string;
    Software: string;
    ExposureTime: number;
    FocalLength: number;
    ImageOrientation: string;
    Aperture: number;
    ShutterSpeed: number;
    Latitude: number;
    Longitude: number;
    Altitude: number;
    IsoSpeedRating: number;
    SeriesTimerId: string;
    ProgramId: string;
    ChannelPrimaryImageTag: string;
    StartDate: Date;
    CompletionPercentage: number;
    IsRepeat: boolean;
    EpisodeTitle: string;
    ChannelType: string;
    Audio: string;
    IsMovie: boolean;
    IsSports: boolean;
    IsSeries: boolean;
    IsLive: boolean;
    IsNews: boolean;
    IsKids: boolean;
    IsPremiere: boolean;
    TimerId: string;
    CurrentProgram: CurrentProgram;
}

export type RecommendationCategory = "SimilarToRecentlyPlayed" | "SimilarToLikedItem" | "HasDirectorFromRecentlyPlayed" | "HasActorFromRecentlyPlayed" | "HasLikedDirector" | "HasLikedActor"