import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';


const styles = {
    tableCard: {
        display: "flex",
        width: "400px",
        flexDirection: "column",
        boxSizing: "border-box",
        margin:"20px 10px"
    },
    tableText: {
        margin: "10px 10px",
        border: "1px solid rgba(0, 0, 0, 0.12)",
        textAlign: "center"
    },
    listItem: {
        display: "flex",
        boxSizing: "border-box",
        justifyContent: "space-between"
    }
}

class TableCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    generateListItem = (name, value) => {
        return <div>
            <ListItem className={this.props.classes.listItem} button>
                <div><ListItemText primary={name} /></div>
                <div> <ListItemText primary={value} /></div>
            </ListItem>
            <Divider /></div>
    }

    render() {
        const { title, lists, classes } = this.props;
        return (<Card className={classes.tableCard}>
            <div className={classes.tableText}>
                <Typography variant="h4">{title}</Typography>
                {lists.map(list => this.generateListItem(list[0], list[1]))}
            </div>
        </Card >)
    }
}


export default withStyles(styles)(TableCard);