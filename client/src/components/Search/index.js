import React from 'react';
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';

const lightTheme = createTheme({
    palette: {
      primary: {
        main: '#349ec2',
        light: '#d5e7ed',
        background: '#eeeeee'
      },
    },
  });
  
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.primary.background,
    padding: theme.spacing(1),
    textAlign: 'center',
    marginTop: theme.spacing(1),
  }));
  
  const InnerItem = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.primary.light,
    padding: theme.spacing(2),
    textAlign: 'center',
    marginTop: theme.spacing(1),
  }));
  
  const GridContainer = styled(Grid)(({ theme }) => ({
    margin: theme.spacing(5),
  }))

const Search = () => {

    const navigate = useNavigate();
  
    const serverURL = '';

    const [title, setTitle] = React.useState('');
    const [actor, setActor] = React.useState('');
    const [director, setDirector] = React.useState('');
    const [movieDirAvgList, setMovieDirAvgList] = React.useState([]);
    const [movieReviewList, setMovieReviewList] = React.useState([]);

    const handleChangeTitle = (event) =>{
      setTitle(event.target.value);
    }

    const handleChangeActor = (event) =>{
      setActor(event.target.value);
    }

    const handleChangeDirector = (event) =>{
      setDirector(event.target.value);
    }

    const handleButtonClicked = () => {
      callApiSearchMovieDirAvg()
        .then(res => {
        var parsed = JSON.parse(res.express);
        setMovieDirAvgList(parsed);
      });

      callApiSearchMovieReview()
        .then(res => {
        var result = JSON.parse(res.express);
        setMovieReviewList(result);
      });
    }

    const callApiSearchMovieDirAvg = async () => {

      const url = serverURL + "/api/searchMovieDirAvg";
  
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          actor: actor,
          director: director
        })
      });
      const body = await response.json();
      if (response.status !== 200) throw Error(body.message);
      return body;
    }

    const callApiSearchMovieReview = async () => {

      const url = serverURL + "/api/searchMovieReview";
  
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          actor: actor,
          director: director
        })
      });
      const body = await response.json();
      if (response.status !== 200) throw Error(body.message);
      return body;
    }

    return (
    <>
        <ThemeProvider theme={lightTheme}>
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                <Button sx={{ my: 2, color: 'white', display: 'block' }} onClick={()=>navigate('/')}>
                  Landing
                </Button>
                <Button sx={{ my: 2, color: 'white', display: 'block' }} onClick={()=>navigate('/Review')}>
                  Review
                </Button>
                <Button sx={{ my: 2, color: 'white', display: 'block' }} onClick={()=>navigate('/Search')}>
                  Search
                </Button>
                <Button sx={{ my: 2, color: 'white', display: 'block' }} onClick={()=>navigate('/AboutMovies')}>
                  About Movies
                </Button>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>

        <Stack direction="row" spacing={5}>
          <Item>
            <GridContainer>
              <Grid
                container
                spacing={2}
                direction="column"
                justify="flex-start"
                alignItems="flex-start"
              >
                <Grid item>
                    <InnerItem>
                        <Typography variant="h3" component="h3">
                            Search For A Movie
                        </Typography>
                    </InnerItem>

                    <InnerItem>
                      <Box
                        component="form"
                        noValidate
                        autoComplete='off'
                        sx={{
                          '& > :not(style)': { m: 0, width: '50ch' },
                        }}
                      >
                        <TextField 
                          id="title" 
                          label="Search Title" 
                          variant="outlined"
                          value={title}
                          onChange={handleChangeTitle}
                        />
                      </Box>
                    </InnerItem>

                    <InnerItem>
                      <Box
                        component="form"
                        noValidate
                        autoComplete='off'
                        sx={{
                          '& > :not(style)': { m: 0, width: '50ch' },
                        }}
                      >
                        <TextField 
                          id="director-name" 
                          label="Search Director" 
                          variant="outlined"
                          value={director}
                          onChange={handleChangeDirector}
                        />
                      </Box>
                    </InnerItem>

                    <InnerItem>
                      <Box
                        component="form"
                        noValidate
                        autoComplete='off'
                        sx={{
                          '& > :not(style)': { m: 0, width: '50ch' },
                        }}
                      >
                        <TextField 
                          id="actor-name" 
                          label="Search Actors" 
                          variant="outlined"
                          value={actor}
                          onChange={handleChangeActor}
                        />
                      </Box>
                    </InnerItem>

                    <InnerItem>
                    <Button 
                        variant="contained"
                        onClick={handleButtonClicked}
                      >
                        Search
                      </Button>
                    </InnerItem>
                </Grid>
                </Grid>
            </GridContainer>
            </Item>

            <Item>
                <GridContainer>
                  <Grid
                    container
                    spacing={2}
                    direction="column"
                    justify="flex-start"
                    alignItems="flex-start"
                  >
                    <Grid>
                      <InnerItem>
                        <Typography variant="h3" component="h3">
                            Search Results
                        </Typography>
                      </InnerItem>
                      {movieDirAvgList.map((movie) => {
                        return(
                          <>
                          <InnerItem>
                            <Box sx={{ maxWidth: 600}}>
                              <Typography variant="h6" component="h6">
                                Movie:
                              </Typography>
                              <Typography>
                                {movie.title}
                              </Typography>
                              <Typography variant="h6" component="h6">
                                Director:
                              </Typography>
                              <Typography>
                                {movie.director}
                              </Typography>
                              <Typography variant="h6" component="h6">
                                Average Score:
                              </Typography>
                              <Typography>
                                {movie.average}
                              </Typography>
                              <Typography variant="h6" component="h6">
                              Reviews: 
                              {movieReviewList.map((review) => {
                                return(
                                  <>
                                  {review.title===movie.title &&
                                    <Typography>
                                      <li>
                                        {review.reviews}
                                      </li>
                                  </Typography>
                                  }
                                  </>
                              )})}
                              </Typography>
                            </Box>
                          </InnerItem>
                        </>
                        )})}
                    </Grid>
                  </Grid>
                </GridContainer>

            </Item>
            </Stack>
        </ThemeProvider>
    </>
    )
}
export default Search;