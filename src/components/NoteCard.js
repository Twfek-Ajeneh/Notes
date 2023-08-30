import Typography  from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from "@material-ui/core/IconButton";
import DeleteOutlined from '@mui/icons-material/DeleteOutlined';
import { Avatar, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(
    {
        icon:{
            '& :hover':{
                color: '#F32424'
            }
        },
        avatar:{
            backgroundColor: (note) => {
                if(note.category==="work") return '#ff1341';
                else if(note.category==="todos") return '#44cc59';
                else if(note.category==="reminders") return '#451465';
                else return '#aa546c';
            }
        }
    }
);

const NoteCard = ({ note , handleDelete}) => {
    const classes = useStyles(note);

    return ( 
        <div>
            <Card elevation={2}>
                <CardHeader
                    avatar={
                        <Avatar className={classes.avatar}>
                            {note.category[0].toUpperCase()}
                        </Avatar>
                    }
                    action={
                        <IconButton onClick={() => handleDelete(note.id)} className={classes.icon}>
                            <DeleteOutlined className={classes.icon} />
                        </IconButton>
                    }
                    title={note.title}
                    subheader={note.category} 
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary">
                        {note.details}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}

export default NoteCard;