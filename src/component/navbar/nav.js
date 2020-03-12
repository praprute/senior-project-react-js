import React, { Component,useState,Fragment } from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon, Container } from "mdbreact";
import { Link, withRouter } from "react-router-dom";
import Signup from './../sign&signup/Signup'
import Signin from './../sign&signup/Signin'
import { signout,isAuthenticated } from '../../auth/index'

const isActive = (history, path) => {
  if (history.location.pathname === path) {
      return { color: "#ff9900" };
  } else {
      return { color: "#ffffff" };
  }
};

const Navbar = ({ history }, props) => {

    const [isOpen, setisOpen] = useState(false)

    const [modalSignupShow, setModalSignupShow] = useState(false);
    const [modalSigninShow, setmodalSigninShow] = useState(false)

    const toggleCollapse = () => {
        setisOpen( !isOpen );
      }

    return(
    <div>
      <MDBNavbar color="default-color" dark expand="md">

        <Container>
        <MDBNavbarBrand>
          <strong className="white-text">Navbar</strong>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
          <MDBNavbarNav right>
            <MDBNavItem >
              <MDBNavLink to="/">Home</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="#!">Shop</MDBNavLink>
            </MDBNavItem>

            {!isAuthenticated() && (
              <Fragment>
              <MDBNavItem>
              <MDBNavLink onClick={()=> setmodalSigninShow(true)} to="#!">Signin</MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
              <MDBNavLink onClick={()=> setModalSignupShow(true)} to="#!">Signup</MDBNavLink>
              </MDBNavItem>
              </Fragment>
            )}


            {isAuthenticated() && (
              <MDBNavItem>
              <MDBNavLink onClick={()=> signout(()=>{
                history.push('/')
              })} to="#!">Signout</MDBNavLink>
              </MDBNavItem>
            )}

            {isAuthenticated() && isAuthenticated().user.role === 0 && (
              <MDBNavItem>
              <MDBNavLink to="/user/dashboard">Dashboard</MDBNavLink>
              </MDBNavItem>
            )}

            {isAuthenticated() && isAuthenticated().user.role === 1 && (
              <MDBNavItem>
              <MDBNavLink to="/admin/dashboard">Dashboard</MDBNavLink>
              </MDBNavItem>
            )}
            

            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <div className="d-none d-md-inline">Dropdown</div>
                </MDBDropdownToggle>

                <MDBDropdownMenu className="dropdown-default">
                  <MDBDropdownItem href="#!">Action</MDBDropdownItem>
                  {/* <MDBDropdownItem href="#!">Another Action</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Something else here</MDBDropdownItem> */}
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>

          </MDBNavbarNav>
        </MDBCollapse>
        </Container>
      </MDBNavbar>

      <Signup
         show={modalSignupShow}
         onHide={() => setModalSignupShow(false)}
      />

      <Signin
        show={modalSigninShow}
        onHide={() => setmodalSigninShow(false)}
      />

    </div>
    );
}
export default withRouter(Navbar);