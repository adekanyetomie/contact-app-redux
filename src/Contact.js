import React, { Component } from "react";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteContact } from "./actions/contactActions";

class Contact extends Component {
  state = {
    showContactInfo: false
  };

  onShowClick = e => {
    this.setState({ showContactInfo: !this.state.showContactInfo });
  };
  onDelete = id => {
    this.props.deleteContact(id);
  };
  render() {
    const { name, email, phone, id } = this.props.contact;
    const { showContactInfo } = this.state;

    return (
      <div className="card card-body mb-3">
        <h5>
          {name}{" "}
          <button
            onClick={this.onShowClick}
            className="btn btn-sm btn-success"
          />{" "}
          <button
            onClick={this.onDelete.bind(this, id)}
            className="btn btn-sm btn-danger"
            style={{ float: "right" }}
          />{" "}
          <Link to={`contact/edit/${id}`}>
            <button
              className="btn btn-sm btn-dark"
              style={{ float: "right", color: "black", marginRight: "1rem" }}
            ></button>
          </Link>
        </h5>
        {showContactInfo ? (
          <ul className="list-group">
            <li className="list-group-item">Email: {email}</li>
            <li className="list-group-item">Phone: {phone}</li>
          </ul>
        ) : null}
      </div>
    );
  }
}
Contact.propTypes = {
  contact: PropTypes.object.isRequired,
  deleteContact: PropTypes.func.isRequired
};

export default connect(null, { deleteContact })(Contact);
