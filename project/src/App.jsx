import React from 'react';
import { Layout } from './components/Layout';  // Importing Layout component from components directory
import { Hero } from './components/Hero';       // Importing Hero section component
import { Services } from './components/Services'; // Importing Services section component
import { Resume } from './components/Resume';   // Importing Resume section component
import { Work } from './components/Work';       // Importing Work section component
import { Contact } from './components/Contact'; // Importing Contact section component

// Main App functional component
function App() {
  return (
    // Layout component acts as a wrapper for all page sections
    <Layout>
      {/* Hero section - typically the landing/welcome area */}
      <Hero />
      
      {/* Services section - likely listing offered services */}
      <Services />
      
      {/* Resume section - probably showing experience/education */}
      <Resume />
      
      {/* Work section - might display portfolio/projects */}
      <Work />
      
      {/* Contact section - likely containing contact form/info */}
      <Contact />
    </Layout>
  );
}

// Exporting App as the default export
export default App;