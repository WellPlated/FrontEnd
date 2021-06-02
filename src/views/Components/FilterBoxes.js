import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
// @material-ui components
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
// import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import '../../css/Home.css';
import { Divider } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

const tags = [
  "Vegetarian",
  "Vegan",
  "Keto",
  "Paleo",
  "Nut-Free",
  "Dairy-Free",
  "Breakfast",
  "Lunch",
  "Dinner",
  "Drinks"
];

const cuisines = [
  "Chinese", 
  "Italian", 
  "French", 
  "Mexican",
  "American",
  "Drinks",
  
];

export default function FilterBoxes(props) {
  const classes = useStyles();
  const [checked, setChecked] = useState([]);

  const handleToggle = (value) => {
    const currIndex = checked.indexOf(value); // currIndex = -1 if index not found
    const newChecked = [...checked];
    
    if (currIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currIndex, 1);
    }
    setChecked(newChecked);
    props.handleFilters(newChecked);
  };

  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Cuisines</FormLabel>
        {cuisines.map((value, index) => (
          <FormControlLabel
            control={
              <Checkbox
                checked={checked.indexOf(value) === -1 ? false : true}
                onChange={() => handleToggle(value)}
                name={value}
              />
            }
            key={value}
            label={value}
          />
        ))}
        {/* <Divider orientation="horizontal" variant="fullWidth"/> */}
        <FormLabel component="legend">Restrictions</FormLabel>
        <FormGroup>
          {tags.map((value, index) => (
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked.indexOf(value) === -1 ? false : true}
                  onChange={() => handleToggle(value)}
                  name={value}
                />
              }
              key={value}
              label={value}
            />
          ))}
        </FormGroup>
      </FormControl>
    </div>
  );
};

