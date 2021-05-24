import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
// @material-ui components
import Grid from "@material-ui/core/Grid";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import { Fragment } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

const tags = [
  {
    "id": 1,
    "name": "Vegetarian"
  },
  {
    "id": 2,
    "name": "Vegan"
  },
  {
    "id": 3,
    "name": "Nut-Free"
  },
  {
    "id": 4,
    "name": "Dairy-Free"
  },
  {
    "id": 5,
    "name": "Breakfast"
  },
  {
    "id": 6,
    "name": "Lunch"
  },
  {
    "id": 7,
    "name": "Dinner"
  },
];

export default function Filters(props) {
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
        <FormLabel component="legend">Filters</FormLabel>
        <FormGroup>
          {tags.map((value, index) => (
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked.indexOf(value.id) === -1 ? false : true}
                  onChange={() => handleToggle(value.id)}
                  name={value.name}
                />
              }
              label={value.name}
            />
          ))}
        </FormGroup>
      </FormControl>
    </div>
  );
};

