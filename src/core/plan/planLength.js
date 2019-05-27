import { RATIO } from './ratio'

export const DAY_NOT_SURE = -1

const map = {
  [RATIO.HIGH_QUALITY.value]: {
    min: 3,
    max: 5
  },
  [RATIO.DELICATE.value]: {
    min: 6,
    max: 12
  },
  [RATIO.NORMAL.value]: {
    min: 13,
    max: DAY_NOT_SURE
  }
}

const copyOf = sourceObject => JSON.parse(JSON.stringify(sourceObject))

export const getPlanLengthRange = ({
  longestPeriod,
  ratio
}) => {
  const result = copyOf(map[ratio])
  if (longestPeriod < result.min) {
    return null
  }
  if (result.max === DAY_NOT_SURE || result.max > longestPeriod) {
    result.max = longestPeriod
  }
  return result
}