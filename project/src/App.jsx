import React from 'react';
import { Layout } from './components/Layout';  // Importing Layout component
import { Hero } from './components/Hero';       // Importing Hero section
import { Services } from './components/Services'; // Importing Services section
import { Resume } from './components/Resume';   // Importing Resume section
import { Work } from './components/Work';       // Importing Work section
import { Contact } from './components/Contact'; // Importing Contact section
import Contribution from './components/Contribution'; // Importing Contribution section
import Certificates from './components/Certificates'; // Importing Certificates section

// Main App functional component
function App() {
  return (
    // Layout component acts as a wrapper for all page sections
    <Layout>
      {/* Hero section with id matching NavBar href */}
      <Hero id="home" />
      
      {/* Services section with id matching NavBar href */}
      <Services id="services" />
      
      {/* Resume section with id matching NavBar href */}
      <Resume id="resume" />
      
      {/* Contribution section (no id since not in NavBar) */}
      <Contribution />
      
      {/* Work section with id matching NavBar href */}
      <Work id="work-section" />
      
      {/* Certificates section with id matching NavBar href */}
      <Certificates id="certificates" />
      
      {/* Contact section with id matching NavBar href */}
      <Contact id="contact" />
    </Layout>
  );
}

// Exporting App as the default export
export default App;