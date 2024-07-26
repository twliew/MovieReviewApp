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
import Link from '@mui/material/Link';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ImageListItem from '@mui/material/ImageListItem';
import TextField from '@mui/material/TextField';

const lightTheme = createTheme({
    palette: {
      primary: {
        main: '#5753cf',
        light: '#c0bfe0',
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

const MyPage = () => {

    const navigate = useNavigate();

    const serverURL = '';

    const [moviePopularList, setMoviePopularList] = React.useState([]);
    const [selectedMovie, setSelectedMovie] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [article, setArticle] = React.useState('');
    const [image, setImage] = React.useState('');
    const [movieName, setMovieName] = React.useState('');
    const [movieID, setMovieID] = React.useState(0);
    const [newTrailerLink, setNewTrailerLink] = React.useState('');

    React.useEffect(() => {
      getPopularMovies();
    }, []);

    const getPopularMovies = () => {
      callApiGetPopularMovies()
        .then(res => {
          console.log("callApiGetMovies returned: ", res)
          var parsed = JSON.parse(res.express);
          console.log("callApiGetMovies parsed: ", parsed);
          setMoviePopularList(parsed);
        })
    }
  
    const callApiGetPopularMovies = async () => {
      const url = serverURL + "/api/getPopularMovies";
  
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }
      });
      const body = await response.json();
      if (response.status !== 200) throw Error(body.message);
      return body;
    }

    const handleChangeSelectedMovie = (event) => {
      setSelectedMovie(event.target.value);
    }

    const handleChangeTrailerLink = (event) => {
      setNewTrailerLink(event.target.value);
    }

    const handleUpdateButtonClick = () => {
      if (newTrailerLink) {
        callApiUpdateTrailer();
        window.location.reload();
      }
      
    }

    const callApiUpdateTrailer = async () => {

      const url = serverURL + "/api/updateTrailer";
  
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: movieID,
          newTrailer: newTrailerLink
        })
      });
      const body = await response.json();
      if (response.status !== 200) throw Error(body.message);
      return body;
    }

    React.useEffect(() => {
      findDescArticle();
      setNewTrailerLink('');
    }, [selectedMovie]);
    
    const findDescArticle = () => {
      for (var i = 0; i<moviePopularList.length; i++) {
        if(selectedMovie===moviePopularList[i].id) {
          setDescription(moviePopularList[i].description)
          setArticle(moviePopularList[i].article)
          setImage(moviePopularList[i].image)
          setMovieName(moviePopularList[i].name)
          setMovieID(moviePopularList[i].id)
        }
      }
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
                            Popular Now
                        </Typography>
                        <Typography variant="h6" component="h6">
                            Fan Favorites: Ratings 4 Or Higher!
                        </Typography>
                    </InnerItem>
                    {moviePopularList.map((movie) => {
                        return(
                          <>
                          <InnerItem>
                            <Typography>{movie.name} ({movie.year})</Typography>
                            <Typography>Average Rating: {movie.average}</Typography>
                            <Typography>
                              <Link href={movie.trailer}>View Trailer Now</Link>
                            </Typography>
                          </InnerItem>
                          </>
                      )})}
                </Grid>
              </Grid>
            </GridContainer>
          </Item>
          <Item sx={{ width: 900}}>
            <GridContainer>
              <Grid
                container
                spacing={2}
                direction="column"
                justify="flex-start"
                alignItems="flex-start"
              >
                <Grid item sx={{ width: 825}}>
                    <InnerItem>
                        <Typography variant="h3" component="h3">
                            Learn More About Best Releases
                        </Typography>
                    </InnerItem>
                    <InnerItem>
                    <Box>
                      <FormControl sx={{ minWidth: 220 }}>
                        <InputLabel id="movie-select-box">Movie</InputLabel>
                        <Select
                          labelId="movie-select-box"
                          id="movie-select-box"
                          label="Movie"
                          value={selectedMovie}
                          onChange={handleChangeSelectedMovie}
                        >
                          {moviePopularList.map((movie) => {
                            return(
                              <MenuItem value={movie.id}>{movie.name}</MenuItem>
                          )})}
                        </Select>
                      </FormControl>
                    </Box>
                  </InnerItem>
                  <InnerItem>
                    {description &&
                      <Typography variant="h6" component="h6">Movie Description:</Typography>
                    }
                    <Typography>{description}</Typography>
                    {article &&
                      <Typography variant="h6" component="h6">
                        <Link href={article}>Read Article About {movieName}</Link>
                      </Typography>
                    }
                    {image &&
                      <ImageListItem key={image}>
                        <img
                          src={`${image}?w=248&fit=crop&auto=format`}
                          srcSet={`${image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                          loading="lazy"
                        />
                      </ImageListItem>
                    }
                    {movieID != 0 &&
                      <>
                      <Typography variant="h6" component="h6">Enter New Trailer</Typography>
                      <TextField
                        id="movie trailer" 
                        label="Update Movie Trailer" 
                        variant="outlined"
                        value={newTrailerLink}
                        onChange={handleChangeTrailerLink}
                      >
                        Update Trailer
                      </TextField>
                      <Button
                        variant="contained"
                        onClick={handleUpdateButtonClick}
                      >Update</Button>
                      </>
                    }
                    
                  </InnerItem>

                </Grid>
              </Grid>
            </GridContainer>
          </Item>
        </Stack>
      </ThemeProvider>
    </>
    )
}
export default MyPage;
