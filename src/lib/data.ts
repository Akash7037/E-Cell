export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  year?: string;
  category: "Leadership" | "Technology & AI" | "Incubation & Ventures" | "Operations & Logistics" | "Design & Media" | "Faculty";
  image: string;
  bio: string;
  contribution: string;
  skills: string[];
  socials: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    email?: string;
  };
}

export interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  category: "Workshop" | "Ideathon" | "Summit" | "Induction" | "Campus";
  date: string;
  imageUrl: string;
  description: string;
  tags: string[];
}

export interface EventItem {
  id: string;
  title: string;
  subtitle: string;
  category: "Hackathon" | "Workshop" | "Summit" | "Incubation" | "Bootcamp";
  date: string;
  time: string;
  venue: string;
  isSpotlight: boolean;
  status: "Upcoming" | "Completed" | "Live";
  description: string;
  fullDetails: string;
  prizePool?: string;
  registrationOpen: boolean;
  image: string;
  brochureUrl?: string;
  agenda: { time: string; activity: string }[];
  speakers?: { name: string; role: string; company: string }[];
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
  status: "New" | "In Review" | "Resolved";
}

export interface AuditLog {
  id: string;
  action: string;
  user: string;
  timestamp: string;
  ip: string;
  status: "Success" | "Warning" | "Denied";
}

// 20 Team Members
export const initialMembers: TeamMember[] = [
  {
    id: "mem-01",
    name: "K. Vigneshwar",
    role: "President",
    department: "Computer Science & Engineering",
    year: "Final Year",
    category: "Leadership",
    image: "/photos/members/member_president.webp",
    bio: "Pioneering collegiate entrepreneurship at VSBCETC. Coordinates pan-college venture tracks and spearheads the National Entrepreneurship Challenge alliance with IIT Bombay.",
    contribution: "Scaled active student founder community to 500+ members and secured INR 5 Lakhs in initial prototyping support.",
    skills: ["Venture Strategy", "Product Architecture", "Ecosystem Building"],
    socials: { linkedin: "https://linkedin.com", github: "https://github.com", email: "president.ecell@vsbcetc.edu.in" },
  },
  {
    id: "mem-02",
    name: "S. Priyadharshini",
    role: "Vice President & NEC Lead",
    department: "Information Technology",
    year: "Third Year",
    category: "Leadership",
    image: "/photos/members/member_vp.webp",
    bio: "Directs inter-collegiate competitions, mentor pairing, and operational compliance for the National Entrepreneurship Challenge (NEC) track.",
    contribution: "Organized 3-tier ideation sprint camps resulting in 18 competitive project submissions to pan-India competitions.",
    skills: ["Program Operations", "Public Speaking", "Venture Scouting"],
    socials: { linkedin: "https://linkedin.com", email: "vp.ecell@vsbcetc.edu.in" },
  },
  {
    id: "mem-03",
    name: "R. Ashwin Kumar",
    role: "Head of Technology & AI Lab",
    department: "Artificial Intelligence & Data Science",
    year: "Third Year",
    category: "Technology & AI",
    image: "/photos/members/member_tech.webp",
    bio: "Manages technical prototyping sandboxes, cloud compute allocations, and guides student software startups from prototype to production.",
    contribution: "Constructed the digital infrastructure for campus hackathons and advised 8 AI student MVP teams.",
    skills: ["Full Stack Engineering", "Applied LLMs", "Cloud Architecture"],
    socials: { linkedin: "https://linkedin.com", github: "https://github.com" },
  },
  {
    id: "mem-04",
    name: "M. Kavitha",
    role: "Head of Incubation & IP Desk",
    department: "Electronics & Communication",
    year: "Final Year",
    category: "Incubation & Ventures",
    image: "/photos/members/member_incubation.webp",
    bio: "Coordinates patent filings, intellectual property vetting, hardware lab workbenches, and links student makers with industry advisors.",
    contribution: "Guided 3 student hardware engineering teams through provisional patent filings in embedded electronics.",
    skills: ["Patent Documentation", "Hardware Prototyping", "R&D Transfer"],
    socials: { linkedin: "https://linkedin.com", email: "ip.ecell@vsbcetc.edu.in" },
  },
  {
    id: "mem-05",
    name: "T. Saravanan",
    role: "Director of Operations & Logistics",
    department: "Mechanical Engineering",
    year: "Third Year",
    category: "Operations & Logistics",
    image: "/photos/members/member_operations.webp",
    bio: "Oversees campus venue management, technical audio-visual infrastructure, vendor logistics, and visiting investor protocol.",
    contribution: "Directed seamless ground logistics for INNOVATEX with over 800 attending delegates and guest evaluators.",
    skills: ["Logistics Strategy", "Crisis Management", "Resource Optimization"],
    socials: { linkedin: "https://linkedin.com" },
  },
  {
    id: "mem-06",
    name: "N. Harini",
    role: "Head of Corporate Relations & Capital",
    department: "Computer Science & Engineering",
    year: "Third Year",
    category: "Incubation & Ventures",
    image: "/photos/members/member_corporate.webp",
    bio: "Builds relationships with Coimbatore Angel Network, regional incubators, and corporate CSR arms to fund student grants.",
    contribution: "Secured corporate sponsorship deals enabling INR 3,50,000 in student cash prizes and cloud trial grants.",
    skills: ["Investor Pitching", "Corporate Sponsorship", "SLA Negotiation"],
    socials: { linkedin: "https://linkedin.com", email: "corporate@vsbcetc.edu.in" },
  },
  {
    id: "mem-07",
    name: "P. Gokulnath",
    role: "Creative Director & Brand Experience",
    department: "Computer Science & Design",
    year: "Second Year",
    category: "Design & Media",
    image: "/photos/members/member_media.webp",
    bio: "Guards the visual standards of the E-Cell brand. Directs print graphics, UI/UX systems, event staging, and motion media.",
    contribution: "Crafted the brand visual identity and promotional films for INNOVATEX 2026.",
    skills: ["Brand Systems", "Motion Design", "Visual Storytelling"],
    socials: { linkedin: "https://linkedin.com" },
  },
  {
    id: "mem-08",
    name: "D. Ananya",
    role: "PR & Community Evangelist",
    department: "Artificial Intelligence & Data Science",
    year: "Second Year",
    category: "Design & Media",
    image: "/photos/members/member_outreach.webp",
    bio: "Leads social media broadcasts, founder spotlight reels, press correspondence, and student outreach campaigns across Coimbatore colleges.",
    contribution: "Grew Instagram & LinkedIn audience by 340% through documentary storytelling of campus startup founders.",
    skills: ["Social Media Strategy", "Campus Advocacy", "Media Relations"],
    socials: { linkedin: "https://linkedin.com" },
  },
  {
    id: "mem-09",
    name: "S. Naveen",
    role: "AI & Data Solutions Lead",
    department: "Information Technology",
    year: "Third Year",
    category: "Technology & AI",
    image: "/photos/members/member_lead3.webp",
    bio: "Helps student founders evaluate algorithm commercialization, machine learning pipelines, and backend scalability.",
    contribution: "Mentored automated agriculture computer vision models currently piloted in Pollachi farm belts.",
    skills: ["Machine Learning", "FastAPI", "Data Pipeline Engineering"],
    socials: { linkedin: "https://linkedin.com", github: "https://github.com" },
  },
  {
    id: "mem-10",
    name: "B. Deepashri",
    role: "Startup Clinic Coordinator",
    department: "Biomedical Engineering",
    year: "Second Year",
    category: "Incubation & Ventures",
    image: "/photos/members/member_lead4.webp",
    bio: "Organizes weekly 1-on-1 feedback clinics between early-stage ideation students and senior faculty advisors.",
    contribution: "Coordinated 40+ customer discovery advisory sessions during the autumn semester.",
    skills: ["Lean Validation", "Customer Discovery", "HealthTech Protocols"],
    socials: { linkedin: "https://linkedin.com" },
  },
  {
    id: "mem-11",
    name: "A. Sanjay",
    role: "Frontend & Motion Developer",
    department: "Computer Science & Engineering",
    year: "Second Year",
    category: "Technology & AI",
    image: "/photos/members/member_tech.webp",
    bio: "Specializes in kinetic WebGL interfaces, micro-animations, and fluid design implementation for E-Cell applications.",
    contribution: "Built interactive web dashboards used during campus voting and hackathon team registration.",
    skills: ["Three.js", "React / Next.js", "Kinetic Animations"],
    socials: { linkedin: "https://linkedin.com", github: "https://github.com" },
  },
  {
    id: "mem-12",
    name: "V. Pavithra",
    role: "Women In Venture Lead",
    department: "Electrical & Electronics",
    year: "Third Year",
    category: "Leadership",
    image: "/photos/members/member_vp.webp",
    bio: "Directs mentorship, seed grants, and awareness tracks encouraging female engineers to launch scalable technology startups.",
    contribution: "Initiated the Women Founders Colloquium resulting in 12 female-led venture proposals submitted.",
    skills: ["Leadership Advocacy", "Venture Mentorship", "Stakeholder Alignment"],
    socials: { linkedin: "https://linkedin.com" },
  },
  {
    id: "mem-13",
    name: "J. Dhanush",
    role: "Robotics & IoT Prototyping Lead",
    department: "Mechatronics Engineering",
    year: "Third Year",
    category: "Technology & AI",
    image: "/photos/members/member_lead3.webp",
    bio: "Guides student teams through mechanical CAD modeling, PCB milling, 3D printing, and microcontroller integration.",
    contribution: "Set up the 24/7 maker bench with precision 3D printing and oscilloscopes for hardware founders.",
    skills: ["Embedded C++", "CAD Design", "PCB Layout"],
    socials: { linkedin: "https://linkedin.com" },
  },
  {
    id: "mem-14",
    name: "C. Sneha",
    role: "Editorial & Content Strategist",
    department: "Computer Science & Business Systems",
    year: "Second Year",
    category: "Design & Media",
    image: "/photos/members/member_corporate.webp",
    bio: "Author of E-Cell publication digests, startup newsletters, pitch deck narratives, and investor summaries.",
    contribution: "Penned the 2026 INNOVATEX competition brief downloaded over 1,200 times by collegiate teams.",
    skills: ["Pitch Copywriting", "Investor Memorandums", "Content Strategy"],
    socials: { linkedin: "https://linkedin.com" },
  },
  {
    id: "mem-15",
    name: "K. Karthikeyan",
    role: "Hackathon Track Operations",
    department: "Mechanical Engineering",
    year: "Third Year",
    category: "Operations & Logistics",
    image: "/photos/members/member_operations.webp",
    bio: "Coordinates judge allocations, scoring rubric criteria, live timing systems, and participant technical support.",
    contribution: "Managed clockwork execution of the 24-hour non-stop Ideathon 1.0 with zero delays.",
    skills: ["Time Management", "Workflow Automation", "Event Command"],
    socials: { linkedin: "https://linkedin.com" },
  },
  {
    id: "mem-16",
    name: "G. Keerthana",
    role: "Venture Finance & Budgeting",
    department: "Management Studies / B.Tech",
    year: "Third Year",
    category: "Incubation & Ventures",
    image: "/photos/members/member_outreach.webp",
    bio: "Calculates unit economics, cash-flow runaways, and seed budget distributions for incubated ventures.",
    contribution: "Implemented the financial milestone tracking model for seed fund recipients.",
    skills: ["Unit Economics", "Financial Modeling", "Grant Accounting"],
    socials: { linkedin: "https://linkedin.com" },
  },
  {
    id: "mem-17",
    name: "M. Logesh",
    role: "Visual Media & Videography",
    department: "Computer Science & Design",
    year: "Second Year",
    category: "Design & Media",
    image: "/photos/members/member_media.webp",
    bio: "Captures on-ground lab sessions, founder interviews, and crafts cinematic video teasers for social campaigns.",
    contribution: "Filmed and color-graded the viral campus teaser for the National Entrepreneurship Challenge.",
    skills: ["Cinematography", "DaVinci Resolve", "Sound Design"],
    socials: { linkedin: "https://linkedin.com" },
  },
  {
    id: "mem-18",
    name: "R. Dharanidharan",
    role: "Campus Ambassador Network Lead",
    department: "Civil Engineering",
    year: "Second Year",
    category: "Operations & Logistics",
    image: "/photos/members/member_lead1.webp",
    bio: "Manages a network of departmental student liaisons across all academic wings of the autonomous campus.",
    contribution: "Mobilized 250+ first-year student innovators for the inaugural ideation bootcamps.",
    skills: ["Community Mobilization", "Cross-Department Liaison", "Event Outreach"],
    socials: { linkedin: "https://linkedin.com" },
  },
  {
    id: "mem-19",
    name: "Dr. K. Mohanavel",
    role: "Dean of Innovation & Patron",
    department: "Centre for Innovation & Research",
    category: "Faculty",
    image: "/photos/members/member_lead1.webp",
    bio: "Over two decades of academic research, patent filings, and industry collaboration. Championed the autonomous startup credit regulations at VSBCETC.",
    contribution: "Established the official campus incubator policy allowing student founders to count venture progress toward academic credits.",
    skills: ["Institutional Policy", "Government Grants", "Academic Research"],
    socials: { linkedin: "https://linkedin.com", email: "dean.innovation@vsbcetc.edu.in" },
  },
  {
    id: "mem-20",
    name: "Prof. S. Hemalatha",
    role: "Chief Faculty Coordinator",
    department: "Centre for Entrepreneurship",
    category: "Faculty",
    image: "/photos/members/member_lead2.webp",
    bio: "Liaisons directly with government grant committees (Startup India, MSME, NIDHI) and E-Cell IIT Bombay national mentors.",
    contribution: "Mentored over 45 successful student grant applications and state-level business plan wins.",
    skills: ["Grant Advisory", "Student Mentorship", "National Accreditation"],
    socials: { linkedin: "https://linkedin.com", email: "ecell.faculty@vsbcetc.edu.in" },
  },
];

// Initial Gallery Items Store (Managed via Admin)
export const initialGallery: GalleryItem[] = [
  {
    id: "gal-01",
    title: "Flagship Stage Presentation",
    caption: "Full E-Cell Team and Faculty Leadership with 'Ideas Today, Impact Tomorrow' LED Backdrop",
    category: "Summit",
    date: "2026-08-25",
    imageUrl: "/photos/stage_team_full.webp",
    description: "The official launch summit held at the Main Auditorium, unveiling the 2026-2027 innovation roadmap in front of visiting angel investors and collegiate faculty.",
    tags: ["Inauguration", "Faculty", "Leadership"],
  },
  {
    id: "gal-02",
    title: "Student Core Executives",
    caption: "E-Cell VSBCETC Core Team in Official Cream & Obsidian Polos",
    category: "Induction",
    date: "2026-08-25",
    imageUrl: "/photos/stage_team_core.webp",
    description: "The student executive council leading the National Entrepreneurship Challenge delegation on stage after the keynote address.",
    tags: ["Core Team", "NEC Delegation", "Leaders"],
  },
  {
    id: "gal-03",
    title: "Ideation & Customer Problem Sprint",
    caption: "Hands-on Lab Session with Student Founders Testing Lean Business Models",
    category: "Workshop",
    date: "2026-08-25",
    imageUrl: "/photos/workshop_1.webp",
    description: "Engineering innovators collaborating on laptops to formulate customer interview questions and validate unit economics during the 6-hour marathon.",
    tags: ["Ideation", "Computer Lab", "Prototyping"],
  },
  {
    id: "gal-04",
    title: "Software & AI Architecture Bench",
    caption: "Coding and System Design in the Computing Research Centre",
    category: "Workshop",
    date: "2026-08-25",
    imageUrl: "/photos/workshop_2.webp",
    description: "Teams implementing full-stack MVPs and testing cloud database connections with direct guidance from senior peer leads.",
    tags: ["Software", "MVP", "Hands-on"],
  },
  {
    id: "gal-05",
    title: "Peer Pitch Review Clinics",
    caption: "Student Innovators Pitching Prototypes to Fellow Makers",
    category: "Ideathon",
    date: "2026-08-25",
    imageUrl: "/photos/workshop_3.webp",
    description: "Interactive peer critique sessions where founders defended their technical architecture before entering formal evaluation.",
    tags: ["Pitching", "Peer Review", "Collaboration"],
  },
  {
    id: "gal-06",
    title: "Intensive Team Problem Solving",
    caption: "Cross-Disciplinary Teams Developing Applied Hardware & Software Solutions",
    category: "Workshop",
    date: "2026-08-25",
    imageUrl: "/photos/workshop_4.webp",
    description: "Focused collaboration between computer science, mechanical, and electronics students creating unified hardware-software solutions.",
    tags: ["Cross-Discipline", "Teamwork", "Engineering"],
  },
];

// Initial Events Store
export const initialEvents: EventItem[] = [
  {
    id: "innovatex-2026",
    title: "INNOVATEX 2026",
    subtitle: "National Entrepreneurship Challenge (NEC) Campus Round",
    category: "Hackathon",
    date: "2026-10-18",
    time: "09:00 AM - 06:00 PM IST",
    venue: "Main Auditorium & Innovation Lab, VSBCETC Coimbatore",
    isSpotlight: true,
    status: "Upcoming",
    description:
      "The premier flagship entrepreneurship hackathon by VSBCETC E-Cell in partnership with IIT Bombay NEC. Pitch breakthrough deep-tech, sustainability, and software ventures to venture capitalists and startup leaders.",
    fullDetails:
      "INNOVATEX 2026 is designed to accelerate collegiate entrepreneurs from conceptual validation to working prototypes and seed venture funding. Selected teams receive direct fast-track incubation support at the VSBCETC Incubation Hub, equity-free grant access, and mentorship from IIT Bombay alumni entrepreneurs.",
    prizePool: "INR 1,50,000 + Grant Incubation",
    registrationOpen: true,
    image: "/photos/stage_team_full.webp",
    brochureUrl: "/api/brochure",
    agenda: [
      { time: "09:00 AM", activity: "Inaugural Keynote & Lighting of the Lamp" },
      { time: "10:15 AM", activity: "Problem Statement Reveal & 24h Sprint Kickoff" },
      { time: "02:00 PM", activity: "Mid-way Prototype Check-in with VC Mentors" },
      { time: "04:30 PM", activity: "Grand Shark Pitch Finale & Seed Grant Awards" },
    ],
    speakers: [
      { name: "Er. Vigneshwaran S.", role: "Founder & CEO", company: "AeroVenture Labs" },
      { name: "Dr. Lakshmi Narayanan", role: "Venture Partner", company: "Tamil Nadu Seed Fund" },
      { name: "K. Mohan Kumar", role: "Director of Product", company: "HyperScale Mobility" },
    ],
  },
  {
    id: "startup-ignition-1",
    title: "Startup Ignition 1.0",
    subtitle: "Idea Validation & Business Model Prototyping",
    category: "Workshop",
    date: "2026-08-25",
    time: "10:00 AM - 04:30 PM IST",
    venue: "Advanced Computing Centre, VSBCETC",
    isSpotlight: false,
    status: "Completed",
    description:
      "Hands-on workshop teaching 120+ student innovators how to stress-test customer problems, build Lean Canvas architectures, and build rapid functional MVPs in under 6 hours.",
    fullDetails:
      "Conducted by senior product strategists and E-Cell leadership. Over 30 teams presented their initial market research decks, with 5 winning seed testing credits.",
    prizePool: "INR 25,000 MVP Grants",
    registrationOpen: false,
    image: "/photos/workshop_1.webp",
    agenda: [
      { time: "10:00 AM", activity: "Customer Problem Discovery Masterclass" },
      { time: "01:30 PM", activity: "No-Code & Low-Code MVP Sprint" },
      { time: "03:45 PM", activity: "Peer Review & Investor Criteria Checklist" },
    ],
  },
  {
    id: "code-to-company-ai",
    title: "Code-to-Company: AI Venture Lab",
    subtitle: "Commercializing Machine Learning & Applied AI",
    category: "Bootcamp",
    date: "2026-07-14",
    time: "09:30 AM - 05:00 PM IST",
    venue: "AI & Data Science Research Lab, VSBCETC",
    isSpotlight: false,
    status: "Completed",
    description:
      "Specialized weekend sprint helping student developers transition from writing isolated algorithms to packaging SaaS APIs with pricing models, unit economics, and client contracts.",
    fullDetails:
      "Attendees engaged with real corporate datasets and deployed cloud-native agent workflows that automate industrial quality checks and automated financial workflows.",
    prizePool: "Cloud Credits + Incubation",
    registrationOpen: false,
    image: "/photos/workshop_3.webp",
    agenda: [
      { time: "09:30 AM", activity: "Architecting Monetizable AI Products" },
      { time: "01:00 PM", activity: "Building Production Multi-Tenant APIs" },
      { time: "04:00 PM", activity: "Live Enterprise Demo Day" },
    ],
  },
  {
    id: "venture-horizon-summit",
    title: "Venture Horizon Annual Summit",
    subtitle: "Connecting Coimbatore Innovators to Pan-India Capital",
    category: "Summit",
    date: "2026-05-19",
    time: "10:00 AM - 06:00 PM IST",
    venue: "Kovai Convention Hall & VSBCETC Campus",
    isSpotlight: false,
    status: "Completed",
    description:
      "A landmark gathering featuring 40+ collegiate startup exhibits, 15 angel investors, and keynotes by IIT Bombay E-Cell leadership.",
    fullDetails:
      "The summit saw over 800 attendees from across 24 regional institutions, establishing VSBCETC as the entrepreneurial nucleus of western Tamil Nadu.",
    prizePool: "INR 2,00,000 Seed Capital",
    registrationOpen: false,
    image: "/photos/stage_team_core.webp",
    agenda: [
      { time: "10:00 AM", activity: "E-Cell VSBCETC Vision Keynote" },
      { time: "11:45 AM", activity: "Panel: Tier-2 Tech Ecosystems & Global Scale" },
      { time: "02:30 PM", activity: "The Elevator Pitch Coliseum" },
      { time: "05:00 PM", activity: "Award Ceremony & Incubation Signing" },
    ],
  },
];

// Initial Inquiries Store
export const initialInquiries: ContactInquiry[] = [
  {
    id: "inq-01",
    name: "Senthil Nathan",
    email: "senthil.nathan@agritech-vision.io",
    subject: "Incubation Application for Smart Drip Automation",
    message: "We have an early IoT prototype built and tested in Pollachi farms. We are looking for seed incubation support and mentor guidance from E-Cell VSBCETC.",
    timestamp: "2026-09-24 14:15",
    status: "New",
  },
  {
    id: "inq-02",
    name: "Deepa Ramachandran",
    email: "deepa.r@finseed.in",
    subject: "Speaker / Mentor Invitation for INNOVATEX 2026",
    message: "Would love to conduct an investor readiness masterclass for your shortlisted final teams during the October summit.",
    timestamp: "2026-09-23 18:40",
    status: "In Review",
  },
];

// Initial Audit Logs Store
export const initialLogs: AuditLog[] = [
  {
    id: "log-1",
    action: "Admin Portal Authentication",
    user: "superadmin@vsbcetc.edu.in",
    timestamp: "2026-09-24 19:40:12",
    ip: "192.168.1.45",
    status: "Success",
  },
  {
    id: "log-2",
    action: "Event Spotlight Updated (INNOVATEX 2026)",
    user: "superadmin@vsbcetc.edu.in",
    timestamp: "2026-09-24 19:42:05",
    ip: "192.168.1.45",
    status: "Success",
  },
  {
    id: "log-3",
    action: "Failed Login Attempt (Invalid Password)",
    user: "unknown@external.net",
    timestamp: "2026-09-24 17:10:02",
    ip: "45.134.20.11",
    status: "Denied",
  },
];

// Mutatable Stores
let eventsStore = [...initialEvents];
let membersStore = [...initialMembers];
let inquiriesStore = [...initialInquiries];
let logsStore = [...initialLogs];
let galleryStore = [...initialGallery];

export function getEvents(): EventItem[] {
  return eventsStore;
}

export function saveEvent(event: EventItem): EventItem {
  const idx = eventsStore.findIndex((e) => e.id === event.id);
  if (idx >= 0) {
    eventsStore[idx] = event;
  } else {
    eventsStore.unshift(event);
  }
  return event;
}

export function deleteEvent(id: string): boolean {
  const initialLen = eventsStore.length;
  eventsStore = eventsStore.filter((e) => e.id !== id);
  return eventsStore.length < initialLen;
}

export function getMembers(): TeamMember[] {
  return membersStore;
}

export function saveMember(member: TeamMember): TeamMember {
  const idx = membersStore.findIndex((m) => m.id === member.id);
  if (idx >= 0) {
    membersStore[idx] = member;
  } else {
    membersStore.unshift(member);
  }
  return member;
}

export function deleteMember(id: string): boolean {
  const initialLen = membersStore.length;
  membersStore = membersStore.filter((m) => m.id !== id);
  return membersStore.length < initialLen;
}

export function getGallery(): GalleryItem[] {
  return galleryStore;
}

export function saveGalleryItem(item: GalleryItem): GalleryItem {
  const idx = galleryStore.findIndex((g) => g.id === item.id);
  if (idx >= 0) {
    galleryStore[idx] = item;
  } else {
    galleryStore.unshift(item);
  }
  return item;
}

export function deleteGalleryItem(id: string): boolean {
  const initialLen = galleryStore.length;
  galleryStore = galleryStore.filter((g) => g.id !== id);
  return galleryStore.length < initialLen;
}

export function getInquiries(): ContactInquiry[] {
  return inquiriesStore;
}

export function addInquiry(inquiry: Omit<ContactInquiry, "id" | "timestamp" | "status">): ContactInquiry {
  const newInq: ContactInquiry = {
    ...inquiry,
    id: `inq-${Date.now().toString(36)}`,
    timestamp: new Date().toISOString().replace("T", " ").substring(0, 16),
    status: "New",
  };
  inquiriesStore.unshift(newInq);
  return newInq;
}

export function updateInquiryStatus(id: string, status: ContactInquiry["status"]) {
  const item = inquiriesStore.find((i) => i.id === id);
  if (item) item.status = status;
}

export function getLogs(): AuditLog[] {
  return logsStore;
}

export function addAuditLog(entry: Omit<AuditLog, "id" | "timestamp">) {
  const log: AuditLog = {
    ...entry,
    id: `log-${Date.now()}`,
    timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
  };
  logsStore.unshift(log);
  if (logsStore.length > 50) logsStore.pop();
}
