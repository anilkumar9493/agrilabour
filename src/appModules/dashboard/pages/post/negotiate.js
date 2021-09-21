import React, { Component } from "react";
import { Paper, TextField, Button, withStyles, Grid } from "@material-ui/core";
import PropTypes from 'prop-types';
import { NegotiateStyles } from "../styles/js/negotiate";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { negotiateReqAction } from '../../action';


class Negotiate extends Component {

    state = {
        amount: "",
        numberofworkers: "",
        fromDate: null,
        toDate: null,
        errors: {},
    }

    handleChange = e => {
        let errors = this.state.errors
        delete errors[e.target.name];

        this.setState({ [e.target.name]: e.target.value, errors: { ...this.state.errors, ...errors } });
    }

    handleDateChange = (event, field) => {
        this.setState({ [field]: event })
    }

    submitHandler = (negDetails) => {
        let errors = {};
        if (!(this.state.fromDate)) {
            errors['fromDate'] = "Please select the  from date "
        }

        if (!(this.state.toDate)) {
            errors['fromDate'] = "Please select the  to date "
        }

        if (!(this.state.amount)) {
            errors['amount'] = 'Please enter the amount'
        } else {
            var amountregex = /^(?:0|[1-9]\d*)(?:\.(?!.*000)\d+)?$/
            if (!(amountregex.test(this.state.amount))) {
                errors['amount'] = "Please enter the valid amount"
            }
        }

        if (!this.state.numberofworkers) {
            errors['numberofworkers'] = "Please select the no of workers "
        } else {
            var workersregex = /^[0-9]/
            if (!(workersregex.test(this.state.numberofworkers))) {
                errors['numberofworkers'] = "Please enter the valid, no of workers"
            }
        }

        this.setState({ errors: { ...this.state.errors, ...errors } }, () => {
            console.log("negerrors", this.state.errors)
            if (Object.keys(this.state.errors).length === 0) {
                let payload = {
                    amount: this.state.amount,
                    numberofworkers: this.state.numberofworkers,
                    fromDate: this.state.fromDate,
                    toDate: this.state.toDate,
                    postId: negDetails._id,
                    typeOfCrop: negDetails.typeOfCrop,
                    type: negDetails.type === "farmer" ? "labour" : "farmer",
                    requestedUserId: this.props.profileDataResponse && this.props.profileDataResponse.data &&
                        this.props.profileDataResponse.data._id,
                }
                this.props.negotiateReqActionMethod(payload).then(() => {
                    this.props.history.push(`/singlepost/${negDetails._id}`)
                }).catch((e) => {
                    console.log(e)
                })
            }
        })
    }

    componentDidMount() {

        const negDetails = this.props &&
            this.props.location &&
            this.props.location.state &&
            this.props.location.state.negotiateDetails ?
            this.props.location.state.negotiateDetails : {};

        this.setState({
            amount: negDetails.amount,
            numberofworkers: negDetails.noOfWorkers,
            fromDate: negDetails.fromDate,
            toDate: negDetails.toDate,
        })
    }

    render() {
        console.log("negotiateprops===", this.props)

        console.log("render")
        const { classes } = this.props;

        const negDetails = this.props &&
            this.props.location &&
            this.props.location.state &&
            this.props.location.state.negotiateDetails ?
            this.props.location.state.negotiateDetails : {};


        console.log("details", negDetails)

        return (
            <Paper className={classes.paper}>

                <Grid container className={classes.gridcontainer}>

                    <Grid item md={12} xs={12} sm={12} className={classes.spangrid}>
                        <span>Negotiation Page</span>
                    </Grid>

                    <Grid item md={12} xs={12} sm={12} >
                        <TextField
                            id="outlined-amount-input"
                            label="Amount"
                            name="amount"
                            className={classes.textField}
                            value={this.state.amount}
                            onChange={this.handleChange}
                            type="text"
                            autoComplete="current-password"
                            margin="normal"
                            variant="outlined"
                        />
                    </Grid>
                    <span className={classes.errormessage}>{this.state.errors['amount']}</span>

                    <span className={classes.fromdate}>From Date</span>
                    <Grid item md={6} xs={6} sm={6} className={classes.fromdatePicker}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils} className={classes.muiPicker}>
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="MM/dd/yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="Date picker inline"
                                value={this.state.fromDate}
                                onChange={(event) => { this.handleDateChange(event, 'fromDate') }}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                        <span className={classes.errormessage}>{this.state.errors['fromDate']}</span>
                    </Grid>

                    <span className={classes.toDate}>To Date</span>
                    <Grid item md={6} xs={6} sm={6} className={classes.todatePicker}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="MM/dd/yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="Date picker inline"
                                value={this.state.todate}
                                onChange={(event) => { this.handleDateChange(event, 'toDate') }}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                        <span className={classes.errormessage}>{this.state.errors['toDate']}</span>
                    </Grid>


                    <Grid item md={12} xs={12} sm={12} >
                        <TextField
                            id="outlined-workers-input"
                            label="Number of Workers"
                            name="numberofworkers"
                            className={classes.textField}
                            value={this.state.numberofworkers}
                            onChange={this.handleChange}
                            type="text"
                            autoComplete="current-password"
                            margin="normal"
                            variant="outlined"
                        />
                    </Grid>
                    <span className={classes.errormessage}>{this.state.errors['numberofworkers']}</span>

                    <Grid item md={12} xs={12} sm={12} className={classes.buttongrid}>
                        <Button className={classes.button} onClick={() => this.submitHandler(negDetails)}>Do Negotiation</Button>
                    </Grid>

                </Grid>
            </Paper>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        profileDataResponse: state.dashboardreducer.profileData
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ negotiateReqActionMethod: negotiateReqAction }, dispatch)
}


Negotiate.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(NegotiateStyles)(Negotiate));
