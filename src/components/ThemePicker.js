import React from "react";
import { Select, MenuItem } from "@material-ui/core";

export const ThemePicker = props => (
  <Select value={props.value} onChange={props.onChange}>
    {props.options.map(({ name, display }) => (
      <MenuItem value={name}>{display}</MenuItem>
    ))}
  </Select>
);
