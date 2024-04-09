import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import React, { useState } from 'react';
import noImg from './assets/no-image.avif';
import logo from './logo.png';

function App() {

  const colors = {
    backgroundColor: '#121212',
    cardBackground: "#282828",
    formElementBackground: "#3f3f3f",
    primaryColor: "#00adb5",
    secondaryColor: "#99dae7",
    transparent: "rgba(0, 0, 0, 0)",
    textColor: "#eeeeee",
  }

  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [image, setImage] = useState(null);


  const prompts = [
    "A cyborg minotaur playing the guitar",
    "A robot riding a bicycle",
    "A cute baby dragon blowing bubbles",
    "A magical unicorn eating a rainbow",
    "A superhero cat fighting crime",
    "A cat playing with a ball of yarn",
    "A cute dog wearing sunglasses",
    "A cute ninja frog with a sword",
    "An octopus playing with a beach ball",
    "A mermaid riding a unicorn",
    "A dragon playing the guitar",
    "A pirate ship sailing the seven seas",
    "A talking tree with a top hat",
    "Giant mythical wolf of some element",
    "A magical fairy in the forest",
    "A wizard casting a spell",
    "A robot playing chess",
    "A magical castle in the clouds",
    "A robot dancing ballet",
  ]

  const generateImage = () => {
    if (!prompt) {
      alert('Prompt is required');
      return;
    }
    setIsLoading(true);
    setOpen(true);
    axios.post(process.env.REACT_APP_API_URL + "/generate", {
      prompt: prompt
    }).then((response) => {
      console.log(response.data);
      setImage(response.data.url);
      setIsLoading(false);
      setOpen(false);
    }).catch((error) => {
      alert('Internal server error');
      setIsLoading(false);
      setOpen(false);
    });
  }

  const surpriseMe = () => {
    const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    setPrompt(randomPrompt);
  }

  const handleClose = () => {
    setOpen(false);
  }


  return (
    <div className="App" >
      <Box sx={{ height: "100vh", backgroundColor: colors.backgroundColor }}>
        <header>
          <center>
            <img src={logo} alt="logo" width={150} />
            <h1 style={{ color: colors.primaryColor }}>Text-to-Image</h1>
            <h3 style={{ color: colors.textColor }}>Convert your text to image</h3>
          </center>
        </header>

        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
          <Box
            sx={{ width: '50%', padding: 10 }}>
            <InputLabel htmlFor="input-with-icon-adornment" style={{ color: colors.textColor, margin: 4 }}>
              Enter your prompt here
            </InputLabel>
            <TextField
              multiline
              rows={4}
              sx={{
                '& label.Mui-focused': {
                  color: colors.primaryColor,
                },
                '& .MuiInput-underline:after': {
                  borderBottomColor: colors.primaryColor,
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: colors.transparent,
                  },
                  '&:hover fieldset': {
                    borderColor: colors.primaryColor,
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: colors.primaryColor,
                  },
                },
              }}
              fullWidth
              variant="outlined"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              InputProps={{
                style: {
                  color: colors.textColor
                }
              }}
              style={{ backgroundColor: colors.formElementBackground, width: 600, margin: 4 }}
            />
            <br />
            <Button variant="contained"
              onClick={surpriseMe}
              style={{ textTransform: "none", backgroundColor: colors.primaryColor, color: colors.textColor, margin: 8 }}>
              Surprise me
            </Button>
            <Button variant="contained"
              onClick={generateImage}
              style={{ textTransform: "none", backgroundColor: colors.primaryColor, color: colors.textColor, margin: 8 }}>
              Generate
            </Button>
          </Box>
          <Box sx={{ width: '50%' }}>
            <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={open}
              onClick={handleClose}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
            {isLoading ? <center><h2 style={{ color: colors.primaryColor }}>Generating...</h2></center> :
              image ?
                <img src={image} alt="generated" style={{ maxWidth: 500 }} /> :
                <img src={noImg} alt="placeholder" />
            }
          </Box>
        </Box>
      </Box>
    </div >
  );
}

export default App;
