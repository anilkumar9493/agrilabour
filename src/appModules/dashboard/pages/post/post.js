import React from 'react';
import PropTypes from 'prop-types';
import { Component } from 'react';
import { PostStyles } from '../styles/js/post';
import {
    Paper, Button, Grid, TextField, withStyles,
    Checkbox, OutlinedInput, Select
} from "@material-ui/core";
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { bindActionCreators } from 'redux';
import { postAction } from '../../action';
import { connect } from 'react-redux';




class Post extends Component {
    state = {
        crop: '',
        labelWidth: 0,
        amount: "",
        isFarmer: false,
        isLabour: false,
        Fromdate: null,
        Todate: null,
        workers: "",
        errors: {},
    };

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleCheck = (event) => {
        this.setState({ [event.target.value]: event.target.checked })
    }

    handleDateChange = (event, field) => {
        this.setState({ [field]: event })
    }

    submitHandler = () => {
        let errors = {}

        if (!((this.state.isFarmer) || (this.state.isLabour))) {
            errors['type'] = "Please select the type of Field "
        }

        if (!((this.state.Fromdate) && (this.state.Todate))) {
            errors['date'] = "Please select the date "
        }

        if (!this.state.crop) {
            errors['crop'] = "Please select the crop "
        }

        if (!(this.state.amount)) {
            errors['amount'] = 'Please enter the amount'
        } else {
            var amountregex = /^(?:0|[1-9]\d*)(?:\.(?!.*000)\d+)?$/
            if (!(amountregex.test(this.state.amount))) {
                errors['amount'] = "Please enter the valid amount"
            }
        }

        if (!this.state.workers) {
            errors['workers'] = "Please select the no of workers "
        } else {
            var workersregex = /^[0-9]/
            if (!(workersregex.test(this.state.workers))) {
                errors['workers'] = "Please enter the valid, no of workers"
            }
        }

        this.setState({ errors: { ...this.state.errors, ...errors } }, () => {
            if (Object.keys(this.state.errors).length === 0) {
                let payload = {
                    type: this.state.isFarmer ? "farmer" : "labour",
                    noOfWorkers: Number(this.state.workers),
                    amount: Number(this.state.amount),
                    typeOfCrop: this.state.crop,
                    fromDate: this.state.Fromdate,
                    toDate: this.state.Todate,
                    userId: this.props.getProfileResponse.mobile
                }
                this.props.postActionMethod(payload).then(() => {
                    this.setState({
                        crop: "",
                        workers: "",
                        amount: "",
                        isFarmer: false,
                        isLabour: false,
                        FromDate: null,
                        ToDate: null,
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
            <div className={classes.papertop}>
                <Paper className={classes.paper}>
                    <Grid container>
                        <Grid iem md={12} xs={12} sm={12} className={classes.fieldheader}>
                            <span>Field Selection</span>
                        </Grid>
                        <Grid item md={6} xs={6} sm={6}>
                            <span>
                                <Checkbox className={classes.leftcheck}
                                    checked={this.state.isFarmer}
                                    onChange={
                                        this.handleCheck
                                    }
                                    value="isFarmer"
                                />Former</span>
                        </Grid>
                        <Grid item md={6} xs={6} sm={6}>
                            <span>
                                <Checkbox className={classes.rightcheck}
                                    checked={this.state.isLabour}
                                    onChange={
                                        this.handleCheck
                                    }
                                    value="isLabour"
                                />Labour</span>
                        </Grid>
                        <span className={classes.errormessage}>{this.state.errors['type']}</span>

                        <span className={classes.fromDate}>From Date</span>
                        <Grid item md={12} xs={12} sm={12} className={classes.fromdatepicker}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    id="date-picker-inline"
                                    label="Date picker inline"
                                    value={this.state.Fromdate}
                                    onChange={(event) => { this.handleDateChange(event, 'Fromdate') }}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                            <span className={classes.errormessage}>{this.state.errors['Fromdate']}</span>
                        </Grid>

                        <span className={classes.todate}>To Date</span>
                        <Grid item md={12} xs={12} sm={12} className={classes.todatepicker}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    id="date-picker-inline"
                                    label="Date picker inline"
                                    value={this.state.Todate}
                                    onChange={(event) => { this.handleDateChange(event, 'Todate') }}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                            <span className={classes.errormessage}>{this.state.errors['Todate']}</span>
                        </Grid>

                        <Grid item md={12} xs={12} sm={12} className={classes.selectfield}>
                            <Select className={classes.selectfield1}
                                value={this.state.crop}
                                onChange={this.handleChange}
                                input={
                                    <OutlinedInput
                                        labelWidth={this.state.labelWidth}
                                        name="crop"
                                        id="outlined-crop-simple"
                                    />
                                }
                            >
                                <option value="" />
                                <option value={"Cotton"}>Cotton</option>
                                <option value={"SunFlower"}>SunFlower</option>
                                <option value={"Rice"}>Rice</option>
                                <option value={"Wheat"}>Wheat</option>
                                <option value={"SugarCane"}>SugarCane</option>
                            </Select>
                            <span className={classes.errormessage}>{this.state.errors['crop']}</span>
                        </Grid>

                        <Grid item md={12} xs={12} sm={12}>
                            <TextField
                                id="outlined-amount-input"
                                label="Amount"
                                value={this.state.amount}
                                className={classes.textField}
                                onChange={this.handleChange}
                                type="text"
                                name="amount"
                                margin="normal"
                                variant="outlined"
                            />
                            <span className={classes.errormessage}>{this.state.errors['amount']}</span>
                        </Grid>

                        <Grid item md={12} xs={12} sm={12} >
                            <TextField
                                id="outlined-workers-input"
                                label="Number Of Workers"
                                value={this.state.workers}
                                className={classes.textField}
                                onChange={this.handleChange}
                                type="text"
                                name="workers"
                                margin="normal"
                                variant="outlined"
                            />
                            <span className={classes.errormessage}>{this.state.errors['workers']}</span>
                        </Grid>

                        <Button className={classes.button} onClick={this.submitHandler}>POST</Button>
                    </Grid>
                </Paper>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        postResponse: state.dashboardreducer.postData,
        getProfileResponse: state.dashboardreducer.profileData,
    };
}


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ postActionMethod: postAction }, dispatch)
}



Post.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(PostStyles)(Post));
