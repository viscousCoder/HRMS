import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
// import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import {
  Avatar,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store.tsx";
import { getAllEmployee } from "../store/employeeSlice.tsx";
import Image from "../Data.png";
import BlogIcon from "@mui/icons-material/LibraryBooks";
import ReferralIcon from "@mui/icons-material/Group";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import HomeIcon from "@mui/icons-material/Home";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import ContactEmergencyIcon from "@mui/icons-material/ContactEmergency";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Diversity3Icon from "@mui/icons-material/Diversity3";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

export default function Navbar({ setIsOpen }) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const [open, setOpen] = React.useState<boolean>(false);
  // console.log(open, "this");
  function handleClick() {
    // console.log("hoo");
    setOpen((prev) => !prev);
  }

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleLogout = () => {
    localStorage.clear();
    handleMenuClose();
    navigate("/login");
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  const arr = ["Profile", "About", "Logout"];
  React.useEffect(() => {
    const token = localStorage.getItem("token");

    // Check if the URL includes '/employee-blog'
    if (location.pathname.includes("/employee-blog") && token) {
      dispatch(getAllEmployee(token)); // Dispatch API call
    }
  }, [location, dispatch]);

  // States to manage dropdown visibility
  const [blogOpen, setBlogOpen] = React.useState(false);
  const [referralOpen, setReferralOpen] = React.useState(false);
  // Handlers to toggle dropdowns
  const handleBlogClick = () => setBlogOpen(!blogOpen);
  const handleReferralClick = () => setReferralOpen(!referralOpen);

  const hrRoutes = [
    { name: "Home", icon: <HomeIcon />, path: "/" },
    { name: "Attendance", icon: <CoPresentIcon />, path: "/attendance" },
    {
      name: "EmployeeList",
      icon: <FormatListNumberedIcon />,
      path: "/employeelist",
    },
    { name: "Profile", icon: <InboxIcon />, path: "/profile" },
    { name: "Blog", icon: <BlogIcon />, path: "/blog", isDropdown: true },

    {
      name: "Referral",
      icon: <ReferralIcon />,
      path: "/referral",
      isDropdown: true,
    },

    { name: "Todo", icon: <InboxIcon />, path: "/todo" },
  ];

  const managerRoutes = [
    { name: "Home", icon: <HomeIcon />, path: "/" },
    { name: "Attendance", icon: <CoPresentIcon />, path: "/attendance" },
    { name: "Profile", icon: <InboxIcon />, path: "/profile" },
    { name: "Blog", icon: <BlogIcon />, path: "/blog", isDropdown: true },
    {
      name: "Referral",
      icon: <ReferralIcon />,
      path: "/referral",
      isDropdown: true,
    },
    { name: "Todo", icon: <InboxIcon />, path: "/todo" },
  ];

  const otherRoutes = [
    { name: "Home", icon: <HomeIcon />, path: "/" },
    { name: "Attendance", icon: <CoPresentIcon />, path: "/attendance" },
    { name: "Profile", icon: <InboxIcon />, path: "/profile" },
    { name: "Blog", icon: <BlogIcon />, path: "/blog", isDropdown: true },
    {
      name: "Referral",
      icon: <ReferralIcon />,
      path: "/referral",
      isDropdown: true,
    },
    { name: "Todo", icon: <InboxIcon />, path: "/todo" },
  ];
  const role = localStorage.getItem("role");
  const routes =
    role === "hr" ? hrRoutes : role === "Manager" ? managerRoutes : otherRoutes;

  return (
    <>
      {/* {allLoading ? (
        <Loading />
      ) : ( */}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={() => (setIsOpen((prev) => !prev), handleClick())}
            >
              <MenuIcon />
            </IconButton>
            {/* <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            HRMS
          </Typography> */}
            <Avatar src={Image}></Avatar>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
              >
                <Badge badgeContent={4} color="error">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={17} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
        <Drawer
          open={open}
          anchor="left"
          onClose={handleClick}
          color="gray"
          sx={{ display: { md: "none", sx: "flex" } }}
        >
          <Box height={40}></Box>
          <Divider />
          <List>
            {routes.map((item, index) => (
              <div key={index}>
                {/* Handle dropdowns for Blog and Referral */}
                {item.isDropdown ? (
                  <>
                    <ListItemButton
                      onClick={
                        item.name === "Blog"
                          ? handleBlogClick
                          : handleReferralClick
                      }
                    >
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText
                        primary={item.name}
                        sx={
                          {
                            // opacity: isOpen ? 1 : 0, // Hide text when closed
                          }
                        }
                      />
                      {item.name === "Blog" ? (
                        blogOpen ? (
                          <ExpandLessIcon />
                        ) : (
                          <ExpandMoreIcon />
                        )
                      ) : referralOpen ? (
                        <ExpandLessIcon />
                      ) : (
                        <ExpandMoreIcon />
                      )}
                    </ListItemButton>

                    {(item.name === "Blog" && blogOpen) ||
                    (item.name === "Referral" && referralOpen) ? (
                      <Box sx={{ pl: 4 }}>
                        {item.name === "Blog" ? (
                          <>
                            <ListItemButton onClick={() => navigate("/blog")}>
                              <ListItemIcon>
                                <AssignmentIcon />
                              </ListItemIcon>
                              <ListItemText
                                primary="Blog"
                                // sx={{ opacity: isOpen ? 1 : 0 }}
                              />
                            </ListItemButton>
                            <ListItemButton
                              onClick={() => navigate("/employee-blog")}
                            >
                              <ListItemIcon>
                                <ContactEmergencyIcon />
                              </ListItemIcon>
                              <ListItemText
                                primary="Employee Blog"
                                // sx={{ opacity: isOpen ? 1 : 0 }}
                              />
                            </ListItemButton>
                          </>
                        ) : (
                          <>
                            <ListItemButton
                              onClick={() => navigate("/referral")}
                            >
                              <ListItemIcon>
                                <Diversity3Icon />
                              </ListItemIcon>
                              <ListItemText
                                primary="Referral System"
                                // sx={{ opacity: isOpen ? 1 : 0 }}
                              />
                            </ListItemButton>
                            <ListItemButton
                              onClick={() => navigate("/referral-list")}
                            >
                              <ListItemIcon>
                                <ReferralIcon />
                              </ListItemIcon>
                              <ListItemText
                                primary="Referral List"
                                // sx={{ opacity: isOpen ? 1 : 0 }}
                              />
                            </ListItemButton>
                            <ListItemButton
                              onClick={() => navigate("/assign-list")}
                            >
                              <ListItemIcon>
                                <ReferralIcon />
                              </ListItemIcon>
                              <ListItemText
                                primary="Assign List"
                                // sx={{ opacity: isOpen ? 1 : 0 }}
                              />
                            </ListItemButton>
                          </>
                        )}
                      </Box>
                    ) : null}
                  </>
                ) : (
                  // Regular list items (non-dropdown)
                  <ListItemButton onClick={() => navigate(item.path)}>
                    <ListItemIcon>
                      {/* <BlogIcon /> */}
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.name}
                      // sx={{ opacity: isOpen ? 1 : 0 }}
                    />
                  </ListItemButton>
                )}
              </div>
            ))}
          </List>
          <Divider />
        </Drawer>
      </Box>
      {/* )} */}
    </>
  );
}
