import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { Button } from "react-bootstrap";
import LightModeIcon from "@mui/icons-material/LightMode";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import { useDispatch, useSelector } from "react-redux";
import { changeTheme } from "../../rdx/features/Theme/theme";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 1),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 1),
  },
  marginRight: 10,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "light",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "10ch",
      "&:focus": {
        width: "15ch",
      },
    },
  },
}));

const Header = () => {
  let darkTheme = useSelector((state) => state.theme.darkTheme);
  const dispatch = useDispatch();

  const [curInput, setCurInput] = React.useState("");

  return (
    <header>
      <div className="logoWrapper">
        <div className="logo">
          <CurrencyExchangeIcon fontSize="large" />
          <Link to="/">
            <h2>Currency Info</h2>
          </Link>
        </div>
      </div>
      <div className="searchWrapper">
        <div className="theme">
          <button
            type="button"
            className={`btn ${darkTheme ? "btn-light" : "btn-outline-dark"}`}
            onClick={() => dispatch(changeTheme())}
          >
            <LightModeIcon sx={{ color: "black" }} />
          </button>
        </div>
        <div className="search">
          <Form.Control
            type="text"
            placeholder="Пошук"
            className="searchInput"
            onChange={(event) => setCurInput(event.target.value)}
            value={curInput}
          />
          <Link to={`/${curInput}`}>
            <Button variant="light" className="searchButton">
              <SearchIcon />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
