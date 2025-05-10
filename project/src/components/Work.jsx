import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ArrowRight, Code, Palette, Monitor, Database, ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX, Maximize, X, Check, SkipForward, SkipBack, Download, Share2, Heart, Bookmark, Sparkles, Zap } from 'lucide-react';

export function Work() {
  const [filter, setFilter] = useState('all');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showPlaybackOptions, setShowPlaybackOptions] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [videoQuality, setVideoQuality] = useState('Auto');
  const [showQualityOptions, setShowQualityOptions] = useState(false);
  const [activeTab, setActiveTab] = useState('details');

  const videoRef = useRef(null);
  const modalRef = useRef(null);
  const videoContainerRef = useRef(null);
  const volumeSliderRef = useRef(null);
  const playbackOptionsRef = useRef(null);
  const qualityOptionsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('work-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) closeProjectDetails();
      if (volumeSliderRef.current && !volumeSliderRef.current.contains(event.target) && showVolumeSlider) setShowVolumeSlider(false);
      if (playbackOptionsRef.current && !playbackOptionsRef.current.contains(event.target) && showPlaybackOptions) setShowPlaybackOptions(false);
      if (qualityOptionsRef.current && !qualityOptionsRef.current.contains(event.target) && showQualityOptions) setShowQualityOptions(false);
    };

    if (selectedProject !== null || showVolumeSlider || showPlaybackOptions || showQualityOptions) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [selectedProject, showVolumeSlider, showPlaybackOptions, showQualityOptions]);

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      const updateTime = () => { setCurrentTime(video.currentTime); setDuration(video.duration); };
      video.addEventListener('timeupdate', updateTime);
      video.addEventListener('play', () => setIsPlaying(true));
      video.addEventListener('pause', () => setIsPlaying(false));
      video.addEventListener('volumechange', () => setVolume(video.volume));
      video.addEventListener('ratechange', () => setPlaybackRate(video.playbackRate));
      document.addEventListener('fullscreenchange', () => setIsFullscreen(document.fullscreenElement !== null));
      return () => {
        video.removeEventListener('timeupdate', updateTime);
        video.removeEventListener('play', () => setIsPlaying(true));
        video.removeEventListener('pause', () => setIsPlaying(false));
        video.removeEventListener('volumechange', () => setVolume(video.volume));
        video.removeEventListener('ratechange', () => setPlaybackRate(video.playbackRate));
        document.removeEventListener('fullscreenchange', () => setIsFullscreen(document.fullscreenElement !== null));
      };
    }
  }, [selectedProject]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedProject === null || !videoRef.current) return;
      switch (e.key) {
        case ' ': e.preventDefault(); togglePlay(); break;
        case 'ArrowRight': videoRef.current.currentTime += 10; break;
        case 'ArrowLeft': videoRef.current.currentTime -= 10; break;
        case 'ArrowUp': videoRef.current.volume = Math.min(1, videoRef.current.volume + 0.1); setVolume(videoRef.current.volume); break;
        case 'ArrowDown': videoRef.current.volume = Math.max(0, videoRef.current.volume - 0.1); setVolume(videoRef.current.volume); break;
        case 'm': toggleMute(); break;
        case 'f': toggleFullscreen(); break;
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject]);

  const filters = [
    { id: 'all', label: 'All Projects', icon: Monitor },
    { id: 'frontend', label: 'Frontend', icon: Palette },
    { id: 'fullstack', label: 'Full Stack', icon: Code },
    { id: 'backend', label: 'Backend', icon: Database },
    { id: 'figma', label: 'Figma Designs', icon: Palette },
  ];

  const projects = [


  
     // Frontend routes
    {
      title: 'Shopsy Website Clone',
      role: 'Frontend Developer',
      description: 'A static Shopsy website clone built using HTML and CSS, featuring an auto-scrolling, hover effects, and a visually appealing traditional design.',
      image: 'https://ik.imagekit.io/rbdwisvez/Screenshot%202025-04-05%20131921.png?updatedAt=1743941619190',
      category: 'frontend',
      technologies: ['HTML', 'CSS'],
      features: ['3d animation', 'Hover effects', 'auto-scrolling', 'Clean layout'],
      links: { live: 'https://shopsy-tcj.netlify.app/', github: 'https://github.com/aditya-raulji/Clones' },
      detailedDescription: 'A static Shopsy website clone built using HTML and CSS, featuring an auto-scrolling, hover effects, and a visually appealing traditional design.',
      keyFeatures: ['Auto-scrolling', 'Hover effects', 'Traditional design'],
      codeSnippet: '// HTML/CSS clone code here'
    },
    {
      title: 'Amazon Website Clone',
      role: 'Frontend Developer',
      description: 'A static Amazon website clone built using HTML and CSS, featuring an auto-scrolling, hover effects, and a visually appealing traditional design.',
      image: 'https://ik.imagekit.io/rbdwisvez/Screenshot%202025-04-06%20172328.png?updatedAt=1743940684410',
      category: 'frontend',
      technologies: ['HTML', 'CSS'],
      features: ['Auto-scrolling', 'Hover effects', 'Traditional design'],
      links: { live: 'https://adityaamazons.netlify.app/', github: 'https://github.com/aditya-raulji/Clones/tree/main/Amazon' },
      detailedDescription: 'A static Amazon website clone built using HTML and CSS, featuring an auto-scrolling, hover effects, and a visually appealing traditional design.',
      keyFeatures: ['Auto-scrolling', 'Hover effects', 'Traditional design'],
      codeSnippet: '// HTML/CSS clone code here'
    },
    {
      title: 'Cricket Website Clone',
      role: 'Frontend Developer',
      description: 'A static Cricket website clone built using HTML and CSS, featuring a clean layout, and a responsive design for a seamless browsing experience.',
      image: 'https://ik.imagekit.io/rbdwisvez/Screenshot%202025-04-06%20172359.png?updatedAt=1743940679709',
      category: 'frontend',
      technologies: ['HTML', 'CSS'],
      features: ['Clean layout', 'Responsive design', 'Seamless browsing'],
      links: { live: 'https://adityacricket.netlify.app/', github: 'https://github.com/aditya-raulji/Clones/tree/main/Cricket' },
      detailedDescription: 'A static Cricket website clone built using HTML and CSS, featuring a clean layout, and a responsive design for a seamless browsing experience.',
      keyFeatures: ['Clean layout', 'Responsive', 'User-friendly'],
      codeSnippet: '// Cricket clone code here'
    },
    {
      title: 'Spotify Website Clone',
      role: 'Frontend Developer',
      description: 'A static Spotify website clone built using HTML and CSS, featuring a structured, responsive layout, and an intuitive user interface for easy navigation.',
      image: 'https://ik.imagekit.io/rbdwisvez/Screenshot%202025-04-06%20172502.png?updatedAt=1743940680223',
      category: 'frontend',
      technologies: ['HTML', 'CSS'],
      features: ['Structured layout', 'Responsive design', 'Intuitive UI'],
      links: { live: 'https://adityaspotify.netlify.app/', github: 'https://github.com/aditya-raulji/Clones/tree/main/Spotify' },
      detailedDescription: 'A static Spotify website clone built using HTML and CSS, featuring a structured, responsive layout, and an intuitive user interface for easy navigation.',
      keyFeatures: ['Structured layout', 'Responsive', 'Navigation'],
      codeSnippet: '// Spotify clone code here'
    },
    {
      title: 'Netflix Clone',
      role: 'Frontend Developer',
      description: 'A static Netflix UI clone built using HTML and CSS, featuring a dark-themed design, movie categories, and a responsive layout for an immersive experience.',
      image: 'https://ik.imagekit.io/rbdwisvez/Screenshot%202025-04-06%20172606.png?updatedAt=1743940686340',
      category: 'frontend',
      technologies: ['HTML', 'CSS'],
      features: ['Dark theme', 'Movie categories', 'Responsive layout'],
      links: { live: 'https://adityanetfli.netlify.app/', github: 'https://github.com/aditya-raulji/Clones/tree/main/netflix' },
      detailedDescription: 'A static Netflix UI clone built using HTML and CSS, featuring a dark-themed design, movie categories, and a responsive layout for an immersive experience.',
      keyFeatures: ['Dark theme', 'Categories', 'Immersive'],
      codeSnippet: '// Netflix clone code here'
    },
    {
      title: 'Youtube Clone',
      role: 'Frontend Developer',
      description: 'A static YouTube UI clone built using HTML and CSS, featuring a structured video layout, sidebar navigation, and hover effects for an engaging user experience.',
      image: 'https://ik.imagekit.io/rbdwisvez/Screenshot%202025-04-06%20172649.png?updatedAt=1743940685312',
      category: 'frontend',
      technologies: ['HTML', 'CSS'],
      features: ['Video layout', 'Sidebar navigation', 'Hover effects'],
      links: { live: 'https://adityayoutube.netlify.app/', github: 'https://github.com/aditya-raulji/Clones/tree/main/Youtube' },
      detailedDescription: 'A static YouTube UI clone built using HTML and CSS, featuring a structured video layout, sidebar navigation, and hover effects for an engaging user experience.',
      keyFeatures: ['Video layout', 'Sidebar', 'Engaging'],
      codeSnippet: '// YouTube clone code here'
    },
    {
      title: 'Ludo Game',
      role: 'Frontend Developer',
      description: 'A static Ludo game UI built using HTML and CSS, showcasing a colorful board, player tokens, and a visually appealing design without gameplay functionality.',
      image: 'https://ik.imagekit.io/rbdwisvez/Screenshot%202025-04-06%20172714.png?updatedAt=1743940674833',
      category: 'frontend',
      technologies: ['HTML', 'CSS'],
      features: ['Colorful board', 'Player tokens', 'Visual design'],
      links: { live: 'https://adityaludo.netlify.app/', github: 'https://github.com/aditya-raulji/Clones/tree/main/ludo' },
      detailedDescription: 'A static Ludo game UI built using HTML and CSS, showcasing a colorful board, player tokens, and a visually appealing design without gameplay functionality.',
      keyFeatures: ['Colorful board', 'Tokens', 'Appealing design'],
      codeSnippet: '// Ludo UI code here'
    },
    {
      title: 'Chess Game',
      role: 'Frontend Developer',
      description: 'A static Chess game UI built using HTML and CSS, featuring a classic board design and piece layout for a visually accurate representation.',
      image: 'https://ik.imagekit.io/rbdwisvez/Screenshot%202025-04-06%20173116.png?updatedAt=1743941051609',
      category: 'frontend',
      technologies: ['HTML', 'CSS'],
      features: ['Classic board', 'Piece layout', 'Visual accuracy'],
      links: { live: 'https://adityachess.netlify.app/', github: 'https://github.com/aditya-raulji/Clones/tree/main/Chess' },
      detailedDescription: 'A static Chess game UI built using HTML and CSS, featuring a classic board design and piece layout for a visually accurate representation.',
      keyFeatures: ['Classic board', 'Piece layout', 'Accurate design'],
      codeSnippet: '// Chess UI code here'
    },
    {
      title: 'Calculator',
      role: 'Frontend Developer',
      description: 'A functional calculator built using HTML, CSS, and JavaScript, supporting basic arithmetic operations with a simple and user-friendly interface.',
      image: 'https://ik.imagekit.io/rbdwisvez/Screenshot%202025-04-06%20173143.png?updatedAt=1743941051103',
      category: 'frontend',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      features: ['Arithmetic operations', 'User-friendly', 'Simple interface'],
      links: { live: 'https://adityacalculators.netlify.app/', github: 'https://github.com/aditya-raulji/Clones/tree/main/calculator' },
      detailedDescription: 'A functional calculator built using HTML, CSS, and JavaScript, supporting basic arithmetic operations with a simple and user-friendly interface.',
      keyFeatures: ['Arithmetic', 'User-friendly', 'Simple'],
      codeSnippet: '// Calculator JS code here'
    },
    {
      title: 'Superover Clone',
      role: 'Frontend Developer',
      description: 'A functional Superover built using HTML, CSS, and JavaScript, supporting basic runs operations with a simple and user-friendly interface.',
      image: 'https://ik.imagekit.io/rbdwisvez/Screenshot%202025-04-06%20173223.png?updatedAt=1743941054039',
      category: 'frontend',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      features: ['Runs operations', 'Simple interface', 'User-friendly'],
      links: { live: 'https://adityasuperover.netlify.app/', github: 'https://github.com/aditya-raulji/Clones/tree/main/Superover' },
      detailedDescription: 'A functional Superover built using HTML, CSS, and JavaScript, supporting basic runs operations with a simple and user-friendly interface.',
      keyFeatures: ['Runs', 'Simple', 'User-friendly'],
      codeSnippet: '// Superover JS code here'
    },
    {
      title: 'Sudoku',
      role: 'Frontend Developer',
      description: 'A functional Sudoku built using HTML, CSS, and JavaScript, with a simple and user-friendly interface.',
      image: 'https://ik.imagekit.io/rbdwisvez/Screenshot%202025-04-06%20173319.png?updatedAt=1743941051087',
      category: 'frontend',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      features: ['Sudoku grid', 'Simple interface', 'User-friendly'],
      links: { live: 'https://adityasudoku.netlify.app/', github: 'https://github.com/aditya-raulji/Clones/tree/main/sudoku' },
      detailedDescription: 'A functional Sudoku built using HTML, CSS, and JavaScript, with a simple and user-friendly interface.',
      keyFeatures: ['Sudoku grid', 'Simple', 'User-friendly'],
      codeSnippet: '// Sudoku JS code here'
    },

      // full stack
      {
        title: 'Care Slotter',
        role: 'Full-Stack Developer',
        description: 'CareSlotter is a seamless doctor appointment booking system that connects patients with healthcare professionals in real time.',
        image: 'https://ik.imagekit.io/rbdwisvez/Screenshot%202025-04-06%20191459.png?updatedAt=1743947378214',
        videoUrl: 'https://ik.imagekit.io/rbdwisvez/CareSlotter%20Website%20(1).mp4?updatedAt=1743958481056',
        category: 'fullstack',
        technologies: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'JWT', 'ClosedPr API'],
        features: ['Secure scheduling', 'Teleconsultation', 'Automated reminders', 'Admin dashboard'],
        links: {
          live: 'https://care-slotter-doctor-appointment.onrender.com',
          github: 'https://github.com/aditya-raulji/care_slotter',
          ClosedPr: 'https://github.com/codinggita/care_slotter/pulls?q=is%3Apr+is%3Aclosed'
        },
        detailedDescription: 'CareSlotter Blogs is a seamless doctor appointment booking system that connects patients with healthcare professionals in real time. It offers secure scheduling, teleconsultation options, and an intuitive user experience for clinics and hospitals. With features like automated reminders and an admin dashboard, CareSlotter Blog enhances efficiency in healthcare management.',
        keyFeatures: ['Real-time Booking', 'Teleconsultation', 'Admin Dashboard', 'Reminders'],
        codeSnippet: '// Blog backend API code here'
      },
      {
        title: 'Resume Builder',
        role: 'Full-Stack Developer',
        description: 'A modern resume builder website that helps users create professional, ATS-friendly resumes effortlessly.',
        image: 'https://ik.imagekit.io/rbdwisvez/Screenshot%202025-04-06%20151720.png?updatedAt=1743940333293',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4',
        category: 'fullstack',
        technologies: ['MongoDB', 'React.js', 'Node.js'],
        features: ['Customizable templates', 'Real-time previews', 'ATS-friendly', 'User-friendly'],
        links: {
          live: 'https://resume-builder-ar.onrender.com',
          github: 'https://github.com/aditya-raulji/Resume-builder'
        },
        detailedDescription: 'A modern resume builder website that helps users create professional, ATS-friendly resumes effortlessly with customizable templates and real-time previews.',
        keyFeatures: ['Templates', 'Previews', 'ATS-friendly', 'Ease of Use'],
        codeSnippet: '// Resume builder backend code here'
      },
  
    
      {
        title: 'Youtube Clone',
        role: 'Full-Stack Developer',
        description: 'A YouTube-inspired platform allowing users to search, view, and filter videos dynamically.',
        image: 'https://ik.imagekit.io/rbdwisvez/Screenshot%202025-04-06%20172649.png?updatedAt=1743940685312',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4',
        category: 'fullstack',
        technologies: ['MongoDB', 'React.js', 'Node.js'],
        features: ['Video search', 'Dynamic filtering', 'Video playback', 'Sidebar navigation'],
        links: {
          live: 'https://youtube-react-5nna.onrender.com/',
          github: 'https://github.com/aditya-raulji/yt-clone'
        },
        detailedDescription: 'A YouTube-inspired platform allowing users to search, view, and filter videos dynamically based on categories and search queries. Implements video playback with suggestions and sidebar navigation.',
        keyFeatures: ['Search', 'Filters', 'Playback', 'Navigation'],
        codeSnippet: '// YouTube clone API code here'
      },
  
    // backend
    {
      title: 'API Server',
      description: 'A RESTful API with authentication and rate limiting.',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4',
      category: 'backend',
      technologies: ['Node.js', 'Express', 'MongoDB', 'JWT'],
      features: ['REST endpoints', 'Authentication', 'Rate limiting', 'Data validation'],
      links: { live: '#', github: '#' },
      detailedDescription: 'A robust API server for various applications.',
      keyFeatures: ['Endpoints', 'Auth', 'Limiting', 'Validation'],
      codeSnippet: '// API server code here'
    },

    // figma
    {
      title: 'CareSlotter',
      role: 'UI/UX Designer',
      description: 'CareSlotter is a modern doctor appointment booking platform designed for seamless patient-doctor interactions.',
      image: 'https://ik.imagekit.io/rbdwisvez/Screenshot%202025-04-06%20181643.png?updatedAt=1743943759071',
      category: 'figma',
      technologies: ['Figma'],
      features: ['Intuitive UI', 'Easy navigation', 'Appointment scheduling', 'Real-time availability'],
      links: { figma: 'https://www.figma.com/design/3USrUvvHBTbcijvSVgq96C/Untitled?node-id=45-2&t=zws4Wuy5cBiLaqYP-1' },
      detailedDescription: 'CareSlotter is a modern doctor appointment booking platform designed for seamless patient-doctor interactions. The Figma design will feature an intuitive UI with easy navigation, appointment scheduling, and real-time availability. It will prioritize user experience, accessibility, and a professional aesthetic.',
      keyFeatures: ['User Experience', 'Accessibility', 'Professional Aesthetic'],
      codeSnippet: '// Figma design notes here'
    },
    {
      title: 'The Musical Villa',
      role: 'UI/UX Designer',
      description: 'A vibrant website dedicated to musical instruments, offering guides, tutorials, and genre insights.',
      image: 'https://ik.imagekit.io/rbdwisvez/Screenshot%202025-04-06%20181252.png?updatedAt=1743943777759',
      category: 'figma',
      technologies: ['Figma'],
      features: ['Engaging UI', 'Interactive elements', 'Rich visuals', 'Seamless browsing'],
      links: { figma: 'https://www.figma.com/design/3USrUvvHBTbcijvSVgq96C/Untitled?node-id=48-1769&t=zws4Wuy5cBiLaqYP-1' },
      detailedDescription: 'The Musical Villa is a vibrant website dedicated to musical instruments, offering guides, tutorials, and genre insights for music enthusiasts. The Figma design will feature an engaging UI with interactive elements, rich visuals, and a seamless browsing experience. It will focus on accessibility, modern aesthetics, and user-friendly navigation.',
      keyFeatures: ['Accessibility', 'Modern Aesthetics', 'User-friendly Navigation'],
      codeSnippet: '// Figma design notes here'
    },
    {
      title: 'Codinggita Clone',
      role: 'UI/UX Designer',
      description: 'A website with fully animated pages like Home, Bootcamp, Contact Us, About Us, Privacy Policy, and Refund Policy.',
      image: 'https://ik.imagekit.io/rbdwisvez/Screenshot%202025-04-06%20181220.png?updatedAt=1743943770172',
      category: 'figma',
      technologies: ['Figma'],
      features: ['Animated pages', 'Scrollable overlays', 'Hover effects'],
      links: { figma: 'https://www.figma.com/design/3USrUvvHBTbcijvSVgq96C/Untitled?node-id=48-2722&t=zws4Wuy5cBiLaqYP-1' },
      detailedDescription: 'A website with fully animated pages like Home, Bootcamp, Contact Us, About Us, Privacy Policy, and Refund Policy, featuring scrollable overlays and hover effects.',
      keyFeatures: ['Animations', 'Overlays', 'Interactive'],
      codeSnippet: '// Figma design notes here'
    },
    {
      title: 'Instagram ',
      role: 'UI/UX Designer',
      description: 'Featuring an intuitive layout, interactive story highlights, a dynamic feed, and a user-friendly profile section.',
      image: 'https://ik.imagekit.io/rbdwisvez/Screenshot%202025-04-06%20181502.png?updatedAt=1743943754211',
      category: 'figma',
      technologies: ['Figma'],
      features: ['Intuitive layout', 'Interactive stories', 'Dynamic feed', 'User-friendly profile'],
      links: { figma: 'https://www.figma.com/design/3USrUvvHBTbcijvSVgq96C/Untitled?node-id=48-908&t=GOL7Y626FHKI0xsN-1' },
      detailedDescription: 'Featuring an intuitive layout, interactive story highlights, a dynamic feed, and a user-friendly profile section. Provides a seamless social media experience with modern design elements.',
      keyFeatures: ['Social Media', 'Modern Design', 'Seamless Experience'],
      codeSnippet: '// Figma design notes here'
    },
    {
      title: 'Crypto',
      role: 'UI/UX Designer',
      description: 'A cutting-edge platform designed to provide insights, trading tools, and updates on cryptocurrencies.',
      image: 'https://ik.imagekit.io/rbdwisvez/Screenshot%202025-04-06%20181652.png?updatedAt=1743943742987',
      category: 'figma',
      technologies: ['Figma'],
      features: ['Dark-mode UI', 'Interactive charts', 'Modern gradients', 'User-friendly interface'],
      links: { figma: 'https://www.figma.com/design/3USrUvvHBTbcijvSVgq96C/Untitled?node-id=51-2&t=GOL7Y626FHKI0xsN-1' },
      detailedDescription: 'Crypto website will be a cutting-edge platform designed to provide insights, trading tools, and the latest updates on cryptocurrencies. The Figma design will feature a sleek, dark-mode UI with modern gradients, interactive charts, and a user-friendly interface. It will prioritize security, real-time data, and an intuitive experience for traders and investors.',
      keyFeatures: ['Security', 'Real-time Data', 'Intuitive Experience'],
      codeSnippet: '// Figma design notes here'
    },
    {
      title: 'Hyperalist Clone',
      role: 'UI/UX Designer',
      description: 'A dynamic platform showcasing top brands with insights, comparisons, and trends.',
      image: 'https://ik.imagekit.io/rbdwisvez/Screenshot%202025-04-06%20181131.png?updatedAt=1743943743715',
      category: 'figma',
      technologies: ['Figma'],
      features: ['Sleek UI', 'Intuitive navigation', 'High-quality visuals', 'Interactive listings'],
      links: { figma: 'https://www.figma.com/design/3USrUvvHBTbcijvSVgq96C/Untitled?node-id=52-1036&t=GOL7Y626FHKI0xsN-1' },
      detailedDescription: 'Hyperalist is a dynamic platform that showcases top brands, offering insights, comparisons, and the latest trends in various industries. The Figma design will feature a sleek, modern UI with intuitive navigation, high-quality visuals, and interactive brand listings. It will focus on a seamless user experience, accessibility, and engaging brand discovery.',
      keyFeatures: ['User Experience', 'Accessibility', 'Brand Discovery'],
      codeSnippet: '// Figma design notes here'
    },
    {
      title: 'Flipkart Clone',
      role: 'UI/UX Designer',
      description: 'A Flipkart-inspired design with an emphasis on responsive design and product page flow.',
      image: 'https://ik.imagekit.io/rbdwisvez/Screenshot%202025-04-06%20181157.png?updatedAt=1743943762320',
      category: 'figma',
      technologies: ['Figma'],
      features: ['Responsive design', 'Product page flow'],
      links: { figma: 'https://www.figma.com/design/3USrUvvHBTbcijvSVgq96C/Untitled?node-id=48-5377&t=GOL7Y626FHKI0xsN-1' },
      detailedDescription: 'A Flipkart-inspired design with an emphasis on responsive design and product page flow.',
      keyFeatures: ['Responsive', 'Product Flow'],
      codeSnippet: '// Figma design notes here'
    },
    {
      title: 'Netflix Clone',
      role: 'UI/UX Designer',
      description: 'Featuring a sleek homepage, movie and show categories, interactive previews, and a user-friendly watchlist.',
      image: 'https://ik.imagekit.io/rbdwisvez/Screenshot%202025-04-06%20181540.png?updatedAt=1743943779115',
      category: 'figma',
      technologies: ['Figma'],
      features: ['Sleek homepage', 'Movie categories', 'Interactive previews', 'User-friendly watchlist'],
      links: { figma: 'https://www.figma.com/design/3USrUvvHBTbcijvSVgq96C/Untitled?node-id=48-21&t=GOL7Y626FHKI0xsN-1' },
      detailedDescription: 'Featuring a sleek homepage, movie and show categories, interactive previews, and a user-friendly watchlist. Provides a modern streaming experience with a visually engaging design.',
      keyFeatures: ['Streaming', 'Visual Design', 'Engaging'],
      codeSnippet: '// Figma design notes here'
    },
    {
      title: 'Railway Ticket Booking',
      role: 'UI/UX Designer',
      description: 'Featuring a colorful board and interactive elements for a visually appealing design.',
      image: 'https://ik.imagekit.io/rbdwisvez/Screenshot%202025-04-06%20181708.png?updatedAt=1743943778349',
      category: 'figma',
      technologies: ['Figma'],
      features: ['Colorful board', 'Interactive elements'],
      links: { figma: 'https://www.figma.com/design/3USrUvvHBTbcijvSVgq96C/Untitled?node-id=0-1&t=GOL7Y626FHKI0xsN-1' },
      detailedDescription: 'Featuring a colorful board and interactive elements for a visually appealing design.',
      keyFeatures: ['Visual Appeal', 'Interactivity'],
      codeSnippet: '// Figma design notes here'
    },
    {
      title: 'Gaming Controller',
      role: 'UI/UX Designer',
      description: 'A simple gaming controller UI featuring basic buttons and a clean layout.',
      image: 'https://ik.imagekit.io/rbdwisvez/Screenshot%202025-04-06%20181329.png?updatedAt=1743943763723',
      category: 'figma',
      technologies: ['Figma'],
      features: ['Basic buttons', 'Clean layout', 'Intuitive UI'],
      links: { figma: 'https://www.figma.com/design/3USrUvvHBTbcijvSVgq96C/Untitled?node-id=48-1600&t=GOL7Y626FHKI0xsN-1' },
      detailedDescription: 'A simple gaming controller UI designed in Figma, featuring basic buttons and a clean layout for an intuitive user interface.',
      keyFeatures: ['Simplicity', 'Clean Design', 'Intuitive'],
      codeSnippet: '// Figma design notes here'
    }
  ];

  const filteredProjects = filter === 'all' ? projects : projects.filter(project => project.category === filter);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % Math.ceil(filteredProjects.length / 3));
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? Math.ceil(filteredProjects.length / 3) - 1 : prev - 1));
  const openProjectDetails = (index) => {
    setSelectedProject(index);
    document.body.style.overflow = 'hidden';
    if (videoRef.current) videoRef.current.currentTime = 0;
    setActiveTab('details');
  };
  const closeProjectDetails = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
    setIsPlaying(false);
    if (videoRef.current) videoRef.current.pause();
    setShowVolumeSlider(false);
    setShowPlaybackOptions(false);
    setShowQualityOptions(false);
  };
  const togglePlay = () => {
    if (videoRef.current) {
      isPlaying ? videoRef.current.pause() : videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };
  const handleSeek = (e) => {
    if (videoRef.current) {
      const newTime = parseFloat(e.target.value);
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };
  const handleVolumeChange = (e) => {
    if (videoRef.current) {
      const newVolume = parseFloat(e.target.value);
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
      if (newVolume === 0) {
        videoRef.current.muted = true;
        setIsMuted(true);
      } else if (isMuted) {
        videoRef.current.muted = false;
        setIsMuted(false);
      }
    }
  };
  const skipForward = () => {
    if (videoRef.current) videoRef.current.currentTime = Math.min(videoRef.current.duration, videoRef.current.currentTime + 10);
  };
  const skipBackward = () => {
    if (videoRef.current) videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 10);
  };
  const changePlaybackRate = (rate) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
      setPlaybackRate(rate);
    }
    setShowPlaybackOptions(false);
  };
  const toggleFullscreen = () => {
    if (!videoContainerRef.current) return;
    document.fullscreenElement ? document.exitFullscreen() : videoContainerRef.current.requestFullscreen().catch(err => console.error(`Error: ${err.message}`));
  };
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  const downloadVideo = () => {
    if (selectedProject === null || !filteredProjects[selectedProject].videoUrl) return;
    const link = document.createElement('a');
    link.href = filteredProjects[selectedProject].videoUrl;
    link.download = `${filteredProjects[selectedProject].title.replace(/\s+/g, '-').toLowerCase()}.mp4`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const shareProject = () => {
    if (selectedProject === null) return;
    if (navigator.share) {
      navigator.share({
        title: filteredProjects[selectedProject].title,
        text: filteredProjects[selectedProject].description,
        url: window.location.href,
      }).catch(error => console.log('Error sharing', error));
    } else {
      navigator.clipboard.writeText(window.location.href)
        .then(() => alert('Link copied to clipboard!'))
        .catch(error => console.log('Error copying', error));
    }
  };

  const ProjectCard = ({ project, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.03, y: -10, boxShadow: '0 0 20px rgba(34, 197, 94, 0.3)', borderColor: 'rgba(34, 197, 94, 0.8)' }}
      className="rounded-lg bg-white/5 overflow-hidden border border-green-500/20 transition-all duration-300 cursor-pointer relative"
      onClick={project.videoUrl ? () => openProjectDetails(index) : undefined} // Only open modal if videoUrl exists
    >
      <div className="relative h-48 overflow-hidden group">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
          <div className="space-y-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <h4 className="text-white font-bold">{project.title}</h4>
            <p className="text-gray-300 text-sm">{project.description}</p>
          </div>
        </div>
        {project.videoUrl && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-16 h-16 rounded-full bg-green-500/20 backdrop-blur-sm flex items-center justify-center border border-green-500/50 transform hover:scale-110 transition-transform duration-300">
              <Play size={24} className="text-green-500 ml-1" />
            </div>
          </motion.div>
        )}
      </div>

      <div className="p-6 space-y-4">
        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 4).map((tech, i) => (
            <motion.span
              key={i}
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(34, 197, 94, 0.2)' }}
              className="px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-xs md:text-sm transition-all duration-300"
            >
              {tech}
            </motion.span>
          ))}
        </div>

        <div>
          <h5 className="text-green-500 font-semibold text-sm md:text-base mb-2">Key Features:</h5>
          <ul className="grid grid-cols-2 gap-2">
            {project.features.map((feature, i) => (
              <motion.li
                key={i}
                className="flex items-center text-gray-400 text-xs md:text-sm"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <ArrowRight size={12} className="mr-1 text-green-500" />
                {feature}
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="flex gap-4 pt-2">
          {project.links.live && (
            <motion.a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2 rounded bg-green-500/20 text-green-500 hover:bg-green-500/30 transition-all duration-300 flex items-center justify-center gap-2 text-sm md:text-base"
              onClick={(e) => e.stopPropagation()}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink size={16} />
              Live Demo
            </motion.a>
          )}
          {project.links.github && (
            <motion.a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2 rounded bg-white/5 hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2 text-sm md:text-base"
              onClick={(e) => e.stopPropagation()}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github size={16} />
              Source
            </motion.a>
          )}
          {project.links.figma && (
            <motion.a
              href={project.links.figma}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2 rounded bg-green-500/20 text-green-500 hover:bg-green-500/30 transition-all duration-300 flex items-center justify-center gap-2 text-sm md:text-base"
              onClick={(e) => e.stopPropagation()}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink size={16} />
              Figma Design
            </motion.a>
          )}
          {project.links.ClosedPr && (
            <motion.a
              href={project.links.ClosedPr}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2 rounded bg-green-500/20 text-green-500 hover:bg-green-500/30 transition-all duration-300 flex items-center justify-center gap-2 text-sm md:text-base"
              onClick={(e) => e.stopPropagation()}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink size={16} />
              Closed Pr
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );

  return (
    <section id="work-section" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.1)_0,rgba(0,0,0,0)_50%)]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 glitch-text bg-clip-text text-transparent bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500" data-text="Featured Work">
            Featured Work
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
            Explore my latest projects and creative solutions. Click on any project to see details and demo.
          </p>
        </motion.div>

        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {filters.map((f, index) => {
            const Icon = f.icon;
            return (
              <motion.button
                key={f.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => { setFilter(f.id); setCurrentSlide(0); }}
                className={`px-4 py-2 rounded-full transition-all duration-300 flex items-center gap-2 text-sm md:text-base ${filter === f.id ? 'bg-green-500/20 text-green-500 border border-green-500/50 shadow-[0_0_15px_rgba(34,197,94,0.3)]' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
              >
                <Icon size={16} className="transform group-hover:rotate-12 transition-transform duration-300" />
                {f.label}
              </motion.button>
            );
          })}
        </div>

        <div className="relative">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>

          {filteredProjects.length > 3 && (
            <>
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={prevSlide} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 w-10 h-10 rounded-full bg-green-500/20 text-green-500 hover:bg-green-500/30 transition-all duration-300 flex items-center justify-center">
                <ChevronLeft size={20} />
              </motion.button>
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={nextSlide} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 w-10 h-10 rounded-full bg-green-500/20 text-green-500 hover:bg-green-500/30 transition-all duration-300 flex items-center justify-center">
                <ChevronRight size={20} />
              </motion.button>
            </>
          )}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-8 overflow-y-auto min-h-screen" style={{ top: 0, left: 0, right: 0, bottom: 0 }}>
            <motion.div ref={modalRef} initial={{ opacity: 0, scale: 0.9, y: 0 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 0 }} transition={{ duration: 0.3 }} className="bg-black/90 border border-green-500/30 rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto relative mx-auto my-8">
              <div className="sticky top-0 z-10 flex justify-between items-center p-4 bg-black/90 border-b border-green-500/20">
                <motion.h3 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="text-xl md:text-2xl font-bold text-green-500">
                  {filteredProjects[selectedProject].title}
                </motion.h3>
                <motion.button whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.1)' }} whileTap={{ scale: 0.9 }} onClick={closeProjectDetails} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all duration-300">
                  <X size={18} />
                </motion.button>
              </div>

              <div className="p-4 md:p-6">
                <div className="grid md:grid-cols-[1fr,350px] gap-8">
                  <div>
                    {filteredProjects[selectedProject].videoUrl ? (
                      <div ref={videoContainerRef} className="relative rounded-lg overflow-hidden bg-black/50 border border-green-500/20 mb-6">
                        <video ref={videoRef} src={filteredProjects[selectedProject].videoUrl} className="w-full aspect-video object-cover" onClick={togglePlay} muted={isMuted} playsInline />
                        <motion.div initial={{ opacity: 1 }} animate={{ opacity: isPlaying ? 0 : 1 }} transition={{ duration: 0.3 }} className="absolute inset-0 flex items-center justify-center bg-black/30" onClick={togglePlay}>
                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="w-16 h-16 rounded-full bg-green-500/20 backdrop-blur-sm flex items-center justify-center border border-green-500/50">
                            <Play size={24} className="text-green-500 ml-1" />
                          </motion.div>
                        </motion.div>
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-100 hover:opacity-100 transition-opacity duration-300">
                          <div className="flex flex-col gap-2">
                            <div className="relative group">
                              <input type="range" min="0" max={duration || 100} value={currentTime} onChange={handleSeek} className="w-full h-1 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-green-500 hover:h-2 transition-all duration-200" />
                              <div className="absolute left-0 top-0 h-1 bg-green-500/50 rounded-full pointer-events-none group-hover:h-2 transition-all duration-200" style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}></div>
                            </div>
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-3">
                                <motion.button whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.2)' }} whileTap={{ scale: 0.9 }} onClick={togglePlay} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-300">
                                  {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
                                </motion.button>
                                <motion.button whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.2)' }} whileTap={{ scale: 0.9 }} onClick={skipBackward} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-300">
                                  <SkipBack size={16} />
                                </motion.button>
                                <motion.button whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.2)' }} whileTap={{ scale: 0.9 }} onClick={skipForward} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-300">
                                  <SkipForward size={16} />
                                </motion.button>
                                <div className="relative">
                                  <motion.button whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.2)' }} whileTap={{ scale: 0.9 }} onClick={() => setShowVolumeSlider(!showVolumeSlider)} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-300">
                                    {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                                  </motion.button>
                                  {showVolumeSlider && (
                                    <motion.div ref={volumeSliderRef} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute bottom-full left-0 mb-2 p-2 bg-black/90 rounded border border-green-500/20 w-32">
                                      <input type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolumeChange} className="w-full h-1 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-green-500" />
                                    </motion.div>
                                  )}
                                </div>
                                <span className="text-xs text-gray-300">{formatTime(currentTime)} / {formatTime(duration || 0)}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="relative">
                                  <motion.button whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.2)' }} whileTap={{ scale: 0.9 }} onClick={() => setShowPlaybackOptions(!showPlaybackOptions)} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-300 text-xs font-medium">
                                    {playbackRate}x
                                  </motion.button>
                                  {showPlaybackOptions && (
                                    <motion.div ref={playbackOptionsRef} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute bottom-full right-0 mb-2 p-2 bg-black/90 rounded border border-green-500/20 w-32">
                                      {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                                        <button key={rate} onClick={() => changePlaybackRate(rate)} className={`block w-full text-left px-2 py-1 rounded text-sm ${playbackRate === rate ? 'bg-green-500/20 text-green-500' : 'text-gray-300 hover:bg-white/5'}`}>
                                          {rate}x
                                        </button>
                                      ))}
                                    </motion.div>
                                  )}
                                </div>
                                <div className="relative">
                                  <motion.button whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.2)' }} whileTap={{ scale: 0.9 }} onClick={() => setShowQualityOptions(!showQualityOptions)} className="w-auto px-2 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-300 text-xs font-medium">
                                    {videoQuality}
                                  </motion.button>
                                  {showQualityOptions && (
                                    <motion.div ref={qualityOptionsRef} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute bottom-full right-0 mb-2 p-2 bg-black/90 rounded border border-green-500/20 w-32">
                                      {['Auto', '1080p', '720p', '480p', '360p'].map((quality) => (
                                        <button key={quality} onClick={() => { setVideoQuality(quality); setShowQualityOptions(false); }} className={`block w-full text-left px-2 py-1 rounded text-sm ${videoQuality === quality ? 'bg-green-500/20 text-green-500' : 'text-gray-300 hover:bg-white/5'}`}>
                                          {quality}
                                        </button>
                                      ))}
                                    </motion.div>
                                  )}
                                </div>
                                <motion.button whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.2)' }} whileTap={{ scale: 0.9 }} onClick={downloadVideo} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-300">
                                  <Download size={16} />
                                </motion.button>
                                <motion.button whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.2)' }} whileTap={{ scale: 0.9 }} onClick={toggleFullscreen} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-300">
                                  <Maximize size={16} />
                                </motion.button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="relative rounded-lg overflow-hidden bg-black/50 border border-green-500/20 mb-6">
                        <img src={filteredProjects[selectedProject].image} alt={filteredProjects[selectedProject].title} className="w-full aspect-video object-cover" />
                      </div>
                    )}

                    <div className="flex border-b border-green-500/20 mb-6">
                      <motion.button whileHover={{ backgroundColor: 'rgba(34, 197, 94, 0.1)' }} whileTap={{ scale: 0.95 }} onClick={() => setActiveTab('details')} className={`px-4 py-2 text-sm md:text-base transition-all duration-300 ${activeTab === 'details' ? 'text-green-500 border-b-2 border-green-500' : 'text-gray-400 hover:text-white'}`}>
                        Project Details
                      </motion.button>
                      <motion.button whileHover={{ backgroundColor: 'rgba(34, 197, 94, 0.1)' }} whileTap={{ scale: 0.95 }} onClick={() => setActiveTab('code')} className={`px-4 py-2 text-sm md:text-base transition-all duration-300 ${activeTab === 'code' ? 'text-green-500 border-b-2 border-green-500' : 'text-gray-400 hover:text-white'}`}>
                        Code Snippet
                      </motion.button>
                    </div>

                    <AnimatePresence mode="wait">
                      {activeTab === 'details' ? (
                        <motion.div key="details" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="space-y-6">
                          <div>
                            <h4 className="text-lg md:text-xl font-bold text-green-500 mb-3">About this project</h4>
                            <p className="text-gray-300 text-sm md:text-base">{filteredProjects[selectedProject].detailedDescription}</p>
                          </div>
                          <div>
                            <h4 className="text-lg md:text-xl font-bold text-green-500 mb-3">Role</h4>
                            <p className="text-gray-300 text-sm md:text-base">{filteredProjects[selectedProject].role}</p>
                          </div>
                          <div>
                            <h4 className="text-lg md:text-xl font-bold text-green-500 mb-3">Key Features</h4>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {filteredProjects[selectedProject].keyFeatures.map((feature, i) => (
                                <motion.li key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="flex items-start gap-2 text-sm md:text-base">
                                  <Check size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                                  <span className="text-gray-300">{feature}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div key="code" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="space-y-4">
                          <div>
                            <h4 className="text-lg md:text-xl font-bold text-green-500 mb-3">Implementation Snippet</h4>
                            <div className="bg-black/50 rounded-lg border border-green-500/20 p-4 overflow-x-auto">
                              <pre className="text-gray-300 text-sm font-mono"><code>{filteredProjects[selectedProject].codeSnippet}</code></pre>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="space-y-6">
                    <div className="p-4 rounded-lg bg-white/5 border border-green-500/20">
                      <h4 className="text-lg font-bold text-green-500 mb-4">Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {filteredProjects[selectedProject].technologies.map((tech, i) => (
                          <motion.span key={i} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }} whileHover={{ scale: 1.1, backgroundColor: 'rgba(34, 197, 94, 0.2)' }} className="px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-xs md:text-sm">
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-4 flex-wrap">
                      {filteredProjects[selectedProject].links.live && (
                        <motion.a
                          href={filteredProjects[selectedProject].links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05, backgroundColor: 'rgba(34, 197, 94, 0.3)' }}
                          whileTap={{ scale: 0.95 }}
                          className="flex-1 py-3 rounded bg-green-500/20 text-green-500 transition-all duration-300 flex items-center justify-center gap-2 text-sm md:text-base"
                        >
                          <ExternalLink size={18} />
                          Live Demo
                        </motion.a>
                      )}
                      {filteredProjects[selectedProject].links.github && (
                        <motion.a
                          href={filteredProjects[selectedProject].links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                          whileTap={{ scale: 0.95 }}
                          className="flex-1 py-3 rounded bg-white/5 hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2 text-sm md:text-base"
                        >
                          <Github size={18} />
                          Source Code
                        </motion.a>
                      )}
                      {filteredProjects[selectedProject].links.figma && (
                        <motion.a
                          href={filteredProjects[selectedProject].links.figma}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05, backgroundColor: 'rgba(34, 197, 94, 0.3)' }}
                          whileTap={{ scale: 0.95 }}
                          className="flex-1 py-3 rounded bg-green-500/20 text-green-500 transition-all duration-300 flex items-center justify-center gap-2 text-sm md:text-base"
                        >
                          <ExternalLink size={18} />
                          Figma Design
                        </motion.a>
                      )}
                      {filteredProjects[selectedProject].links.ClosedPr && (
                        <motion.a
                          href={filteredProjects[selectedProject].links.ClosedPr}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05, backgroundColor: 'rgba(34, 197, 94, 0.3)' }}
                          whileTap={{ scale: 0.95 }}
                          className="flex-1 py-3 rounded bg-green-500/20 text-green-500 transition-all duration-300 flex items-center justify-center gap-2 text-sm md:text-base"
                        >
                          <ExternalLink size={18} />
                          ClosedPr Docs
                        </motion.a>
                      )}
                    </div>

                    <div className="flex gap-3 justify-center">
                      <motion.button whileHover={{ scale: 1.1, backgroundColor: 'rgba(34, 197, 94, 0.2)' }} whileTap={{ scale: 0.9 }} onClick={() => setIsLiked(!isLiked)} className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isLiked ? 'bg-green-500/30 text-green-500' : 'bg-white/5 text-gray-400'}`}>
                        <Heart size={18} fill={isLiked ? 'currentColor' : 'none'} />
                      </motion.button>
                      <motion.button whileHover={{ scale: 1.1, backgroundColor: 'rgba(34, 197, 94, 0.2)' }} whileTap={{ scale: 0.9 }} onClick={() => setIsBookmarked(!isBookmarked)} className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isBookmarked ? 'bg-green-500/30 text-green-500' : 'bg-white/5 text-gray-400'}`}>
                        <Bookmark size={18} fill={isBookmarked ? 'currentColor' : 'none'} />
                      </motion.button>
                      <motion.button whileHover={{ scale: 1.1, backgroundColor: 'rgba(34, 197, 94, 0.2)' }} whileTap={{ scale: 0.9 }} onClick={shareProject} className="w-10 h-10 rounded-full bg-white/5 text-gray-400 flex items-center justify-center hover:bg-white/10 transition-all duration-300">
                        <Share2 size={18} />
                      </motion.button>
                    </div>

                    <div className="p-4 rounded-lg bg-gradient-to-br from-green-500/10 to-purple-500/10 border border-green-500/20">
                      <h4 className="text-lg font-bold text-green-500 mb-4 flex items-center gap-2">
                        <Sparkles size={18} className="text-yellow-400" />
                        Project Highlights
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-2 rounded bg-white/5">
                          <div className="text-2xl font-bold text-green-500">4.9/5</div>
                          <div className="text-xs text-gray-400">User Rating</div>
                        </div>
                        <div className="text-center p-2 rounded bg-white/5">
                          <div className="text-2xl font-bold text-green-500">3.2k</div>
                          <div className="text-xs text-gray-400">Downloads</div>
                        </div>
                        <div className="text-center p-2 rounded bg-white/5">
                          <div className="text-2xl font-bold text-green-500">98%</div>
                          <div className="text-xs text-gray-400">Performance</div>
                        </div>
                        <div className="text-center p-2 rounded bg-white/5">
                          <div className="text-2xl font-bold text-green-500"><Zap size={20} className="inline mr-1" /></div>
                          <div className="text-xs text-gray-400">Featured Project</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}