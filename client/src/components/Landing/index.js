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
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Link from '@mui/material/Link';

const lightTheme = createTheme({
  palette: {
    primary: {
      main: '#d46c97',
      light: '#e0c8d2',
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

const Landing = () => {

    const navigate = useNavigate();

    const itemData = [
      {
        img: 'https://deadline.com/wp-content/uploads/2023/04/barbie-BARBIE_VERT_TSR_W_TALENT_2764x4096_DOM_rgb.jpg?w=800',
        title: 'Barbie',
        director: 'Greta Gerwig',
        stars: 'Margot Robbie, Ryan Gosling',
      },
      {
        img: 'https://m.media-amazon.com/images/I/A1f7vq1AwuL.jpg',
        title: 'Everything Everywhere All At Once',
        director: 'Daniel Kwan, Daniel Scheinert',
        stars: 'Michelle Yeoh, Stephanie Hsu, Ke Huy Quan',
      },
      {
        img: 'https://m.media-amazon.com/images/I/8105Oc1+FPL.jpg',
        title: 'Spider-Man: Across the Spider-Verse',
        director: 'Joaquim Dos Santos, Justin K. Thompson, Kemp Powers',
        stars: 'Shameik Moore, Hailee Steinfeld, Oscar Isaac',
      },
      {
        img: 'https://m.media-amazon.com/images/M/MV5BYWQ2YzJhOGItNTMyOC00YzFmLWExZjEtOGFmMDVkMDdmOGFiXkEyXkFqcGdeQXVyMTUxNTU1NzEz._V1_.jpg',
        title: 'Nimona',
        director: 'Troy Quane, Nick Bruno',
        stars: 'Chloë Grace Moretz, Riz Ahmed',
      },
      {
        img: 'https://m.media-amazon.com/images/I/71OLMNKaKEL._AC_UF1000,1000_QL80_.jpg',
        title: 'Guardians of the Galaxy Vol. 3',
        director: 'James Gunn',
        stars: 'Chris Pratt, Zoe Saldana, Bradley Cooper',
      },
      {
        img: 'https://lumiere-a.akamaihd.net/v1/images/p_gforce_19900_c9679e51.jpeg?region=0%2C0%2C540%2C810',
        title: 'G-Force',
        director: 'Hoyt Yeatman',
        stars: 'Nicolas Cage, Sam Rockwell',
      },
    ];

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
                        Browse Trending Movies
                      </Typography>
                    </InnerItem>

                    <ImageList sx={{ width: 1340, height: 475 }} cols={3}>
                      {itemData.map((item) => (
                        <ImageListItem key={item.img}>
                          <img
                            src={`${item.img}?w=248&fit=crop&auto=format`}
                            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                            alt={item.title}
                            loading="lazy"
                          />
                          <ImageListItemBar
                            title={
                              
                                <Typography variant="h6" component="h6">
                                  {item.title}
                                </Typography>
                              
                            }
                            subtitle={<Typography>Starring: {item.stars}</Typography>}
                            position="below"
                          />
                        </ImageListItem>
                      ))}
                    </ImageList>
                  </Grid>
                </Grid>
              </GridContainer>
            </Item>
          </Stack>
    </ThemeProvider>
    </>
    )
}
export default Landing;
