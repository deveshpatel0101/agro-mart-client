export const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text,
});

export const sortByDate = (date) => ({
  type: 'SET_DATE_FILTER',
  date,
});

export const setStartDate = (startDate = undefined) => ({
  type: 'SET_START_DATE',
  startDate,
});

export const setEndDate = (endDate = undefined) => ({
  type: 'SET_END_DATE',
  endDate,
});
