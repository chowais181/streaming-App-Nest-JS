import * as React from "react";
import { useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import { Avatar } from "@mui/material";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { Link } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import { useNavigate, Navigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function SearchAppBar(props) {
  const isLogged = localStorage.getItem("userToken");
  // console.log(isLogged);

  const { setIsLoggedIn, isLoggedIn } = props;
  // console.log(isLoggedIn);

  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [log, setLogout] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [video, setVideo] = React.useState("");
  const [cover, setCover] = React.useState("");
  const [title, setTitle] = React.useState("");

  // avatar menu
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userToken");
    setLogout(true);
    navigate("/", true);
    setIsLoggedIn(false);
  };

  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // ---------------------------

  const submitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("video", video);
    formData.append("cover", cover);
    const token = localStorage.getItem("token");
    await axios.post("/api/v1/video", formData, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    handleClose();
    navigate("/video");
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h4"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              Streamly
            </Link>
          </Typography>
          {/* {log && <Navigate to="/" replace={true} />} */}

          {isLogged && (
            <>
              <Search>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>

              <div>
                <Button
                  variant="contained"
                  onClick={handleOpen}
                  sx={{ m: 1, bgcolor: "secondary.main" }}
                >
                  Add New
                </Button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      <Box
                        component="form"
                        onSubmit={submitForm}
                        noValidate
                        sx={{ mt: 1 }}
                      >
                        <label>Video Title:</label>
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="title"
                          name="title"
                          autoFocus
                          onChange={(e) => setTitle(e.target.value)}
                        />
                        <label>Select Video:</label>
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="video"
                          name="video"
                          autoFocus
                          type="file"
                          onChange={(e) => setVideo(e.target.files[0])}
                        />
                        <label>Select Cover Image:</label>
                        <TextField
                          autoFocus
                          margin="normal"
                          required
                          fullWidth
                          name="coverImage"
                          type="file"
                          id="coverImage"
                          onChange={(e) => setCover(e.target.files[0])}
                        />
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          sx={{ mt: 3, mb: 2 }}
                        >
                          Upload
                        </Button>
                      </Box>
                    </Typography>
                  </Box>
                </Modal>
              </div>
              <Box sx={{ flexGrow: 0 }}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" />
                </IconButton>

                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center" onClick={logout}>
                      Logout
                    </Typography>
                  </MenuItem>
                </Menu>
              </Box>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
