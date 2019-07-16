import React, { useState, useContext } from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { context } from './Store';

const useStyles = makeStyles(theme => ({
    root: {
        margin: '50px',
        padding: theme.spacing(3, 2),
    },

    flex: {
        display: 'flex',
        alignItems: 'center',
    },

    chatWindow: {
        width: '70%',
        height: '300px',
        padding: '20px',
    },

    topicWindow: {
        width: '30%',
        height: '300px'
    },
    chatBox: {
        width: '85%',
    },

    button: {
        width: '15%'
    }

}));
function Dashboard() {
    const {allChats,sendChatAction,user} = useContext(context);
    const topics = Object.keys(allChats);

    // local state
    const [activeTopic, changeActiveTopic] = useState(topics[0]);
    const [textValue, changeTextValue] = useState('');
    //console.log([allChats]);
    const classes = useStyles();
    return (
        <div>

            <Paper className={classes.root}>
                <Typography variant="h5" component="h3">
                    Chat App
        </Typography>
                <Typography component="p">
                   { activeTopic}
        </Typography>
                <div className={classes.flex}>

                    <div className={classes.topicWindow}>
                        <List>
                            {
                                topics.map(topic => (
                                    <ListItem onClick={ e =>changeActiveTopic(e.target.innerText) } key={topic}>
                                        <ListItemText primary={topic} />
                                    </ListItem>
                                ))
                            }

                        </List>

                    </div>

                    <div className={classes.chatWindow}>
                        {
                           allChats[activeTopic].map((chat, i) => (
                                <div className={classes.flex} key={i}>
                                    <Chip label={chat.from} className={classes.chip}>
                                    </Chip>
                                    <Typography variant="body1" >
                                        {chat.msg}
                                    </Typography>

                                </div>

                            ))
                        }

                    </div>

                </div>

                <div className={classes.flex}>
                    <TextField
                        id="standard-name"
                        label="Name"
                        className={classes.chatBox}
                        value={textValue}
                        onChange={e => changeTextValue(e.target.value)}
                        //onChange={handleChange('name')}
                        margin="normal"
                    />
                    <Button 
                    onClick={
                         () => {
                            sendChatAction({from:user,msg:textValue,topic:activeTopic});
                            changeTextValue('');
                         }
                    }
                    variant="contained" color="primary" className={classes.button}>
                        Send
                </Button>
                </div>

            </Paper>
        </div>
    );
}

export default Dashboard;