import React, { Component } from "react";
import TextInputGroup from "./TextInputGroup";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { editContact, updateContact } from "./actions/contactActions";

class EditContact extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    showAddContactInfo: false,
    errors: {}
  };

  componentWillReceiveProps(nextProps, nextState) {
    const { name, email, phone } = nextProps.contact;
    this.setState({
      name,
      email,
      phone
    });
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.editContact(id);
  }

  showAddContact = e => {
    this.setState({ showAddContactInfo: !this.state.showAddContactInfo });
  };

  onSubmit = e => {
    e.preventDefault();

    const { name, email, phone } = this.state;

    //Check for errors
    if (name === "") {
      this.setState({ errors: { name: "Name is required" } });
      return;
    }
    if (email === "") {
      this.setState({ errors: { email: "Email is required" } });
      return;
    }
    if (phone === "") {
      this.setState({ errors: { phone: "Phone is required" } });
      return;
    }

    const { id } = this.props.match.params;

    const updateContact = {
      id,
      name,
      email,
      phone
    };
    this.props.updateContact(updateContact);

    // clear state
    this.setState({
      name: "",
      email: "",
      phone: ""
    });
    this.props.history.push("/");
  };
  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { name, email, phone, showAddContactInfo, errors } = this.state;

    return (
      <div className="card mb-3">
        <div className="card-header">
          Update Contact{" "}
          <button
            onClick={this.showAddContact}
            className="btn btn-sm btn-success"
          />
        </div>
        {showAddContactInfo ? (
          <div className="card-body">
            <form onSubmit={this.onSubmit.bind(this)}>
              <TextInputGroup
                label="Name"
                name="name"
                placeholder="Enter name ..."
                value={name}
                onChange={this.onChange}
                error={errors.name}
              />
              <TextInputGroup
                label="Email"
                name="email"
                placeholder="Enter email ..."
                value={email}
                onChange={this.onChange}
                type="email"
                error={errors.email}
              />
              <TextInputGroup
                label="Phone"
                name="phone"
                placeholder="Enter phone ..."
                value={phone}
                onChange={this.onChange}
                error={errors.phone}
              />
              <input
                type="submit"
                value="Update Contact"
                className="btn btn-block btn-light"
              />
            </form>
          </div>
        ) : null}
      </div>
    );
  }
}
EditContact.propTypes = {
  contact: PropTypes.object.isRequired,
  editContact: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  contact: state.contact.contact
});
export default connect(mapStateToProps, { editContact, updateContact })(
  EditContact
);
