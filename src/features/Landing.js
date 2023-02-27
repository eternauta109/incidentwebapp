import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Stack,
  ListItem,
  List,
  Container,
  Divider,
  styled,
  Box,
  Typography,
  Button
} from "@mui/material";

const ButtonPlus = styled(Button)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  width: 250,
  backgroundColor: "green",
  color: "white",
  opacity: 0.9,
  height: 60,
  lineHeight: "20px"
}));

export default function Landing() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  window.scrollTo(0, 0);

  return (
    <Container
      maxWidth="xs"
      sx={{
        width: "100%",
        height: "900px"
      }}
    >
      <Box sx={{ backgroundColor: "orange", opacity: 1, p: 1, mb: 2 }}>
        <Typography align="center">Welocome {user.name}</Typography>
      </Box>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
        justifyContent="center"
        alignItems="center"
      >
        <ButtonPlus variant="contained" onClick={() => navigate("/reports")}>
          Add Report
        </ButtonPlus>

        <ButtonPlus
          variant="contained"
          onClick={() => navigate("/views", { state: { user: { ...user } } })}
        >
          View/Modify Report
        </ButtonPlus>

        {/*  <Item elevation={9}>Charts analisys</Item> */}
      </Stack>
    </Container>
  );
}
