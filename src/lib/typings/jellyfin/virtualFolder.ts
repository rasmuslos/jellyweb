export interface PathInfo {
    Path: string;
    NetworkPath: string;
}

export interface ImageOption {
    Type: string;
    Limit: number;
    MinWidth: number;
}

export interface TypeOption {
    Type: string;
    MetadataFetchers: string[];
    MetadataFetcherOrder: string[];
    ImageFetchers: string[];
    ImageFetcherOrder: string[];
    ImageOptions: ImageOption[];
}

export interface LibraryOptions {
    EnablePhotos: boolean;
    EnableRealtimeMonitor: boolean;
    EnableChapterImageExtraction: boolean;
    ExtractChapterImagesDuringLibraryScan: boolean;
    PathInfos: PathInfo[];
    SaveLocalMetadata: boolean;
    EnableInternetProviders: boolean;
    EnableAutomaticSeriesGrouping: boolean;
    EnableEmbeddedTitles: boolean;
    EnableEmbeddedEpisodeInfos: boolean;
    AutomaticRefreshIntervalDays: number;
    PreferredMetadataLanguage: string;
    MetadataCountryCode: string;
    SeasonZeroDisplayName: string;
    MetadataSavers: string[];
    DisabledLocalMetadataReaders: string[];
    LocalMetadataReaderOrder: string[];
    DisabledSubtitleFetchers: string[];
    SubtitleFetcherOrder: string[];
    SkipSubtitlesIfEmbeddedSubtitlesPresent: boolean;
    SkipSubtitlesIfAudioTrackMatches: boolean;
    SubtitleDownloadLanguages: string[];
    RequirePerfectSubtitleMatch: boolean;
    SaveSubtitlesWithMedia: boolean;
    TypeOptions: TypeOption[];
}

export interface VirtualFolder {
    Name: string;
    Locations: string[];
    CollectionType: string;
    LibraryOptions: LibraryOptions;
    ItemId: string;
    PrimaryImageItemId: string;
    RefreshProgress: number;
    RefreshStatus: string;
}