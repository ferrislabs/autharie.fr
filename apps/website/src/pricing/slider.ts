/** Where the centre of the thumb sits, as a CSS length, for a position between 0 and 1. */
export const thumbAt = (position: number) => `calc(10px + (100% - 20px) * ${position})`
