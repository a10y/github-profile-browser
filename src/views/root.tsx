import { Box, List, ListItem, Typography } from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import { Header } from "../Header";

export function RootView() {

    // Only show in the user lists page.

    return (
        <Box sx={{my: 4}}>
            <Header />
            <Typography variant="h6">
                Users:
            </Typography>
            <List>
                <ListItem>
                    <Link to="/profiles/a10y">a10y</Link>
                </ListItem>
            </List>
            <Outlet />
        </Box>
    );
}
