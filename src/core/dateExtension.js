export const getMonthLength = ({
  year, monthDisplay
}) => new Date(year, monthDisplay, 0).getDate()