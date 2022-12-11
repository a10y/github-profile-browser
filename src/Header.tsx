import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

export function Header() {

    const { pathname } = useLocation();

    return (
        <Box>
            <AppBar about="Andrew Duffy" position="static">
                <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <Link to="/">Home</Link>
                </Typography>
                </Toolbar>
            </AppBar>
            <Typography variant="h2">
                Welcome to <Typography variant="h3" display="inline" fontFamily={"monospace"}>{pathname}</Typography>
            </Typography>
        </Box>
    );
}