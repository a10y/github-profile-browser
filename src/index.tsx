import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom';
import { RootView } from './views/root';
import { ProfileView } from './views/profile/profile';
import { Container } from '@mui/system';
import { createTheme, CssBaseline, GlobalStyles, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from 'react-query';
import { PostView } from './views/post/PostView';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#272822",
    },
    secondary: {
      main: "#f50057",
    }
  },
});

const QUERY_CLIENT = new QueryClient();

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<RootView />}>
    <Route path="/profiles/:id" element={<ProfileView />} />
    <Route path="/posts/:gistId" element={<PostView />} />
  </Route>
));

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <QueryClientProvider client={QUERY_CLIENT}>
        <Container maxWidth="md">
            <RouterProvider router={router} />
        </Container>
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>
);
