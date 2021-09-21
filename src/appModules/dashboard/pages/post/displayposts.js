import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { DisplayPostStyles } from '../styles/js/displayposts';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import DisplayPost from '../post/dispalypost';
import { getAllPostAction, getProfileAction, IndiviualPostAction } from '../../action'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class DisplayPosts extends Component {



    componentDidMount() {
        if (this.props && this.props.location && this.props.location.pathname === '/myposts') {
            this.props.getProfileActionMethod().then(() => {
                this.props.IndivPostActionMethod(this.props.getProfileResponse.data._id)
            }).catch((err) => {
                console.log(err)
            })
        }
        this.props.getAllPostActionMethod();
    }

    buttonHandler = () => {
        this.props.history.push(`/registerpost`)
    }

    render() {
        const { classes } = this.props;

        console.log("postres************", this.props.myPostDataResponse)

        let { data: posts } = this.props.getAllPostsResponse;
        let data = this.props.myPostDataResponse.data;

        const postRes = (this.props && this.props.location && this.props.location.pathname === '/myposts') ? data : posts;

        return (
            <div>
                <div>
                    {postRes && postRes.length > 0 ? postRes.map(item => (
                        <DisplayPost post={item} />
                    )
                    ) : " no posts"}
                    <Fab onClick={this.buttonHandler} color="secondary" aria-label="Add" className={classes.margin}>
                        <AddIcon />
                    </Fab>
                </div>
            </div>
        )
    }
}




const mapStateToProps = (state) => {
    return {
        postResponse: state.dashboardreducer.postData,
        getProfileResponse: state.dashboardreducer.profileData,
        getAllPostsResponse: state.dashboardreducer.allPosts,
        myPostDataResponse: state.dashboardreducer.myPostData,
    };
}


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getProfileActionMethod: getProfileAction,
        getAllPostActionMethod: getAllPostAction,
        IndivPostActionMethod: IndiviualPostAction,
    }, dispatch)
}


DisplayPosts.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(DisplayPostStyles)(DisplayPosts));