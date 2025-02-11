import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion';
import { styled } from '@mui/material/styles';
import {
  AppBar,
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Slider,
  TextField,
  Typography,
  useTheme
} from '@mui/material';
import {
  Home,
  Search,
  Clear,
  PlayArrow,
  Pause,
  SkipPrevious,
  SkipNext,
  VolumeUp,
  VolumeOff,
  Repeat,
  Shuffle,
  Favorite,
  FavoriteBorder,
  Download
} from '@mui/icons-material';

// Styled Components
const GradientBackground = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #6b46c1 0%, #4c1d95 100%)',
  paddingBottom: theme.spacing(12)
}));

const GlassCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.spacing(2),
  boxShadow: 'none'
}));

const GlassAppBar = styled(AppBar)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  boxShadow: 'none',
  borderRadius: '0 0 24px 24px'
}));

const SearchField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    color: 'white',
    '& fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.3)',
      borderRadius: 50,
    },
    '&:hover fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.5)',
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(255, 255, 255, 0.7)',
  },
}));

// Song Card Component
const SongCard = ({ song, onPlay, onDownload }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
    onPlay(song.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <GlassCard>
        <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            component="img"
            src="/placeholder.jpg"
            alt={song.name}
            sx={{ width: 64, height: 64, borderRadius: 2 }}
          />
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1" color="white">
              {song.name}
            </Typography>
            <Typography variant="body2" color="rgba(255, 255, 255, 0.7)">
              {song.artist}
            </Typography>
          </Box>
          <Box>
            <IconButton color="primary" onClick={handlePlay}>
              {isPlaying ? <Pause /> : <PlayArrow />}
            </IconButton>
            <IconButton color="primary" onClick={() => onDownload(song.id)}>
              <Download />
            </IconButton>
          </Box>
        </CardContent>
      </GlassCard>
    </motion.div>
  );
};

// Music Player Component
const MusicPlayer = ({ currentSong, onClose }) => {
  const theme = useTheme();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const audioRef = useRef(null);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
    >
      <Paper
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(12px)',
          py: 2,
          px: 3,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.5)',
        }}
      >
        <Container>
          <Grid container spacing={2} alignItems="center" justifyContent="space-between">
            {/* Song Info */}
            <Grid item xs={12} sm={3} display="flex" alignItems="center" gap={2}>
              <Box
                component="img"
                src={currentSong?.image || '/placeholder.jpg'}
                alt={currentSong?.name}
                sx={{ width: 56, height: 56, borderRadius: 2 }}
              />
              <Box>
                <Typography variant="subtitle1" color="white" noWrap>
                  {currentSong?.name || 'Unknown Song'}
                </Typography>
                <Typography variant="caption" color="rgba(255, 255, 255, 0.7)" noWrap>
                  {currentSong?.artist || 'Unknown Artist'}
                </Typography>
              </Box>
            </Grid>

            {/* Playback Controls */}
            <Grid item xs={12} sm={6} display="flex" flexDirection="column" alignItems="center">
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <IconButton size="small" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  <Shuffle />
                </IconButton>
                <IconButton size="small" sx={{ color: 'white' }}>
                  <SkipPrevious />
                </IconButton>
                <IconButton
                  sx={{
                    color: 'white',
                    bgcolor: 'primary.main',
                    '&:hover': { bgcolor: 'primary.dark' },
                    p: 1.5,
                  }}
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? <Pause fontSize="large" /> : <PlayArrow fontSize="large" />}
                </IconButton>
                <IconButton size="small" sx={{ color: 'white' }}>
                  <SkipNext />
                </IconButton>
                <IconButton size="small" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  <Repeat />
                </IconButton>
              </Box>
              <Box display="flex" alignItems="center" gap={1} width="100%">
                <Typography variant="caption" color="rgba(255, 255, 255, 0.7)">
                  {currentTime ? new Date(currentTime * 1000).toISOString().substr(14, 5) : '0:00'}
                </Typography>
                <Slider
                  size="small"
                  value={currentTime || 0}
                  max={duration || 100}
                  onChange={(_, value) => setCurrentTime(value)}
                  sx={{ color: 'primary.main', flex: 1 }}
                />
                <Typography variant="caption" color="rgba(255, 255, 255, 0.7)">
                  {duration ? new Date(duration * 1000).toISOString().substr(14, 5) : '0:00'}
                </Typography>
              </Box>
            </Grid>

            {/* Volume Control */}
            <Grid item xs={12} sm={3} display="flex" alignItems="center" justifyContent="flex-end" gap={1}>
              <IconButton
                size="small"
                onClick={() => setIsMuted(!isMuted)}
                sx={{ color: 'white', display: { xs: 'none', sm: 'block' } }}
              >
                {isMuted ? <VolumeOff /> : <VolumeUp />}
              </IconButton>
              <Slider
                size="small"
                value={isMuted ? 0 : volume}
                min={0}
                max={1}
                step={0.01}
                onChange={(_, value) => setVolume(value)}
                sx={{ width: 100, color: 'primary.main', display: { xs: 'none', sm: 'block' } }}
              />
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </motion.div>
  );
};

// Main Page Component
const MusicPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [currentSong, setCurrentSong] = useState(null);

  const trendingSongs = [
    { id: 1, name: "Summer Vibes", artist: "DJ Cool", plays: 1500 },
    { id: 2, name: "Midnight Dreams", artist: "Luna Star", plays: 1200 },
    { id: 3, name: "Electric Soul", artist: "Beat Master", plays: 1100 },
    { id: 4, name: "Ocean Waves", artist: "Chill Fox", plays: 900 }
  ];

  const latestSongs = [
    { id: 5, name: "New Horizons", artist: "Future Sound", plays: 500 },
    { id: 6, name: "Urban Jungle", artist: "City Beats", plays: 400 },
    { id: 7, name: "Starlight", artist: "Night Owl", plays: 300 },
    { id: 8, name: "Desert Rose", artist: "Sand Walker", plays: 200 }
  ];

  const handlePlay = (songId) => {
    const song = [...trendingSongs, ...latestSongs].find(s => s.id === songId);
    setCurrentSong(song);
  };
  const navigate = useNavigate();

  const handleDownload = (songId) => {
    console.log('Downloading song:', songId);
  };

  return (
    <GradientBackground sx={{ width: '100%' }}>
      <GlassAppBar position="sticky">
        <Container sx={{ py: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Typography variant="h5" component="h1" color="white" fontWeight="bold">
              Music Hub
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <IconButton 
      sx={{ color: 'white' }} 
      onClick={() => navigate('/')}
    >
      <Home />
    </IconButton>
          </Box>
          <SearchField
            fullWidth
            variant="outlined"
            placeholder="Search songs..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
                </InputAdornment>
              ),
              endAdornment: searchValue && (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={() => setSearchValue('')}
                    sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                  >
                    <Clear />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Container>
      </GlassAppBar>

      <Container sx={{ mt: 4 }}>
        <Typography variant="h6" color="white" sx={{ mb: 2 }}>
          Trending Songs
        </Typography>
        <Grid container spacing={2}>
          {trendingSongs.map((song) => (
            <Grid item xs={12} md={6} key={song.id}>
              <SongCard
                song={song}
                onPlay={handlePlay}
                onDownload={handleDownload}
              />
            </Grid>
          ))}
        </Grid>

        <Typography variant="h6" color="white" sx={{ mb: 2, mt: 4 }}>
          Latest Songs
        </Typography>
        <Grid container spacing={2}>
          {latestSongs.map((song) => (
            <Grid item xs={12} md={6} key={song.id}>
              <SongCard
                song={song}
                onPlay={handlePlay}
                onDownload={handleDownload}
              />
            </Grid>
          ))}
        </Grid>
      </Container>

      <AnimatePresence>
        {currentSong && (
          <MusicPlayer
            currentSong={currentSong}
            onClose={() => setCurrentSong(null)}
          />
        )}
      </AnimatePresence>
    </GradientBackground>
  );
};

export default MusicPage;