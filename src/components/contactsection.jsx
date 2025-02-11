import React from 'react';
import { Box, Container, Typography, Grid, TextField, Button } from '@mui/material';
import { motion } from 'framer-motion';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

const MotionBox = motion(Box);

function ContactSection() {
 const contactInfo = [
   {
     icon: <LocationOnIcon sx={{ fontSize: 40 }} />,
     title: "Visit Us",
     details: "123 Music Street, Studio City, CA 90028"
   },
   {
     icon: <EmailIcon sx={{ fontSize: 40 }} />,
     title: "Email Us",
     details: "contact@loopbass.com"
   },
   {
     icon: <PhoneIcon sx={{ fontSize: 40 }} />,
     title: "Call Us",
     details: "+1 (555) 123-4567"
   }
 ];

 return (
   <Box
     sx={{
       background: 'linear-gradient(to bottom, #1a1a1a, #0a0a0a)',
       py: { xs: 8, md: 12 },
       color: 'white',
     }}
   >
     <Container maxWidth="xl">
       <Grid container spacing={6}>
         {/* Contact Form Section */}
         <Grid item xs={12} md={6}>
           <MotionBox
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.6 }}
           >
             <Typography
               variant="h2"
               sx={{
                 mb: 4,
                 fontWeight: 700,
                 fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                 background: 'linear-gradient(45deg, #fff, #9c27b0)',
                 backgroundClip: 'text',
                 WebkitBackgroundClip: 'text',
                 color: 'transparent',
               }}
             >
               Get In Touch
             </Typography>

             <Typography
               variant="body1"
               sx={{
                 mb: 4,
                 color: 'rgba(255,255,255,0.7)',
                 fontSize: { xs: '1rem', md: '1.1rem' },
                 lineHeight: 1.8,
               }}
             >
               Whether you're an artist looking to join our label, a fan with questions, or a business seeking collaboration - we're here to help.
             </Typography>

             <Box
               component="form"
               sx={{
                 '& .MuiTextField-root': {
                   mb: 2,
                 },
                 '& .MuiInputBase-root': {
                   color: 'white',
                 },
                 '& .MuiOutlinedInput-root': {
                   '& fieldset': {
                     borderColor: 'rgba(156, 39, 176, 0.3)',
                   },
                   '&:hover fieldset': {
                     borderColor: 'rgba(156, 39, 176, 0.5)',
                   },
                   '&.Mui-focused fieldset': {
                     borderColor: '#9c27b0',
                   },
                 },
                 '& .MuiInputLabel-root': {
                   color: 'rgba(255,255,255,0.7)',
                 },
               }}
             >
               <TextField
                 fullWidth
                 label="Name"
                 variant="outlined"
                 required
               />
               <TextField
                 fullWidth
                 label="Email"
                 variant="outlined"
                 type="email"
                 required
               />
               <TextField
                 fullWidth
                 label="Subject"
                 variant="outlined"
                 required
               />
               <TextField
                 fullWidth
                 label="Message"
                 variant="outlined"
                 multiline
                 rows={4}
                 required
               />
               <Button
                 variant="contained"
                 size="large"
                 sx={{
                   mt: 2,
                   bgcolor: '#9c27b0',
                   '&:hover': {
                     bgcolor: '#7b1fa2',
                   },
                   px: 4,
                   py: 1.5,
                 }}
               >
                 Send Message
               </Button>
             </Box>
           </MotionBox>
         </Grid>

         {/* Contact Info Section */}
         <Grid item xs={12} md={6}>
           <Grid container spacing={3}>
             {contactInfo.map((info, index) => (
               <Grid item xs={12} key={index}>
                 <MotionBox
                   initial={{ opacity: 0, x: 20 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   transition={{ duration: 0.6, delay: index * 0.2 }}
                   sx={{
                     p: 4,
                     backgroundColor: 'rgba(156, 39, 176, 0.1)',
                     borderRadius: '16px',
                     border: '1px solid rgba(156, 39, 176, 0.2)',
                     display: 'flex',
                     alignItems: 'center',
                     gap: 3,
                     '&:hover': {
                       backgroundColor: 'rgba(156, 39, 176, 0.15)',
                       transform: 'translateY(-5px)',
                       transition: 'all 0.3s ease',
                     },
                   }}
                 >
                   <Box sx={{ color: '#9c27b0' }}>
                     {info.icon}
                   </Box>
                   <Box>
                     <Typography
                       variant="h6"
                       sx={{
                         mb: 1,
                         fontWeight: 600,
                       }}
                     >
                       {info.title}
                     </Typography>
                     <Typography
                       variant="body1"
                       sx={{
                         color: 'rgba(255,255,255,0.7)',
                       }}
                     >
                       {info.details}
                     </Typography>
                   </Box>
                 </MotionBox>
               </Grid>
             ))}

             {/* Social Links or Additional Info */}
             <Grid item xs={12}>
               <MotionBox
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.6, delay: 0.6 }}
                 sx={{
                   mt: 3,
                   p: 4,
                   backgroundColor: 'rgba(156, 39, 176, 0.1)',
                   borderRadius: '16px',
                   border: '1px solid rgba(156, 39, 176, 0.2)',
                   textAlign: 'center',
                 }}
               >
                 {/* <Typography
                   variant="h6"
                   sx={{
                     mb: 2,
                     fontWeight: 600,
                   }}
                 >
                   Demo Submissions
                 </Typography>
                 <Typography
                   variant="body1"
                   sx={{
                     color: 'rgba(255,255,255,0.7)',
                     lineHeight: 1.8,
                   }}
                 >
                   For demo submissions, please use the form above and include links to your work. We listen to every submission and will contact you if there's a potential fit.
                 </Typography> */}
                 <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                   <Button
                     component="a"
                     href="https://www.facebook.com"
                     target="_blank"
                     rel="noopener noreferrer"
                     sx={{
                       color: 'white',
                       backgroundColor: '#3b5998',
                       '&:hover': { backgroundColor: '#2d4373' },
                     }}
                   >
                     <i className="fab fa-facebook-f"></i>
                   </Button>
                   <Button
                     component="a"
                     href="https://www.twitter.com"
                     target="_blank"
                     rel="noopener noreferrer"
                     sx={{
                       color: 'white',
                       backgroundColor: '#1DA1F2',
                       '&:hover': { backgroundColor: '#0a95dd' },
                     }}
                   >
                     <i className="fab fa-twitter"></i>
                   </Button>
                   <Button
                     component="a"
                     href="https://www.instagram.com"
                     target="_blank"
                     rel="noopener noreferrer"
                     sx={{
                       color: 'white',
                       backgroundColor: '#E1306C',
                       '&:hover': { backgroundColor: '#ad1457' },
                     }}
                   >
                     <i className="fab fa-instagram"></i>
                   </Button>
                 </Box>

               </MotionBox>
             </Grid>
           </Grid>
         </Grid>
       </Grid>
     </Container>
   </Box>
 );
}

export default ContactSection;