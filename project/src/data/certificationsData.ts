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
    id:               "cert1",
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
   
    verificationUrl: "https://simpli-web.app.link/e/ZIfUts7DxTb",

  }, 
{
  id: "cart3",
  name: "GitHub Copilot Fundamentals",
  issuer: "Microsoft (via Simplilearn SkillUp)",
  category: "Developer Tools / AI Pair Programming",
  date: "20 May 2025",
  description: "This certificate acknowledges that Aditya Raulji has successfully completed the online course 'GitHub Copilot Fundamentals'. The course is designed to deepen skills in using GitHub Copilot effectively for coding assistance and AI-powered development productivity.",
  image: "https://ik.imagekit.io/esmv2pqgj/Screenshot%202025-05-20%20145448.png?updatedAt=1747802170629",
  skills: [
    "GitHub Copilot",
    "AI-assisted coding",
    "Developer Productivity",
    "GitHub Tools",
    "Programming Fundamentals"
  ],
  verificationUrl: "https://simpli-web.app.link/e/guv5781DxTb"
}



];