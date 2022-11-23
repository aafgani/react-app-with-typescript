import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";

export default function CustomizedSearch({
  searchHandler,
  placeholder,
  iconButton,
}: {
  searchHandler: any;
  placeholder: any;
  iconButton: any;
}) {
  const [str, setStr] = useState("");
  const searchOnClickHandler = (e: any) => {
    searchHandler(str);
    setStr("");
  };
  const txtSearchOnChange = (e: any) => {
    setStr(e.target.value);
  };
  return (
    <Paper
      component="form"
      sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
    >
      <IconButton sx={{ p: "10px" }} aria-label="menu">
        <MenuIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder={placeholder}
        inputProps={{ "aria-label": "search google maps" }}
        value={str}
        onChange={txtSearchOnChange}
      />
      <IconButton
        type="button"
        sx={{ p: "10px" }}
        aria-label="search"
        onClick={searchOnClickHandler}
      >
        {iconButton ? iconButton : <SearchIcon />}
      </IconButton>
      {/* <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
  <IconButton color="primary" sx={{ p: "10px" }} aria-label="directions">
    <DirectionsIcon />
  </IconButton> */}
    </Paper>
  );
}
