import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ArrowRight, Code, Palette, Monitor, Database, ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX, Maximize, X, Check, SkipForward, SkipBack, Download, Share2, Heart, Bookmark, Sparkles, Zap } from 'lucide-react';

export function Work() {
  const [filter, setFilter] = useState('all');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
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
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const volumeSliderRef = useRef<HTMLDivElement>(null);
  const playbackOptionsRef = useRef<HTMLDivElement>(null);
  const qualityOptionsRef = useRef<HTMLDivElement>(null);

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
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        closeProjectDetails();
      }
      
      if (volumeSliderRef.current && !volumeSliderRef.current.contains(event.target as Node) && showVolumeSlider) {
        setShowVolumeSlider(false);
      }
      
      if (playbackOptionsRef.current && !playbackOptionsRef.current.contains(event.target as Node) && showPlaybackOptions) {
        setShowPlaybackOptions(false);
      }
      
      if (qualityOptionsRef.current && !qualityOptionsRef.current.contains(event.target as Node) && showQualityOptions) {
        setShowQualityOptions(false);
      }
    };

    if (selectedProject !== null || showVolumeSlider || showPlaybackOptions || showQualityOptions) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selectedProject, showVolumeSlider, showPlaybackOptions, showQualityOptions]);

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      
      const updateTime = () => {
        setCurrentTime(video.currentTime);
        setDuration(video.duration);
      };
      
      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);
      const handleVolumeChange = () => setVolume(video.volume);
      const handleRateChange = () => setPlaybackRate(video.playbackRate);
      
      const handleFullscreenChange = () => {
        setIsFullscreen(document.fullscreenElement !== null);
      };
      
      video.addEventListener('timeupdate', updateTime);
      video.addEventListener('play', handlePlay);
      video.addEventListener('pause', handlePause);
      video.addEventListener('volumechange', handleVolumeChange);
      video.addEventListener('ratechange', handleRateChange);
      
      document.addEventListener('fullscreenchange', handleFullscreenChange);
      
      return () => {
        video.removeEventListener('timeupdate', updateTime);
        video.removeEventListener('play', handlePlay);
        video.removeEventListener('pause', handlePause);
        video.removeEventListener('volumechange', handleVolumeChange);
        video.removeEventListener('ratechange', handleRateChange);
        document.removeEventListener('fullscreenchange', handleFullscreenChange);
      };
    }
  }, [selectedProject]);

  // Keyboard shortcuts for video player
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedProject === null) return;
      
      switch (e.key) {
        case ' ':
          e.preventDefault();
          togglePlay();
          break;
        case 'ArrowRight':
          if (videoRef.current) {
            videoRef.current.currentTime += 10;
          }
          break;
        case 'ArrowLeft':
          if (videoRef.current) {
            videoRef.current.currentTime -= 10;
          }
          break;
        case 'ArrowUp':
          if (videoRef.current) {
            const newVolume = Math.min(1, videoRef.current.volume + 0.1);
            videoRef.current.volume = newVolume;
            setVolume(newVolume);
          }
          break;
        case 'ArrowDown':
          if (videoRef.current) {
            const newVolume = Math.max(0, videoRef.current.volume - 0.1);
            videoRef.current.volume = newVolume;
            setVolume(newVolume);
          }
          break;
        case 'm':
          toggleMute();
          break;
        case 'f':
          toggleFullscreen();
          break;
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedProject]);

  const filters = [
    { id: 'all', label: 'All Projects', icon: Monitor },
    { id: 'frontend', label: 'Frontend', icon: Palette },
    { id: 'fullstack', label: 'Full Stack', icon: Code },
    { id: 'backend', label: 'Backend', icon: Database },
  ];

  const projects = [
    {
      title: 'Video Streaming Platform',
      description: 'A custom video streaming platform with advanced playback controls and responsive design.',
      image: 'https://media-hosting.imagekit.io//f8852e6f442d43d2/Screenshot%202025-03-04%20114041.png?Expires=1835676653&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=zySs3infKCJ5yz~E-q7xnvgad6QyHxmeFEKhbUTV0BZFzPJO1Z8M7J4axPhKUPf2xlh1Jq93eEyOeHlKJvs0H~2dkH~4qp56h1xGDcyKwtxyfKuW29FHukpI7bIR1JCDQxK0RzBWn84lO0mmAJu7QQfn0oIQAj9masE4z2BwNylmD21Pg5r9A6iaoO0~o2kxXrEZAhFa0Kmd0w0YVcJY2SK5JE59Nry9lxuzzYFtMUzboyTrpGJfgsIPlau-BNaIyp2bdaoSMI3mprkSW~DUWKbYO4EN3hbVryN7mGg51spCczNa8KzEqFZQDKHPusmCm8i2wWtCT19x7CMVMX92Ig__',
      videoUrl: 'https://drive.google.com/file/d/1dPPNcOF_liJzBlU0ZvFfBowSkfqqv7CB/view',
      category: 'frontend',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Media APIs'],
      features: [
        'Custom video player with advanced controls',
        'Responsive design for all devices',
        'Keyboard shortcuts for accessibility',
        'Adaptive streaming quality'
      ],
      challenges: [
        'Implementing custom video controls',
        'Ensuring cross-browser compatibility',
        'Optimizing for mobile devices',
        'Managing video buffering states'
      ],
      links: {
        live: '#',
        github: '#'
      },
      detailedDescription: 'This project demonstrates my expertise in frontend development, particularly in creating interactive media experiences. The platform includes features like adaptive streaming, custom controls, and a user-friendly interface.',
      keyFeatures: [
        'Custom video player with advanced controls',
        'Responsive design for all devices',
        'Keyboard shortcuts for accessibility',
        'Adaptive streaming quality',
        'Minimalist UI with focus on content'
      ],
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Media APIs'],
      codeSnippet: `// Custom video player hook
const useVideoPlayer = (videoRef) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    const element = videoRef.current;
    if (!element) return;

    const updateProgress = () => {
      const duration = element.duration;
      if (duration) {
        setProgress((element.currentTime / duration) * 100);
      }
    };

    element.addEventListener('timeupdate', updateProgress);
    return () => {
      element.removeEventListener('timeupdate', updateProgress);
    };
  }, [videoRef]);

  return {
    isPlaying,
    progress,
    volume,
    muted,
    togglePlay,
    toggleMute: () => setMuted(!muted),
    handleVolumeChange: (value) => setVolume(value),
  };
};`
    },
    {
      title: 'E-Commerce Platform',
      description: 'A modern e-commerce platform with real-time inventory, secure payments, and admin dashboard.',
      image: 'https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-going-down-a-curved-highway-through-a-mountain-range-41576-large.mp4',
      category: 'fullstack',
      technologies: ['Next.js', 'TypeScript', 'Stripe', 'Tailwind CSS'],
      features: [
        'User Authentication',
        'Real-time Inventory',
        'Payment Integration',
        'Admin Dashboard'
      ],
      challenges: [
        'Implementing real-time stock updates',
        'Secure payment processing',
        'Complex state management',
        'Performance optimization'
      ],
      links: {
        live: '#',
        github: '#'
      },
      detailedDescription: 'A comprehensive e-commerce solution built with Next.js and integrated with Stripe for secure payments. This platform features real-time inventory management, user authentication, and an intuitive admin dashboard for product management.',
      keyFeatures: [
        'User authentication and account management',
        'Real-time inventory tracking',
        'Secure payment processing with Stripe',
        'Responsive admin dashboard',
        'Order tracking and history'
      ],
      technologies: ['Next.js', 'TypeScript', 'Node.js', 'MongoDB', 'Stripe API', 'Tailwind CSS'],
      codeSnippet: `// Stripe payment integration
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export const createCheckoutSession = async (productId) => {
  const stripe = await stripePromise;
  
  // Call backend to create a checkout session
  const response = await fetch('/api/create-checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ productId }),
  });
  
  const session = await response.json();
  
  // Redirect to Stripe Checkout
  const result = await stripe.redirectToCheckout({
    sessionId: session.id,
  });
  
  if (result.error) {
    console.error(result.error.message);
  }
};`
    },
    {
      title: 'AI Image Generator',
      description: 'An AI-powered image generation platform with style transfer and editing capabilities.',
      image: 'https://images.unsplash.com/photo-1557804483-ef3ae78eca57?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4',
      category: 'frontend',
      technologies: ['React', 'TensorFlow.js', 'WebGL', 'Canvas API'],
      features: [
        'Style Transfer',
        'Image Editing',
        'Gallery System',
        'Export Options'
      ],
      challenges: [
        'Model optimization',
        'Browser performance',
        'Memory management',
        'UI responsiveness'
      ],
      links: {
        live: '#',
        github: '#'
      },
      detailedDescription: 'This AI-powered platform leverages TensorFlow.js to bring advanced image generation capabilities directly to the browser. Users can create unique images through style transfer, apply various filters, and export their creations in multiple formats.',
      keyFeatures: [
        'AI-powered style transfer',
        'Real-time image editing tools',
        'User gallery for saving creations',
        'Multiple export options',
        'Optimized for browser performance'
      ],
      technologies: ['React', 'TensorFlow.js', 'WebGL', 'Canvas API', 'Firebase Storage'],
      codeSnippet: `// TensorFlow.js style transfer implementation
import * as tf from '@tensorflow/tfjs';
import * as styletransfer from '@tensorflow-models/style-transfer';

export async function applyStyleTransfer(contentImage, styleImage) {
  // Load the style transfer model
  const model = await styletransfer.load();
  
  // Convert images to tensors
  const contentTensor = tf.browser.fromPixels(contentImage);
  const styleTensor = tf.browser.fromPixels(styleImage);
  
  // Perform style transfer
  const stylizedImage = await model.stylize(contentTensor, styleTensor);
  
  // Clean up tensors
  tf.dispose([contentTensor, styleTensor]);
  
  return stylizedImage;
}`
    }
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(filteredProjects.length / 3));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => 
      prev === 0 ? Math.ceil(filteredProjects.length / 3) - 1 : prev - 1
    );
  };

  const openProjectDetails = (index: number) => {
    setSelectedProject(index);
    document.body.style.overflow = 'hidden';
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
    setActiveTab('details');
  };

  const closeProjectDetails = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setShowVolumeSlider(false);
    setShowPlaybackOptions(false);
    setShowQualityOptions(false);
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const newTime = parseFloat(e.target.value);
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    if (videoRef.current) {
      videoRef.current.currentTime = Math.min(videoRef.current.duration, videoRef.current.currentTime + 10);
    }
  };

  const skipBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 10);
    }
  };

  const changePlaybackRate = (rate: number) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
      setPlaybackRate(rate);
    }
    setShowPlaybackOptions(false);
  };

  const toggleFullscreen = () => {
    if (!videoContainerRef.current) return;
    
    if (!document.fullscreenElement) {
      videoContainerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const downloadVideo = () => {
    if (selectedProject === null) return;
    
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
      })
      .catch((error) => console.log('Error sharing', error));
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href)
        .then(() => alert('Link copied to clipboard!'))
        .catch((error) => console.log('Error copying to clipboard', error));
    }
  };

  const ProjectCard = ({ project, index }: { project: typeof projects[0], index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.03, y: -5 }}
      className="rounded-lg bg-white/5 overflow-hidden border border-green-500/20 hover:border-green-500/50 transition-all duration-300 cursor-pointer"
      onMouseEnter={() => setHoveredProject(index)}
      onMouseLeave={() => setHoveredProject(null)}
      onClick={() => openProjectDetails(index)}
    >
      <div className="relative h-48 overflow-hidden">
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
        <motion.div 
          className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="w-16 h-16 rounded-full bg-green-500/20 backdrop-blur-sm flex items-center justify-center border border-green-500/50 transform hover:scale-110 transition-transform duration-300">
            <Play size={24} className="text-green-500 ml-1" />
          </div>
        </motion.div>
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

        <div className="space-y-4">
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

          <div>
            <h5 className="text-green-500 font-semibold text-sm md:text-base mb-2">Challenges Solved:</h5>
            <ul className="grid grid-cols-2 gap-2">
              {project.challenges.map((challenge, i) => (
                <motion.li 
                  key={i} 
                  className="flex items-center text-gray-400 text-xs md:text-sm"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                >
                  <ArrowRight size={12} className="mr-1 text-green-500" />
                  {challenge}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex gap-4 pt-2">
          <motion.a
            href={project.links.live}
            className="flex-1 py-2 rounded bg-green-500/20 text-green-500 hover:bg-green-500/30 transition-all duration-300 flex items-center justify-center gap-2 text-sm md:text-base"
            onClick={(e) => e.stopPropagation()}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <ExternalLink size={16} />
            Live Demo
          </motion.a>
          <motion.a
            href={project.links.github}
            className="flex-1 py-2 rounded bg-white/5 hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2 text-sm md:text-base"
            onClick={(e) => e.stopPropagation()}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github size={16} />
            Source
          </motion.a>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section id="work-section" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.1)_0,rgba(0,0,0,0)_50%)]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
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
                onClick={() => {
                  setFilter(f.id);
                  setCurrentSlide(0);
                }}
                className={`px-4 py-2 rounded-full transition-all duration-300 flex items-center gap-2 text-sm md:text-base ${
                  filter === f.id
                    ? 'bg-green-500/20 text-green-500 border border-green-500/50 shadow-[0_0_15px_rgba(34,197,94,0.3)]'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
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
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 w-10 h-10 rounded-full bg-green-500/20 text-green-500 hover:bg-green-500/30 transition-all duration-300 flex items-center justify-center"
              >
                <ChevronLeft size={20} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 w-10 h-10 rounded-full bg-green-500/20 text-green-500 hover:bg-green-500/30 transition-all duration-300 flex items-center justify-center"
              >
                <ChevronRight size={20} />
              </motion.button>
            </>
          )}
        </div>
      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-8 overflow-y-auto"
          >
            <motion.div 
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-black/90 border border-green-500/30 rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 z-10 flex justify-between items-center p-4 bg-black/90 border-b border-green-500/20">
                <motion.h3 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl md:text-2xl font-bold text-green-500"
                >
                  {filteredProjects[selectedProject].title}
                </motion.h3>
                <motion.button 
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                  whileTap={{ scale: 0.9 }}
                  onClick={closeProjectDetails}
                  className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all duration-300"
                >
                  <X size={18} />
                </motion.button>
              </div>

              <div className="p-4 md:p-6">
                <div className="grid md:grid-cols-[1fr,350px] gap-8">
                  <div>
                    {/* Video Player */}
                    <div ref={videoContainerRef} className="relative rounded-lg overflow-hidden bg-black/50 border border-green-500/20 mb-6">
                      <video
                        ref={videoRef}
                        src={filteredProjects[selectedProject].videoUrl}
                        className="w-full aspect-video object-cover"
                        onClick={togglePlay}
                        muted={isMuted}
                        playsInline
                      />
                      
                      {/* Play/Pause Overlay */}
                      <motion.div 
                        initial={{ opacity: 1 }}
                        animate={{ opacity: isPlaying ? 0 : 1 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 flex items-center justify-center bg-black/30"
                        onClick={togglePlay}
                      >
                        <motion.div 
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-16 h-16 rounded-full bg-green-500/20 backdrop-blur-sm flex items-center justify-center border border-green-500/50"
                        >
                          <Play size={24} className="text-green-500 ml-1" />
                        </motion.div>
                      </motion.div>
                      
                      {/* Video Controls */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-100 hover:opacity-100 transition-opacity duration-300">
                        <div className="flex flex-col gap-2">
                          {/* Progress Bar */}
                          <div className="relative group">
                            <input
                              type="range"
                              min="0"
                              max={duration || 100}
                              value={currentTime}
                              onChange={handleSeek}
                              className="w-full h-1 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-green-500 hover:h-2 transition-all duration-200"
                            />
                            <div 
                              className="absolute left-0 top-0 h-1 bg-green-500/50 rounded-full pointer-events-none group-hover:h-2 transition-all duration-200"
                              style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
                            ></div>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                              {/* Play/Pause Button */}
                              <motion.button 
                                whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                                whileTap={{ scale: 0.9 }}
                                onClick={togglePlay}
                                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-300"
                              >
                                {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
                              </motion.button>
                              
                              {/* Skip Backward */}
                              <motion.button 
                                whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                                whileTap={{ scale: 0.9 }}
                                onClick={skipBackward}
                                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-300"
                              >
                                <SkipBack size={16} />
                              </motion.button>
                              
                              {/* Skip Forward */}
                              <motion.button 
                                whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                                whileTap={{ scale: 0.9 }}
                                onClick={skipForward}
                                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-300"
                              >
                                <SkipForward size={16} />
                              </motion.button>
                              
                              {/* Volume Control */}
                              <div className="relative">
                                <motion.button 
                                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => setShowVolumeSlider(!showVolumeSlider)}
                                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-300"
                                >
                                  {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                                </motion.button>
                                
                                {showVolumeSlider && (
                                  <motion.div 
                                    ref={volumeSliderRef}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="absolute bottom-full left-0 mb-2 p-2 bg-black/90 rounded border border-green-500/20 w-32"
                                  >
                                    <input
                                      type="range"
                                      min="0"
                                      max="1"
                                      step="0.01"
                                      value={volume}
                                      onChange={handleVolumeChange}
                                      className="w-full h-1 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-green-500"
                                    />
                                  </motion.div>
                                )}
                              </div>
                              
                              {/* Time Display */}
                              <span className="text-xs text-gray-300">
                                {formatTime(currentTime)} / {formatTime(duration || 0)}
                              </span>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              {/* Playback Speed */}
                              <div className="relative">
                                <motion.button 
                                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => setShowPlaybackOptions(!showPlaybackOptions)}
                                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-300 text-xs font-medium"
                                >
                                  {playbackRate}x
                                </motion.button>
                                
                                {showPlaybackOptions && (
                                  <motion.div 
                                    ref={playbackOptionsRef}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="absolute bottom-full right-0 mb-2 p-2 bg-black/90 rounded border border-green-500/20 w-32"
                                  >
                                    {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                                      <button
                                        key={rate}
                                        onClick={() => changePlaybackRate(rate)}
                                        className={`block w-full text-left px-2 py-1 rounded text-sm ${
                                          playbackRate === rate 
                                            ? 'bg-green-500/20 text-green-500' 
                                            : 'text-gray-300 hover:bg-white/5'
                                        }`}
                                      >
                                        {rate}x
                                      </button>
                                    ))}
                                  </motion.div>
                                )}
                              </div>
                              
                              {/* Video Quality */}
                              <div className="relative">
                                <motion.button 
                                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => setShowQualityOptions(!showQualityOptions)}
                                  className="w-auto px-2 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-300 text-xs font-medium"
                                >
                                  {videoQuality}
                                </motion.button>
                                
                                {showQualityOptions && (
                                  <motion.div 
                                    ref={qualityOptionsRef}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="absolute bottom-full right-0 mb-2 p-2 bg-black/90 rounded border border-green-500/20 w-32"
                                  >
                                    {['Auto', '1080p', '720p', '480p', '360p'].map((quality) => (
                                      <button
                                        key={quality}
                                        onClick={() => {
                                          setVideoQuality(quality);
                                          setShowQualityOptions(false);
                                        }}
                                        className={`block w-full text-left px-2 py-1 rounded text-sm ${
                                          videoQuality === quality 
                                            ? 'bg-green-500/20 text-green-500' 
                                            : 'text-gray-300 hover:bg-white/5'
                                        }`}
                                      >
                                        {quality}
                                      </button>
                                    ))}
                                  </motion.div>
                                )}
                              </div>
                              
                              {/* Download Button */}
                              <motion.button 
                                whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                                whileTap={{ scale: 0.9 }}
                                onClick={downloadVideo}
                                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-300"
                              >
                                <Download size={16} />
                              </motion.button>
                              
                              {/* Fullscreen Button */}
                              <motion.button 
                                whileH hover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                                whileTap={{ scale: 0.9 }}
                                onClick={toggleFullscreen}
                                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-300"
                              >
                                <Maximize size={16} />
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Tabs Navigation */}
                    <div className="flex border-b border-green-500/20 mb-6">
                      <motion.button
                        whileHover={{ backgroundColor: 'rgba(34, 197, 94, 0.1)' }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActiveTab('details')}
                        className={`px-4 py-2 text-sm md:text-base transition-all duration-300 ${
                          activeTab === 'details' 
                            ? 'text-green-500 border-b-2 border-green-500' 
                            : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        Project Details
                      </motion.button>
                      <motion.button
                        whileHover={{ backgroundColor: 'rgba(34, 197, 94, 0.1)' }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActiveTab('code')}
                        className={`px-4 py-2 text-sm md:text-base transition-all duration-300 ${
                          activeTab === 'code' 
                            ? 'text-green-500 border-b-2 border-green-500' 
                            : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        Code Snippet
                      </motion.button>
                    </div>
                    
                    {/* Tab Content */}
                    <AnimatePresence mode="wait">
                      {activeTab === 'details' ? (
                        <motion.div 
                          key="details"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-6"
                        >
                          <div>
                            <h4 className="text-lg md:text-xl font-bold text-green-500 mb-3">About this project</h4>
                            <p className="text-gray-300 text-sm md:text-base">
                              {filteredProjects[selectedProject].detailedDescription}
                            </p>
                          </div>
                          
                          <div>
                            <h4 className="text-lg md:text-xl font-bold text-green-500 mb-3">Key Features</h4>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {filteredProjects[selectedProject].keyFeatures.map((feature, i) => (
                                <motion.li 
                                  key={i} 
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: i * 0.1 }}
                                  className="flex items-start gap-2 text-sm md:text-base"
                                >
                                  <Check size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                                  <span className="text-gray-300">{feature}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div 
                          key="code"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-4"
                        >
                          <div>
                            <h4 className="text-lg md:text-xl font-bold text-green-500 mb-3">Implementation Snippet</h4>
                            <div className="bg-black/50 rounded-lg border border-green-500/20 p-4 overflow-x-auto">
                              <pre className="text-gray-300 text-sm font-mono">
                                <code>{filteredProjects[selectedProject].codeSnippet}</code>
                              </pre>
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
                          <motion.span
                            key={i}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ scale: 1.1, backgroundColor: 'rgba(34, 197, 94, 0.2)' }}
                            className="px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-xs md:text-sm"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-lg bg-white/5 border border-green-500/20">
                      <h4 className="text-lg font-bold text-green-500 mb-4">Challenges Solved</h4>
                      <ul className="space-y-3">
                        {filteredProjects[selectedProject].challenges.map((challenge, i) => (
                          <motion.li 
                            key={i} 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-start gap-2 text-sm md:text-base"
                          >
                            <ArrowRight size={16} className="text-green-500 mt-1 flex-shrink-0" />
                            <span className="text-gray-300">{challenge}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex gap-4">
                      <motion.a
                        href={filteredProjects[selectedProject].links.live}
                        whileHover={{ scale: 1.05, backgroundColor: 'rgba(34, 197, 94, 0.3)' }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 py-3 rounded bg-green-500/20 text-green-500 transition-all duration-300 flex items-center justify-center gap-2 text-sm md:text-base"
                      >
                        <ExternalLink size={18} />
                        Live Demo
                      </motion.a>
                      <motion.a
                        href={filteredProjects[selectedProject].links.github}
                        whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 py-3 rounded bg-white/5 hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2 text-sm md:text-base"
                      >
                        <Github size={18} />
                        Source Code
                      </motion.a>
                    </div>
                    
                    {/* Social Actions */}
                    <div className="flex gap-3 justify-center">
                      <motion.button
                        whileHover={{ scale: 1.1, backgroundColor: 'rgba(34, 197, 94, 0.2)' }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsLiked(!isLiked)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isLiked ? 'bg-green-500/30 text-green-500' : 'bg-white/5 text-gray-400'
                        }`}
                      >
                        <Heart size={18} fill={isLiked ? 'currentColor' : 'none'} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1, backgroundColor: 'rgba(34, 197, 94, 0.2)' }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsBookmarked(!isBookmarked)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isBookmarked ? 'bg-green-500/30 text-green-500' : 'bg-white/5 text-gray-400'
                        }`}
                      >
                        <Bookmark size={18} fill={isBookmarked ? 'currentColor' : 'none'} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1, backgroundColor: 'rgba(34, 197, 94, 0.2)' }}
                        whileTap={{ scale: 0.9 }}
                        onClick={shareProject}
                        className="w-10 h-10 rounded-full bg-white/5 text-gray-400 flex items-center justify-center hover:bg-white/10 transition-all duration-300"
                      >
                        <Share2 size={18} />
                      </motion.button>
                    </div>
                    
                    {/* Project Stats */}
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
                          <div className="text-2xl font-bold text-green-500">
                            <Zap size={20} className="inline mr-1" />
                          </div>
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