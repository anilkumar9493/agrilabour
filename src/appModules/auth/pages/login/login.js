import { Paper, TextField, Button, withStyles } from "@material-ui/core";
import React, { Component } from "react";
import { LoginStyles } from "../styles/js/login";
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loginAction } from "../../actions";
import { dispatch } from '../../../../redux';
import { setAccessToken } from "../../../../utils";



class Login extends Component {

    state = {
        mobile: "",
        password: "",
        errors: {}
    }

    handleChange = e => {

        let errors = this.state.errors
        delete errors[e.target.name];

        this.setState({ [e.target.name]: e.target.value, errors: { ...this.state.errors, ...errors } });
    }

    submitHandler = () => {
        let errors = {}

        if (!(this.state.mobile)) {
            errors['mobile'] = 'Please enter the mobile number'
        } else {
            var mobileregex = /^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/
            if (this.state.mobile.length < 10) {
                errors['mobile'] = "mobile number should not be less than 10 digits"
            } else if (this.state.mobile.length > 10) {
                errors['mobile'] = "mobile number should not be greater than 10 digits"
            } else if (!(mobileregex.test(this.state.mobile))) {
                errors['mobile'] = "Please enter the valid mobile number"
            }
        }

        if (!(this.state.password)) {
            errors['password'] = "Please enter your password"
        }
        this.setState({ errors: { ...this.state.errors, ...errors } }, () => {
            if (Object.keys(this.state.errors).length === 0) {
                let payload = {
                    mobile: this.state.mobile,
                    password: this.state.password,
                }
                this.props.loginActionMethod(payload).then(() => {
                    setAccessToken(this.props.loginResponse.access_token, this.props.loginResponse.refresh_token)
                    this.setState({
                        mobile: "",
                        password: "",
                    }, () => {
                        this.props.history.push(`/dashboard`)
                    }
                    )
                }).catch((e) => {
                    console.log(e)
                })
            }
        })
    }


    render() {

        const { classes } = this.props;
        return (
            <Paper className={classes.paper}>
                <span className={classes.loginname}>LOGIN</span>
                <TextField
                    id="outlined-mobile-input"
                    label="Mobile"
                    className={classes.textField}
                    value={this.state.mobile}
                    onChange={this.handleChange}
                    type="text"
                    name="mobile"
                    margin="normal"
                    variant="outlined"
                />
                <span className={classes.errormessage}>{this.state.errors['mobile']}</span>
                <TextField
                    id="outlined-password-input"
                    label="Password"
                    name="password"
                    className={classes.textField}
                    value={this.state.password}
                    onChange={this.handleChange}
                    type="password"
                    autoComplete="current-password"
                    margin="normal"
                    variant="outlined"
                />
                <span className={classes.errormessage}>{this.state.errors['password']}</span>
                <Button className={classes.button} onClick={this.submitHandler} ><span className={classes.buttonname}>LOGIN</span></Button>
            </Paper>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        loginResponse: state.Authreducer.loginData,

    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ loginActionMethod: loginAction }, dispatch)
}


Login.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(LoginStyles)(Login));





