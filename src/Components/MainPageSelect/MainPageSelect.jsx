import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch } from "react-redux";
import { setSort } from "../../rdx/features/Fav/favourite";

const SelectComponent = (props) => {
  const [mode, setMode] = React.useState("All");
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(setSort({ sort: mode }));
    console.log(mode);
  }, [mode, dispatch]);

  return (
    <Box className="selectSize">
      <FormControl fullWidth variant="filled">
        <InputLabel id="demo-simple-select-label">Show ...</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={mode}
          label="Show ..."
          onChange={(event) => setMode(event.target.value)}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Favorite">Favorite</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectComponent;
