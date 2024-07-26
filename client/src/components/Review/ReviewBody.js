import * as React from 'react';
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


const ReviewBody = (props) => {

  //states declarations
  //constants and functions declarations

  return (
    <>
    
      <Typography variant="h6" component="h6">
          Please type your review
        </Typography>

        <Box
          sx={{
            '& > :not(style)': { m: 0, width: '50ch' },
          }}
        >
          <TextField 
            id="body-of-review" 
            label="Review" 
            variant="outlined" 
            multiline 
            inputProps={{maxlength: 200}}
            value={props.enteredReview}
            onChange={props.handleChangeReview}
          />
        </Box>


    </>
  );
}

export default ReviewBody;