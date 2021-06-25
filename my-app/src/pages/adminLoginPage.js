import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'

// MUI Stuff
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

//Redux
import { connect } from 'react-redux'
import { adminLogin } from '../actions/adminActions';

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
            email: "",
            password: "",
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.adminLogin(this.state.email, this.state.password, this.props);
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    render() {
        const { classes } = this.props
        const { error } = this.state
        return (
            <Grid container className={classes.form}>
                <Grid item sm />
                <Grid item sm>
                    <Typography variant="h3" className={classes.pageTitle}>
                        Login
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField id='email'  variant="outlined"  name='email' type='email' label="Email" onChange={this.handleChange} fullWidth />
                        <TextField id='password' name='password'  variant="outlined"  type='password' label="Password" className={classes.textField} value={this.state.password} onChange={this.handleChange} fullWidth />
                        <Button type="submit" variant="contained" color="primary" className={classes.Button}>
                            Login
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
    adminLogin
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(AdminLogin));