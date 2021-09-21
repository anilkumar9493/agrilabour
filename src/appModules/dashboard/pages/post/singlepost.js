import React, { Component } from "react";
import { Paper, Button, withStyles, Grid, } from "@material-ui/core";
import { SinglePostStyles } from "../styles/js/singlepost";
import PropTypes from 'prop-types';
import moment from 'moment';
import { getAllReqPostAction, sendReqAction } from '../../action';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import RequestPost from '../post/request'


class SinglePost extends Component {
    state = {
        myPost: false,
        PostId: 0,
    }

    negotiateHandler = (postDetails) => {
        this.props.history.push({
            pathname: `/negotiate/${postDetails._id}`,
            search: "",
            state: {
                negotiateDetails: this.props &&
                    this.props.location &&
                    this.props.location.state &&
                    this.props.location.state.postDetails ?
                    this.props.location.state.postDetails : {},
            }
        })
    }

    sendRequestHandler = (postDetails) => {
        console.log('response*******', this.props.profileDataResponse.data)
        let payload = {
            amount: postDetails.amount,
            fromDate: postDetails.fromDate,
            noOfWorkers: postDetails.noOfWorkers,
            toDate: postDetails.toDate,
            type: postDetails.type === 'farmer' ? 'labour' : 'farmer',
            typeOfCrop: postDetails.typeOfCrop,
            postId: postDetails._id,
            requestedUserId: this.props.profileDataResponse && this.props.profileDataResponse.data &&
                this.props.profileDataResponse.data._id,
        }
        this.props.sendReqActionMethod(payload).then(() => {
            console.log('success')
        })
    }

    componentDidMount() {

        this.setState({
            myPost: this.props &&
                this.props.location &&
                this.props.location.state &&
                this.props.location.state.isFromMyPosts ?
                this.props.location.state.isFromMyPosts : "", PostId: this.props &&
                    this.props.location &&
                    this.props.location.state &&
                    this.props.location.state.postDetails._id ?
                    this.props.location.state.postDetails._id : {}
        }, () => {
            if (this.state.myPost) {
                this.props.getAllReqPostActionMethod(this.state.PostId);
            }
        })
    }

    render() {
        const { classes } = this.props;

        const postDetails = this.props &&
            this.props.location &&
            this.props.location.state &&
            this.props.location.state.postDetails ?
            this.props.location.state.postDetails : {};

        const myPost = this.props &&
            this.props.location &&
            this.props.location.state &&
            this.props.location.state.isFromMyPosts ?
            this.props.location.state.isFromMyPosts : "";

        console.log("negotiateresp==>", this.props.allNegotiateDataResponse)
        console.log('postdetails====', postDetails)

        const Data = this.state.myPost ? this.props.allNegotiateDataResponse.data : []


        return (
            <div>
                <Paper className={classes.paper}>
                    <Grid container className={classes.gridcontainer}>
                        <Grid item md={6} xs={6} sm={6} >
                            <span>Name:</span>
                            <span>{postDetails.name ? postDetails.name : ""}</span>
                        </Grid>
                        <Grid item md={6} xs={6} sm={6} >
                            <span>WorkerType:</span>
                            <span className={classes.workertype}>{postDetails.type ? postDetails.type : ""}</span>
                        </Grid>
                        <Grid item md={12} xs={12} sm={12} >
                            <span>TypeOfCrop:</span>
                            <span>{postDetails.typeOfCrop ? postDetails.typeOfCrop : ""}</span>
                        </Grid>
                        <Grid item md={12} xs={12} sm={12} >
                            <span>Date:</span>
                            <span>{moment(postDetails.fromDate).format("DD-MMM-YYYY")} To {moment(postDetails.toDate).format("DD-MMM-YYYY")}</span>
                        </Grid>
                        <Grid item md={12} xs={12} sm={12} >
                            <span>Amount:</span>
                            <span>{postDetails.amount ? postDetails.amount : ""}</span>
                        </Grid>
                        <Grid item md={12} xs={12} sm={12} >
                            <span>NumberOfLabours:</span>
                            <span>{postDetails.noOfWorkers ? postDetails.noOfWorkers : ""}</span>
                        </Grid>
                        {this.state.myPost ? "" : <Grid item md={6} xs={6} sm={6} className={classes.buttonsgrid}>
                            <Button onClick={() => { this.sendRequestHandler(postDetails) }} className={classes.buttons}>SEND REQUEST</Button >
                        </Grid>}
                        {this.state.myPost ? "" :
                            <Grid item md={6} xs={6} sm={6} className={classes.buttonsgrid}>
                                <Button onClick={() => this.negotiateHandler(postDetails)} className={classes.buttons}>NEGOTIATE</Button>
                            </Grid>}
                    </Grid>
                </Paper>
                <span className={classes.postreq}><u>Post Requests:</u></span>
                {Data && Data.length > 0 ? Data.map(item => (
                    <RequestPost data={item} />
                )
                ) : " no requests"}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        allNegotiateDataResponse: state.dashboardreducer.allNegotiateData,
        sendReqResponse: state.dashboardreducer.MyReqData,
        profileDataResponse: state.dashboardreducer.profileData
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getAllReqPostActionMethod: getAllReqPostAction,
        sendReqActionMethod: sendReqAction,
    }, dispatch)
}


SinglePost.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(SinglePostStyles)(SinglePost));