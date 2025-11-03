import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const RoleRedirect = ({ auth }) => {
  if (!auth || !auth.isAuthenticated) {
    return <Redirect to="/" />;
  }
  const role = auth.user && typeof auth.user.is_admin !== 'undefined' ? auth.user.is_admin : 0;
  return role === 1 ? (
    <Redirect to="/dashboard/admin" />
  ) : (
    <Redirect to="/dashboard/employee" />
  );
};

const mapStateToProps = (state) => ({ auth: state.auth });
export default connect(mapStateToProps)(RoleRedirect);
