import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import _ from 'lodash';

// MUI Stuff
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

//Redux
import { connect } from 'react-redux'
import { addAdmin } from '../actions/adminActions';

const styles = {
    form: {
        textAlign: 'center'
    },
    formImage: {
        width: 60,
        margin: "10px auto",
    },
    pageTitle: {
        margin: "10px auto"
    },
    textField: {
        margin: "10px auto"
    },
    Button: {
        marginTop: 20,
        position: 'relative'
    },
    customError: {
        color: "red",
        fontSize: "0.8rem",
        margin: "10v auto"
    }
}

class AdminLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            gender: "",
            email: "",
            password: "",
            pollingBoothId: "",
        }
    }

    handleSubmit = (event) => {
        if (event.target.name == "pollingBoothId" || event.target.name == "email" || event.target.name == "gender") {
            event.target.value = _.toLower(event.target.value);
        }
        event.preventDefault();
        this.props.addAdmin(this.state, this.props);
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        const { classes } = this.props
        return (
            <Grid container className={classes.form}>
                <Grid item sm />
                <Grid item sm>
                    <Typography variant="h3" className={classes.pageTitle}>
                        Add Admin
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField id='name' name='name' type='text' label="Name" value={this.state.name} onChange={this.handleChange} fullWidth />
                        <TextField id='pollingBoothId' name='pollingBoothId' type='text' label="Polling Booth ID" className={classes.textField} value={this.state.pollingBoothId} onChange={this.handleChange} fullWidth />
                        <TextField id='gender' name='gender' type='text' label="Gender" value={this.state.gender} onChange={this.handleChange} fullWidth />
                        <TextField id='email' name='email' type='email' label="Email" onChange={this.handleChange} fullWidth />
                        <TextField id='password' name='password' type='password' label="Password" className={classes.textField} value={this.state.password} onChange={this.handleChange} fullWidth />
                        <Button type="submit" variant="contained" color="primary" className={classes.Button}>
                            Add Admin
                        </Button>
                    </form>
                </Grid>
                <Grid item sm />
            </Grid>
        )
    }
}

const mapStateToProps = (state) => ({
    admin: state.admin
})

const mapActionsToProps = {
    addAdmin
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(AdminLogin));