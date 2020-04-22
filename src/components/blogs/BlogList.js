import React, { Component } from 'react';
import map from 'lodash/map';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchBlogs } from '../../actions';

class BlogList extends Component {
  componentDidMount() {
    this.props.fetchBlogs();
  }

  renderBlogs() {
    return map(this.props.blogs, blog => {
      return (
        <div key={blog._id}>
          <div className="jumbotron">
            <div>
              <span className="display-4">{blog.title}</span>
              <p className="lead">{blog.content}</p>
            </div>
            <div style={{ display: "flex", justifyContent: 'flex-end' }}>
              <Link
                className="btn btn-primary btn-lg"
                to={`/blogs/${blog._id}`}>Read
              </Link>
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    return <div>{this.renderBlogs()}</div>;
  }
}

function mapStateToProps({ blogs }) {
  return { blogs };
}

export default connect(mapStateToProps, { fetchBlogs })(BlogList);
