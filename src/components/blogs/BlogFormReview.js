import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';

class BlogFormReview extends Component {

  state = { file: null };

  renderFields() {
    const { formValues } = this.props;

    return _.map(formFields, ({ name, label }) => {
      return (
        <div key={name} style={{ marginBottom: 25 }}>
          <label>{label}</label>
          <div>{formValues[name]}</div>
        </div>
      );
    });
  }

  renderButtons() {
    const { onCancel } = this.props;

    return (
      <div
        style={{
          display: "flex",
          justifyContent:
          'space-between',
          marginTop: 25
        }}>
        <button
          className="btn btn-warning"
          onClick={onCancel}
        >
          Back
        </button>
        <button className="btn btn-success">
          Save Blog
        </button>
      </div>
    );
  }

  onSubmit(event) {
    event.preventDefault();

    const { submitBlog, history, formValues } = this.props;

    submitBlog(formValues, this.state.file, history);
  }

  onFileChange(event) {
    this.setState({ file: event.target.files[0] });
    console.log(event.target.files);
  }

  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <h3 style={{ display: "flex", justifyContent: 'center'}}>
          Please confirm information
        </h3>

        {this.renderFields()}

        <h4>Add An Image</h4>
        <input
          onChange={this.onFileChange.bind(this)}
          type="file"
          accept="image/*"
        />

        {this.renderButtons()}
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { formValues: state.form.blogForm.values };
}

export default connect(mapStateToProps, actions)(withRouter(BlogFormReview));
