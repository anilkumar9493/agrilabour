import React, { Component } from "react";
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { MyPostReqAction, getAllUserReqAction, getProfileAction } from '../../action';
import { connect } from 'react-redux';
import RequestPost from './request.js'

class MyRequests extends Component {

    componentDidMount() {
        this.props.getProfileActionMethod().then(() => {
            console.log("response====", this.props.myProfileDataResponse)
            this.props.getAllUserReqActionMethod(this.props.myProfileDataResponse.data._id)
        }).catch((err) => {
            console.log(err)
        })
    }
    render() {
        const requests = this.props.getAllUserReqResponse.data;
        return (<div>
            {requests && requests.length > 0 ? requests.map(item => (
                <RequestPost data={item} />
            )
            ) : " no posts"}
        </div>)
    }
}

const mapStateToProps = (state) => {
    return {
        MyPostReqResponse: state.dashboardreducer.MyReqData,
        getAllUserReqResponse: state.dashboardreducer.myPostReqData,
        myProfileDataResponse: state.dashboardreducer.profileData,
    };
}


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        MyPostReqActionMethod: MyPostReqAction,
        getAllUserReqActionMethod: getAllUserReqAction,
        getProfileActionMethod: getProfileAction
    }, dispatch)
}


MyRequests.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(MyRequests);


