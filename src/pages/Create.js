import React , {useState} from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container  from '@material-ui/core/Container';
import KeyBoardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { FormControl, FormControlLabel, Radio, RadioGroup, TextField } from '@material-ui/core';
import { FormLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
	field: {
		marginTop: 20,
		marginBottom: 20,
		display: 'block'
	},
})


export default function Create() {
	const history = useHistory();
	const classes = useStyles();
	const [title , setTitle] = useState('');
	const [details , setDetails] = useState('');
	const [titleError , setTitleError] = useState(false);
	const [detailsError , setDetailsError] = useState(false);
	const [category , setCategory] = useState('money');

	const handleSubmit = (e) => {
		e.preventDefault();
		
		if(title === '') setTitleError(true);
		else setTitleError(false);
		
		if(details==='') setDetailsError(true);
		else setDetailsError(false);
		
		if(title && details){
			fetch('http://localhost:8000/notes' , {
				method: 'POST',
				headers: {"Content-type": "application/json"},
				body: JSON.stringify({title , details , category})
			}).then(_ => history.push('/'))
		}
	};

	return (
		<Container maxWidth="md">
			<Typography 
				variant="h6"
				component="h2"
				color="textSecondary"
				gutterBottom
			>
				Create a New Note
			</Typography>

			<form noValidate autoComplete="off" onSubmit={handleSubmit}>
				<TextField 
					variant="outlined"
					error = {titleError}
					className={classes.field}
					onChange = {(e) => {setTitle(e.target.value)}}
					label="Note Title"
					color="secondary"
					fullWidth
					required
				/>

				<TextField 
					error = {detailsError}
					className ={classes.field}
					onChange = {(e) => {setDetails(e.target.value)}}
					label="Details"
					variant="outlined"
					color="secondary"
					required
					multiline
					minRows={4}
					fullWidth
				/>

				<FormControl className={classes.field}>
					<FormLabel>Note Category</FormLabel>
					<RadioGroup value={category} onChange= {(e) => {setCategory(e.target.value)}}>
						<FormControlLabel control={<Radio />} label="Money" value="money"/>
						<FormControlLabel control={<Radio />} label="Todos" value="todos"/>
						<FormControlLabel control={<Radio />} label="Reminders" value="reminders"/>
						<FormControlLabel control={<Radio />} label="Work" value="work"/>
					</RadioGroup>
				</FormControl>

				<Button
					color="secondary"
					type="submit"
					variant="contained"
					endIcon={<KeyBoardArrowRightIcon />}
				>
					Submit
				</Button>
			</form>

		</Container	>
	)
}
