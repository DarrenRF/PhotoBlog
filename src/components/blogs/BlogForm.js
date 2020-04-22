import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';

class BlogForm extends Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="invalid-feedback">
          {error}
        </div>
      );
    }
  }
  renderInput = ({ input, label, meta, placeholder }) => {
    let className = ""
    let className2 = ""
    let className3 = ""
    let value = ""
    let id = ""
    let _for = ""

    if (!meta.error) {
      className="form-group has-success"
      className2="form-control-label"
      className3="form-control is-valid"
      id="inputValid"
      value="correct value"
      _for = "inputSuccess1"
    } else if (meta.error && meta.touched) {
      className="form-group has-danger"
      className2="form-control-label"
      className3="form-control is-invalid"
      id="inputInvalid"
      value="invalid-feedback"
      _for = "inputDanger1"
    }

    return (
      <div>
        {meta.touched ? <div className={className}>
          <label className={className2} htmlFor={_for}>{label}</label>
          <input
            type="text"
            value={value}
            className={className3}
            id={id}
            {...input}
            autoComplete="on"
          />
          {this.renderError(meta)}
        </div> :
          <div className="form-group">
            <label className="col-form-label" htmlFor="inputDefault">{label}</label>
            <input
              type="text"
              className="form-control"
              placeholder={placeholder}
              id="inputDefault" {...input}
              autoComplete="on"
            />
          </div>
        }
      </div>
    );
  };

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onBlogSubmit)}>
          <Field
            name="title"
            placeholder="Enter Title"
            component={this.renderInput}
            label="Blog Title"
          />
          <Field
            name="content"
            component={this.renderInput}
            label="Content"
            placeholder="Enter Content"
          />
        <div style={{ display: "flex", justifyContent: 'flex-end'}}>
          <Link to="/blogs" className="btn btn-danger">
            Cancel
          </Link>
          <button type="submit" className="btn btn-secondary">
            Next
          </button>
          </div>
        </form>
      </div>
    );
  }
}

const validate = formValues => {
  const errors = {};

  if (!formValues.title) {
    errors.title = 'You must enter a title';
  }

  if (!formValues.content) {
    errors.content = 'You must enter some content';
  }

  return errors;
};

export default reduxForm({
  validate,
  form: 'blogForm',
  destroyOnUnmount: false
})(BlogForm);
