export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  year?: string;
  category: "Leadership" | "Technology & AI" | "Incubation & Ventures" | "Corporate & Media";
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

export interface IncubatedStartup {
  id: string;
  name: string;
  tagline: string;
  sector: "DeepTech / AI" | "CleanTech & EV" | "CyberSecurity" | "AgriTech" | "FinTech / SaaS";
  stage: "Seed Funded" | "Prototype MVP" | "Accelerated" | "Patent Filed";
  funding: string;
  founders: string[];
  description: string;
  traction: string;
  tags: string[];
  link?: string;
  highlightMetric: string;
}

export interface EventItem {
  id: string;
  title: string;
  subtitle: string;
  category: "Summit" | "Hackathon" | "Pitch Tank" | "Workshop" | "Bootcamp";
  date: string;
  time: string;
  venue: string;
  isSpotlight: boolean;
  status: "Upcoming" | "Completed" | "Live";
  description: string;
  prizePool?: string;
  registrationOpen: boolean;
  image: string;
  fullDetails?: string;
  agenda: { time: string; activity: string }[];
  speakers?: { name: string; role: string; company: string }[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  caption: string;
  date?: string;
  description?: string;
  tags?: string[];
}

// -------------------------------------------------------------
// INCUBATED STARTUPS
// -------------------------------------------------------------
export const INITIAL_STARTUPS: IncubatedStartup[] = [
  {
    id: "neurosense",
    name: "NeuroSense AI",
    tagline: "Ultra-low-power neuromorphic vision processors for autonomous drones",
    sector: "DeepTech / AI",
    stage: "Seed Funded",
    funding: "₹25,00,000 Seed",
    founders: ["Arun Prakash", "Kavya Murugan"],
    description: "Developed in our campus Hardware Sandbox, NeuroSense designs edge AI chips that process computer vision with 80% lower latency than traditional microcontrollers.",
    traction: "Pilot deployment in 4 industrial inspection UAVs; 2 patents filed.",
    tags: ["Edge AI", "Hardware", "Computer Vision", "Patented"],
    highlightMetric: "80% Lower Latency",
  },
  {
    id: "voltsync",
    name: "VoltSync Dynamics",
    tagline: "Intelligent battery health telemetry & thermal throttling for two-wheeler EVs",
    sector: "CleanTech & EV",
    stage: "Accelerated",
    funding: "₹40,00,000 Seed",
    founders: ["Dharun S", "Meenakshi K"],
    description: "Predictive thermal runaway protection firmware and modular battery swapping nodes built for tier-2 and tier-3 fleet operators.",
    traction: "200+ connected battery packs operating across 3 regional campuses.",
    tags: ["EV Telemetry", "Thermal Safety", "Clean Energy"],
    highlightMetric: "200+ Active Nodes",
  },
  {
    id: "kavach-sec",
    name: "Kavach Security",
    tagline: "Continuous automated firmware vulnerability & supply-chain auditor",
    sector: "CyberSecurity",
    stage: "Prototype MVP",
    funding: "₹15,00,000 Grant",
    founders: ["Vigneshwaran R", "Naveen Raj"],
    description: "An AI-guided static binary analyzer that spots zero-day memory leaks and hardcoded cryptographic tokens in IoT firmware pipelines.",
    traction: "Secured top honours at National Cyber Conclave 2025; 18 enterprise audits.",
    tags: ["AppSec", "Firmware", "Static Analysis", "DevSecOps"],
    highlightMetric: "Zero-Day Detector",
  },
  {
    id: "agriflow",
    name: "AgriFlow Robotics",
    tagline: "Autonomous soil microbiome sensing and subsurface precision micro-dosing",
    sector: "AgriTech",
    stage: "Patent Filed",
    funding: "₹30,00,000 Capital",
    founders: ["Senthil Kumar", "Praveen V"],
    description: "Combines subterranean spectral sensors with solar robotic crawlers to cut nitrogen fertilizer wastage by up to 45%.",
    traction: "Active field trial with 120 acres of sugarcane and banana farms.",
    tags: ["Robotics", "Precision Agriculture", "Spectral Sensors"],
    highlightMetric: "45% Fertilizer Saved",
  },
  {
    id: "rapidbyte",
    name: "CampusByte Protocol",
    tagline: "Ultra-fast peer-to-peer campus micropayments & verified credential exchanges",
    sector: "FinTech / SaaS",
    stage: "Seed Funded",
    funding: "₹20,00,000 Seed",
    founders: ["Rohit Varma", "Shreya Natarajan"],
    description: "High-throughput campus micro-ledger eliminating food court transaction bottlenecks and issuing tamper-proof digital degree credentials.",
    traction: "8,500+ active student wallets; ₹1.2 Cr total campus GMV processed.",
    tags: ["Micro-transactions", "Student Fintech", "Instant Settlement"],
    highlightMetric: "8,500+ Daily Users",
  },
  {
    id: "aerodrone",
    name: "AeroHex Innovations",
    tagline: "Long-endurance autonomous tethered hexacopters for emergency disaster connectivity",
    sector: "DeepTech / AI",
    stage: "Prototype MVP",
    funding: "₹18,00,000 Seed Grant",
    founders: ["Karthik Raja", "Abhinav Mohan"],
    description: "Continuous power-over-tether drone systems providing emergency 5G mesh repeaters during cyclone and flood rescue missions.",
    traction: "Successfully tested in state disaster simulation trials.",
    tags: ["Aerospace", "Disaster Tech", "Autonomous Systems"],
    highlightMetric: "72-Hour Continuous Hover",
  },
];

// -------------------------------------------------------------
// EVENTS
// -------------------------------------------------------------
export const INITIAL_EVENTS: EventItem[] = [
  {
    id: "e-summit-2026",
    title: "E-SUMMIT '26: Flagship Entrepreneurship Conclave",
    subtitle: "South India's premier student innovation & angel investment summit",
    category: "Summit",
    date: "OCTOBER 14 - 15, 2026",
    time: "09:00 AM - 06:30 PM IST",
    venue: "Main Innovation Auditorium & Open Conclave Lawns",
    isSpotlight: true,
    status: "Upcoming",
    description: "Two immersive days uniting over 40 venture capitalists, unicorn founders, 80+ student startup stalls, and keynote fireside debates on AI frontier building.",
    prizePool: "₹10,00,000 in Grants & Prizes",
    registrationOpen: true,
    image: "/photos/stage_team_full.webp",
    agenda: [
      { time: "09:30 AM", activity: "Keynote Address: Scaling DeepTech from Dorms to Series A" },
      { time: "11:15 AM", activity: "Venture Conclave: The Angel Syndicate Panel" },
      { time: "02:00 PM", activity: "Live Shark-Tank Arena: Top 10 Student Finalists" },
      { time: "04:30 PM", activity: "Founder Unplugged & Angel Term Sheet Awards" },
    ],
    speakers: [
      { name: "Rahul Singhania", role: "General Partner", company: "Matrix Seed Ventures" },
      { name: "Ananya Deshmukh", role: "Founder & CEO", company: "QuantEdge AI" },
      { name: "K. Balasubramanian", role: "Angel Investor", company: "Titan Syndicate" },
    ],
  },
  {
    id: "hack2build",
    title: "HACK2BUILD: 24-Hour Product Sprint",
    subtitle: "From raw problem statement to deployed MVP in 24 hours",
    category: "Hackathon",
    date: "NOVEMBER 06 - 07, 2026",
    time: "10:00 AM (24 Hours Non-stop)",
    venue: "E-Cell Incubation Sandbox & Hack Hub",
    isSpotlight: true,
    status: "Upcoming",
    description: "An intensive sprint where developers, designers, and business strategists collaborate under mentor supervision to build functional tech MVPs.",
    prizePool: "₹3,50,000 Cash Pool + Cloud Credits",
    registrationOpen: true,
    image: "/photos/workshop_1.webp",
    agenda: [
      { time: "10:00 AM", activity: "Problem Statements Released & Team Hacking Begins" },
      { time: "06:00 PM", activity: "Mentor Checkpoint 1: Architecture Review" },
      { time: "02:00 AM", activity: "Midnight Pitch Refinement & Code Polish" },
      { time: "10:00 AM", activity: "Final Demos to Venture Jury & Live Judging" },
    ],
  },
  {
    id: "pitch-tank-fall",
    title: "Venture Pitch Tank: Angel Syndicate Round",
    subtitle: "Closed-door pitch presentations to active angel investors",
    category: "Pitch Tank",
    date: "NOVEMBER 21, 2026",
    time: "02:00 PM - 06:00 PM",
    venue: "Executive Venture Boardroom & Virtual Stream",
    isSpotlight: false,
    status: "Upcoming",
    description: "Selected cohort startups present their pitch decks, financial projections, and prototype demonstrations directly to accredited angel investors.",
    prizePool: "₹50,00,000 Syndicated Investment Pool",
    registrationOpen: true,
    image: "/photos/stage_team_core.webp",
    agenda: [
      { time: "02:00 PM", activity: "Investor Briefing & Valuation Overview" },
      { time: "02:30 PM", activity: "7-Minute Startup Pitches + 8-Minute Q&A" },
      { time: "05:00 PM", activity: "Term Sheet Negotiations & Mentorship Pairing" },
    ],
  },
  {
    id: "founder-bootcamp",
    title: "Zero-to-One Founder Residency Bootcamp",
    subtitle: "Comprehensive 4-week pre-incubation crash course",
    category: "Bootcamp",
    date: "DECEMBER 02, 2026",
    time: "Weekend Intensive",
    venue: "Innovation Hub Lab 4",
    isSpotlight: false,
    status: "Upcoming",
    description: "Hands-on workshops covering customer discovery, unit economics, incorporation legalities, cap table design, and pitch deck storytelling.",
    prizePool: "Guaranteed Incubation Cohort Entry",
    registrationOpen: true,
    image: "/photos/workshop_2.webp",
    agenda: [
      { time: "Session 1", activity: "Validating Unfair Advantage & Problem Discovery" },
      { time: "Session 2", activity: "Financial Modeling & Unit Economics for Founders" },
      { time: "Session 3", activity: "Patent Drafting & Trademark Protocols" },
    ],
  },
];

// -------------------------------------------------------------
// AUTHENTIC TEAM MEMBERS (Using actual photos)
// -------------------------------------------------------------
export const INITIAL_MEMBERS: TeamMember[] = [
  {
    id: "president",
    name: "Aditya S. Nair",
    role: "President & Student Convenor",
    department: "Computer Science & Engineering",
    category: "Leadership",
    image: "/photos/members/member_president.webp",
    bio: "Driving the vision of E-Cell to nurture student technopreneurs into venture-funded founders. Spearheaded the creation of the Prototyping Sandbox.",
    contribution: "Orchestrated ₹1.2 Cr angel commitments and built strategic partnerships with 15+ VC incubators.",
    skills: ["Venture Strategy", "Angel Syndication", "Product Architecture"],
    socials: { linkedin: "https://linkedin.com", email: "president@ecell.org" },
  },
  {
    id: "vp",
    name: "Shreya Krishnan",
    role: "Vice President & Cohort Director",
    department: "Electronics & Communication",
    category: "Leadership",
    image: "/photos/members/member_vp.webp",
    bio: "Leads cohort evaluation, student founder onboarding, and operational cadence across incubation cycles.",
    contribution: "Scaled cohort applications by 180% and instituted our 4-week Founder Residency.",
    skills: ["Cohort Operations", "Product Discovery", "Growth Analytics"],
    socials: { linkedin: "https://linkedin.com", email: "vp@ecell.org" },
  },
  {
    id: "tech-lead",
    name: "Karthik Subramanian",
    role: "Chief Technology Officer",
    department: "Information Technology",
    category: "Technology & AI",
    image: "/photos/members/member_tech.webp",
    bio: "Architects our internal platform, startup portfolio registry, and leads the campus DeepTech developer network.",
    contribution: "Built open-source telemetry tools utilized by 8 campus student startups.",
    skills: ["Cloud Architecture", "Next.js", "AI Engineering", "Security"],
    socials: { linkedin: "https://linkedin.com", github: "https://github.com" },
  },
  {
    id: "incubation-lead",
    name: "Pooja Sundaram",
    role: "Head of Startup Incubation",
    department: "Mechanical Engineering",
    category: "Incubation & Ventures",
    image: "/photos/members/member_incubation.webp",
    bio: "Manages lab access, rapid prototyping hardware, 3D printing equipment, and patent drafting assistance.",
    contribution: "Helped student founders submit 14 patent applications with 100% initial acceptance.",
    skills: ["Hardware Prototyping", "IP & Patents", "Grant Funding"],
    socials: { linkedin: "https://linkedin.com" },
  },
  {
    id: "corporate-lead",
    name: "Naveen Prasad",
    role: "Head of Corporate Relations & VC",
    department: "Computer Science & Business",
    category: "Corporate & Media",
    image: "/photos/members/member_corporate.webp",
    bio: "Bridges the gap between student startups and institutional venture capital networks and angel syndicates.",
    contribution: "Onboarded 35 angel investors and secured $100k AWS/GCP startup credits for our incubated teams.",
    skills: ["Investor Relations", "Fundraising", "Partnerships"],
    socials: { linkedin: "https://linkedin.com" },
  },
  {
    id: "media-lead",
    name: "Ananya Ramesh",
    role: "Head of Design & Public Relations",
    department: "Artificial Intelligence & Data Science",
    category: "Corporate & Media",
    image: "/photos/members/member_media.webp",
    bio: "Curates the visual identity, brand communications, and digital media presence across all E-Cell publications.",
    contribution: "Grew E-Cell digital community to over 15,000 active student technopreneurs.",
    skills: ["Brand Systems", "Motion Design", "Media Strategy"],
    socials: { linkedin: "https://linkedin.com" },
  },
  {
    id: "operations-lead",
    name: "Dinesh K. Varma",
    role: "Head of Event Operations",
    department: "Civil & Environmental Engineering",
    category: "Leadership",
    image: "/photos/members/member_operations.webp",
    bio: "Supervises large-scale event logistics, stage productions, hackathon infrastructure, and guest accommodations.",
    contribution: "Flawlessly managed logistics for E-Summit with over 2,500 physical delegates.",
    skills: ["Event Architecture", "Budgeting", "Crisis Management"],
    socials: { linkedin: "https://linkedin.com" },
  },
  {
    id: "outreach-lead",
    name: "Harini Balaji",
    role: "Head of Founder Outreach",
    department: "Electrical & Electronics Engineering",
    category: "Incubation & Ventures",
    image: "/photos/members/member_outreach.webp",
    bio: "Scouts cross-department talent and conducts dormitory ideation bootcamps to recruit future founders.",
    contribution: "Conducted 12 department workshops engaging 1,200+ aspiring student founders.",
    skills: ["Community Building", "Talent Scouting", "Workshop Design"],
    socials: { linkedin: "https://linkedin.com" },
  },
];

// -------------------------------------------------------------
// REAL WORKSHOP & CAMPUS GALLERY (Using user photos)
// -------------------------------------------------------------
export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Ideathon & Rapid Prototyping Workshop",
    category: "Workshop",
    imageUrl: "/photos/workshop_1.webp",
    caption: "Student founders collaborating on low-fidelity prototypes during our weekend sprint.",
  },
  {
    id: "gal-2",
    title: "Founder Pitch Arena & Jury Critique",
    category: "Pitch Tank",
    imageUrl: "/photos/workshop_2.webp",
    caption: "Cohort founders defending their business models and unit economics before angel investors.",
  },
  {
    id: "gal-3",
    title: "DeepTech Hardware Mentorship Session",
    category: "Mentorship",
    imageUrl: "/photos/workshop_3.webp",
    caption: "Industry mentors advising student engineers on PCB layouts and sensor integration.",
  },
  {
    id: "gal-4",
    title: "E-Summit Grand Keynote Auditorium",
    category: "Summit",
    imageUrl: "/photos/stage_team_full.webp",
    caption: "The full E-Cell delegation and organizing core committee on stage at the Annual Conclave.",
  },
  {
    id: "gal-5",
    title: "Hands-on Technical Bootcamps",
    category: "Workshop",
    imageUrl: "/photos/workshop_4.webp",
    caption: "Full-house hands-on session focusing on modern AI APIs and edge deployment.",
  },
  {
    id: "gal-6",
    title: "Core Executive Leadership",
    category: "Leadership",
    imageUrl: "/photos/stage_team_core.webp",
    caption: "The core committee leads celebrating the conclusion of the Angel Pitch Day.",
  },
];


// Compatibility exports for Admin panel and APIs
export interface AuditLog {
  id: string;
  action: string;
  details?: string;
  timestamp: string;
  adminUser?: string;
  user?: string;
  ip?: string;
  status?: string;
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

export const initialEvents = INITIAL_EVENTS;
export const initialMembers = INITIAL_MEMBERS;
export const initialGallery = INITIAL_GALLERY;
export const initialInquiries: ContactInquiry[] = [];
export const initialLogs: AuditLog[] = [
  {
    id: "log-1",
    action: "SYSTEM_INITIALIZE",
    details: "E-Cell 2026 Platform Initialized",
    timestamp: new Date().toISOString(),
    adminUser: "System",
  },
];

let _eventsStore: EventItem[] = [...INITIAL_EVENTS];
let _membersStore: TeamMember[] = [...INITIAL_MEMBERS];
let _logsStore: AuditLog[] = [...initialLogs];
let _inquiriesStore: ContactInquiry[] = [];

export function getEvents(): EventItem[] {
  return _eventsStore;
}

export function saveEvent(evt: EventItem): EventItem {
  const index = _eventsStore.findIndex((e) => e.id === evt.id);
  if (index >= 0) {
    _eventsStore[index] = evt;
  } else {
    _eventsStore.push(evt);
  }
  return evt;
}

export function deleteEvent(id: string): boolean {
  _eventsStore = _eventsStore.filter((e) => e.id !== id);
  return true;
}

export function getMembers(): TeamMember[] {
  return _membersStore;
}

export function saveMember(member: TeamMember): TeamMember {
  const index = _membersStore.findIndex((m) => m.id === member.id);
  if (index >= 0) {
    _membersStore[index] = member;
  } else {
    _membersStore.push(member);
  }
  return member;
}

export function deleteMember(id: string): boolean {
  _membersStore = _membersStore.filter((m) => m.id !== id);
  return true;
}

export function addAuditLog(log: Omit<AuditLog, "id" | "timestamp">): AuditLog {
  const newLog: AuditLog = {
    ...log,
    id: `log-${Date.now()}`,
    timestamp: new Date().toISOString(),
  };
  _logsStore.unshift(newLog);
  return newLog;
}

export function addInquiry(inquiry: Omit<ContactInquiry, "id" | "timestamp" | "status">): ContactInquiry {
  const newInq: ContactInquiry = {
    ...inquiry,
    id: `inq-${Date.now()}`,
    timestamp: new Date().toISOString(),
    status: "New",
  };
  _inquiriesStore.unshift(newInq);
  return newInq;
}
