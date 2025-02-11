import React, { useEffect, useState, useCallback } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Reusable GradientText Component
const GradientText = ({ children, variant = 'h4', ...props }) => (
  <Typography
    variant={variant}
    sx={{
      color: 'white',
      mb: { xs: 2, sm: 3 },
      fontWeight: 700,
      background: 'linear-gradient(45deg, #fff, #9c27b0)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      color: 'transparent',
      fontSize: {
        xs: '1.5rem',
        sm: '1.75rem',
        md: '2rem',
        lg: '2.25rem',
        xl: '2.5rem',
      },
      ...props.sx,
    }}
    {...props}
  >
    {children}
  </Typography>
);

// Reusable MotionBox Component
const MotionBox = motion(Box);

// SongCard Component
const SongCard = React.memo(({ song, onClick }) => (
  <MotionBox
    onClick={() => onClick(song.id)}
    sx={{
      backgroundColor: '#1a1a1a',
      borderRadius: '16px',
      overflow: 'hidden',
      cursor: 'pointer',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 8px 20px rgba(156, 39, 176, 0.3)',
      },
      transition: 'all 0.3s ease',
    }}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <Box
      sx={{
        position: 'relative',
        paddingTop: '100%', // 1:1 Aspect ratio
        width: '100%',
      }}
    >
      <Box
        component="img"
        src={song.cover || '/default-cover.jpg'}
        alt={`Cover for ${song.title} by ${song.artist}`}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
    </Box>
    <Box
      sx={{
        p: { xs: 1.5, sm: 2 },
        background: 'linear-gradient(to top, #1a1a1a, rgba(26, 26, 26, 0.8))',
        flexGrow: 1,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: 'white',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          fontSize: {
            xs: '0.9rem',
            sm: '1rem',
            md: '1.1rem',
          },
        }}
      >
        {song.title}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: 'rgba(255,255,255,0.7)',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          fontSize: {
            xs: '0.8rem',
            sm: '0.9rem',
          },
        }}
      >
        {song.artist}
      </Typography>
    </Box>
  </MotionBox>
));

// SongCarousel Component
const SongCarousel = React.memo(({ title, songs, onSongClick }) => (
  <Box sx={{ mb: { xs: 4, sm: 6 } }}>
    <GradientText>{title}</GradientText>
    <Swiper
      modules={[Navigation, Pagination, A11y]}
      spaceBetween={16}
      slidesPerView={1.2}
      navigation
      pagination={{ clickable: true }}
      breakpoints={{
        300: { slidesPerView: 1.2 },
        500: { slidesPerView: 1.5 },
        700: { slidesPerView: 2.2 },
        900: { slidesPerView: 3.2 },
        1200: { slidesPerView: 4.2 },
        1536: { slidesPerView: 5.2 },
      }}
      style={{
        padding: '10px',
        '--swiper-navigation-color': '#fff',
        '--swiper-pagination-color': '#9c27b0',
      }}
    >
      {songs.map((song) => (
        <SwiperSlide key={song.id}>
          <SongCard song={song} onClick={onSongClick} />
        </SwiperSlide>
      ))}
    </Swiper>
  </Box>
));

// FeaturedSection Component
const FeaturedSection = () => {
  const [latestSongs, setLatestSongs] = useState([]);
  const [trendingSongs, setTrendingSongs] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchSongs = useCallback(async () => {
    try {
      // Simulated data - replace with actual API calls
      setLatestSongs([
        { id: 1, title: 'Summer Vibes', artist: 'DJ Cool', cover: '/summer-vibes.jpg' },
        { id: 2, title: 'Sunset Groove', artist: 'The Groove', cover: '/sunset-groove.jpg' },
        { id: 3, title: 'Morning Dew', artist: 'DJ Misty', cover: '/morning-dew.jpg' },
        { id: 4, title: 'Beach Party', artist: 'DJ Sunny', cover: '/beach-party.jpg' },
        { id: 5, title: 'Rainy Days', artist: 'The Clouds', cover: '/rainy-days.jpg' },
      ]);

      setTrendingSongs([
        { id: 6, title: 'Night Rhythm', artist: 'The Groove', cover: '/night-rhythm.jpg' },
        { id: 7, title: 'City Lights', artist: 'DJ Neon', cover: '/city-lights.jpg' },
        { id: 8, title: 'Bass Drop', artist: 'DJ Bass', cover: '/bass-drop.jpg' },
        { id: 9, title: 'Euphoria', artist: 'DJ Happy', cover: '/euphoria.jpg' },
        { id: 10, title: 'Chillout', artist: 'DJ Relax', cover: '/chillout.jpg' },
      ]);
    } catch (error) {
      setError('Failed to load songs. Please try again later.');
      console.error('Error fetching songs:', error);
    }
  }, []);

  useEffect(() => {
    fetchSongs();
  }, [fetchSongs]);

  const handleSongClick = useCallback((songId) => {
    navigate(`/player/${songId}`);
  }, [navigate]);

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        background: 'linear-gradient(to bottom, #1a1a1a, #0a0a0a)',
        py: { xs: 3, sm: 4, md: 6 },
        minHeight: '100vh',
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <SongCarousel title="Latest Releases" songs={latestSongs} onSongClick={handleSongClick} />
        <SongCarousel title="Trending Now" songs={trendingSongs} onSongClick={handleSongClick} />
      </Container>
    </Box>
  );
};

export default FeaturedSection;