import React, { Component } from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { buildQueryURL } from '../utils/helpers';

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topic: '',
      start: '',
      end: '',
    };
  }
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  handleKeyDown = event => {
    switch (event.key) {
      case 'Enter':
        this.handleSubmit(event);
        break;
      default:
    }
  };
  handleSubmit = event => {
    event.preventDefault();
    const { topic, start, end } = this.state;
    const URL = buildQueryURL(topic, start, end);
    this.props.fetchArticles(URL);
  };
  render() {
    return (
      <div>
        <h2>Search</h2>
        <form onSubmit={this.handleSubmit}>
          <TextField
            id="topic"
            label="Topic"
            value={this.state.topic}
            onChange={this.handleChange('topic')}
            margin="normal"
            onKeyDown={this.handleKeyDown}
          />
          <br />
          <TextField
            id="start"
            label="Start Year"
            value={this.state.start}
            onChange={this.handleChange('start')}
            margin="normal"
            onKeyDown={this.handleKeyDown}
          />
          <br />
          <TextField
            id="end"
            label="End Year"
            value={this.state.end}
            onChange={this.handleChange('end')}
            margin="normal"
            onKeyDown={this.handleKeyDown}
          />
          <br />
          <Button color="primary" variant="raised" onClick={this.handleSubmit}>
            Submit
          </Button>
        </form>
      </div>
    );
  }
}

export default SearchForm;
