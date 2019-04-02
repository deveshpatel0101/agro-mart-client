import React from 'react';
import './BlogsFilters.css';
import moment from 'moment';
import { TextField } from '@material-ui/core';
import { connect } from 'react-redux';

import { setTextFilter, setStartDate, setEndDate } from '../../redux/actions/filters';

class BlogsFilter extends React.Component {
  handleStartDateChange = (e) => {
    const startDate = e.target.value;
    // converting date string to timestamp
    const startDateTimeStamp = moment(startDate ? startDate : 0).valueOf();
    // dispatching setStartDate to filter blogs
    this.props.dispatch(setStartDate(startDateTimeStamp ? startDateTimeStamp : 0));
  };

  handleEndDateChange = (e) => {
    const endDate = e.target.value;
    // converting date string to timestamp
    const endDateTimeStamp = moment(endDate ? endDate : 0).valueOf();
    // dispatching setEndDate to filter blogs
    this.props.dispatch(setEndDate(endDateTimeStamp ? endDateTimeStamp : 0));
  };

  handleTextChange = (e) => {
    const textField = e.target.value;
    // get value from text field and set it as text filter in filters state
    this.props.dispatch(setTextFilter(textField));
  };

  componentWillMount() {
    console.log();
  }

  render() {
    return (
      <div className='form-filter-container'>
        <TextField
          id='search'
          label='Search'
          type='search'
          margin='normal'
          value={this.props.filters.text}
          onChange={this.handleTextChange}
          className='search-field form-filter-child'
        />

        <div className='date-form form-filter-child'>
          <div className='start-date'>
            <TextField
              id='date'
              label='Start Date'
              type='date'
              value={
                this.props.filters.startDate
                  ? moment(this.props.filters.startDate).format('YYYY-MM-DD')
                  : ''
              }
              InputLabelProps={{
                shrink: true,
              }}
              onEmptied={this.handleStartDateChange}
              onChange={this.handleStartDateChange}
            />
          </div>
        </div>
        <div className='date-form form-filter-child'>
          <div className='end-date'>
            <TextField
              id='date'
              label='End Date'
              type='date'
              InputLabelProps={{
                shrink: true,
              }}
              value={moment(this.props.filters.endDate).format('YYYY-MM-DD')}
              onEmptied={this.handleEndDateChange}
              onChange={this.handleEndDateChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    filters: state.filters,
  };
};

export default connect(mapStateToProps)(BlogsFilter);
