import { Toaster } from 'react-hot-toast';
import AppRoutes from './routes/route';
import { Box } from '@mui/material';

function App() {
  return (
    <Box sx={{
      position: "relative",
      background: 'linear-gradient(to bottom, #FAF9F6, #F0F1F3)',
    }}>
      <AppRoutes />
      <Toaster />
    </Box>
  );
}

export default App;
