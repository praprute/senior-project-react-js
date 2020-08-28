import React, { Component,useState,Fragment } from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon, Container } from "mdbreact";
import { Link, withRouter } from "react-router-dom";
import Signup from './../sign&signup/Signup'
import Signin from './../sign&signup/Signin'
import { signout,isAuthenticated } from '../../auth/index'
import { itemTotal } from './../card/CardHelper'
import './navstyle.css'

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
      <MDBNavbar className="navbar" color="white" light expand="md">

        <Container>
        <MDBNavbarBrand >
        
        <MDBNavLink to="/">
          <strong  className="dark-grey-text">orgánicos</strong>
        </MDBNavLink>
        
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={toggleCollapse} />
        <MDBCollapse id="navbarCollapse3"  isOpen={isOpen} navbar>
          <MDBNavbarNav right>
            <MDBNavItem >
              <MDBNavLink  className="dark-grey-text" to="/">Home</MDBNavLink>
            </MDBNavItem>

            <MDBNavItem>
              <MDBNavLink  className="dark-grey-text" to="/shop">Shop</MDBNavLink>
            </MDBNavItem>

            <MDBNavItem>
              <MDBNavLink  className="dark-grey-text" to="/cart">
    Cart<sup><small className="cart-badge">{itemTotal()}</small></sup>
              </MDBNavLink>
            </MDBNavItem>

            {!isAuthenticated() && (
              <Fragment>
              <MDBNavItem>
              <MDBNavLink onClick={()=> setmodalSigninShow(true)} className="dark-grey-text"  to="#!">Signin</MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
              <MDBNavLink onClick={()=> setModalSignupShow(true)} className="dark-grey-text"  to="#!">Signup</MDBNavLink>
              </MDBNavItem>
              </Fragment>
            )}


            {isAuthenticated() && (
              <MDBNavItem>
              <MDBNavLink  className="dark-grey-text" onClick={()=> signout(()=>{
                history.push('/')
              })} to="/">Signout</MDBNavLink>
              </MDBNavItem>
            )}

            {isAuthenticated() && isAuthenticated().user.role === 0 && (
              <MDBNavItem>
              <MDBNavLink  className="dark-grey-text" to="/user/dashboard">Dashboard</MDBNavLink>
              </MDBNavItem>
            )}

            {isAuthenticated() && isAuthenticated().user.role === 1 && (
              <MDBNavItem>
              <MDBNavLink  className="dark-grey-text" to="/admin/dashboard">Dashboard</MDBNavLink>
              </MDBNavItem>
            )}
            

            {/* <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <div className="d-none d-md-inline">Dropdown</div>
                </MDBDropdownToggle>

                <MDBDropdownMenu className="dropdown-default">
                  <MDBDropdownItem href="#!">Action</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem> */}

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