export const BITRATES = <const>[
    120000000,
    80000000,
    60000000,
    40000000,
    20000000,
    15000000,
    1000000,
    400000,
    100000,
]

export type Source = {
    type: "direct" | "hls",
    url: string,
}