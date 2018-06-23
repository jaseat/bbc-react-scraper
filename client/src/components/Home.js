import React, { Component } from 'react';

import ArticleList from './ArticleList';
import SearchForm from './SearchForm';

import axios from 'axios';

import { parseArticles } from '../utils/helpers';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      savedArticles: [],
    };
  }
  componentDidMount() {
    axios('/api/articles')
      .then(response => response.data)
      .then(response => this.setState({ savedArticles: response }));
  }
  fetchArticles = URL => {
    axios
      .get(URL)
      .then(response => parseArticles(response))
      .then(articles => this.setState({ articles }))
      .catch(error => console.log(error));
  };
  saveArticle = index => {
    axios
      .post('/api/articles', this.state.articles[index])
      .then(response => response.data)
      .then(response =>
        this.setState({
          savedArticles: [response, ...this.state.savedArticles],
        })
      )
      .catch(error => console.log(error));
  };
  removeArticle = index => {
    axios
      .delete('/api/articles', {
        params: { id: this.state.savedArticles[index]._id },
      })
      .then(response => {
        let articles = [...this.state.savedArticles];
        console.log(articles.splice(index, 1));
        this.setState({ savedArticles: articles });
      });
  };
  render() {
    return (
      <div>
        <SearchForm fetchArticles={this.fetchArticles} />
        <ArticleList
          header="Results"
          articles={this.state.articles}
          saveArticle={this.saveArticle}
        />
        <ArticleList
          header="Saved Articles"
          articles={this.state.savedArticles}
          removeArticle={this.removeArticle}
          saved
        />
      </div>
    );
  }
}

export default Home;
