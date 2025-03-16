// import * as React from "react";
// import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import MuiDrawer from "@mui/material/Drawer";
// import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";

// import List from "@mui/material/List";
// import CssBaseline from "@mui/material/CssBaseline";

// import Divider from "@mui/material/Divider";
// import IconButton from "@mui/material/IconButton";

// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import InboxIcon from "@mui/icons-material/MoveToInbox";
// import MailIcon from "@mui/icons-material/Mail";
// import { useNavigate } from "react-router-dom";

// const drawerWidth = 240;

// const openedMixin = (theme: Theme): CSSObject => ({
//   width: drawerWidth,
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.enteringScreen,
//   }),
//   // overflowX: "hidden",
// });

// const closedMixin = (theme: Theme): CSSObject => ({
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   // overflowX: "hidden",
//   width: `calc(${theme.spacing(7)} + 1px)`,
//   [theme.breakpoints.up("sm")]: {
//     width: `calc(${theme.spacing(8)} + 1px)`,
//   },
// });

// const DrawerHeader = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "flex-end",
//   padding: theme.spacing(0, 1),
//   // necessary for content to be below app bar
//   ...theme.mixins.toolbar,
// }));

// interface AppBarProps extends MuiAppBarProps {
//   open?: boolean;
// }

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== "open",
// })<AppBarProps>(({ theme }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(["width", "margin"], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   variants: [
//     {
//       props: ({ open }) => open,
//       style: {
//         marginLeft: drawerWidth,
//         width: `calc(100% - ${drawerWidth}px)`,
//         transition: theme.transitions.create(["width", "margin"], {
//           easing: theme.transitions.easing.sharp,
//           duration: theme.transitions.duration.enteringScreen,
//         }),
//       },
//     },
//   ],
// }));

// const Drawer = styled(MuiDrawer, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme }) => ({
//   width: drawerWidth,
//   flexShrink: 0,
//   whiteSpace: "nowrap",
//   boxSizing: "border-box",
//   variants: [
//     {
//       props: ({ open }) => open,
//       style: {
//         ...openedMixin(theme),
//         "& .MuiDrawer-paper": openedMixin(theme),
//       },
//     },
//     {
//       props: ({ open }) => !open,
//       style: {
//         ...closedMixin(theme),
//         "& .MuiDrawer-paper": closedMixin(theme),
//       },
//     },
//   ],
// }));

// export default function Sidebar({ isOpen }) {
//   const theme = useTheme();
//   const navigate = useNavigate();

//   return (
//     <Box sx={{ display: { xs: "none", md: "flex" } }}>
//       <CssBaseline />
//       <Drawer variant="permanent" open={isOpen}>
//         <Box height={10}></Box>
//         <Divider />
//         <List>
//           {[
//             "Home",
//             "Attendance",
//             "EmployeeList",
//             "Profile",
//             "Blog",
//             "Employee-Blog",
//             "Referral",
//             "Referral-List",
//             "Assign-list",
//             "Todo",
//           ].map((text, index) => (
//             <ListItem
//               key={text}
//               disablePadding
//               sx={{ display: "block" }}
//               onClick={() =>
//                 text === "Home"
//                   ? navigate("/")
//                   : navigate(`/${text.toLowerCase()}`)
//               }
//             >
//               <ListItemButton
//                 sx={[
//                   {
//                     minHeight: 48,
//                     px: 2.5,
//                   },
//                   isOpen
//                     ? {
//                         justifyContent: "initial",
//                       }
//                     : {
//                         justifyContent: "center",
//                       },
//                 ]}
//               >
//                 <ListItemIcon
//                   sx={[
//                     {
//                       minWidth: 0,
//                       justifyContent: "center",
//                     },
//                     isOpen
//                       ? {
//                           mr: 3,
//                         }
//                       : {
//                           mr: "auto",
//                         },
//                   ]}
//                 >
//                   {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//                 </ListItemIcon>
//                 <ListItemText
//                   primary={text}
//                   sx={[
//                     isOpen
//                       ? {
//                           opacity: 1,
//                         }
//                       : {
//                           opacity: 0,
//                         },
//                   ]}
//                 />
//               </ListItemButton>
//             </ListItem>
//           ))}
//         </List>
//         <Divider />
//       </Drawer>
//     </Box>
//   );
// }

import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import BlogIcon from "@mui/icons-material/LibraryBooks";
import ReferralIcon from "@mui/icons-material/Group";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import HomeIcon from "@mui/icons-material/Home";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import { useNavigate } from "react-router-dom";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import ContactEmergencyIcon from "@mui/icons-material/ContactEmergency";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Diversity3Icon from "@mui/icons-material/Diversity3";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open
    ? {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      }
    : {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      }),
}));

export default function Sidebar({ isOpen }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  // States to manage dropdown visibility
  const [blogOpen, setBlogOpen] = React.useState(false);
  const [referralOpen, setReferralOpen] = React.useState(false);

  // Handlers to toggle dropdowns
  const handleBlogClick = () => setBlogOpen(!blogOpen);
  const handleReferralClick = () => setReferralOpen(!referralOpen);

  // Define routes for different roles
  const hrRoutes = [
    { name: "Home", icon: <HomeIcon />, path: "/" },
    { name: "Attendance", icon: <CoPresentIcon />, path: "/attendance" },
    {
      name: "EmployeeList",
      icon: <FormatListNumberedIcon />,
      path: "/employeelist",
    },
    { name: "Profile", icon: <AccountBoxIcon />, path: "/profile" },
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
    { name: "Profile", icon: <AccountBoxIcon />, path: "/profile" },
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
    { name: "Profile", icon: <AccountBoxIcon />, path: "/profile" },
    { name: "Blog", icon: <BlogIcon />, path: "/blog", isDropdown: true },
    { name: "Todo", icon: <InboxIcon />, path: "/todo" },
  ];

  const routes =
    role === "hr" ? hrRoutes : role === "manager" ? managerRoutes : otherRoutes;

  return (
    <Box sx={{ display: { xs: "none", md: "flex" } }}>
      <CssBaseline />
      <Drawer variant="permanent" open={isOpen}>
        <Box height={50}></Box>
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
                      sx={{
                        opacity: isOpen ? 1 : 0, // Hide text when closed
                      }}
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
                              sx={{ opacity: isOpen ? 1 : 0 }}
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
                              sx={{ opacity: isOpen ? 1 : 0 }}
                            />
                          </ListItemButton>
                        </>
                      ) : (
                        <>
                          <ListItemButton onClick={() => navigate("/referral")}>
                            <ListItemIcon>
                              <Diversity3Icon />
                            </ListItemIcon>
                            <ListItemText
                              primary="Referral System"
                              sx={{ opacity: isOpen ? 1 : 0 }}
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
                              sx={{ opacity: isOpen ? 1 : 0 }}
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
                              sx={{ opacity: isOpen ? 1 : 0 }}
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
                    sx={{ opacity: isOpen ? 1 : 0 }}
                  />
                </ListItemButton>
              )}
            </div>
          ))}
        </List>
        <Divider />
      </Drawer>
    </Box>
  );
}
