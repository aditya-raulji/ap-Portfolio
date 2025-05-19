import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Award, ExternalLink, X, Filter } from 'lucide-react';
import { certifications } from '../data/certificationsData';

const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.color = '#39FF14';
        this.alpha = Math.random() * 0.5 + 0.1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.alpha;
        ctx.fill();
      }
    }

    const particleCount = Math.min(100, Math.floor((canvas.width * canvas.height) / 10000));
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const drawGrid = () => {
      ctx.strokeStyle = '#1A1A1A';
      ctx.lineWidth = 0.3;

      const cellWidth = 80;
      for (let x = 0; x < canvas.width; x += cellWidth) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      const cellHeight = 80;
      for (let y = 0; y < canvas.height; y += cellHeight) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    const connectParticles = () => {
      const maxDistance = 150;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            ctx.beginPath();
            ctx.strokeStyle = '#39FF14';
            ctx.globalAlpha = 0.05 * (1 - distance / maxDistance);
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawGrid();
      for (const particle of particles) {
        particle.update();
        particle.draw();
      }
      connectParticles();
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
      style={{ opacity: 0.7 }}
    />
  );
};

const CertificateCard = ({ certificate, index }) => {
  const [showModal, setShowModal] = useState(false);
  const animationDelay = `${index * 0.1}s`;

  return (
    <>
      <div
        className="group perspective-card animate-fadeIn"
        style={{ animationDelay }}
      >
        <div
          className="relative h-full bg-[#0A0A0A] rounded-xl overflow-hidden transition-all duration-500 transform group-hover:scale-[1.02] certificate-card"
          onClick={() => setShowModal(true)}
        >
          <div className="absolute inset-0 border border-[#39FF14]/20 rounded-xl z-0 card-border"></div>
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#39FF14] to-transparent animate-borderFlow"></div>
          <div className="absolute bottom-0 right-0 w-full h-[2px] bg-gradient-to-l from-transparent via-[#39FF14] to-transparent animate-borderFlow"></div>
          <div className="absolute top-0 right-0 h-full w-[2px] bg-gradient-to-b from-transparent via-[#39FF14] to-transparent animate-borderFlowVertical"></div>
          <div className="absolute top-0 left-0 h-full w-[2px] bg-gradient-to-t from-transparent via-[#39FF14] to-transparent animate-borderFlowVertical"></div>

          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#39FF14] rounded-tl-md"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#39FF14] rounded-tr-md"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#39FF14] rounded-bl-md"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#39FF14] rounded-br-md"></div>

          <div className="relative z-10 p-6 h-full flex flex-col">
            <div className="mb-4">
              <span className="text-xs font-semibold bg-[#39FF14]/10 text-[#39FF14] px-3 py-1 rounded-full">
                {certificate.category}
              </span>
            </div>

            <h3 className="text-xl font-bold text-white group-hover:text-[#39FF14] transition-colors duration-300 mb-3">
              {certificate.name}
            </h3>

            <div className="flex items-center text-gray-400 text-sm mb-4">
              <Award size={16} className="mr-2 text-[#39FF14]" />
              <span>{certificate.issuer}</span>
            </div>

            <div className="flex items-center text-gray-400 text-sm mb-4">
              <Calendar size={16} className="mr-2 text-[#39FF14]" />
              <span>{certificate.date}</span>
            </div>

            <p className="text-gray-400 text-sm flex-grow mb-4">
              {certificate.description.substring(0, 100)}
              {certificate.description.length > 100 ? '...' : ''}
            </p>

            {certificate.expires && (
              <div className="mb-4">
                <div className="flex justify-between mb-1 text-xs">
                  <span className="text-gray-400">Valid for</span>
                  <span className="text-[#39FF14]">{certificate.expiryProgress}%</span>
                </div>
                <div className="h-1.5 w-full bg-[#1E1E1E] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#39FF14] to-[#00FF7F] rounded-full"
                    style={{ width: `${certificate.expiryProgress}%` }}
                  ></div>
                </div>
              </div>
            )}

            <button
              className="w-full py-2 mt-auto border border-[#39FF14]/30 text-[#39FF14] rounded-md
                         hover:bg-[#39FF14]/10 transition-all duration-300 flex items-center justify-center
                         group-hover:shadow-[0_0_15px_rgba(57,255,20,0.3)]"
            >
              <span>View Certificate</span>
              <ExternalLink size={16} className="ml-2" />
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div
            className="bg-[#0A0A0A] border border-[#39FF14]/30 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-auto animate-modalEnter"
          >
            <div className="border-b border-[#1A1A1A] p-4 flex justify-between items-center">
              <h3 className="text-xl font-bold text-white">{certificate.name}</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-[#1A1A1A] transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              <div className="flex flex-col sm:flex-row gap-6 mb-6">
                {certificate.image && (
                  <div className="sm:w-1/3">
                    <div className="bg-[#1A1A1A] p-1 rounded-lg border border-[#39FF14]/20">
                      <img
                        src={certificate.image}
                        alt={certificate.name}
                        className="w-full h-auto rounded-md"
                      />
                    </div>
                  </div>
                )}

                <div className={certificate.image ? "sm:w-2/3" : "w-full"}>
                  <div className="flex items-center text-gray-300 mb-4">
                    <Award size={18} className="mr-2 text-[#39FF14]" />
                    <span className="font-medium">{certificate.issuer}</span>
                  </div>

                  <div className="flex items-center text-gray-300 mb-4">
                    <Calendar size={18} className="mr-2 text-[#39FF14]" />
                    <span>{certificate.date}</span>
                    {certificate.expires && (
                      <span className="ml-2 text-sm text-gray-400">
                        ({certificate.expiryProgress}% valid)
                      </span>
                    )}
                  </div>

                  <p className="text-gray-300 mb-6">{certificate.description}</p>

                  {certificate.skills && (
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-white mb-2">Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {certificate.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-[#1A1A1A] text-[#39FF14] px-3 py-1 rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {certificate.credentialId && (
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-white mb-2">Credential ID</h4>
                  <div className="bg-[#101010] p-3 rounded-md border border-[#1A1A1A]">
                    <code className="text-sm text-gray-300 font-mono">{certificate.credentialId}</code>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-3 mt-6">
                {certificate.verificationUrl && (
                  <a
                    href={certificate.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#39FF14] text-black px-4 py-2 rounded-md font-medium hover:bg-[#00FF7F] transition-colors flex items-center"
                  >
                    Verify Certificate
                    <ExternalLink size={16} className="ml-2" />
                  </a>
                )}

                <button
                  onClick={() => setShowModal(false)}
                  className="border border-[#39FF14]/30 text-[#39FF14] px-4 py-2 rounded-md
                          hover:bg-[#39FF14]/10 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const Certificates = ({ id }) => {
  const [filter, setFilter] = useState('all');
  const categories = ['all', ...new Set(certifications.map(cert => cert.category))];

  const filteredCertifications = filter === 'all'
    ? certifications
    : certifications.filter(cert => cert.category === filter);

  return (
    <div
      id={id}
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#050505] to-[#0A0A0A] py-16"
    >
      <ParticleBackground />

      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-12 text-center">
          <div className="relative inline-block">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 relative z-10">
              Certifications
            </h2>
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#39FF14] to-transparent animate-pulse"></div>
          </div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Professional qualifications and technical certifications that validate my expertise and knowledge in various domains.
          </p>
        </div>

        <div className="flex justify-center mb-10">
          <div className="bg-[#111111] p-2 rounded-full flex items-center border border-[#1A1A1A] shadow-lg">
            <Filter size={18} className="text-[#39FF14] mr-2 ml-3" />
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 rounded-full text-sm transition-all duration-300 mx-1 uppercase ${
                  filter === category
                    ? 'bg-[#1E1E1E] text-[#39FF14] shadow-[0_0_10px_rgba(57,255,20,0.3)]'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCertifications.map((cert, index) => (
            <CertificateCard
              key={cert.id}
              certificate={cert}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Certificates;