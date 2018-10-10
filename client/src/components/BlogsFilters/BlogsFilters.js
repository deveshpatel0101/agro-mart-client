import React from 'react';
import './BlogsFilters.css';
import moment from 'moment';
import { TextField } from '@material-ui/core';
import { connect } from 'react-redux';

import { setTextFilter, setStartDate, setEndDate } from '../../redux/actions/filters';

class BlogsFilter extends React.Component {
  constructor(props) {
    super(props);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  handleStartDateChange(e) {
    const startDate = e.target.value;
    if (startDate) {
      // converting date string to timestamp
      const startDateTimeStamp = moment(startDate).valueOf();
      // dispatching setStartDate to filter blogs
      this.props.dispatch(setStartDate(startDateTimeStamp));
    }
  }

  handleEndDateChange(e) {
    const endDate = e.target.value;
    if (endDate) {
      // converting date string to timestamp
      const endDateTimeStamp = moment(endDate).valueOf();
      // dispatching setEndDate to filter blogs
      this.props.dispatch(setEndDate(endDateTimeStamp))
    }
  }

  handleTextChange(e) {
    const textField = e.target.value;
    // get value from text field and set it as text filter in filters state
    this.props.dispatch(setTextFilter(textField));
  }

  render() {
    return (
      <div className='adjust'>
        <span>
          <TextField
            id="search"
            label="Search"
            type="search"
            margin="normal"
            value={this.props.filters.text}
            onChange={this.handleTextChange}
          />

          <form noValidate className='date-form'>
            <div className='start-date'>
              <TextField
                id="date"
                label="Start Date"
                type="date"
                defaultValue=''
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={this.handleStartDateChange}
              />
            </div>

            <div className='end-date'>
              <TextField
                id="date"
                label="End Date"
                type="date"
                defaultValue={moment().format('YYYY-MM-DD')}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={this.handleEndDateChange}
              />
            </div>
          </form>

        </span>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    filters: state.filters
  }
}

export default connect(mapStateToProps)(BlogsFilter);