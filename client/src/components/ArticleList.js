import React, { Component } from 'react';

import Button from '@material-ui/core/Button';

class ArticleList extends Component {
  handeClick = index => {
    this.props.saved
      ? this.props.removeArticle(index)
      : this.props.saveArticle(index);
  };
  renderArticles = () => {
    const { articles } = this.props;
    return articles.map((a, idx) => (
      <div key={idx} style={styles.article}>
        <h3>{a.title}</h3>
        <Button
          color="secondary"
          variant="raised"
          onClick={
            this.props.saved
              ? this.handeClick.bind(this, idx)
              : this.handeClick.bind(this, idx)
          }
        >
          {this.props.saved ? 'Remove' : 'Save'}
        </Button>
      </div>
    ));
  };
  render() {
    return (
      <div>
        <h2>{this.props.header}</h2>
        {this.props.articles && this.renderArticles()}
      </div>
    );
  }
}

const styles = {
  article: {
    display: 'grid',
    gridTemplateColumns: '3fr 1fr',
    margin: '8px',
    border: '1px solid black',
    gridTemplateRows: '1fr auto',
  },
};

export default ArticleList;
