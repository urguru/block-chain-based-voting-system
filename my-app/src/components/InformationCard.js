import React from 'react';
import Card from '@material-ui/core/Card';
import LaunchIcon from '@material-ui/icons/Launch';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const styles = {
    card: {
        display: "flex",
        width: "200px",
        height: "120px",
        margin: "20px 10px",
        flexDirection: "row",
        padding: "10px",
        boxSizing: "border-box",
        '&:hover': {
            background: "#bde0fe",
        },
    },
    text: {
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "left",
        justifyContent: "space-evenly",
        textTransform:"capitalize",
        fontFamily:"Normal"
    },
    link: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "10px",
        marginRight: "10px"
    },
    icon: {
        fontSize: "2rem"
    }
}

class InformationCard extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { classes } = this.props;
        return (<Card className={classes.card}>
            <div className={classes.text}>
                <Typography variant="h4">
                    {this.props.value}
                </Typography>
                <Typography variant="subtitle1">
                    {this.props.text}
                </Typography>
            </div>
            {this.props.link && <div className={classes.link}>
                <Link to={this.props.link}><LaunchIcon className={classes.icon} /> </Link>
            </div>}
        </Card>);
    }
}

export default withStyles(styles)(InformationCard);