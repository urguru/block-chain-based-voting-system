import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import ErrorIcon from '@material-ui/icons/Error';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Typography from '@material-ui/core/Typography';
import _ from 'lodash';
import Modal from '@material-ui/core/Modal';
import constants from '../common/constants';
import { closeMainLoadingWindow } from '../actions/uiActions';

const styles = {
    paper: {
        position: "absolute",
        width: "600px",
        height: "200px",
        backgroundColor: "#f5f5f5",
        border: "2px solid #000",
        boxShadow: "1px",
        padding: "5px",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        boxSizing: "border-box",
        borderRadius: "5px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column"
    },
    progressBox: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "10px",
        margin: "10px"
    },
    successIcon: {
        fontSize: "4rem",
        color: "green"
    },
    failureIcon: {
        fontSize: "4rem",
        color: "red"
    },
    messageBox: {
        textAlign: "center"
    }
}

class MainLoadingWindow extends React.Component {
    constructor() {
        super();
        this.state = {
        }
    }
    getValidModalIcon = () => {
        if (this.props.ui.mainLoadingWindowState == constants.mainLoadingWindowStates.SUCCESS)
            return <CheckCircleIcon className={this.props.classes.successIcon} />
        if (this.props.ui.mainLoadingWindowState == constants.mainLoadingWindowStates.FAILURE)
            return <ErrorIcon className={this.props.classes.failureIcon} />
        if (this.props.ui.mainLoadingWindowState == constants.mainLoadingWindowStates.LOADING)
            return <CircularProgress />
        return null;
    }

    modalCloseEvent = () => {
        if (this.props.ui.mainLoadingWindowState != constants.mainLoadingWindowStates.LOADING) {
            this.props.closeMainLoadingWindow();
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <Modal open={this.props.ui.mainLoadingWindowState != constants.mainLoadingWindowStates.CLOSED} onClose={this.modalCloseEvent}>
                <div className={classes.paper}>
                    <div className={classes.progressBox}>
                        {this.getValidModalIcon()}
                    </div>
                    <div>
                        <Typography variant="h6" className={classes.messageBox} display="block" gutterBottom>{this.props.ui.mainLoadingWindowMessage}</Typography>
                    </div>
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => ({
    ui: state.ui
})

const mapActionsToProps = {
    closeMainLoadingWindow
}

export default withRouter(connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(MainLoadingWindow)));
