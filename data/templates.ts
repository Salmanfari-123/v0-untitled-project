import type { TemplateType } from "@/contexts/linktree-context"

export type TemplateCategory =
  | "popular"
  | "minimal"
  | "professional"
  | "creative"
  | "colorful"
  | "dark"
  | "elegant"
  | "playful"

export interface TemplateData {
  id: TemplateType
  name: string
  description: string
  category: TemplateCategory[]
  previewImage: string
  isNew?: boolean
  isPremium?: boolean
  features?: string[]
}

// Helper function to generate template preview URL
const getTemplatePreviewUrl = (id: string): string => {
  return `/templates/${id}.png`
}

// Generate 80+ templates
export const templates: TemplateData[] = [
  // Popular templates
  {
    id: "classic",
    name: "Classic",
    description: "Traditional vertical list of links",
    category: ["popular", "minimal"],
    previewImage: getTemplatePreviewUrl("classic"),
    features: ["Clean design", "High click-through rate", "Simple layout"],
  },
  {
    id: "cards",
    name: "Cards",
    description: "Card-based layout with icons",
    category: ["popular", "professional"],
    previewImage: getTemplatePreviewUrl("cards"),
    features: ["Icon support", "Descriptive cards", "Professional look"],
  },
  {
    id: "grid",
    name: "Grid",
    description: "Grid layout for a modern look",
    category: ["popular", "creative"],
    previewImage: getTemplatePreviewUrl("grid"),
    features: ["Compact layout", "Visual focus", "Equal emphasis"],
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean layout with subtle animations",
    category: ["minimal", "elegant"],
    previewImage: getTemplatePreviewUrl("minimal"),
    features: ["Minimalist design", "Subtle animations", "Focus on content"],
  },
  {
    id: "horizontal",
    name: "Horizontal",
    description: "Full-width horizontal links",
    category: ["professional", "elegant"],
    previewImage: getTemplatePreviewUrl("horizontal"),
    features: ["Unique layout", "Full-width design", "Desktop optimized"],
  },

  // New templates - Minimal category
  {
    id: "minimal-mono",
    name: "Minimal Mono",
    description: "Monochromatic minimal design",
    category: ["minimal", "elegant"],
    previewImage: getTemplatePreviewUrl("minimal-mono"),
    isNew: true,
    features: ["Monochrome palette", "Typography focus", "Elegant spacing"],
  },
  {
    id: "minimal-dots",
    name: "Minimal Dots",
    description: "Minimal design with dot navigation",
    category: ["minimal"],
    previewImage: getTemplatePreviewUrl("minimal-dots"),
    features: ["Dot indicators", "Clean layout", "Subtle hover effects"],
  },
  {
    id: "minimal-outline",
    name: "Minimal Outline",
    description: "Clean design with outlined elements",
    category: ["minimal", "elegant"],
    previewImage: getTemplatePreviewUrl("minimal-outline"),
    features: ["Outlined elements", "Lightweight design", "Elegant typography"],
  },
  {
    id: "minimal-shadow",
    name: "Minimal Shadow",
    description: "Minimal design with subtle shadows",
    category: ["minimal"],
    previewImage: getTemplatePreviewUrl("minimal-shadow"),
    features: ["Subtle shadows", "Depth effects", "Clean aesthetic"],
  },
  {
    id: "minimal-text",
    name: "Minimal Text",
    description: "Text-only minimal design",
    category: ["minimal"],
    previewImage: getTemplatePreviewUrl("minimal-text"),
    features: ["Typography focus", "No distractions", "Text animations"],
  },

  // Professional category
  {
    id: "business-card",
    name: "Business Card",
    description: "Professional business card layout",
    category: ["professional"],
    previewImage: getTemplatePreviewUrl("business-card"),
    features: ["Contact info focus", "Professional layout", "Business-ready"],
  },
  {
    id: "corporate",
    name: "Corporate",
    description: "Corporate-style professional template",
    category: ["professional"],
    previewImage: getTemplatePreviewUrl("corporate"),
    features: ["Brand-focused", "Corporate aesthetic", "Professional typography"],
  },
  {
    id: "resume",
    name: "Resume",
    description: "Resume-inspired professional layout",
    category: ["professional"],
    previewImage: getTemplatePreviewUrl("resume"),
    isPremium: true,
    features: ["Skills section", "Experience layout", "Professional bio"],
  },
  {
    id: "portfolio",
    name: "Portfolio",
    description: "Showcase your work professionally",
    category: ["professional", "creative"],
    previewImage: getTemplatePreviewUrl("portfolio"),
    isPremium: true,
    features: ["Work showcase", "Project highlights", "Professional presentation"],
  },
  {
    id: "consultant",
    name: "Consultant",
    description: "Perfect for consultants and experts",
    category: ["professional"],
    previewImage: getTemplatePreviewUrl("consultant"),
    features: ["Expertise highlight", "Service focus", "Professional tone"],
  },

  // Creative category
  {
    id: "artist",
    name: "Artist",
    description: "Showcase your creative work",
    category: ["creative"],
    previewImage: getTemplatePreviewUrl("artist"),
    features: ["Gallery layout", "Artistic design", "Visual focus"],
  },
  {
    id: "photographer",
    name: "Photographer",
    description: "Perfect for photographers",
    category: ["creative", "professional"],
    previewImage: getTemplatePreviewUrl("photographer"),
    isPremium: true,
    features: ["Image showcase", "Portfolio layout", "Visual emphasis"],
  },
  {
    id: "musician",
    name: "Musician",
    description: "Promote your music and events",
    category: ["creative"],
    previewImage: getTemplatePreviewUrl("musician"),
    features: ["Music links", "Event promotion", "Fan engagement"],
  },
  {
    id: "designer",
    name: "Designer",
    description: "Show off your design portfolio",
    category: ["creative", "professional"],
    previewImage: getTemplatePreviewUrl("designer"),
    features: ["Design showcase", "Visual hierarchy", "Portfolio focus"],
  },
  {
    id: "writer",
    name: "Writer",
    description: "Perfect for authors and writers",
    category: ["creative", "professional"],
    previewImage: getTemplatePreviewUrl("writer"),
    features: ["Publication links", "Book showcase", "Reader engagement"],
  },

  // Colorful category
  {
    id: "gradient",
    name: "Gradient",
    description: "Beautiful gradient backgrounds",
    category: ["colorful", "creative"],
    previewImage: getTemplatePreviewUrl("gradient"),
    isNew: true,
    features: ["Vibrant gradients", "Color transitions", "Modern look"],
  },
  {
    id: "neon",
    name: "Neon",
    description: "Bright neon-inspired design",
    category: ["colorful", "creative"],
    previewImage: getTemplatePreviewUrl("neon"),
    features: ["Neon effects", "Vibrant colors", "Night mode optimized"],
  },
  {
    id: "rainbow",
    name: "Rainbow",
    description: "Colorful rainbow-themed template",
    category: ["colorful", "playful"],
    previewImage: getTemplatePreviewUrl("rainbow"),
    features: ["Multi-color scheme", "Playful design", "Vibrant aesthetic"],
  },
  {
    id: "pastel",
    name: "Pastel",
    description: "Soft pastel color palette",
    category: ["colorful", "elegant"],
    previewImage: getTemplatePreviewUrl("pastel"),
    features: ["Soft colors", "Gentle aesthetic", "Calming design"],
  },
  {
    id: "pop-art",
    name: "Pop Art",
    description: "Bold pop art inspired design",
    category: ["colorful", "creative"],
    previewImage: getTemplatePreviewUrl("pop-art"),
    isPremium: true,
    features: ["Bold patterns", "Artistic style", "Eye-catching design"],
  },

  // Dark category
  {
    id: "dark-mode",
    name: "Dark Mode",
    description: "Sleek dark-themed design",
    category: ["dark", "minimal"],
    previewImage: getTemplatePreviewUrl("dark-mode"),
    features: ["Dark background", "Eye-friendly", "Modern aesthetic"],
  },
  {
    id: "midnight",
    name: "Midnight",
    description: "Elegant midnight blue theme",
    category: ["dark", "elegant"],
    previewImage: getTemplatePreviewUrl("midnight"),
    features: ["Deep blue tones", "Night sky aesthetic", "Sophisticated look"],
  },
  {
    id: "hacker",
    name: "Hacker",
    description: "Matrix-inspired dark theme",
    category: ["dark", "creative"],
    previewImage: getTemplatePreviewUrl("hacker"),
    features: ["Terminal aesthetic", "Code-inspired", "Tech vibe"],
  },
  {
    id: "noir",
    name: "Noir",
    description: "Classic black and white theme",
    category: ["dark", "elegant"],
    previewImage: getTemplatePreviewUrl("noir"),
    features: ["Monochrome design", "Film noir inspired", "Timeless look"],
  },
  {
    id: "space",
    name: "Space",
    description: "Cosmic space-themed design",
    category: ["dark", "creative"],
    previewImage: getTemplatePreviewUrl("space"),
    isNew: true,
    features: ["Star field background", "Cosmic aesthetic", "Out of this world"],
  },

  // Elegant category
  {
    id: "serif",
    name: "Serif",
    description: "Elegant serif typography",
    category: ["elegant", "professional"],
    previewImage: getTemplatePreviewUrl("serif"),
    features: ["Serif fonts", "Classic typography", "Timeless design"],
  },
  {
    id: "luxury",
    name: "Luxury",
    description: "Premium luxury-inspired design",
    category: ["elegant", "professional"],
    previewImage: getTemplatePreviewUrl("luxury"),
    isPremium: true,
    features: ["Gold accents", "Premium feel", "Sophisticated design"],
  },
  {
    id: "minimalist",
    name: "Minimalist",
    description: "Ultra-minimal elegant design",
    category: ["elegant", "minimal"],
    previewImage: getTemplatePreviewUrl("minimalist"),
    features: ["Whitespace focus", "Refined typography", "Essential elements only"],
  },
  {
    id: "editorial",
    name: "Editorial",
    description: "Magazine-inspired elegant layout",
    category: ["elegant", "professional"],
    previewImage: getTemplatePreviewUrl("editorial"),
    features: ["Editorial layout", "Typography focus", "Publication style"],
  },
  {
    id: "classic-elegant",
    name: "Classic Elegant",
    description: "Timeless elegant design",
    category: ["elegant"],
    previewImage: getTemplatePreviewUrl("classic-elegant"),
    features: ["Classic elements", "Refined aesthetic", "Timeless appeal"],
  },

  // Playful category
  {
    id: "bubble",
    name: "Bubble",
    description: "Fun bubble-shaped elements",
    category: ["playful", "colorful"],
    previewImage: getTemplatePreviewUrl("bubble"),
    features: ["Bubble buttons", "Playful animations", "Fun interactions"],
  },
  {
    id: "cartoon",
    name: "Cartoon",
    description: "Cartoon-inspired fun design",
    category: ["playful"],
    previewImage: getTemplatePreviewUrl("cartoon"),
    features: ["Cartoon elements", "Fun illustrations", "Playful aesthetic"],
  },
  {
    id: "gaming",
    name: "Gaming",
    description: "Perfect for gamers and streamers",
    category: ["playful", "dark"],
    previewImage: getTemplatePreviewUrl("gaming"),
    isNew: true,
    features: ["Gaming aesthetic", "Stream links", "Gamer-focused"],
  },
  {
    id: "emoji",
    name: "Emoji",
    description: "Fun emoji-themed design",
    category: ["playful", "colorful"],
    previewImage: getTemplatePreviewUrl("emoji"),
    features: ["Emoji icons", "Fun expressions", "Playful communication"],
  },
  {
    id: "retro",
    name: "Retro",
    description: "Nostalgic retro-inspired design",
    category: ["playful", "creative"],
    previewImage: getTemplatePreviewUrl("retro"),
    isPremium: true,
    features: ["Vintage aesthetic", "Retro elements", "Nostalgic feel"],
  },

  // Additional templates to reach 80+
  // I'll add more templates with variations on the existing categories
  {
    id: "tech",
    name: "Tech",
    description: "Modern tech-inspired design",
    category: ["professional", "dark"],
    previewImage: getTemplatePreviewUrl("tech"),
    features: ["Tech aesthetic", "Modern look", "Digital vibe"],
  },
  {
    id: "nature",
    name: "Nature",
    description: "Organic nature-inspired design",
    category: ["elegant", "colorful"],
    previewImage: getTemplatePreviewUrl("nature"),
    features: ["Natural elements", "Organic feel", "Earthy tones"],
  },
  {
    id: "geometric",
    name: "Geometric",
    description: "Bold geometric patterns",
    category: ["creative", "modern"],
    previewImage: getTemplatePreviewUrl("geometric"),
    features: ["Geometric shapes", "Pattern design", "Modern aesthetic"],
  },
  {
    id: "vintage",
    name: "Vintage",
    description: "Classic vintage-inspired design",
    category: ["elegant", "creative"],
    previewImage: getTemplatePreviewUrl("vintage"),
    features: ["Vintage elements", "Classic feel", "Timeless design"],
  },
  {
    id: "3d",
    name: "3D",
    description: "Modern 3D design elements",
    category: ["creative", "modern"],
    previewImage: getTemplatePreviewUrl("3d"),
    isPremium: true,
    features: ["3D elements", "Depth effects", "Modern look"],
  },
  {
    id: "handwritten",
    name: "Handwritten",
    description: "Personal handwritten style",
    category: ["creative", "playful"],
    previewImage: getTemplatePreviewUrl("handwritten"),
    features: ["Script fonts", "Personal touch", "Authentic feel"],
  },
  {
    id: "brutalist",
    name: "Brutalist",
    description: "Raw brutalist web design",
    category: ["creative", "minimal"],
    previewImage: getTemplatePreviewUrl("brutalist"),
    features: ["Raw aesthetic", "Unconventional design", "Bold statement"],
  },
  {
    id: "cyberpunk",
    name: "Cyberpunk",
    description: "Futuristic cyberpunk aesthetic",
    category: ["dark", "creative"],
    previewImage: getTemplatePreviewUrl("cyberpunk"),
    isNew: true,
    features: ["Neon accents", "Futuristic design", "Tech dystopia vibe"],
  },
  {
    id: "vaporwave",
    name: "Vaporwave",
    description: "Retro-futuristic vaporwave style",
    category: ["creative", "colorful"],
    previewImage: getTemplatePreviewUrl("vaporwave"),
    features: ["80s aesthetic", "Retro-future", "Nostalgic colors"],
  },
  {
    id: "glassmorphism",
    name: "Glassmorphism",
    description: "Modern glass effect design",
    category: ["minimal", "modern"],
    previewImage: getTemplatePreviewUrl("glassmorphism"),
    isNew: true,
    features: ["Glass effects", "Transparency", "Modern UI"],
  },
  {
    id: "neumorphism",
    name: "Neumorphism",
    description: "Soft UI neumorphic design",
    category: ["minimal", "modern"],
    previewImage: getTemplatePreviewUrl("neumorphism"),
    features: ["Soft shadows", "3D buttons", "Tactile design"],
  },
  {
    id: "isometric",
    name: "Isometric",
    description: "Isometric design elements",
    category: ["creative", "modern"],
    previewImage: getTemplatePreviewUrl("isometric"),
    isPremium: true,
    features: ["Isometric graphics", "3D perspective", "Unique visual style"],
  },
  {
    id: "memphis",
    name: "Memphis",
    description: "Bold Memphis design style",
    category: ["creative", "playful"],
    previewImage: getTemplatePreviewUrl("memphis"),
    features: ["Bold patterns", "80s inspired", "Playful geometry"],
  },
  {
    id: "abstract",
    name: "Abstract",
    description: "Modern abstract design",
    category: ["creative", "modern"],
    previewImage: getTemplatePreviewUrl("abstract"),
    features: ["Abstract shapes", "Artistic expression", "Modern feel"],
  },
  {
    id: "magazine",
    name: "Magazine",
    description: "Editorial magazine layout",
    category: ["professional", "elegant"],
    previewImage: getTemplatePreviewUrl("magazine"),
    features: ["Editorial design", "Magazine layout", "Professional look"],
  },
  {
    id: "fashion",
    name: "Fashion",
    description: "Stylish fashion-forward design",
    category: ["elegant", "professional"],
    previewImage: getTemplatePreviewUrl("fashion"),
    features: ["Fashion aesthetic", "Trendy design", "Style-focused"],
  },
  {
    id: "travel",
    name: "Travel",
    description: "Perfect for travel content",
    category: ["creative", "professional"],
    previewImage: getTemplatePreviewUrl("travel"),
    features: ["Destination showcase", "Travel aesthetic", "Adventure vibe"],
  },
  {
    id: "food",
    name: "Food",
    description: "Delicious food-themed design",
    category: ["creative", "professional"],
    previewImage: getTemplatePreviewUrl("food"),
    features: ["Culinary focus", "Recipe links", "Food photography"],
  },
  {
    id: "fitness",
    name: "Fitness",
    description: "Energetic fitness design",
    category: ["professional", "modern"],
    previewImage: getTemplatePreviewUrl("fitness"),
    features: ["Workout links", "Energetic design", "Health focus"],
  },
  {
    id: "podcast",
    name: "Podcast",
    description: "Perfect for podcast creators",
    category: ["professional", "creative"],
    previewImage: getTemplatePreviewUrl("podcast"),
    features: ["Episode links", "Audio platform focus", "Listener engagement"],
  },
  {
    id: "video",
    name: "Video",
    description: "Designed for video creators",
    category: ["creative", "professional"],
    previewImage: getTemplatePreviewUrl("video"),
    features: ["Video thumbnails", "Channel links", "Viewer engagement"],
  },
  {
    id: "startup",
    name: "Startup",
    description: "Modern startup landing page",
    category: ["professional", "modern"],
    previewImage: getTemplatePreviewUrl("startup"),
    features: ["Product focus", "Call-to-action", "Conversion optimized"],
  },
  {
    id: "event",
    name: "Event",
    description: "Perfect for events and conferences",
    category: ["professional"],
    previewImage: getTemplatePreviewUrl("event"),
    features: ["Date display", "Registration links", "Schedule information"],
  },
  {
    id: "charity",
    name: "Charity",
    description: "Designed for non-profits",
    category: ["professional", "elegant"],
    previewImage: getTemplatePreviewUrl("charity"),
    features: ["Donation links", "Cause information", "Impact focus"],
  },
  {
    id: "education",
    name: "Education",
    description: "Perfect for educators",
    category: ["professional"],
    previewImage: getTemplatePreviewUrl("education"),
    features: ["Course links", "Resource organization", "Learning focus"],
  },
  {
    id: "medical",
    name: "Medical",
    description: "Professional medical design",
    category: ["professional"],
    previewImage: getTemplatePreviewUrl("medical"),
    features: ["Healthcare focus", "Professional tone", "Trust-building"],
  },
  {
    id: "legal",
    name: "Legal",
    description: "Professional legal design",
    category: ["professional", "elegant"],
    previewImage: getTemplatePreviewUrl("legal"),
    features: ["Practice areas", "Professional tone", "Trust-building"],
  },
  {
    id: "real-estate",
    name: "Real Estate",
    description: "Perfect for realtors",
    category: ["professional"],
    previewImage: getTemplatePreviewUrl("real-estate"),
    features: ["Property links", "Contact information", "Professional image"],
  },
  {
    id: "wedding",
    name: "Wedding",
    description: "Elegant wedding design",
    category: ["elegant", "creative"],
    previewImage: getTemplatePreviewUrl("wedding"),
    features: ["Event details", "Registry links", "Celebration focus"],
  },
  {
    id: "holiday",
    name: "Holiday",
    description: "Festive holiday theme",
    category: ["playful", "creative"],
    previewImage: getTemplatePreviewUrl("holiday"),
    features: ["Seasonal design", "Festive elements", "Holiday spirit"],
  },
  {
    id: "halloween",
    name: "Halloween",
    description: "Spooky Halloween theme",
    category: ["playful", "creative"],
    previewImage: getTemplatePreviewUrl("halloween"),
    features: ["Spooky elements", "Halloween aesthetic", "Seasonal design"],
  },
  {
    id: "winter",
    name: "Winter",
    description: "Cool winter theme",
    category: ["elegant", "creative"],
    previewImage: getTemplatePreviewUrl("winter"),
    features: ["Winter aesthetic", "Snow elements", "Seasonal design"],
  },
  {
    id: "summer",
    name: "Summer",
    description: "Bright summer theme",
    category: ["playful", "colorful"],
    previewImage: getTemplatePreviewUrl("summer"),
    features: ["Summer vibes", "Bright colors", "Seasonal design"],
  },
  {
    id: "spring",
    name: "Spring",
    description: "Fresh spring theme",
    category: ["elegant", "colorful"],
    previewImage: getTemplatePreviewUrl("spring"),
    features: ["Spring colors", "Floral elements", "Fresh aesthetic"],
  },
  {
    id: "autumn",
    name: "Autumn",
    description: "Warm autumn theme",
    category: ["elegant", "colorful"],
    previewImage: getTemplatePreviewUrl("autumn"),
    features: ["Fall colors", "Autumn aesthetic", "Seasonal design"],
  },
  {
    id: "birthday",
    name: "Birthday",
    description: "Fun birthday celebration theme",
    category: ["playful", "colorful"],
    previewImage: getTemplatePreviewUrl("birthday"),
    features: ["Celebration focus", "Fun elements", "Special occasion"],
  },
  {
    id: "baby",
    name: "Baby",
    description: "Sweet baby announcement theme",
    category: ["playful", "elegant"],
    previewImage: getTemplatePreviewUrl("baby"),
    features: ["Announcement focus", "Gentle design", "Family oriented"],
  },
  {
    id: "graduation",
    name: "Graduation",
    description: "Celebration of achievement",
    category: ["elegant", "professional"],
    previewImage: getTemplatePreviewUrl("graduation"),
    features: ["Achievement focus", "Celebration theme", "Professional tone"],
  },
  {
    id: "sports",
    name: "Sports",
    description: "Dynamic sports theme",
    category: ["playful", "professional"],
    previewImage: getTemplatePreviewUrl("sports"),
    features: ["Team colors", "Athletic design", "Dynamic elements"],
  },
  {
    id: "gaming-dark",
    name: "Gaming Dark",
    description: "Dark theme for gamers",
    category: ["dark", "playful"],
    previewImage: getTemplatePreviewUrl("gaming-dark"),
    features: ["Gamer aesthetic", "Dark mode", "Stream integration"],
  },
  {
    id: "gaming-neon",
    name: "Gaming Neon",
    description: "Neon gaming theme",
    category: ["dark", "colorful"],
    previewImage: getTemplatePreviewUrl("gaming-neon"),
    features: ["Neon accents", "Gaming focus", "High-energy design"],
  },
  {
    id: "crypto",
    name: "Crypto",
    description: "Modern cryptocurrency theme",
    category: ["professional", "dark"],
    previewImage: getTemplatePreviewUrl("crypto"),
    features: ["Blockchain aesthetic", "Modern design", "Tech focus"],
  },
  {
    id: "ai",
    name: "AI",
    description: "Futuristic AI theme",
    category: ["professional", "dark"],
    previewImage: getTemplatePreviewUrl("ai"),
    isNew: true,
    features: ["Tech aesthetic", "Futuristic design", "AI focus"],
  },
  {
    id: "minimal-dark",
    name: "Minimal Dark",
    description: "Dark minimal design",
    category: ["minimal", "dark"],
    previewImage: getTemplatePreviewUrl("minimal-dark"),
    features: ["Dark mode", "Minimal design", "Clean aesthetic"],
  },
  {
    id: "minimal-light",
    name: "Minimal Light",
    description: "Light minimal design",
    category: ["minimal", "elegant"],
    previewImage: getTemplatePreviewUrl("minimal-light"),
    features: ["Light mode", "Minimal design", "Clean aesthetic"],
  },
  {
    id: "terminal",
    name: "Terminal",
    description: "Command line inspired design",
    category: ["dark", "creative"],
    previewImage: getTemplatePreviewUrl("terminal"),
    features: ["Command line aesthetic", "Monospace font", "Tech vibe"],
  },
  {
    id: "newspaper",
    name: "Newspaper",
    description: "Classic newspaper layout",
    category: ["elegant", "professional"],
    previewImage: getTemplatePreviewUrl("newspaper"),
    features: ["Editorial layout", "Classic typography", "News aesthetic"],
  },
  {
    id: "notebook",
    name: "Notebook",
    description: "Handwritten notebook style",
    category: ["creative", "playful"],
    previewImage: getTemplatePreviewUrl("notebook"),
    features: ["Paper texture", "Handwritten style", "Personal feel"],
  },
  {
    id: "polaroid",
    name: "Polaroid",
    description: "Vintage photo style",
    category: ["creative", "elegant"],
    previewImage: getTemplatePreviewUrl("polaroid"),
    features: ["Photo frames", "Vintage feel", "Visual focus"],
  },
  {
    id: "scrapbook",
    name: "Scrapbook",
    description: "Fun scrapbook style",
    category: ["creative", "playful"],
    previewImage: getTemplatePreviewUrl("scrapbook"),
    features: ["Collage layout", "Personal touch", "Memory focus"],
  },
  {
    id: "comic",
    name: "Comic",
    description: "Comic book inspired design",
    category: ["creative", "playful"],
    previewImage: getTemplatePreviewUrl("comic"),
    features: ["Comic panels", "Speech bubbles", "Graphic style"],
  },
  {
    id: "pixel",
    name: "Pixel",
    description: "Retro pixel art style",
    category: ["creative", "playful"],
    previewImage: getTemplatePreviewUrl("pixel"),
    features: ["Pixel graphics", "Retro gaming", "8-bit aesthetic"],
  },
  {
    id: "watercolor",
    name: "Watercolor",
    description: "Artistic watercolor design",
    category: ["creative", "elegant"],
    previewImage: getTemplatePreviewUrl("watercolor"),
    features: ["Watercolor effects", "Artistic style", "Soft aesthetic"],
  },
  {
    id: "marble",
    name: "Marble",
    description: "Elegant marble texture design",
    category: ["elegant", "professional"],
    previewImage: getTemplatePreviewUrl("marble"),
    features: ["Marble texture", "Luxury feel", "Elegant design"],
  },
  {
    id: "wood",
    name: "Wood",
    description: "Natural wood texture design",
    category: ["elegant", "creative"],
    previewImage: getTemplatePreviewUrl("wood"),
    features: ["Wood texture", "Natural feel", "Warm aesthetic"],
  },
  {
    id: "concrete",
    name: "Concrete",
    description: "Industrial concrete design",
    category: ["minimal", "professional"],
    previewImage: getTemplatePreviewUrl("concrete"),
    features: ["Concrete texture", "Industrial feel", "Modern design"],
  },
  {
    id: "paper",
    name: "Paper",
    description: "Clean paper texture design",
    category: ["minimal", "elegant"],
    previewImage: getTemplatePreviewUrl("paper"),
    features: ["Paper texture", "Clean feel", "Subtle design"],
  },
]

// Helper function to get all available template categories
export const getTemplateCategories = (): TemplateCategory[] => {
  const categoriesSet = new Set<TemplateCategory>()

  templates.forEach((template) => {
    template.category.forEach((cat) => {
      categoriesSet.add(cat)
    })
  })

  return Array.from(categoriesSet)
}

// Helper function to filter templates by category
export const filterTemplatesByCategory = (category: TemplateCategory | "all"): TemplateData[] => {
  if (category === "all") {
    return templates
  }

  return templates.filter((template) => template.category.includes(category as TemplateCategory))
}

// Helper function to search templates by name or description
export const searchTemplates = (query: string): TemplateData[] => {
  const searchTerm = query.toLowerCase().trim()

  if (!searchTerm) {
    return templates
  }

  return templates.filter(
    (template) =>
      template.name.toLowerCase().includes(searchTerm) || template.description.toLowerCase().includes(searchTerm),
  )
}
