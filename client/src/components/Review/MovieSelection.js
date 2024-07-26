import * as React from 'react';
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import Typography from '@mui/material/Typography';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const MovieSelection = (props) => {

  //states declarations
  //constants and functions declarations

  return (
    <>
      <Typography variant="h6" component="h6">
        Select your movie
      </Typography>

      <Box>
        <FormControl sx={{ minWidth: 220 }}>
          <InputLabel id="movie-select-box">Movie</InputLabel>
          <Select
            labelId="movie-select-box"
            id="movie-select-box"
            label="Movie"
            value={props.selectedMovie}
            onChange={props.handleChangeSelectedMovie}
          >
            {props.movies.map((movie) => {
              return(
                <MenuItem value={movie.id}>{movie.name}</MenuItem>
              )
            })}
          </Select>
        </FormControl>
      </Box>

    </>
  );
}

export default MovieSelection;