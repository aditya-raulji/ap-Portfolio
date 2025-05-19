export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  category: string;
  date: string;
  description: string;
  image?: string;
  skills?: string[];
  credentialId?: string;
  verificationUrl?: string;
}

export const certifications: Certificate[] = [
  {
    id: "cert1",
    name: "CSS(Basic)",
    issuer: "HackerRank",
    category: "Web",
    date: "15 May 2025",
    description: "This certificate recognizes the successful completion of foundational training in Cascading Style Sheets (CSS).",
    image: "https://ik.imagekit.io/rbdwisvez/Screenshot%202025-05-15%20144929.png?updatedAt=1747658987979",
    skills: ["CSS"],
    
    verificationUrl: "https://www.hackerrank.com/certificates/dbb550684d54"
    
    
  },
  {
    id: "cert2",
    name: "Azure Services Basics",
    issuer: "Microsoft Corporation",
    category: "Cloud",
    date: "19 May 2025",
    description: "This certificate validates the foundational understanding of Microsoft Azure cloud services.",
    image: "https://ik.imagekit.io/rbdwisvez/Screenshot%202025-05-19%20140141.png?updatedAt=1747659345970",
    skills: ["Compute", "Storage", "Security", "Networking", "Databases"],
   
    verificationUrl: "https://ik.imagekit.io/rbdwisvez/Screenshot%202025-05-19%20140141.png?updatedAt=1747659345970",

  },

];