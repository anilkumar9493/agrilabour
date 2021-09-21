import React, { Component } from "react";
import { DisplayPostStyle } from "../styles/js/displaypost";
import PropTypes from 'prop-types';
import { Grid, withStyles, Checkbox, Button, } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import moment from 'moment';
import { deletePostAction, cancelPostAction } from '../../action';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ClearIcon from '@material-ui/icons/Clear';
import { Route, withRouter } from 'react-router-dom';



class DisplayPost extends Component {

    deleteHandler = (id) => {
        this.props.deltePostActionMethod(id)
    }

    cancelHandler = (id) => {
        this.props.cancelPostActionMethod(id)
    }

    postHandler = (post) => {
        const myPosts = this.props && this.props.location && this.props.location.pathname === "/myposts" ? true : false;
        this.props.history.push({
            pathname: `/singlepost/${post._id}`,
            search: "",
            state: {
                postDetails: this.props.post,
                isFromMyPosts:myPosts,
            }
        })
    }

    render() {
        const { classes, post } = this.props;
        console.log("props==>",this.props)
        const isFarmer = post.type === 'farmer' ? true : false;
        const isLabour = post.type === 'labour' ? true : false
        return (
            <Paper className={classes.paper} onClick={() => this.postHandler(post)}>
                <Grid container className={classes.gridcontainer}>
                    <Grid item md={4} xs={4} sm={4} className={classes.gridcolumn1}>
                        <span>Name:</span>
                        <span>{post.name}</span>
                    </Grid>
                    <Grid item md={4} xs={4} sm={4} className={classes.gridcolumn1}>
                        <span>Duration:</span>
                        <span>{moment(post.fromDate).format("DD-MMM-YYYY")} to {moment(post.toDate).format("DD-MMM-YYYY")}</span>
                    </Grid>
                    <Grid item md={4} xs={4} sm={4} className={classes.gridcolumn1}>
                        <span>WorkerType:</span>
                        <span> <Checkbox className={classes.checkbox}
                            checked={isFarmer} />Farmer</span>
                        <span> <Checkbox className={classes.checkbox}
                            checked={isLabour} />Labour</span>
                    </Grid>
                    <Grid item md={4} xs={4} sm={4} className={classes.gridcolumn1}>
                        <span>Number Of Workers:</span>
                        <span>{post.noOfWorkers}</span>
                    </Grid>
                    <Grid item md={4} xs={4} sm={4} className={classes.gridcolumn1}>
                        <span>Amount:</span>
                        <span>{post.amount}</span>
                    </Grid>
                    <Grid item md={4} xs={4} sm={4} className={classes.gridcolumn1}>
                        <span>TypeOfCrop:</span>
                        <span>{post.typeOfCrop}</span>
                    </Grid>
                </Grid>
                {/* <Button onClick={(event) => this.deleteHandler(post._id)} className={classes.button}>Delete Post</Button>
                <Button onClick={(event) => this.cancelHandler(post._id)} className={classes.button}>Clear Post</Button> */}
            </Paper>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        deleteResponse: state.Authreducer.deletePosts,
        cancelResponse: state.Authreducer.cancelPosts,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        deltePostActionMethod: deletePostAction,
        cancelPostActionMethod: cancelPostAction,
    }, dispatch)
}

DisplayPost.propTypes = {
    classes: PropTypes.object.isRequired,
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(DisplayPostStyle)(DisplayPost)))