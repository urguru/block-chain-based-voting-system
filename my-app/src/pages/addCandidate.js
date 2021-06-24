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

class AddCandidate extends React.Component {
    constructor() {
        super();
        this.state = {
            voterId: 'a',
            maleVoteCount: 'a',
            femaleVoteCount: 'a',
            otherVoteCount:'a',
            contestingConstituencyId: 'a',
            error: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        // if (nextProps.admin.error) {
        //     //this.setState({ error: nextProps.admin.error })
        // } else {
        //     //this.setState({ error: '' })
        // }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const candidate = {
            voterId: this.state.voterId,
            maleVoteCount:this.state.maleVoteCount,
            femaleVoteCount:this.state.femaleVoteCount,
            otherVoteCount:this.state.otherVoteCount,
            contestingConstituencyId: this.state.contestingConstituencyId,
        }
        this.props.addCandidate(candidate);
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
                        Add Candidate
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        
                        <TextField id='voterId' name='voterId' type='text' label="Voter ID" className={classes.textField} value={this.state.voterId} onChange={this.handleChange} fullWidth />
                        
                        <TextField id='contestingConstituencyId' name='contestingConstituencyId' type='text' label="Contesting Constituency ID" value={this.state.contestingConstituencyId} onChange={this.handleChange} fullWidth />
                        {error && <Typography variant="body2" className={classes.customError} >{error}</Typography>}
                        <Button type="submit" variant="contained" color="primary" className={classes.Button}>
                            Add Candidate
                        </Button>
                    </form>
                </Grid>
                <Grid item sm />
            </Grid>
        )
    }
}

const mapStateToProps = (state) => ({
    admin: state.admin,
})

const mapActionsToProps = {
    
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(AddCandidate));