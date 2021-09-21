import React, { Component } from "react";
import { Grid, withStyles, Checkbox, Button, Paper, Typography } from "@material-ui/core";
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import { bindActionCreators } from 'redux';
import { postReqAcceptAction } from '../../action'
import { RequestStyle } from '../styles/js/request';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';



class RequestPost extends Component {


    acceptHandler = (id) => {
        let payload = {
            postId: this.props && this.props.match && this.props.match.params && this.props.match.params.id,
            requestId: id
        }

        this.props.postReqAcceptMethod(payload).then(() => {

        }).catch((error) => {
            console.log(error);
        })
    }


    render() {
        const { classes, data } = this.props;

        console.log("requests====>", this.props)

        const isFarmer = data.type === 'farmer' ? true : false;
        const isLabour = data.type === 'labour' ? true : false
        return (
            <Paper className={classes.paper}>
                <Grid container className={classes.gridcontainer}>
                    <Grid item md={6} xs={6} sm={6} className={classes.gridcolumn1}>
                        <span>Name:</span>
                        <span>{data.name}</span>
                    </Grid>
                    <Grid item md={6} xs={6} sm={6} className={classes.gridcolumn1}>
                        <span>WorkerType:</span>
                        <span> <Checkbox className={classes.checkbox}
                            checked={isFarmer} />Farmer</span>
                        <span> <Checkbox className={classes.checkbox}
                            checked={isLabour} />Labour</span>
                    </Grid>
                    <Grid item md={6} xs={6} sm={6} className={classes.gridcolumn1}>
                        <span>Duration:</span>
                        <span>{moment(data.fromDate).format("DD-MMM-YYYY")} to {moment(data.toDate).format("DD-MMM-YYYY")}</span>
                    </Grid>
                    <Grid item md={6} xs={6} sm={6} className={classes.gridcolumn1}>
                        <span>Number Of Workers:</span>
                        <span>{data.noOfWorkers}</span>
                    </Grid>
                    <Grid item md={6} xs={6} sm={6} className={classes.gridcolumn1}>
                        <span>Amount:</span>
                        <span>{data.amount}</span>
                    </Grid>
                    <Grid item md={6} xs={6} sm={6} className={classes.gridcolumn1}>
                        <span>TypeOfCrop:</span>
                        <span>{data.typeOfCrop}</span>
                    </Grid>
                    <Grid item md={6} xs={6} sm={6} className={classes.gridcolumn1}>
                        <span>Status:</span>
                        <span>{data.status}</span>
                    </Grid>
                    <Grid item md={6} xs={6} sm={6} className={classes.gridcolumn1}>
                        <span>Actions:</span>
                        <DeleteForeverIcon className={ classes.deleteicon}/>
                        <i onClick={() => this.acceptHandler(data._id)} class="fa fa-check" aria-hidden="true"></i>
                    </Grid>
                </Grid>
            </Paper>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        postReqAcceptResp: state.dashboardreducer.postReqAcceptData,
    };
}


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        postReqAcceptMethod: postReqAcceptAction
    }, dispatch)
}



RequestPost.propTypes = {
    classes: PropTypes.object.isRequired,
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(RequestStyle)(RequestPost)))