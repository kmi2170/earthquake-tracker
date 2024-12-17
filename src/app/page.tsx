import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import Footer from '../components/Footer';
import Header from '../components/Header';
import MapTable from '../components/MapTable';

const Page = () => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        minHeight: '100vh',
        backgroundImage:
          'linear-gradient(to bottom, rgb(255,255,255,1.0), rgba(218,165,32,0.1))',
      }}
    >
      <Container maxWidth={false} sx={{ maxWidth: '2000px' }}>
        <Header />
        <MapTable />
        <Footer />
      </Container>
    </Box>
  );
};

export default Page;
