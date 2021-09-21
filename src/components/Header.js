import React, { Component } from "react";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import { withRouter, Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { getAccessToken, ls } from "../utils";
import { ClickAwayListener, Grow, Paper, Popper, Button, MenuList, MenuItem, Avatar } from "@material-ui/core";
import { bindActionCreators } from 'redux';
import { CreditCard, AccountCircle, ExitToApp, } from "@material-ui/icons";
import { connect } from 'react-redux';
import { getProfileAction } from '../appModules/dashboard/action'



class Header extends Component {

  state = {
    openProfile: false,
    anchorEl: "",
    routeName: "",
    sweetDisplay: false,
    showLogout: false,
  }

  logout = () => {
    ls.remove("accessToken");
    window.location.reload();
  };

  openProjects = () => {
    this.props.history.push("/projects");
  };

  handleProfileOpen = () => {
    this.setState({ openProfile: !this.state.openProfile })
  }

  handleLogoutConfirm = () => {
    this.setState({ sweetDisplay: true, showLogout: true, routeName: "" })
  }


  handleProfileClose = event => {

    this.setState({ openProfile: false }, (() => {
      if (this.state.routeName === "profile") {
        this.setState({ routeName: "" }, (() => { this.props.history.push('/profile') }))
      }
      if (this.state.routeName === 'billing') {
        this.setState({ routeName: "" }, (() => { this.props.history.push('/billing') }))
      }
      if (this.state.routeName === 'logout') {
        this.setState({ routeName: "" }, (() => {
          this.handleLogoutConfirm()
        }))
      }
    }));
  }

  myrequestHandler = () => {
    this.props.history.push("/myrequests")
  }

  mypostsHandler = () => {
    this.props.history.push("/myposts")
  }
  componentDidMount() {
    this.props.getProfileActionMethod();
  }

  render() {
    return (
      <AppBar
        style={{ color: "white" }}
        position="static"
        className="rct-header"
      >
        <Toolbar className="d-flex justify-content-between w-100 pl-0">
          {/* <div className="d-flex align-items-center">
            <div className="site-logo">
              <Link to="/" className="logo-mini">
                <img
                  src={logo}
                  className="mr-15 logo"
                  alt="site logo"
                  width="125"
                  height="35"
                />
              </Link>
            </div>
          </div> */}
          {getAccessToken() ? (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end"
              }}
            >
              {/* <Button
                onClick={() => this.openProjects()}
                variant="contained"
                className="upgrade-btn tour-step-4 text-white"
                color="primary"
                style={{ marginRight: 10 }}
              >
                Projects
              </Button> */}

              <Button
                style={{ borderRadius: '50%' }}
                buttonRef={node => {
                  this.anchorEl = node;
                }}
                aria-owns={this.state.openProfile ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={this.handleProfileOpen}
              >
                <Avatar>
                  {this.props.profileDetails && this.props.profileDetails.name && (this.props.profileDetails.name).charAt(0)}
                </Avatar>
              </Button>
              <Popper className="icon-popper" open={this.state.openProfile} anchorEl={this.anchorEl} transition disablePortal>
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    id="menu-list-grow"
                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                  >
                    <Paper className="icon-paper">
                      <ClickAwayListener onClickAway={this.handleProfileClose}>
                        <MenuList>
                          <MenuItem onClick={() => { this.setState({ routeName: "profile" }, (() => { this.handleProfileClose() })) }}>
                            <AccountCircle className="icon-symbol p-r-1" />
                            <span className="profile-text">Profile</span>
                          </MenuItem>
                          <MenuItem onClick={this.mypostsHandler}>
                            <CreditCard className="icon-symbol p-r-1" />   <span className="profile-text">My Posts</span>
                          </MenuItem>
                          <MenuItem onClick={this.myrequestHandler}>
                            <CreditCard className="icon-symbol p-r-1" />   <span className="profile-text">My Requests</span>
                          </MenuItem>
                          <MenuItem onClick={() => { this.setState({ routeName: "logout" }, (() => { this.handleProfileClose() })) }}>
                            <ExitToApp className="icon-symbol p-r-1" />
                            <span className="profile-text">Logout</span>
                          </MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>

            </div>
          ) : (
            <div />
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = (state) => {
  return {

  };
}


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getProfileActionMethod: getProfileAction }, dispatch)
}



// Post.propTypes = {
//   classes: PropTypes.object.isRequired,
// }


export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header)
)
