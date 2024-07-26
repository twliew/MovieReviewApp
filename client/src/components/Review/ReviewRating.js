import * as React from 'react';
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { mapProps } from 'recompose';

const ReviewRating = (props) => {

  //states declarations
  //constants and functions declarations

  return (
    <>
    
      <Typography variant="h6" component="h6">
          Please select your rating
        </Typography>

        <FormControl>
          <FormLabel id="movie-rating">Rating</FormLabel>
          <RadioGroup
            row
            aria-labelledby="movie-rating"
            name="movie-rating"
            value={props.selectedRating}
            onChange={props.handleChangeReviewRating}
          >
            <FormControlLabel value="1" control={<Radio />} label="1" />
            <FormControlLabel value="2" control={<Radio />} label="2" />
            <FormControlLabel value="3" control={<Radio />} label="3" />
            <FormControlLabel value="4" control={<Radio />} label="4" />
            <FormControlLabel value="5" control={<Radio />} label="5" />
          </RadioGroup>
        </FormControl>


    </>
  );
}

export default ReviewRating;