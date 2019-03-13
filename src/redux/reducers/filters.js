import moment from 'moment';

const filtersReducerDefaultState = {
  text: '',
  sortBy: 'dateCreatedAtDown',
  startDate: null,
  endDate: moment().endOf('day')
}

export default (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
      case 'SET_TEXT_FILTER':
          return {...state, text: action.text }
      case 'SET_DATE_FILTER':
          return {...state, sortBy: action.date }
      case 'SET_START_DATE':
          return {...state, startDate: action.startDate }
      case 'SET_END_DATE':
          return {...state, endDate: action.endDate ? action.endDate : moment().endOf('day') }
      default:
          return state;
  }
};
