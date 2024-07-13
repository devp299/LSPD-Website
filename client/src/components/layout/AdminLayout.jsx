import { Box, Drawer, Grid, IconButton, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import {Dashboard as DashboardIcon, Close as CloseIcon, Menu as MenuIcon, ManageAccounts as ManageAccountsIcon, Groups as GroupsIcon, Message as MessageIcon, ExitToApp as ExitToAppIcon} from '@mui/icons-material'
import { useLocation, Link as LinkComponent} from 'react-router-dom'
import styled from '@emotion/styled'
// import { useDispatch, useSelector } from 'react-redux'

const Link = styled(LinkComponent)`
    text-decoration: none;
    border-radius: 2rem;
    padding: 1rem 1rem;
    color: black;
    &:hover {
        color: rgba(0,0,0,0.54);
    }
`;

const adminTabs = [
    {
        name: "DashBoard",
        path: "/admin",
        icon: <DashboardIcon />  
    },
    {
        name: "News & Announcements",
        path: "/admin/news",
        icon: <ManageAccountsIcon />  
    },
    {
        name: "Careers",
        path: "/admin/career",
        icon: <GroupsIcon />  
    },
    {
        name: "Wanted List",
        path: "/admin/list",
        icon: <GroupsIcon />  
    },
]

const SideBar = ({ w="100%" }) => {
    const location = useLocation();
    // const dispatch = useDispatch();

    // const logoutHandler = () => {
    //     dispatch(adminLogout())
    // };
    return (
        <Stack width={w} direction={"column"} p={"3rem"} spacing={"3rem"}>
            <Typography  position={"fixed"}  fontFamily={"Russo One"} variant='h5' textTransform={"uppercase"}>LSPD</Typography>
            <Stack  position={"fixed"}  spacing={"1rem"}>
                {adminTabs.map((tab) => (
                    <Link 
                        key={tab.path} 
                        to={tab.path}
                        sx={ 
                            "location.pathname === tab.path" && {
                                bgcolor: "#1c1c1c",
                                color: "white",
                                ":hover" : { color : "white" },
                            }
                        }
                    >
                        <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
                            {tab.icon}
                            <Typography fontFamily={"Russo One"} >{tab.name}</Typography>
                        </Stack>
                    </Link>
                ))}
                <Link>
                    <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
                        <ExitToAppIcon />
                        <Typography fontFamily={"Russo One"} >Logout</Typography>
                    </Stack>
                </Link>
            </Stack>
        </Stack>

    );
};


const AdminLayout = ({ children }) => {
    // const {isAdmin} = useSelector((state) => state.auth);

    const [isMobile,setIsMobile] = useState(false);
    const handleMobile = () => setIsMobile(!isMobile);
    const handleClose = () => setIsMobile(false);

    // if(!isAdmin) return <Navigate to="/admin" />
  return (
    <Grid container minHeight={"100vh"}>
        <Box
          sx={{
            display: { xs: "block", md: "none"},
            position: "fixed",
            right: "1rem",
            top: "1rem",
          }}
        >
            <IconButton onClick={handleMobile}>
                {
                    isMobile ? <CloseIcon /> : <MenuIcon />
                }
            </IconButton>
        </Box>
        <Grid
          item
          md={4}
          lg={3}
          sx={{
            display: {
                xs: "none",
                md: "block"
            }
          }}
        >
            <SideBar/>
        </Grid>
        <Grid
          item
          xs={12}
          md={8}
          lg={9}
          sx={{
            bgcolor: "rgba(247,247,247,1)",
          }}
        >
            {children}
        </Grid>
        <Drawer open={isMobile} onClose={handleClose}>
          <SideBar w="50vw"/>
        </Drawer>
    </Grid>
  )
}

export default AdminLayout
