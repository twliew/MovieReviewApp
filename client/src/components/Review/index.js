import * as React from 'react';
import ReviewTitle from './ReviewTitle';
import ReviewBody from './ReviewBody';
import ReviewRating from './ReviewRating';
import MovieSelection from './MovieSelection';
import Typography from '@mui/material/Typography';
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


const serverURL = "";

const lightTheme = createTheme({
  palette: {
    primary: {
      main: '#8e4fab',
      light: '#d8d0db',
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

const Review = (props) => {

  //states declarations
  const [movies, setMovies] = React.useState([]);
  const [selectedMovie, setSelectedMovie] = React.useState(0);
  const [enteredTitle, setEnteredTitle] = React.useState('');
  const [enteredReview, setEnteredReview] = React.useState('');
  const [selectedRating, setSelectedRating] = React.useState('');

  const [validation, setValidation] = React.useState(false);
  const [buttonClicked, setButtonClicked] = React.useState(false);
  
  const initialReview = [
    '',
    '',
    '',
    null
  ]

  const [review, setReview] = React.useState(initialReview);
  const [message, setMessage] = React.useState(false);
  const [userID, setUserID] = React.useState(1);

  //constants and functions declarations

  const handleChangeSelectedMovie = (event) => {
    setMessage(false)
    setValidation(false)
    setButtonClicked(false)
    setSelectedMovie(event.target.value)
  }

  const handleChangeReviewTitle = (event) => {
    setMessage(false)
    setValidation(false)
    setButtonClicked(false)
    setEnteredTitle(event.target.value)
  }

  const handleChangeReview = (event) => {
    setMessage(false)
    setValidation(false)
    setButtonClicked(false)
    setEnteredReview(event.target.value)
  }

  const handleChangeReviewRating = (event) => {
    setMessage(false)
    setValidation(false)
    setButtonClicked(false)
    setSelectedRating(event.target.value)
  }

  const onButtonClick = () => {
    setButtonClicked(true)
    {buttonClicked&&validation &&
      setButtonClicked(false)
      setMessage(false)
    }
  }

  React.useEffect(() => {
    getMovies();
  }, []);

  const getMovies = () => {
    callApiGetMovies()
      .then(res => {
        console.log("callApiGetMovies returned: ", res)
        var parsed = JSON.parse(res.express);
        console.log("callApiGetMovies parsed: ", parsed);
        setMovies(parsed);
      })
  }

  const callApiGetMovies = async () => {
    const url = serverURL + "/api/getMovies";

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


  const callApiAddReview = async () => {

    const url = serverURL + "/api/addReview";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userID: userID,
        reviewTitle: enteredTitle,
        reviewContent: enteredReview,
        reviewScore: selectedRating,
        movieID: selectedMovie
      })
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  }

  React.useEffect(() => {
    var check = selectedMovie!==0&&enteredTitle!==''&&enteredReview!==''&&selectedRating!==''&&buttonClicked
    {check ?
      setValidation(true)
      :
      setValidation(false)
    }
    {check ?
      setMessage(true)
      :
      setTimeout(() => {
        setMessage(false)
        }, 30000);
    }
  }, [buttonClicked]);

  React.useEffect(() => {
    {validation &&
      updatePreviousReview();
    }
  }, [validation]);

  const updatePreviousReview = () => {
    var movieTitle='';
    for (var i = 0; i<movies.length; i++) {
      if(selectedMovie===movies[i].id) {
        movieTitle=movies[i].name
      }
    }
    var curReview = [movieTitle,enteredTitle,enteredReview,selectedRating]
    setReview(curReview);
    callApiAddReview();
    clearForm();
  }

  const clearForm = () => {
    {validation &&
      setSelectedMovie(0)
      setSelectedMovie(0)
      setEnteredTitle('')
      setEnteredReview('')
      setSelectedRating('')
      setValidation(false)
      setButtonClicked(false)
    }
  }

  const navigate = useNavigate();

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
                      Review A Movie
                    </Typography>
                  </InnerItem>
          
                  <InnerItem>
                    <MovieSelection 
                      movies={movies}
                      selectedMovie={selectedMovie}
                      handleChangeSelectedMovie={handleChangeSelectedMovie}
                    />
                    {selectedMovie===0&&buttonClicked&&validation===false &&
                      <Typography style={{ color: 'red' }}>Select your movie</Typography>
                    }
                  </InnerItem>
                
                  <InnerItem>
                    <ReviewTitle 
                      enteredTitle={enteredTitle}
                      handleChangeReviewTitle={handleChangeReviewTitle}
                    />
                    {enteredTitle===""&&buttonClicked&&validation===false &&
                      <Typography style={{ color: 'red' }}>Enter your review title</Typography>
                    }
                  </InnerItem>
              
                  <InnerItem>
                    <ReviewBody 
                      enteredReview={enteredReview}
                      handleChangeReview={handleChangeReview}
                    />
                    {enteredReview===""&&buttonClicked&&validation===false &&
                      <Typography style={{ color: 'red' }}>Enter your review</Typography>
                    }
                  </InnerItem>
              
                  <InnerItem>
                    <ReviewRating 
                      selectedRating={selectedRating}
                      handleChangeReviewRating={handleChangeReviewRating}
                    />
                    {selectedRating===""&&buttonClicked&&validation===false &&
                      <Typography style={{ color: 'red' }}>Select the rating</Typography>
                    }
                  </InnerItem>
              
                  <InnerItem>
                      <Button 
                        variant="contained"
                        onClick={onButtonClick}
                      >
                        Submit
                      </Button>
                      {message &&
                        <Typography>Your review has been received</Typography>
                      }
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
                <Grid item>
                  <InnerItem>
                    <Typography variant="h3" component="h3">
                      Submitted Review
                    </Typography>
                  </InnerItem>

                  <InnerItem>
                    <Typography variant="h6" component="h6">Movie:</Typography>
                    <Typography>{review[0]}</Typography>
                  </InnerItem>
                
                  <InnerItem>
                    <Box sx={{ maxWidth: 600}}>
                      <Typography variant="h6" component="h6">Review Title:</Typography>
                      <Typography 
                        paragraph 
                        sx={{ workWrap: 'break-word', overflowWrap: 'break-word'}}
                      >
                        {review[1]}
                      </Typography>
                    </Box>
                  </InnerItem>
              
                  <InnerItem>
                    <Box sx={{ maxWidth: 600}}>
                    <Typography variant="h6" component="h6">Review:</Typography>
                      <Typography 
                        paragraph 
                        sx={{ workWrap: 'break-word', overflowWrap: 'break-word'}}
                      >
                        {review[2]}
                      </Typography>
                    </Box>
                  </InnerItem>
                
                  <InnerItem>
                    <Typography variant="h6" component="h6">Review Rating:</Typography>
                    <Typography paragraph>
                      {review[3]}
                    </Typography>
                  </InnerItem>
                </Grid>
              </Grid>
            </GridContainer>
          </Item>
        </Stack>
      </ThemeProvider>
    </>
  );
}

export default Review;