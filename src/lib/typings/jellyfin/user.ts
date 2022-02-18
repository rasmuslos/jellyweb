export type Configuration = {
    AudioLanguagePreference: string;
    PlayDefaultAudioTrack: boolean;
    SubtitleLanguagePreference: string;
    DisplayMissingEpisodes: boolean;
    GroupedFolders: string[];
    SubtitleMode: string;
    DisplayCollectionsView: boolean;
    EnableLocalPassword: boolean;
    OrderedViews: string[];
    LatestItemsExcludes: string[];
    MyMediaExcludes: string[];
    HidePlayedInLatest: boolean;
    RememberAudioSelections: boolean;
    RememberSubtitleSelections: boolean;
    EnableNextEpisodeAutoPlay: boolean;
}

export type AccessSchedule = {
    Id: number;
    UserId: string;
    DayOfWeek: string;
    StartHour: number;
    EndHour: number;
}

export type Policy = {
    IsAdministrator: boolean;
    IsHidden: boolean;
    IsDisabled: boolean;
    MaxParentalRating: number;
    BlockedTags: string[];
    EnableUserPreferenceAccess: boolean;
    AccessSchedules: AccessSchedule[];
    BlockUnratedItems: string[];
    EnableRemoteControlOfOtherUsers: boolean;
    EnableSharedDeviceControl: boolean;
    EnableRemoteAccess: boolean;
    EnableLiveTvManagement: boolean;
    EnableLiveTvAccess: boolean;
    EnableMediaPlayback: boolean;
    EnableAudioPlaybackTranscoding: boolean;
    EnableVideoPlaybackTranscoding: boolean;
    EnablePlaybackRemuxing: boolean;
    ForceRemoteSourceTranscoding: boolean;
    EnableContentDeletion: boolean;
    EnableContentDeletionFromFolders: string[];
    EnableContentDownloading: boolean;
    EnableSyncTranscoding: boolean;
    EnableMediaConversion: boolean;
    EnabledDevices: string[];
    EnableAllDevices: boolean;
    EnabledChannels: string[];
    EnableAllChannels: boolean;
    EnabledFolders: string[];
    EnableAllFolders: boolean;
    InvalidLoginAttemptCount: number;
    LoginAttemptsBeforeLockout: number;
    MaxActiveSessions: number;
    EnablePublicSharing: boolean;
    BlockedMediaFolders: string[];
    BlockedChannels: string[];
    RemoteClientBitrateLimit: number;
    AuthenticationProviderId: string;
    PasswordResetProviderId: string;
    SyncPlayAccess: string;
}

export type User = {
    Name: string;
    ServerId: string;
    ServerName: string;
    Id: string;
    PrimaryImageTag: string;
    HasPassword: boolean;
    HasConfiguredPassword: boolean;
    HasConfiguredEasyPassword: boolean;
    EnableAutoLogin: boolean;
    LastLoginDate: Date;
    LastActivityDate: Date;
    Configuration: Configuration;
    Policy: Policy;
    PrimaryImageAspectRatio: number;
}

export type PlayState = {
    PositionTicks: number;
    CanSeek: boolean;
    IsPaused: boolean;
    IsMuted: boolean;
    VolumeLevel: number;
    AudioStreamIndex: number;
    SubtitleStreamIndex: number;
    MediaSourceId: string;
    PlayMethod: string;
    RepeatMode: string;
}

export type AdditionalUser = {
    UserId: string;
    UserName: string;
}

export type Header = {
    Name: string;
    Value: string;
    Match: string;
}

export type Identification = {
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

export type XmlRootAttribute = {
    Name: string;
    Value: string;
}

export type DirectPlayProfile = {
    Container: string;
    AudioCodec: string;
    VideoCodec: string;
    Type: string;
}

export type TranscodingProfile = {
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

export type Condition = {
    Condition: string;
    Property: string;
    Value: string;
    IsRequired: boolean;
}

export type ContainerProfile = {
    Type: string;
    Conditions: Condition[];
    Container: string;
}

export type Condition2 = {
    Condition: string;
    Property: string;
    Value: string;
    IsRequired: boolean;
}

export type ApplyCondition = {
    Condition: string;
    Property: string;
    Value: string;
    IsRequired: boolean;
}

export type CodecProfile = {
    Type: string;
    Conditions: Condition2[];
    ApplyConditions: ApplyCondition[];
    Codec: string;
    Container: string;
}

export type Condition3 = {
    Condition: string;
    Property: string;
    Value: string;
    IsRequired: boolean;
}

export type ResponseProfile = {
    Container: string;
    AudioCodec: string;
    VideoCodec: string;
    Type: string;
    OrgPn: string;
    MimeType: string;
    Conditions: Condition3[];
}

export type SubtitleProfile = {
    Format: string;
    Method: string;
    DidlMode: string;
    Language: string;
    Container: string;
}

export type DeviceProfile = {
    Name: string;
    Id: string;
    Identification: Identification;
    FriendlyName: string;
    Manufacturer: string;
    ManufacturerUrl: string;
    ModelName: string;
    ModelDescription: string;
    ModelNumber: string;
    ModelUrl: string;
    SerialNumber: string;
    EnableAlbumArtInDidl: boolean;
    EnableSingleAlbumArtLimit: boolean;
    EnableSingleSubtitleLimit: boolean;
    SupportedMediaTypes: string;
    UserId: string;
    AlbumArtPn: string;
    MaxAlbumArtWidth: number;
    MaxAlbumArtHeight: number;
    MaxIconWidth: number;
    MaxIconHeight: number;
    MaxStreamingBitrate: number;
    MaxStaticBitrate: number;
    MusicStreamingTranscodingBitrate: number;
    MaxStaticMusicBitrate: number;
    SonyAggregationFlags: string;
    ProtocolInfo: string;
    TimelineOffsetSeconds: number;
    RequiresPlainVideoItems: boolean;
    RequiresPlainFolders: boolean;
    EnableMSMediaReceiverRegistrar: boolean;
    IgnoreTranscodeByteRangeRequests: boolean;
    XmlRootAttributes: XmlRootAttribute[];
    DirectPlayProfiles: DirectPlayProfile[];
    TranscodingProfiles: TranscodingProfile[];
    ContainerProfiles: ContainerProfile[];
    CodecProfiles: CodecProfile[];
    ResponseProfiles: ResponseProfile[];
    SubtitleProfiles: SubtitleProfile[];
}

export type Capabilities = {
    PlayableMediaTypes: string[];
    SupportedCommands: string[];
    SupportsMediaControl: boolean;
    SupportsContentUploading: boolean;
    MessageCallbackUrl: string;
    SupportsPersistentIdentifier: boolean;
    SupportsSync: boolean;
    DeviceProfile: DeviceProfile;
    AppStoreUrl: string;
    IconUrl: string;
}

export type ExternalUrl = {
    Name: string;
    Url: string;
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

export type MediaAttachment = {
    Codec: string;
    CodecTag: string;
    Comment: string;
    Index: number;
    FileName: string;
    MimeType: string;
    DeliveryUrl: string;
}

export type RequiredHttpHeaders = {
    property1: string;
    property2: string;
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
}

export type RemoteTrailer = {
    Url: string;
    Name: string;
}

export type ProviderIds = {
    property1: string;
    property2: string;
}

export type Primary = {
    property1: string;
    property2: string;
}

export type Art = {
    property1: string;
    property2: string;
}

export type Backdrop = {
    property1: string;
    property2: string;
}

export type Banner = {
    property1: string;
    property2: string;
}

export type Logo = {
    property1: string;
    property2: string;
}

export type Thumb = {
    property1: string;
    property2: string;
}

export type Disc = {
    property1: string;
    property2: string;
}

export type Box = {
    property1: string;
    property2: string;
}

export type Screenshot = {
    property1: string;
    property2: string;
}

export type Menu = {
    property1: string;
    property2: string;
}

export type Chapter = {
    property1: string;
    property2: string;
}

export type BoxRear = {
    property1: string;
    property2: string;
}

export type Profile = {
    property1: string;
    property2: string;
}

export type ImageBlurHashes = {
    Primary: Primary;
    Art: Art;
    Backdrop: Backdrop;
    Banner: Banner;
    Logo: Logo;
    Thumb: Thumb;
    Disc: Disc;
    Box: Box;
    Screenshot: Screenshot;
    Menu: Menu;
    Chapter: Chapter;
    BoxRear: BoxRear;
    Profile: Profile;
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

export type ImageTags = {
    property1: string;
    property2: string;
}

export type Primary2 = {
    property1: string;
    property2: string;
}

export type Art2 = {
    property1: string;
    property2: string;
}

export type Backdrop2 = {
    property1: string;
    property2: string;
}

export type Banner2 = {
    property1: string;
    property2: string;
}

export type Logo2 = {
    property1: string;
    property2: string;
}

export type Thumb2 = {
    property1: string;
    property2: string;
}

export type Disc2 = {
    property1: string;
    property2: string;
}

export type Box2 = {
    property1: string;
    property2: string;
}

export type Screenshot2 = {
    property1: string;
    property2: string;
}

export type Menu2 = {
    property1: string;
    property2: string;
}

export type Chapter2 = {
    property1: string;
    property2: string;
}

export type BoxRear2 = {
    property1: string;
    property2: string;
}

export type Profile2 = {
    property1: string;
    property2: string;
}

export type ImageBlurHashes2 = {
    Primary: Primary2;
    Art: Art2;
    Backdrop: Backdrop2;
    Banner: Banner2;
    Logo: Logo2;
    Thumb: Thumb2;
    Disc: Disc2;
    Box: Box2;
    Screenshot: Screenshot2;
    Menu: Menu2;
    Chapter: Chapter2;
    BoxRear: BoxRear2;
    Profile: Profile2;
}

export type Chapter3 = {
    StartPositionTicks: number;
    Name: string;
    ImagePath: string;
    ImageDateModified: Date;
    ImageTag: string;
}

export type CurrentProgram = {
}

export type NowPlayingItem = {
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
    ImageBlurHashes: ImageBlurHashes2;
    SeriesStudio: string;
    ParentThumbItemId: string;
    ParentThumbImageTag: string;
    ParentPrimaryImageItemId: string;
    ParentPrimaryImageTag: string;
    Chapters: Chapter3[];
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

export type RemoteTrailer2 = {
    Url: string;
    Name: string;
}

export type FullNowPlayingItem = {
    Size: number;
    Container: string;
    DateLastSaved: Date;
    RemoteTrailers: RemoteTrailer2[];
    IsHD: boolean;
    IsShortcut: boolean;
    ShortcutPath: string;
    Width: number;
    Height: number;
    ExtraIds: string[];
    SupportsExternalTransfer: boolean;
}

export type ExternalUrl2 = {
    Name: string;
    Url: string;
}

export type MediaAttachment2 = {
    Codec: string;
    CodecTag: string;
    Comment: string;
    Index: number;
    FileName: string;
    MimeType: string;
    DeliveryUrl: string;
}

export type RequiredHttpHeaders2 = {
    property1: string;
    property2: string;
}

export type MediaSource2 = {
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
    MediaAttachments: MediaAttachment2[];
    Formats: string[];
    Bitrate: number;
    Timestamp: string;
    RequiredHttpHeaders: RequiredHttpHeaders2;
    TranscodingUrl: string;
    TranscodingSubProtocol: string;
    TranscodingContainer: string;
    AnalyzeDurationMs: number;
    DefaultAudioStreamIndex: number;
    DefaultSubtitleStreamIndex: number;
}

export type RemoteTrailer3 = {
    Url: string;
    Name: string;
}

export type ProviderIds2 = {
    property1: string;
    property2: string;
}

export type Primary3 = {
    property1: string;
    property2: string;
}

export type Art3 = {
    property1: string;
    property2: string;
}

export type Backdrop3 = {
    property1: string;
    property2: string;
}

export type Banner3 = {
    property1: string;
    property2: string;
}

export type Logo3 = {
    property1: string;
    property2: string;
}

export type Thumb3 = {
    property1: string;
    property2: string;
}

export type Disc3 = {
    property1: string;
    property2: string;
}

export type Box3 = {
    property1: string;
    property2: string;
}

export type Screenshot3 = {
    property1: string;
    property2: string;
}

export type Menu3 = {
    property1: string;
    property2: string;
}

export type Chapter4 = {
    property1: string;
    property2: string;
}

export type BoxRear3 = {
    property1: string;
    property2: string;
}

export type Profile3 = {
    property1: string;
    property2: string;
}

export type ImageBlurHashes3 = {
    Primary: Primary3;
    Art: Art3;
    Backdrop: Backdrop3;
    Banner: Banner3;
    Logo: Logo3;
    Thumb: Thumb3;
    Disc: Disc3;
    Box: Box3;
    Screenshot: Screenshot3;
    Menu: Menu3;
    Chapter: Chapter4;
    BoxRear: BoxRear3;
    Profile: Profile3;
}

export type Person2 = {
    Name: string;
    Id: string;
    Role: string;
    Type: string;
    PrimaryImageTag: string;
    ImageBlurHashes: ImageBlurHashes3;
}

export type Studio2 = {
    Name: string;
    Id: string;
}

export type GenreItem2 = {
    Name: string;
    Id: string;
}

export type UserData2 = {
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

export type ArtistItem2 = {
    Name: string;
    Id: string;
}

export type AlbumArtist2 = {
    Name: string;
    Id: string;
}

export type ImageTags2 = {
    property1: string;
    property2: string;
}

export type Primary4 = {
    property1: string;
    property2: string;
}

export type Art4 = {
    property1: string;
    property2: string;
}

export type Backdrop4 = {
    property1: string;
    property2: string;
}

export type Banner4 = {
    property1: string;
    property2: string;
}

export type Logo4 = {
    property1: string;
    property2: string;
}

export type Thumb4 = {
    property1: string;
    property2: string;
}

export type Disc4 = {
    property1: string;
    property2: string;
}

export type Box4 = {
    property1: string;
    property2: string;
}

export type Screenshot4 = {
    property1: string;
    property2: string;
}

export type Menu4 = {
    property1: string;
    property2: string;
}

export type Chapter5 = {
    property1: string;
    property2: string;
}

export type BoxRear4 = {
    property1: string;
    property2: string;
}

export type Profile4 = {
    property1: string;
    property2: string;
}

export type ImageBlurHashes4 = {
    Primary: Primary4;
    Art: Art4;
    Backdrop: Backdrop4;
    Banner: Banner4;
    Logo: Logo4;
    Thumb: Thumb4;
    Disc: Disc4;
    Box: Box4;
    Screenshot: Screenshot4;
    Menu: Menu4;
    Chapter: Chapter5;
    BoxRear: BoxRear4;
    Profile: Profile4;
}

export type Chapter6 = {
    StartPositionTicks: number;
    Name: string;
    ImagePath: string;
    ImageDateModified: Date;
    ImageTag: string;
}

export type CurrentProgram2 = {
}

export type NowViewingItem = {
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
    ExternalUrls: ExternalUrl2[];
    MediaSources: MediaSource2[];
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
    RemoteTrailers: RemoteTrailer3[];
    ProviderIds: ProviderIds2;
    IsHD: boolean;
    IsFolder: boolean;
    ParentId: string;
    Type: string;
    People: Person2[];
    Studios: Studio2[];
    GenreItems: GenreItem2[];
    ParentLogoItemId: string;
    ParentBackdropItemId: string;
    ParentBackdropImageTags: string[];
    LocalTrailerCount: number;
    UserData: UserData2;
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
    ArtistItems: ArtistItem2[];
    Album: string;
    CollectionType: string;
    DisplayOrder: string;
    AlbumId: string;
    AlbumPrimaryImageTag: string;
    SeriesPrimaryImageTag: string;
    AlbumArtist: string;
    AlbumArtists: AlbumArtist2[];
    SeasonName: string;
    MediaStreams: MediaStream[];
    VideoType: string;
    PartCount: number;
    MediaSourceCount: number;
    ImageTags: ImageTags2;
    BackdropImageTags: string[];
    ScreenshotImageTags: string[];
    ParentLogoImageTag: string;
    ParentArtItemId: string;
    ParentArtImageTag: string;
    SeriesThumbImageTag: string;
    ImageBlurHashes: ImageBlurHashes4;
    SeriesStudio: string;
    ParentThumbItemId: string;
    ParentThumbImageTag: string;
    ParentPrimaryImageItemId: string;
    ParentPrimaryImageTag: string;
    Chapters: Chapter6[];
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
    CurrentProgram: CurrentProgram2;
}

export type TranscodingInfo = {
    AudioCodec: string;
    VideoCodec: string;
    Container: string;
    IsVideoDirect: boolean;
    IsAudioDirect: boolean;
    Bitrate: number;
    Framerate: number;
    CompletionPercentage: number;
    Width: number;
    Height: number;
    AudioChannels: number;
    TranscodeReasons: string[];
}

export type NowPlayingQueue = {
    Id: string;
    PlaylistItemId: string;
}

export type SessionInfo = {
    PlayState: PlayState;
    AdditionalUsers: AdditionalUser[];
    Capabilities: Capabilities;
    RemoteEndPoint: string;
    PlayableMediaTypes: string[];
    Id: string;
    UserId: string;
    UserName: string;
    Client: string;
    LastActivityDate: Date;
    LastPlaybackCheckIn: Date;
    DeviceName: string;
    DeviceType: string;
    NowPlayingItem: NowPlayingItem;
    FullNowPlayingItem: FullNowPlayingItem;
    NowViewingItem: NowViewingItem;
    DeviceId: string;
    ApplicationVersion: string;
    TranscodingInfo: TranscodingInfo;
    IsActive: boolean;
    SupportsMediaControl: boolean;
    SupportsRemoteControl: boolean;
    NowPlayingQueue: NowPlayingQueue[];
    HasCustomDeviceName: boolean;
    PlaylistItemId: string;
    ServerId: string;
    UserPrimaryImageTag: string;
    SupportedCommands: string[];
}

export type AuthenticationResponse = {
    User: User;
    SessionInfo: SessionInfo;
    AccessToken: string;
    ServerId: string;
}