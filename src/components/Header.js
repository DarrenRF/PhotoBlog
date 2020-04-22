import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
  renderContent() {
    // console.log('header.js ' + this.props.auth);

    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a className="navbar-brand" href={'/auth/google'}>Login With Google</a>
          </li>
        );
      default:
        return [
          <li key="3" style={{ margin: '0 10px' }}>
            <Link className="navbar-brand" to="/blogs">My Blogs</Link>
          </li>,
          <li key="2">
            <a className="navbar-brand" href={'/auth/logout'}>Logout</a>
          </li>
        ];
    }
  }

  render() {
    return (
      <nav className="navbar navbar-expand navbar-dark bg-dark mb-4">
        <div className="container">
          <Link
            to={this.props.auth ? '/blogs' : '/'}
            className="left"
            style={{ marginLeft: '10px' }}
          >
            <a className="navbar-brand" href="/">PhotoBlog</a>
          </Link>
          <ul className="navbar-nav ml-auto">{this.renderContent()}</ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
