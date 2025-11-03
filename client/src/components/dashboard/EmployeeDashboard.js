import React from 'react';
import { connect } from 'react-redux';
import SearchBar from '../dashboard/SearchBar';
import SideBar from '../dashboard/SideBar';
import Footer from '../dashboard/Footer';

const EmployeeDashboard = ({ auth }) => {
  const userName = (auth && auth.user && auth.user.name) || 'Employee';
  return (
    <div id="app">
      <div className="main-wrapper">
        <div className="navbar-bg" />
        <SearchBar />
        <SideBar />
        <div className="main-content">
          <section className="section">
            <div className="section-header">
              <h1>Employee Dashboard</h1>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <h4>Welcome, {userName}</h4>
                    <p>This is the employee view. Your access is limited to viewing data permitted by your role.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({ auth: state.auth });
export default connect(mapStateToProps)(EmployeeDashboard);
