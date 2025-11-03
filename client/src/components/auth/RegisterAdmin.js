import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { registerAdmin } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";
import Button from "../common/Button";

class RegisterAdmin extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      adminCode: "",
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.errors) {
      return { errors: nextProps.errors };
    }
    return null;
  }

  onSubmit(e) {
    e.preventDefault();
    const payload = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      adminCode: this.state.adminCode,
    };
    this.props.registerAdmin(payload);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="login-bg">
        <div id="app">
          <section className="section">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-5 mt-5">
                  <div className="card card-primary mt-5 login-refix">
                    <div className="card-header justify-content-center">
                      <h3>Register Admin</h3>
                    </div>
                    <div className="card-body">
                      <form onSubmit={this.onSubmit}>
                        <TextFieldGroup
                          placeholder="Full name"
                          label="Name"
                          type="text"
                          value={this.state.name}
                          name="name"
                          onChange={this.onChange}
                          error={errors.name}
                          tabindex="1"
                        />
                        <TextFieldGroup
                          placeholder="Email Address"
                          label="Email"
                          type="email"
                          value={this.state.email}
                          name="email"
                          onChange={this.onChange}
                          error={errors.email}
                          tabindex="2"
                        />
                        <TextFieldGroup
                          placeholder="Password"
                          label="Password"
                          type="password"
                          value={this.state.password}
                          name="password"
                          onChange={this.onChange}
                          error={errors.password}
                          tabindex="3"
                        />
                        <TextFieldGroup
                          placeholder="Confirm Password"
                          label="Confirm Password"
                          type="password"
                          value={this.state.password2}
                          name="password2"
                          onChange={this.onChange}
                          error={errors.password2}
                          tabindex="4"
                        />
                        <TextFieldGroup
                          placeholder="Admin Registration Code"
                          label="Admin Registration Code"
                          type="text"
                          value={this.state.adminCode}
                          name="adminCode"
                          onChange={this.onChange}
                          error={errors.adminCode}
                          tabindex="5"
                        />
                        <div className="form-group mt-4 mb-5">
                          <Button
                            type="submit"
                            classnameItems="btn-primary btn-lg btn-block"
                            btnName="Register Admin"
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

RegisterAdmin.propTypes = {
  registerAdmin: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ errors: state.errors });
export default connect(mapStateToProps, { registerAdmin })(RegisterAdmin);
