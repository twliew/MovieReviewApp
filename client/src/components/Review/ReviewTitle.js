import * as React from 'react';
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const ReviewTitle = (props) => {

  //states declarations
  //constants and functions declarations

  return (
    <>
      <Typography variant="h6" component="h6">
        Enter the title of the review
      </Typography>

      <Box
        component="form"
        noValidate
        autoComplete='off'
        sx={{
          '& > :not(style)': { m: 0, width: '50ch' },
        }}
      >
        <TextField 
          id="title-of-review" 
          label="Review Title" 
          variant="outlined"
          value={props.enteredTitle}
          onChange={props.handleChangeReviewTitle}
        />
      </Box>
    


    </>
  );
}

export default ReviewTitle;