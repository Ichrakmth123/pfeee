import * as React from "react";
import GlobalStyles from "@mui/joy/GlobalStyles";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";

import Chip from "@mui/joy/Chip";
import Divider from "@mui/joy/Divider";
import IconButton from "@mui/joy/IconButton";
import Input from "@mui/joy/Input";

import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton, { listItemButtonClasses } from "@mui/joy/ListItemButton";
import ListItemContent from "@mui/joy/ListItemContent";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import QuestionAnswerRoundedIcon from "@mui/icons-material/QuestionAnswerRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";

import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";

import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import BrightnessAutoRoundedIcon from "@mui/icons-material/BrightnessAutoRounded";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import ColorSchemeToggle from "./ColorSchemeToggle";
import { closeSidebar } from "./utils";
import { CssVarsProvider } from "@mui/joy/styles";
import { useDispatch, useSelector } from "react-redux";
import { getBoards } from "../../Services/boardsService";
import { Link } from 'react-router-dom';


function Toggler({ defaultExpanded = false, renderToggle, children }) {
  const [open, setOpen] = React.useState(defaultExpanded);

  return (
    <>
      {renderToggle({ open, setOpen })}
      <Box
        sx={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "0.2s ease",
          "& > *": {
            overflow: "hidden",
          },
        }}
      >
        {children}
      </Box>
    </>
  );
}

export default function Sidebar() {
  const userInfo = useSelector((state) => state.user.userInfo);
  const name = useSelector((state) => state.user.userInfo.name);
  const email = useSelector((state) => state.user.userInfo.email);
  const color = useSelector((state) => state.user.userInfo.color);
  const { _id: userId } = userInfo;
  const dispatch = useDispatch();
  const boardsData = useSelector((state) => state.boards.boardsData);
  const info = useSelector((state) => state.user.userInfo);

  console.log(boardsData, "this is boards data");

  const [selectedItemId, setSelectedItemId] = React.useState(null);

  const handleItemClick = (id) => {
    setSelectedItemId(id);
  };
  React.useEffect(() => {
    getBoards(true, dispatch);
  }, [dispatch]);
  return (
    <Sheet
    className="Sidebar"
    sx={{
      position: { xs: "fixed", md: "fixed" },
      transform: {
        xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))",
        md: "none",
      },
      transition: "transform 0.4s, width 0.4s",
      zIndex: 10000,
      height: "100dvh",
      width: "var(--Sidebar-width)",
      top: 0,
      p: 2,
      flexShrink: 0,
      display: "flex",
      flexDirection: "column",
      gap: 2,
      borderRight: "1px solid",
      borderColor: "divider",
      paddingBottom: "50px",
      marginTop: "47px",
      backgroundColor:"#02294F"
    }}
  >
      <GlobalStyles
        styles={(theme) => ({
          ":root": {
            "--Sidebar-width": "220px",
            [theme.breakpoints.up("xs")]: {
              "--Sidebar-width": "240px",
            },
          },
        })}
      />
      <Box
        className="Sidebar-overlay"
        sx={{
          position: "fixed",
          zIndex: 9998,
          top: 0,
          left: 0,
          width: "150vw",
          height: "100vh",
          opacity: "var(--SideNavigation-slideIn)",
          backgroundColor: "var(--joy-palette-background-backdrop)",
          transition: "opacity 0.4s",
          transform: {
            xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))",
            lg: "translateX(-100%)",
          },
        }}
        onClick={() => closeSidebar()}
      />
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        {/* <IconButton variant="soft" color="primary" size="sm">
          <BrightnessAutoRoundedIcon />
        </IconButton> */}
        {/* <Typography level="title-lg">Acme Co.</Typography> */}
        <CssVarsProvider>
          {/* <ColorSchemeToggle sx={{ ml: "auto" }} /> */}
        </CssVarsProvider>
      </Box>
      {/* <Input
        size="sm"
        startDecorator={<SearchRoundedIcon />}
        placeholder="Search"
      /> */}
      <Box
        sx={{
          minHeight: 0,
          overflow: "hidden auto",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5,
          },
        }}
      >
        <List
          size="sm"
          sx={{
            gap: 1,
            "--List-nestedInsetStart": "30px",
            "--ListItem-radius": (theme) => theme.vars.radius.sm,
          }}
        >
          <ListItem>
            <ListItemButton onClick={() => handleItemClick('workspaces')}
          selected={selectedItemId === 'workspaces'}>
              <HomeRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm" component={Link}
        to="/workspace">Workspaces</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton onClick={() => handleItemClick('boards')}
          selected={selectedItemId === 'boards'}>
              <DashboardRoundedIcon />
              <ListItemContent >
                <Typography level="title-sm"component={Link}
        to="/boards"
              href="/boards">All Boards</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>
{/*        
          <ListItem>
            <ListItemButton onClick={() => handleItemClick('orders')}
          selected={selectedItemId === 'orders'}>
              <ShoppingCartRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm">Orders</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem> */}

          <ListItem nested>
            <Toggler
              renderToggle={({ open, setOpen }) => (
                <ListItemButton onClick={() => setOpen(!open)}>
                  <AssignmentRoundedIcon />
                  <ListItemContent>
                    <Typography level="title-sm">Boards</Typography>
                  </ListItemContent>
                  <KeyboardArrowDownIcon
                    sx={{ transform: open ? "rotate(180deg)" : "none" }}
                  />
                </ListItemButton>
              )}
            >
              <List sx={{ gap: 0.5 }}>
                {Array.isArray(boardsData) &&
                  boardsData?.map((item) => {
                    return (
                      
                      <ListItem sx={{ mt: 0.5 }}>
                        
                        <img
                          src={item?.backgroundImageLink}
                          alt="board image background"
                          loading="lazy"
                         style={{width:30,borderRadius:"100px"}}
                        />
                        <ListItemButton>{item.title}</ListItemButton>
                      </ListItem>
                    );
                  })}
              </List>
            </Toggler>
          </ListItem>

          <ListItem>
            <ListItemButton
              role="menuitem"
              component="a"
              href="/chat"
            >
              <QuestionAnswerRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm">Messages</Typography>
              </ListItemContent>
              <Chip size="sm" color="primary" variant="solid">
                4
              </Chip>
            </ListItemButton>
          </ListItem>

          {info?.role==="admin"&&<ListItem nested>
            <Toggler
              renderToggle={({ open, setOpen }) => (
                <ListItemButton onClick={() => setOpen(!open)}>
                  <GroupRoundedIcon />
                  <ListItemContent>
                    <Typography level="title-sm">Users</Typography>
                  </ListItemContent>
                  <KeyboardArrowDownIcon
                    sx={{ transform: open ? "rotate(180deg)" : "none" }}
                  />
                </ListItemButton>
              )}
            >
              <List sx={{ gap: 0.5 }}>
                <ListItem sx={{ mt: 0.5 }}>
                  <ListItemButton
                    role="menuitem"
                    component="a"
                    href="/create"
                  >
                    Create a new user
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton
                  role="menuitem"
                    component="a"
                    href="/manage"
                  
                  >Manage Users</ListItemButton>
                </ListItem>
                
              </List>
            </Toggler>
          </ListItem>}
        </List>

        <List
          size="sm"
          sx={{
            mt: "auto",
            flexGrow: 0,
            "--ListItem-radius": (theme) => theme.vars.radius.sm,
            "--List-gap": "8px",
            mb: 2,
          }}
        >
          <ListItem sx={{ marginTop: "30px" }}>
            <ListItemButton role="menuitem"
              component="a"
              href="/editprofile">
              <SettingsRoundedIcon />
              Settings
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
      <Divider />
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
      <Avatar sx={{ width: 32, height: 32, bgcolor: color, fontSize: '0.875rem', fontWeight: '800' }}>
							{name[0]}
						</Avatar>
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography level="title-sm">{name}</Typography>
          <Typography level="body-xs">{email}</Typography>
        </Box>
        <IconButton size="sm" variant="plain" color="neutral">
          <LogoutRoundedIcon />
        </IconButton>
      </Box>
    </Sheet>
  );
}