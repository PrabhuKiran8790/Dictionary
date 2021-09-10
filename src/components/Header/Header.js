import { createTheme,ThemeProvider, TextField, MenuItem } from '@material-ui/core';
import React from 'react'
import "./Header.css";
import categories from '../../data/category';

const Header = ({setCategory, category, word, setWord, lightmode}) => {
    const darkTheme = createTheme({
        palette: {
            primary:{
                main:lightmode?"#000":"#fff",
            },
          type:lightmode?'light':'dark',
        },
      });

        const handleChange=(language)=>{
            setCategory(language);
            setWord("");
        }
    return (
        <div className="header">
            <span><br></br></span>
            <span className="title">{word?word:"Dictionary"}</span>
            <span><sub>A React Project by <a href="https://www.github.com/Prabhukiran8790"><u><b>Prabhu Kiran</b></u></a> </sub></span>
            <span><br></br></span>
            <div className='inputs'>
                <ThemeProvider theme={darkTheme}>
                    <TextField className="search" label="Search for a Word" 
                    variant="outlined" 
                    value={word} 
                    onChange={(e)=>setWord(e.target.value)}
                    />
                    <TextField
                    className="select"
                    select
                    label="Language"
                    value={category}
                    onChange={(e)=>handleChange(e.target.value)}
                    // helperText="Select the language"
                    variant="outlined"
                    >
                            {
                                categories.map((option)=>(
                                    <MenuItem key = {option.label} value={option.label} >{option.value}</MenuItem>
                                ))
                            }
                    </TextField>
                </ThemeProvider>
            </div>
        </div>
    )
}

export default Header
