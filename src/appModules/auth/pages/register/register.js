import React, { Component } from "react";
import { TextField, Paper, Button, Grid, Checkbox } from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { dispatch } from '../../../../redux';
import PropTypes from 'prop-types';
import { registerAction } from "../../actions";

import { withStyles } from '@material-ui/core/styles';
import { RegisterStyles } from '../styles/js/register'



class Register extends Component {
    state = {
        firstname: "",
        village: "",
        mobile: "",
        password: "",
        isAdmin: false,
        isUser: false,
        errors: {},
    };


    handleChange = e => {
        let errors = this.state.errors
        delete errors[e.target.name];
        this.setState({ [e.target.name]: e.target.value, errors: { ...this.state.errors, ...errors } });
    }

    handleCheck = (event) => {
        this.setState({ [event.target.value]: event.target.checked })
    }

    submitHandler = () => {
        let errors = {}

        if (!((this.state.isAdmin) || (this.state.isUser))) {
            errors['type'] = "Please select the type of User Above"
        }

        if (!this.state.firstname) {
            errors['firstname'] = "Please enter your name"
        } else {
            var regex = /^[a-zA-Z]{1,30}$/;
            if (!(regex.test(this.state.firstname))) {
                errors['firstname'] = "Please enter valid name"
            }

        }

        if (!(this.state.village)) {
            errors['village'] = 'Please enter the village name'
        } else {
            var villageregex = /^[a-zA-Z]{1,30}$/;
            if (!(villageregex.test(this.state.village))) {
                errors['village'] = "Please enter the valid village name"
            }


        }

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

        if (!this.state.password) {
            errors['password'] = "Please enter your password"
        } else {
            var lettersregex = /[a-zA-Z]/
            var numbersregex = /[0-9]/
            var specialcharregex = /[!@#$%^&*]/
            console.log("test===", lettersregex.test(this.state.password))

            if (this.state.password.length < 6) {
                errors['password'] = 'password should be atleast greater than 6 characters'
            }
            else if (!(lettersregex.test(this.state.password))) {
                errors['password'] = "Password should be at least one alphabet "
            }
            else if (!(numbersregex.test(this.state.password))) {
                errors['password'] = "Password should be at least one number "
            }
            else if (!(specialcharregex.test(this.state.password))) {
                errors['password'] = "Password should be at least one Special Character"
            }
            else if (this.state.password.length > 16) {
                errors['password'] = 'password should be less than 16 characters'
            }
        }
        this.setState({ errors: { ...this.state.errors, ...errors } }, () => {
            if (Object.keys(this.state.errors).length === 0) {
                let payload = {
                    name: this.state.firstname,
                    mobile: this.state.mobile,
                    village: this.state.village,
                    password: this.state.password
                }
                this.props.registerActionMethod(payload).then(() => {
                    this.setState({
                        firstname: "",
                        mobile: "",
                        village: "",
                        password: "",
                    }, () => {
                        this.props.history.push(`/login`)
                    })
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
                <span className={classes.register}><u>REGISTER</u></span>
                <Grid container>
                    <Grid item md={6} xs={6} sm={6} className={classes.admin}>
                        <span><Checkbox
                            checked={this.state.isAdmin}
                            onChange={
                                this.handleCheck
                            }
                            value="isAdmin"
                        />Admin</span>
                    </Grid>
                    <Grid item md={6} xs={6} sm={6} className={classes.user}>
                        <span><Checkbox
                            checked={this.state.isUser}
                            onChange={
                                this.handleCheck
                            }
                            value="isUser"
                        />User</span>
                    </Grid>
                </Grid>
                <span className={classes.errormessage}>{this.state.errors['type']}</span>

                <TextField
                    id="outlined-name"
                    label="Name"
                    name="firstname"
                    className={classes.textField}
                    value={this.state.firstname}
                    onChange={this.handleChange}
                    margin="normal"
                    variant="outlined"
                />
                <span className={classes.errormessage}>{this.state.errors['firstname']}</span>
                <TextField
                    id="outlined-village-input"
                    label="Village"
                    className={classes.textField}
                    value={this.state.village}
                    onChange={this.handleChange}
                    type="text"
                    name="village"
                    margin="normal"
                    variant="outlined"
                />
                <span className={classes.errormessage}>{this.state.errors['village']}</span>
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

                <Button className={classes.button} onClick={this.submitHandler} ><span className={classes.buttonname}>REGISTER</span></Button>
            </Paper>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        registerResponse: state.Authreducer.registerData,

    };
}

Register.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ registerActionMethod: registerAction }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(RegisterStyles)(Register));