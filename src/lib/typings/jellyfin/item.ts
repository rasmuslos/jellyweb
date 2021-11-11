export type JellyfinItem = {
    Name:                         string;
    OriginalTitle:                string;
    ServerId:                     string;
    Id:                           string;
    Etag:                         string;
    SourceType:                   string;
    PlaylistItemId:               string;
    DateCreated:                  Date;
    DateLastMediaAdded:           Date;
    ExtraType:                    string;
    AirsBeforeSeasonNumber:       number;
    AirsAfterSeasonNumber:        number;
    AirsBeforeEpisodeNumber:      number;
    CanDelete:                    boolean;
    CanDownload:                  boolean;
    HasSubtitles:                 boolean;
    PreferredMetadataLanguage:    string;
    PreferredMetadataCountryCode: string;
    SupportsSync:                 boolean;
    Container:                    string;
    SortName:                     string;
    ForcedSortName:               string;
    Video3DFormat:                string;
    PremiereDate:                 Date;
    ExternalUrls:                 ExternalURL[];
    MediaSources:                 MediaSource[];
    CriticRating:                 number;
    ProductionLocations:          string[];
    Path:                         string;
    EnableMediaSourceDisplay:     boolean;
    OfficialRating:               string;
    CustomRating:                 string;
    ChannelId:                    string;
    ChannelName:                  string;
    Overview:                     string;
    Taglines:                     string[];
    Genres:                       string[];
    CommunityRating:              number;
    CumulativeRunTimeTicks:       number;
    RunTimeTicks:                 number;
    PlayAccess:                   string;
    AspectRatio:                  string;
    ProductionYear:               number;
    IsPlaceHolder:                boolean;
    Number:                       string;
    ChannelNumber:                string;
    IndexNumber:                  number;
    IndexNumberEnd:               number;
    ParentIndexNumber:            number;
    RemoteTrailers:               ExternalURL[];
    ProviderIds:                  ImageTags;
    IsHD:                         boolean;
    IsFolder:                     boolean;
    ParentId:                     string;
    Type:                         string;
    People:                       Person[];
    Studios:                      AlbumArtist[];
    GenreItems:                   AlbumArtist[];
    ParentLogoItemId:             string;
    ParentBackdropItemId:         string;
    ParentBackdropImageTags:      string[];
    LocalTrailerCount:            number;
    UserData:                     UserData;
    RecursiveItemCount:           number;
    ChildCount:                   number;
    SeriesName:                   string;
    SeriesId:                     string;
    SeasonId:                     string;
    SpecialFeatureCount:          number;
    DisplayPreferencesId:         string;
    Status:                       string;
    string:                      string;
    AirDays:                      string[];
    Tags:                         string[];
    PrimaryImageAspectRatio:      number;
    Artists:                      string[];
    ArtistItems:                  AlbumArtist[];
    Album:                        string;
    CollectionType:               string;
    DisplayOrder:                 string;
    AlbumId:                      string;
    AlbumPrimaryImageTag:         string;
    SeriesPrimaryImageTag:        string;
    AlbumArtist:                  string;
    AlbumArtists:                 AlbumArtist[];
    SeasonName:                   string;
    MediaStreams:                 MediaStream[];
    VideoType:                    string;
    PartCount:                    number;
    MediaSourceCount:             number;
    ImageTags:                    ImageTags;
    BackdropImageTags:            string[];
    ScreenshotImageTags:          string[];
    ParentLogoImageTag:           string;
    ParentArtItemId:              string;
    ParentArtImageTag:            string;
    SeriesThumbImageTag:          string;
    ImageBlurHashes:              { [key: string]: ImageTags };
    SeriesStudio:                 string;
    ParentThumbItemId:            string;
    ParentThumbImageTag:          string;
    ParentPrimaryImageItemId:     string;
    ParentPrimaryImageTag:        string;
    Chapters:                     Chapter[];
    LocationType:                 string;
    IsoType:                      string;
    MediaType:                    string;
    EndDate:                      Date;
    LockedFields:                 string[];
    TrailerCount:                 number;
    MovieCount:                   number;
    SeriesCount:                  number;
    ProgramCount:                 number;
    EpisodeCount:                 number;
    SongCount:                    number;
    AlbumCount:                   number;
    ArtistCount:                  number;
    MusicVideoCount:              number;
    LockData:                     boolean;
    Width:                        number;
    Height:                       number;
    CameraMake:                   string;
    CameraModel:                  string;
    Software:                     string;
    ExposureTime:                 number;
    FocalLength:                  number;
    ImageOrientation:             string;
    Aperture:                     number;
    ShutterSpeed:                 number;
    Latitude:                     number;
    Longitude:                    number;
    Altitude:                     number;
    IsoSpeedRating:               number;
    SeriesTimerId:                string;
    ProgramId:                    string;
    ChannelPrimaryImageTag:       string;
    StartDate:                    Date;
    CompletionPercentage:         number;
    IsRepeat:                     boolean;
    EpisodeTitle:                 string;
    ChannelType:                  string;
    Audio:                        string;
    IsMovie:                      boolean;
    IsSports:                     boolean;
    IsSeries:                     boolean;
    IsLive:                       boolean;
    IsNews:                       boolean;
    IsKids:                       boolean;
    IsPremiere:                   boolean;
    TimerId:                      string;
}
export type AlbumArtist = {
    Name: string;
    Id:   string;
}

export type Chapter = {
    StartPositionTicks: number;
    Name:               string;
    ImagePath:          string;
    ImageDateModified:  Date;
    ImageTag:           string;
}

export type ExternalURL = {
    Name: string;
    Url:  string;
}

export type ImageTags = {
    Primary?: string;
}

export type Person = {
    Name:            string;
    Id:              string;
    Role:            string;
    Type:            string;
    PrimaryImageTag: string;
    ImageBlurHashes: { [key: string]: ImageTags };
}

export type UserData = {
    Rating:                number;
    PlayedPercentage:      number;
    UnplayedItemCount:     number;
    PlaybackPositionTicks: number;
    PlayCount:             number;
    IsFavorite:            boolean;
    Likes:                 boolean;
    LastPlayedDate:        string;
    Played:                boolean;
    Key:                   string;
    ItemId:                string;
}

/*
export interface MediaStream {
    Codec: string;
    Language: string;
    TimeBase: string;
    CodecTimeBase: string;
    VideoRange: string;
    DisplayTitle: string;
    NalLengthSize: string;
    IsInterlaced: boolean;
    IsAVC: boolean;
    BitRate: number;
    BitDepth: number;
    RefFrames: number;
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
    IsExternal: boolean;
    IsTextSubtitleStream: boolean;
    SupportsExternalStream: boolean;
    PixelFormat: string;
    Level: number;
    Title: string;
    ChannelLayout: string;
    Channels?: number;
    SampleRate?: number;
    localizedUndefined: string;
    localizedDefault: string;
    localizedForced: string;
    DeliveryMethod: string;
    DeliveryUrl: string;
    IsExternalUrl?: boolean;
    Path: string;
}

export interface RequiredHttpHeaders {
}

export interface MediaSource {
    Protocol: string;
    Id: string;
    Path: string;
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
    RequiresClosing: boolean;
    RequiresLooping: boolean;
    SupportsProbing: boolean;
    VideoType: string;
    MediaStreams: MediaStream[];
    MediaAttachments: any[];
    Formats: any[];
    Bitrate: number;
    RequiredHttpHeaders: RequiredHttpHeaders;
    TranscodingUrl: string;
    TranscodingSubProtocol: string;
    TranscodingContainer: string;
    DefaultAudioStreamIndex: number;
    DefaultSubtitleStreamIndex: number;
    DeliveryUrl: string;
}

 */
