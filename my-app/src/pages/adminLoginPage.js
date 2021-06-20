import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'

// MUI Stuff
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

//Redux
import { connect } from 'react-redux'
import { adminLogin } from '../actions/authActions';

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
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            error: "",
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.error) {
            this.setState({ error: nextProps.auth.error })
        } else {
            this.setState({ error: '' })
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.adminLogin(this.state.email, this.state.password);
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
                        <TextField id='email' name='email' type='email' label="Email" onChange={this.handleChange} fullWidth />
                        <TextField id='password' name='password' type='password' label="Password" className={classes.textField} value={this.state.password} onChange={this.handleChange} fullWidth />
                        {error && <Typography variant="body2" className={classes.customError} >{error}</Typography>}
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
    auth: state.auth
})

const mapActionsToProps = {
    adminLogin
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(AdminLogin));