import image from '../../../../../images/paper.jpg';

export const PostStyles = theme => ({

    fieldheader: {
        marginLeft: "auto",
        marginRight: "auto",
        textAlign: "center",
        fontSize: "15px",
        backgroundColor: "darkgray",
        color: "black",
        marginBottom: "10px",
        marginTop: '10px',
    },

    leftcheck: {
        marginLeft: '20px',
    },

    rightcheck: {
        marginLeft: '-20px'
    },

    paper: {
        // paddingTop: theme.spacing.unit * 2,
        // paddingBottom: theme.spacing.unit * 2,
        display: "grid",
        width: "500px",
        marginLeft: "auto",
        marginRight: "auto",
        // backgroundImage: `url(${image})`,
    },

    button: {
        backgroundColor: "green",
        width: "100px",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "8px",
        marginBottom: '10px',
    },

    textField: {
        width: "350px",
        marginLeft: "33px",
        marginBottom: "5px",
    },

    selectfield: {
        marginLeft: "33px",
        marginBottom: "5px"
    },

    selectfield1: {
        width: "350px",
        marginLeft: "auto",
        marginRight: "auto",
    },

    fromdatepicker: {
        marginLeft: "30px",
        marginTop: "-35px",
    },

    todatepicker: {
        marginLeft: '32px',
        marginTop: '-35px',
        marginBottom: '5px',
    },
    papertop: {
        marginTop: "75px",
    },

    errormessage: {
        marginLeft: "100px",
        color: "#de1515",
    },

    fromDate: {
        marginLeft: "-65px",
        color: 'green',
    },
    todate: {
        marginLeft: "30px",
        marginTop: "5px",
        color: 'green',
    }
});


