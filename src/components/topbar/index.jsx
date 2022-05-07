import React from 'react';

import {
  Link,
  useLocation,
} from 'react-router-dom';

import {
  AppBar,
  Container,
  Typography,
  Toolbar,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';

import logo from '../../assets/logo.png';

// Topbar should not be visible on following pages
const isNotVisibleOn = [
  '/login/admin',
  '/admin',
  '/student',
  '/teacher',
];

function Topbar() {
  const { pathname } = useLocation();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const pages = [
    { title: 'About', link: '/about-us' },
    { title: 'Contact', link: '/contact' },
    { title: 'Announcements', link: '/announcemnts' },
    { title: 'Results', link: '/results' },
    { title: 'Online Tests', link: '/demo-tests' },
  ];
  if (
    (isNotVisibleOn.find((r) => pathname.startsWith(r)))
  ) return <></>;
  return (
    <AppBar position="relative" className="z-10 py-2 bg-white shadow-lg" elevation={4}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/">
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="hts logo"
                className="w-9"
              />
              <Typography variant="h6" color={pathname === '/' ? 'primary' : 'gray'}>Hope Testing Service</Typography>
            </div>
          </Link>
          <div className="flex-grow" />
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="small"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="primary"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                  <Link to={page.link}>
                    <Typography textAlign="center" className="font-bold" color={pathname.startsWith(page.link) ? 'primary' : 'gray'}>{page.title}</Typography>
                  </Link>
                </MenuItem>
              ))}
              <MenuItem key="/login" onClick={handleCloseNavMenu}>
                <Link to="/login">
                  <Typography textAlign="center" className="font-bold" color={pathname.startsWith('/login') ? 'primary' : 'gray'}>Login</Typography>
                </Link>
              </MenuItem>
              <MenuItem key="/signup" onClick={handleCloseNavMenu}>
                <Link to="/signup">
                  <Typography textAlign="center" className="font-bold" color={pathname.startsWith('/signup') ? 'primary' : 'gray'}>Signup</Typography>
                </Link>
              </MenuItem>
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
            {pages.map((page) => (
              <Link to={page.link}>
                <Typography className="mx-3 font-bold" color={pathname.startsWith(page.link) ? 'primary' : 'gray'} variant="body1">
                  {page.title}
                </Typography>
              </Link>
            ))}
            <Link to="/login">
              <Typography className="mx-3 font-bold" color={pathname.startsWith('/login') ? 'primary' : 'gray'} variant="body1">
                Login
              </Typography>
            </Link>
            <Link to="/signup">
              <Typography className="mx-3 font-bold" color={pathname.startsWith('/signup') ? 'primary' : 'gray'} variant="body1">
                Signup
              </Typography>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Topbar;
