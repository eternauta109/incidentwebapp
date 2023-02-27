import "./styles.css";
import { useEffect } from "react";
import Login from "./features/Login";
import Landing from "./features/Landing";
import Reports from "./features/Reports";
import Views from "./features/Views";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Route, Routes, useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import { useSelector } from "react-redux";
import { getAuth } from "firebase/auth";
import CssBaseline from "@mui/material/CssBaseline";
import "bootstrap/dist/css/bootstrap.min.css";
import image from "./assets/cinema_image.png";

const theme = createTheme({
  conatainerStyle: {
    borderRadius: 5,
    width: "100%",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundImage: `url(${image})`,
    height: "100%"
  },

  paperContainer: {},
  palette: {
    primary: {
      main: "#ff8f00"
    },
    secondary: {
      main: "#7cb342"
    }
  },
  typography: {
    fontFamily: ["Josefin Sans", "cursive"].join(",")
  }
});

export default function App() {
  const user = useSelector((state) => state.user);
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("auth in app", auth.currentUser);
    if (!auth.currentUser) {
      navigate("/");
    }
  }, [auth.currentUser]);

  return (
    <ThemeProvider theme={theme}>
      <Container style={theme.conatainerStyle} maxWidth={false} sx={{ p: 2 }}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="landing"
            element={auth.currentUser ? <Landing /> : <Login />}
          />
          <Route
            path="reports"
            element={auth.currentUser ? <Reports /> : <Login />}
          />
          <Route
            path="views"
            element={auth.currentUser ? <Views /> : <Login />}
          />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}
