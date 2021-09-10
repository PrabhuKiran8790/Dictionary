import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";
import { Container, LinearProgress, Switch, withStyles } from "@material-ui/core";
import Header from "./components/Header/Header";
import Definitions from './components/Definitions/Definitions';

function App() {
  const [word, setWord] = useState()
  const [meanings, setMeanings] = useState([]);
  const [category, setCategory] = useState("en");
  const [lightmode, setLightmode] = useState(false)

  const DarkMode = withStyles((theme) => ({
    root: {
      width: 42,
      height: 26,
      padding: 0,
      margin: theme.spacing(1),
    },
    switchBase: {
      padding: 1,
      '&$checked': {
        transform: 'translateX(16px)',
        color: theme.palette.common.white,
        '& + $track': {
          backgroundColor: '#52d869',
          opacity: 1,
          border: 'none',
        },
      },
      '&$focusVisible $thumb': {
        color: '#52d869',
        border: '6px solid #fff',
      },
    },
    thumb: {
      width: 24,
      height: 24,
    },
    track: {
      borderRadius: 26 / 2,
      border: `1px solid ${theme.palette.grey[400]}`,
      backgroundColor: theme.palette.grey[50],
      opacity: 1,
      transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {},
    focusVisible: {},
  }))(({ classes, ...props }) => {
    return (
      <Switch
        focusVisibleClassName={classes.focusVisible}
        disableRipple
        classes={{
          root: classes.root,
          switchBase: classes.switchBase,
          thumb: classes.thumb,
          track: classes.track,
          checked: classes.checked,
        }}
        {...props}
      />
    );
  });
  
  const AntSwitch = withStyles((theme) => ({
    root: {
      width: 28,
      height: 16,
      padding: 0,
      display: 'flex',
    },
    switchBase: {
      padding: 2,
      color: theme.palette.grey[500],
      '&$checked': {
        transform: 'translateX(12px)',
        color: theme.palette.common.white,
        '& + $track': {
          opacity: 1,
          backgroundColor: theme.palette.primary.main,
          borderColor: theme.palette.primary.main,
        },
      },
    },
    thumb: {
      width: 12,
      height: 12,
      boxShadow: 'none',
    },
    track: {
      border: `1px solid ${theme.palette.grey[500]}`,
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor: theme.palette.common.white,
    },
    checked: {},
  }))(Switch);
  
  const dictionaryApi= async()=> {
    try {
      const data = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/${category}/${word}`
      );

      setMeanings(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(meanings);
  useEffect(() => {
    dictionaryApi();
  }, [word, category])

  return <div className="App" 
  style={{
    height:"100vh", 
    backgroundColor:lightmode?"#fff":"#000000", 
    color:lightmode?"black":"white",
    transition:"all 0.7s linear"
    }}>
    <Container maxWidth = "md" style={{display:"flex", flexDirection:"column", height:"100vh", justifyContent:'space-evenly'}}>
      <div style={{position: "absolute", top: 0, right:15, padding:10}}>
        <span>{lightmode?"Dark":"Light"} Mode</span>
        <DarkMode checked={lightmode} onChange={() => setLightmode(!lightmode)} />
      </div>
      <Header 
        category={category} 
        setCategory={setCategory} 
        word={word} 
        setWord={setWord}
        lightmode = {lightmode} 
      />
      {meanings && 
      (<Definitions word={word} meanings={meanings} category={category} />)}
    </Container>
  </div>;
}

export default App;
