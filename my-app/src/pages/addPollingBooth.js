import React from 'react';
import _ from 'lodash';
//import { addCitizen } from '../actions/citizenActions';
import withStyles from '@material-ui/core/styles/withStyles';

// MUI Stuff
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

//Redux
import { connect } from 'react-redux';

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

class AddPollingBooth extends React.Component {
    constructor() {
        super();
        this.state = {
            pollingBoothId: 'a',
            name: 'a',
            
            error: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        // if (nextProps.auth.error) {
        //     //this.setState({ error: nextProps.auth.error })
        // } else {
        //     //this.setState({ error: '' })
        // }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const pollingBooth= {
            pollingBoothId: this.state.pollingBoothId,
            name:this.state.name,
            
            
        }
        this.props.addCandidate(pollingBooth);
    }

    handleChange = (event) => {
        console.log(event.target)
        console.log(event.target.name + event.target.value);
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
                        Add Polling Booth
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        
                        <TextField id='pollingBoothId' name='pollingBoothId' type='text' label="Polling Booth ID" className={classes.textField} value={this.state.pollingBoothId} onChange={this.handleChange} fullWidth />
                        <TextField id='name' name='name' type='text' label="Name" className={classes.textField} value={this.state.name} onChange={this.handleChange} fullWidth />
                        
                        {error && <Typography variant="body2" className={classes.customError} >{error}</Typography>}
                        <Button type="submit" variant="contained" color="primary" className={classes.Button}>
                            Add Polling Booth
                        </Button>
                    </form>
                </Grid>
                <Grid item sm />

            </Grid>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
})

const mapActionsToProps = {
    
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(AddPollingBooth));