// ═══════════════════════════════════════════════════════════════
// content.ts - Single source of truth for all site content
// Edit text, numbers, and links here. No need to touch components.
// ═══════════════════════════════════════════════════════════════

export const siteConfig = {
  name: 'Harshil Patadia',
  initials: 'HP',
  title: 'Turning Data & AI into Business Decisions',
  subtitle: 'AI & Strategy | Data-Driven Problem Solving',
  credentialChip: "Queen's Business School · Queen's University Belfast · MSc Business Analytics, 2026",
  email: 'harshilpatadiya8@gmail.com',
  linkedin: 'https://www.linkedin.com/in/harshil-patadia-68762b222/',
  github: 'https://github.com/Harshil173',
  cvUrl: '/Harshil_Patadia_CV.pdf', // ← Place your CV in public/
};

// ═══════════════════════════════════════════
// NAVIGATION
// ═══════════════════════════════════════════

export const navSections = [
  { id: 'executive-summary', label: 'Executive Summary', shortLabel: 'Summary' },
  { id: 'case-files', label: 'Case Files', shortLabel: 'Cases' },
  { id: 'experience', label: 'Operator Experience', shortLabel: 'Experience' },
  { id: 'toolkit', label: 'Toolkit', shortLabel: 'Toolkit' },
  { id: 'credentials', label: 'Credentials', shortLabel: 'Credentials' },
  { id: 'next-steps', label: 'Next Steps', shortLabel: 'Contact' },
];

// ═══════════════════════════════════════════
// KPI STRIP
// ═══════════════════════════════════════════

export interface KpiItem {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
}

export const kpis: KpiItem[] = [
  { value: 3, suffix: '', label: 'Industry roles across AI, automation & development' },
  { value: 70, suffix: '%', label: 'Client queries resolved without human support' },
  { value: 15, suffix: ' hrs', prefix: '~', label: 'Saved per week through automation' },
  { value: 500, suffix: '+', label: 'Voice-AI calls handled per month' },
  { value: 49191, suffix: '', label: 'Survey responses clustered for market segmentation' },
];

// ═══════════════════════════════════════════
// CASE FILES
// ═══════════════════════════════════════════

export interface CaseFile {
  id: string;
  title: string;
  context: string;
  headline: string;
  situation: string;
  complication: string;
  resolution: string;
  impact: string;
  tags: string[];
}

export const caseFiles: CaseFile[] = [
  {
    id: 'tazzo-bikes',
    title: 'Tazzo Bikes Strategy',
    context: 'Drishtikon 2026 Case Competition',
    headline: 'Shifting fleet economics from a 3× cost burden to a scalable peer-sourced model',
    situation:
      'A bike-sharing startup was operating with a cost-to-revenue ratio of approximately 3×, making the current model unsustainable as it scaled.',
    complication:
      'High fleet ownership costs and limited competitive differentiation created margin pressure. Porter\'s Five Forces analysis revealed strong supplier power and rising buyer expectations.',
    resolution:
      'Scored three strategic options - full ownership, hybrid, and peer-sourced fleet - against cost efficiency, scalability, and speed-to-market criteria. Recommended a phased transition to a peer-sourced model with KPIs targeting a cost ratio below 2×.',
    impact:
      'Delivered a phased roadmap with clear milestones and a scored option matrix, giving the startup a data-backed path from a ~3× cost ratio toward the <2× target.',
    tags: ['Strategy', 'Cost Modelling', 'Porter\'s Five Forces', 'Case Competition'],
  },
  {
    id: 'jiosaath',
    title: 'JioSaath Elder-care Service',
    context: 'Reliance TUP XII 2026',
    headline: 'A ₹107 Cr revenue opportunity at just 1% market penetration',
    situation:
      'India\'s rapidly ageing population creates demand for integrated elder-care services, yet few offerings combine telecom, retail, and health platforms.',
    complication:
      'Fragmented service delivery and unclear unit economics made it difficult for Reliance to assess the business case for a bundled elder-care offering.',
    resolution:
      'Pitched JioSaath - an elder-care service built on Jio, Reliance Retail, and Netmeds. Sized the revenue opportunity at ₹107 Cr at 1% penetration of the target market (~3.58M affluent elderly households), modelled unit economics showing ~44% margin, and designed a 1,000-household pilot.',
    impact:
      'Provided a bankable business case with validated unit economics and a low-risk pilot framework to test assumptions before scale-up.',
    tags: ['Market Sizing', 'Unit Economics', 'Business Case', 'Case Competition'],
  },
  {
    id: 'ai-saas',
    title: 'Targeting Smarter',
    context: 'AI SaaS Market Segmentation',
    headline: 'Clustering 49,191 responses to find the segments where AI spend has weak governance',
    situation:
      'An AI SaaS company needed to identify which industry segments to prioritise for go-to-market efforts across 14 industries.',
    complication:
      'With 49,191 survey responses, the raw data was too large and noisy to drive targeting decisions without structured segmentation.',
    resolution:
      'Clustered survey responses across 14 industries on two key dimensions - AI adoption rate and cost governance maturity - to find segments with high AI adoption but weak cost governance. Translated clusters into go-to-market recommendations on pricing strategy, spend visibility, and ROI messaging.',
    impact:
      'Identified priority segments where willingness to invest was high but cost oversight was low - the ideal profile for a cost-governance SaaS product.',
    tags: ['Market Segmentation', 'Clustering', 'Go-to-Market', 'Data Analysis'],
  },
  {
    id: 'gujarat-tourism',
    title: 'Gujarat Tourism Investment Dashboard',
    context: 'Interactive Dashboard Project',
    headline: 'Evaluating ₹6,500 crore of tourism investments for priority allocation',
    situation:
      'Gujarat\'s tourism department needed a structured way to evaluate and prioritise a ₹6,500 crore investment portfolio across multiple categories and regions.',
    complication:
      'Investment data was spread across multiple sources with no unified view, making it difficult to compare opportunities and allocate resources effectively.',
    resolution:
      'Built an interactive dashboard that consolidated all investment data into a filterable, ranked priority view with category and region breakdowns.',
    impact:
      'Enabled stakeholders to quickly identify high-priority investment opportunities and compare trade-offs across categories and regions.',
    tags: ['Dashboard', 'Data Visualisation', 'Investment Analysis', 'Public Sector'],
  },
];

// ═══════════════════════════════════════════
// TAZZO BIKES - INTERACTIVE DATA
// ═══════════════════════════════════════════

export const tazzoStrategicOptions = [
  {
    name: 'Full Ownership',
    description: 'Own and maintain the entire fleet',
    scores: { costEfficiency: 2, scalability: 2, speedToMarket: 3, controlQuality: 5, capitalRequired: 1 },
    recommended: false,
    color: 'var(--color-chart-1)',
  },
  {
    name: 'Hybrid Model',
    description: 'Mix of owned and peer-sourced bikes',
    scores: { costEfficiency: 3, scalability: 4, speedToMarket: 3, controlQuality: 3, capitalRequired: 3 },
    recommended: false,
    color: 'var(--color-chart-3)',
  },
  {
    name: 'Peer-Sourced Fleet',
    description: 'Leverage bike owners as supply partners',
    scores: { costEfficiency: 5, scalability: 5, speedToMarket: 4, controlQuality: 2, capitalRequired: 5 },
    recommended: true,
    color: 'var(--color-chart-2)',
  },
];

export const tazzoScoringCriteria = [
  'costEfficiency',
  'scalability',
  'speedToMarket',
  'controlQuality',
  'capitalRequired',
] as const;

export const tazzoScoringLabels: Record<string, string> = {
  costEfficiency: 'Cost Efficiency',
  scalability: 'Scalability',
  speedToMarket: 'Speed to Market',
  controlQuality: 'Quality Control',
  capitalRequired: 'Capital Efficiency',
};

export const porterForces = [
  { force: 'Supplier Power', intensity: 4 },
  { force: 'Buyer Power', intensity: 3.5 },
  { force: 'Competitive Rivalry', intensity: 4 },
  { force: 'Threat of Substitutes', intensity: 3.5 },
  { force: 'Threat of New Entrants', intensity: 3 },
];

export const tazzoPhases = [
  { phase: 'Phase 1', title: 'Pilot (0–6 mo)', description: 'Launch peer-sourced model in 2 cities, validate unit economics', color: 'var(--color-chart-1)' },
  { phase: 'Phase 2', title: 'Validate (6–12 mo)', description: 'Scale to 5 cities, optimise fleet mix to 60% peer-sourced', color: 'var(--color-chart-3)' },
  { phase: 'Phase 3', title: 'Scale (12–24 mo)', description: 'Expand to 15+ cities, target cost ratio below 2×', color: 'var(--color-chart-2)' },
];

// ═══════════════════════════════════════════
// JIOSAATH - INTERACTIVE DATA
// ═══════════════════════════════════════════

export const jiosaathDefaults = {
  targetMarketHouseholds: 3580000,
  monthlyArpu: 2490,
  penetrationPercent: 1,
  marginPercent: 44,
};

export const jiosaathPilotPhases = [
  { phase: '1', title: 'Select', description: 'Identify 1,000 households across 3 cities matching the affluent-elderly profile', duration: 'Month 1–2' },
  { phase: '2', title: 'Onboard', description: 'Deploy Jio connectivity, Netmeds integration, and Reliance Retail delivery', duration: 'Month 2–4' },
  { phase: '3', title: 'Operate', description: 'Run for 6 months, measure NPS, retention, and cost-per-household', duration: 'Month 4–10' },
  { phase: '4', title: 'Evaluate', description: 'Validate unit economics, refine pricing, and prepare scale-up plan', duration: 'Month 10–12' },
];

// ═══════════════════════════════════════════
// AI SaaS - SCATTER DATA (illustrative)
// ═══════════════════════════════════════════

export interface IndustryCluster {
  id: string;
  industry: string;
  aiAdoption: number;
  costGovernance: number;
  size: number;
  quadrant: 'target' | 'optimise' | 'evangelise' | 'educate';
  recommendation: {
    pricing: string;
    spendVisibility: string;
    roi: string;
  };
}

export const industryClusterData: IndustryCluster[] = [
  // Bottom-Right: High AI Adoption, Weak Governance → PRIMARY TARGET
  { id: 'fintech', industry: 'Fintech', aiAdoption: 82, costGovernance: 28, size: 45, quadrant: 'target',
    recommendation: { pricing: 'Premium tier - high willingness to pay', spendVisibility: 'Critical: fragmented AI spend across teams', roi: 'Lead with cost-per-inference savings' } },
  { id: 'ecommerce', industry: 'E-commerce', aiAdoption: 78, costGovernance: 22, size: 55, quadrant: 'target',
    recommendation: { pricing: 'Usage-based pricing aligned to transaction volume', spendVisibility: 'Multiple AI vendors, low visibility', roi: 'Focus on margin improvement per order' } },
  { id: 'media', industry: 'Media & Entertainment', aiAdoption: 75, costGovernance: 30, size: 35, quadrant: 'target',
    recommendation: { pricing: 'Tiered by content volume', spendVisibility: 'Ad-hoc AI tool adoption', roi: 'Content production cost reduction' } },
  { id: 'gaming', industry: 'Gaming', aiAdoption: 72, costGovernance: 25, size: 30, quadrant: 'target',
    recommendation: { pricing: 'Per-project licensing', spendVisibility: 'R&D budgets poorly tracked', roi: 'Development cycle time reduction' } },

  // Top-Right: High AI, Strong Governance → Optimise
  { id: 'banking', industry: 'Banking', aiAdoption: 80, costGovernance: 78, size: 60, quadrant: 'optimise',
    recommendation: { pricing: 'Enterprise agreement with SLA guarantees', spendVisibility: 'Mature governance, needs optimisation tools', roi: 'Compliance cost reduction' } },
  { id: 'insurance', industry: 'Insurance', aiAdoption: 68, costGovernance: 72, size: 40, quadrant: 'optimise',
    recommendation: { pricing: 'Platform fee + per-policy pricing', spendVisibility: 'Centralised but slow procurement', roi: 'Claims processing efficiency' } },
  { id: 'pharma', industry: 'Pharmaceuticals', aiAdoption: 65, costGovernance: 75, size: 42, quadrant: 'optimise',
    recommendation: { pricing: 'Annual contract with compliance modules', spendVisibility: 'Strong oversight, regulatory-driven', roi: 'Drug discovery pipeline acceleration' } },

  // Top-Left: Low AI, Strong Governance → Evangelise
  { id: 'government', industry: 'Government', aiAdoption: 25, costGovernance: 80, size: 50, quadrant: 'evangelise',
    recommendation: { pricing: 'Proof-of-concept then annual licensing', spendVisibility: 'Strict budgeting, needs ROI justification', roi: 'Citizen service delivery improvement' } },
  { id: 'utilities', industry: 'Utilities', aiAdoption: 30, costGovernance: 70, size: 38, quadrant: 'evangelise',
    recommendation: { pricing: 'Infrastructure-linked pricing', spendVisibility: 'Regulated spend with long approval cycles', roi: 'Operational efficiency gains' } },
  { id: 'manufacturing', industry: 'Manufacturing', aiAdoption: 35, costGovernance: 65, size: 48, quadrant: 'evangelise',
    recommendation: { pricing: 'Per-facility licensing', spendVisibility: 'Distributed sites, centralised budget', roi: 'Predictive maintenance savings' } },

  // Bottom-Left: Low AI, Weak Governance → Educate
  { id: 'agriculture', industry: 'Agriculture', aiAdoption: 18, costGovernance: 20, size: 32, quadrant: 'educate',
    recommendation: { pricing: 'Freemium with premium analytics', spendVisibility: 'Minimal tech budgeting', roi: 'Yield improvement per acre' } },
  { id: 'construction', industry: 'Construction', aiAdoption: 22, costGovernance: 28, size: 36, quadrant: 'educate',
    recommendation: { pricing: 'Per-project SaaS model', spendVisibility: 'Project-based, ad-hoc spending', roi: 'Project timeline and cost predictability' } },
  { id: 'hospitality', industry: 'Hospitality', aiAdoption: 32, costGovernance: 35, size: 34, quadrant: 'educate',
    recommendation: { pricing: 'Per-property monthly subscription', spendVisibility: 'Fragmented across locations', roi: 'Revenue per available room uplift' } },
  { id: 'logistics', industry: 'Logistics', aiAdoption: 42, costGovernance: 38, size: 44, quadrant: 'educate',
    recommendation: { pricing: 'Volume-based pricing', spendVisibility: 'Growing AI spend, limited tracking', roi: 'Route optimisation cost savings' } },
];

// ═══════════════════════════════════════════
// GUJARAT TOURISM - INVESTMENT DATA (illustrative)
// ═══════════════════════════════════════════

export interface TourismInvestment {
  id: string;
  project: string;
  category: string;
  region: string;
  investmentCr: number;
  priorityScore: number;
  status: 'Proposed' | 'In Progress' | 'Approved';
}

export const tourismInvestments: TourismInvestment[] = [
  { id: 't1', project: 'Statue of Unity Eco-Tourism Expansion', category: 'Eco-tourism', region: 'Central Gujarat', investmentCr: 850, priorityScore: 9.2, status: 'In Progress' },
  { id: 't2', project: 'Kutch White Rann Resort Infrastructure', category: 'Heritage', region: 'Kutch', investmentCr: 720, priorityScore: 8.8, status: 'Approved' },
  { id: 't3', project: 'Dwarka Pilgrim Circuit Development', category: 'Pilgrimage', region: 'Saurashtra', investmentCr: 680, priorityScore: 8.5, status: 'In Progress' },
  { id: 't4', project: 'Ahmedabad MICE Convention Centre', category: 'MICE', region: 'Central Gujarat', investmentCr: 920, priorityScore: 8.3, status: 'Proposed' },
  { id: 't5', project: 'Gir National Park Eco-Lodge Network', category: 'Eco-tourism', region: 'Saurashtra', investmentCr: 480, priorityScore: 8.1, status: 'Approved' },
  { id: 't6', project: 'Daman & Diu Beach Tourism Upgrade', category: 'Coastal', region: 'South Gujarat', investmentCr: 560, priorityScore: 7.8, status: 'Proposed' },
  { id: 't7', project: 'Vadodara Heritage Walk & Museum Complex', category: 'Heritage', region: 'Central Gujarat', investmentCr: 350, priorityScore: 7.5, status: 'Approved' },
  { id: 't8', project: 'Saputara Hill Station Modernisation', category: 'Eco-tourism', region: 'South Gujarat', investmentCr: 420, priorityScore: 7.2, status: 'Proposed' },
  { id: 't9', project: 'Rajkot Smart Tourism Infrastructure', category: 'MICE', region: 'Saurashtra', investmentCr: 380, priorityScore: 6.9, status: 'In Progress' },
  { id: 't10', project: 'Patan & Modhera Heritage Circuit', category: 'Heritage', region: 'North Gujarat', investmentCr: 540, priorityScore: 8.0, status: 'Approved' },
  { id: 't11', project: 'Coastal Eco-tourism Corridor', category: 'Coastal', region: 'South Gujarat', investmentCr: 600, priorityScore: 7.6, status: 'Proposed' },
];

// ═══════════════════════════════════════════
// EXPERIENCE / ROLES
// ═══════════════════════════════════════════

export interface Role {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  businessNeed: string;
  whatIDid: string[];
  result: string;
}

export const roles: Role[] = [
  {
    id: 'thrifty-ai',
    title: 'AI Engineer Intern',
    company: 'Thrifty AI',
    location: 'Noida',
    period: 'Jan 2026 – May 2026',
    businessNeed:
      'The company needed to rapidly ship AI features while keeping the engineering team lean and efficient.',
    whatIDid: [
      'Translated product requirements into 5+ AI features delivered end-to-end, coordinating with the engineering team from research through deployment.',
      'Automated engineering workflows and built internal tools using AI tooling (Claude Code, MCP), speeding up team delivery.',
      'Tested and optimised features before release, ensuring reliable, usable outcomes for end users.',
    ],
    result: 'Accelerated feature delivery across the product roadmap while reducing manual engineering overhead.',
  },
  {
    id: 'mind-mingle',
    title: 'AI & Business Automation Engineer',
    company: 'Mind Mingle Media',
    location: 'Ahmedabad',
    period: 'Aug 2025 – Jan 2026',
    businessNeed:
      'The company serviced multiple clients who needed AI-powered communication tools and automated business operations, but lacked pricing clarity and had heavy manual workloads.',
    whatIDid: [
      'Performed per-minute cost analysis of AI call services and built pricing models for 5+ client proposals; presented them in client sales conversations.',
      'Automated 10+ manual business processes (n8n), connecting CRMs, Google Workspace, and third-party tools into unified data pipelines - saving ~15 hrs/week.',
      'Deployed a document-intelligence chatbot that resolved 70% of client queries without human support.',
      'Launched voice AI agents handling 500+ calls/month for scheduling and lead qualification, cutting manual follow-up time by 40%.',
    ],
    result:
      'Transformed the business from manual operations to a scalable, AI-augmented service model - improving margins, client satisfaction, and team capacity.',
  },
  {
    id: 'almashines',
    title: 'Full-Stack Developer Intern',
    company: 'Almashines Technologies',
    location: 'Ahmedabad',
    period: 'Jan 2024 – Jun 2024',
    businessNeed:
      'The platform needed better analytics capabilities and improved database performance to support growing user data.',
    whatIDid: [
      'Built a poll analytics module that turned user response data into structured, decision-ready reports for stakeholders.',
      'Designed a data migration system offloading 50,000+ records from primary tables, improving query performance by ~30%.',
      'Consolidated duplicate user accounts, strengthening data integrity and downstream reporting accuracy.',
    ],
    result:
      'Delivered cleaner data infrastructure and actionable analytics - enabling faster, more reliable stakeholder decisions.',
  },
];

// ═══════════════════════════════════════════
// PRICING PLAYGROUND DEFAULTS
// ═══════════════════════════════════════════

export const pricingDefaults = {
  callMinutesPerMonth: 500,
  costPerMinute: 3.5,
  markupMultiplier: 2.5,
};

// ═══════════════════════════════════════════
// ROI ESTIMATOR DEFAULTS
// ═══════════════════════════════════════════

export const roiDefaults = {
  manualProcesses: 10,
  hoursPerWeekPerProcess: 1.5,
  hourlyRate: 500,
};

// ═══════════════════════════════════════════
// TOOLKIT / SKILLS
// ═══════════════════════════════════════════

export interface Skill {
  name: string;
  usedIn: string[]; // references to role/case IDs
}

export interface SkillGroup {
  category: string;
  description: string;
  skills: Skill[];
}

export const skillGroups: SkillGroup[] = [
  {
    category: 'Consulting & Business',
    description: 'Framing problems, sizing markets, and telling the story with data',
    skills: [
      { name: 'Data Analysis', usedIn: ['ai-saas', 'mind-mingle', 'almashines'] },
      { name: 'Process Mapping', usedIn: ['mind-mingle', 'tazzo-bikes'] },
      { name: 'Market Segmentation', usedIn: ['ai-saas', 'jiosaath'] },
      { name: 'Pricing & Cost Modelling', usedIn: ['mind-mingle', 'jiosaath', 'tazzo-bikes'] },
      { name: 'Requirements Gathering', usedIn: ['thrifty-ai', 'mind-mingle'] },
      { name: 'Stakeholder Presentations', usedIn: ['tazzo-bikes', 'jiosaath', 'gujarat-tourism', 'mind-mingle'] },
    ],
  },
  {
    category: 'Analytics & Tools',
    description: 'Turning raw data into structured, decision-ready outputs',
    skills: [
      { name: 'Excel', usedIn: ['tazzo-bikes', 'jiosaath', 'mind-mingle'] },
      { name: 'PowerPoint', usedIn: ['tazzo-bikes', 'jiosaath', 'mind-mingle'] },
      { name: 'Tableau', usedIn: ['gujarat-tourism', 'ai-saas'] },
      { name: 'Power BI', usedIn: ['gujarat-tourism'] },
      { name: 'Alteryx', usedIn: ['ai-saas'] },
      { name: 'SQL', usedIn: ['almashines', 'ai-saas'] },
      { name: 'Jira', usedIn: ['thrifty-ai', 'almashines'] },
    ],
  },
  {
    category: 'AI & Automation',
    description: 'Building intelligent systems that replace manual work',
    skills: [
      { name: 'LangChain', usedIn: ['mind-mingle', 'thrifty-ai'] },
      { name: 'RAG', usedIn: ['mind-mingle'] },
      { name: 'OpenAI API', usedIn: ['mind-mingle', 'thrifty-ai'] },
      { name: 'Claude Code', usedIn: ['thrifty-ai'] },
      { name: 'n8n', usedIn: ['mind-mingle'] },
      { name: 'Zapier', usedIn: ['mind-mingle'] },
    ],
  },
];

// ═══════════════════════════════════════════
// CREDENTIALS
// ═══════════════════════════════════════════

export interface Education {
  degree: string;
  institution: string;
  campus?: string;
  period: string;
  grade?: string;
}

export const education: Education[] = [
  {
    degree: 'MSc in Business Analytics',
    institution: 'Queen\'s University Belfast',
    campus: 'GIFT City Campus',
    period: 'Feb 2026 – Dec 2026',
    grade: undefined,
  },
  {
    degree: 'B.E. in Computer Engineering',
    institution: 'Government Engineering College, Gandhinagar',
    period: 'Aug 2021 – Jun 2024',
    grade: 'CGPA: 8.24 / 10',
  },
  {
    degree: 'Diploma in Computer Engineering',
    institution: 'R.C. Technical Institute, Ahmedabad',
    period: 'Aug 2018 – Jul 2021',
    grade: 'CGPA: 9.92 / 10',
  },
];

export interface Achievement {
  title: string;
  subtitle: string;
  year?: string;
  icon: 'trophy' | 'certificate' | 'star' | 'rocket';
}

export const achievements: Achievement[] = [
  { title: 'CMI Level 5', subtitle: 'Certificate in Management and Leadership', icon: 'certificate' },
  { title: 'Top 7 Finalist', subtitle: 'National Entrepreneurship Challenge (NEC) 2022, IIT Bombay', year: '2022', icon: 'trophy' },
  { title: '3rd Place', subtitle: 'MesoHacks 2022 - Global Hackathon', year: '2022', icon: 'trophy' },
  { title: 'Selected Participant', subtitle: 'Google Developer Startup Bootcamp 2022', year: '2022', icon: 'rocket' },
  { title: 'Founding Member', subtitle: 'Entrepreneurship Cell, GEC Gandhinagar (2022–2023)', icon: 'star' },
];
