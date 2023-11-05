import React from "react";
import { styled } from "@mui/system";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useLocation } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ResponsiveBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  [theme.breakpoints.down("375px")]: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
}));

export default function Navbar() {
  let { pathname } = useLocation();
  console.log(pathname);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            {/* <MenuIcon /> */}
          </IconButton>
          {pathname === "/about" ? (
            <Link to="/">
              <div style={{ marginTop: 3, color: "white", marginRight: 5 }}>
                <ArrowBackIcon style={{ fill: "white" }} />
              </div>
            </Link>
          ) : null}
          <ResponsiveBox
            sx={{
              flexGrow: 1,
              textAlign: { xs: "center", sm: "left" },
              paddingLeft: { xs: 1, sm: 0 },
              paddingRight: { xs: 1, sm: 0 },
            }}
          >
            <Typography
              variant="h6"
              component="div"
              sx={{
                color: "#fff",
                textDecoration: "none",
              }}
            >
              <Link
                to="/"
                style={{
                  color: "#fff",
                  textDecoration: "none",
                  display: "block",
                }}
              >
                Logo
              </Link>
            </Typography>
          </ResponsiveBox>
          <Link to="/about">
            <Button color="inherit" style={{ color: "#fff" }}>
              About
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
