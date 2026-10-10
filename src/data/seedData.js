// Seed dataset containing 50 Creators and 50 Brand Briefs for AI Content Creator Marketplace

export const SEED_CREATORS = Array.from({ length: 50 }, (_, index) => {
  const id = `creator-${index + 1}`;
  
  const creatorNames = [
    { name: "Elena Rostova", username: "@elena_ai", title: "Master AI Filmmaker & VFX Artist", loc: "Berlin, Germany" },
    { name: "Marcus Vance", username: "@marcus_vfx", title: "Generative Commercial Director", loc: "Los Angeles, CA" },
    { name: "Aria Chen", username: "@aria_creative", title: "AI Fashion & Surreal Concept Designer", loc: "Tokyo, Japan" },
    { name: "David Miller", username: "@david_sora", title: "Sora & Runway Cinema Pioneer", loc: "London, UK" },
    { name: "Sofia Patel", username: "@sofia_genai", title: "Synthetic Human & Voice Specialist", loc: "Toronto, Canada" },
    { name: "Lucas Sterling", username: "@lucas_comfyui", title: "ComfyUI Workflow Architect", loc: "Austin, TX" },
    { name: "Yuki Tanaka", username: "@yuki_anime", title: "AI Anime & 3D Motion Animator", loc: "Kyoto, Japan" },
    { name: "Mateo Rossi", username: "@mateo_cinematic", title: "Luxury Brand AI Commercial Director", loc: "Milan, Italy" },
    { name: "Chloe Dupont", username: "@chloe_flux", title: "Flux.1 & Midjourney v6 Specialist", loc: "Paris, France" },
    { name: "Zack Kowalski", username: "@zack_motion", title: "GenAI Product Teaser Master", loc: "Warsaw, Poland" },
    { name: "Amara Diallo", username: "@amara_sound", title: "AI Audio & Cinematic Score Producer", loc: "Paris, France" },
    { name: "Julian Thorne", username: "@julian_3d", title: "NeRF & Gaussian Splatting Creator", loc: "San Francisco, CA" },
    { name: "Kaitlyn Wright", username: "@kaitlyn_social", title: "Viral GenAI Short-Form Specialist", loc: "New York, NY" },
    { name: "Vikram Malhotra", username: "@vikram_vfx", title: "AI Visual Effects & Sci-Fi Director", loc: "Mumbai, India" },
    { name: "Nia Brooks", username: "@nia_ai_art", title: "Generative Art & Album Cover Artist", loc: "Chicago, IL" },
    { name: "Soren Lindqvist", username: "@soren_nordic", title: "Nordic Cinematic & Drone AI Creator", loc: "Stockholm, Sweden" },
    { name: "Isabella Cruz", username: "@isabella_beauty", title: "AI Beauty & Cosmetic Campaigner", loc: "Madrid, Spain" },
    { name: "Tariq Al-Mansoor", username: "@tariq_arch", title: "AI Architecture & Spatial Designer", loc: "Dubai, UAE" },
    { name: "Hannah Kim", username: "@hannah_kpop", title: "AI Virtual Idol & Music Video Producer", loc: "Seoul, South Korea" },
    { name: "Oliver Green", username: "@oliver_nature", title: "Generative Wildlife & Eco Filmmaker", loc: "Melbourne, Australia" },
    { name: "Beatrice Silva", username: "@beatrice_meta", title: "Metaverse & Avatar Workflow Architect", loc: "Sao Paulo, Brazil" },
    { name: "Liam O'Connor", username: "@liam_sports", title: "AI Dynamic Sports Commercial Director", loc: "Dublin, Ireland" },
    { name: "Freja Hansen", username: "@freja_minimal", title: "Nordic Minimalist AI Graphics Designer", loc: "Copenhagen, Denmark" },
    { name: "Xavier Blanc", username: "@xavier_luxe", title: "Haute Couture Generative Visualizer", loc: "Lyons, France" },
    { name: "Ananya Roy", username: "@ananya_story", title: "AI Storyboarding & Narrative Director", loc: "Bangalore, India" },
    { name: "Gabriel Santos", username: "@gabriel_neon", title: "Cyberpunk & Synthwave Gen-3 Artist", loc: "Lisbon, Portugal" },
    { name: "Clara Meyer", username: "@clara_food", title: "AI Food & Gastronomy Visual Specialist", loc: "Munich, Germany" },
    { name: "Dante Alieri", username: "@dante_dark", title: "Dark Fantasy & Lore Video Creator", loc: "Florence, Italy" },
    { name: "Maya Lin", username: "@maya_ux_art", title: "AI Brand Identity & Motion System Lead", loc: "Seattle, WA" },
    { name: "Roman Petrov", username: "@roman_3d_ai", title: "Houdini + AI VFX Integrator", loc: "Prague, Czech Republic" },
    { name: "Sienna Taylor", username: "@sienna_wellness", title: "Mindfulness & Spatial AI Visualizer", loc: "Boulder, CO" },
    { name: "Kenji Sato", username: "@kenji_mecha", title: "Generative Mecha & Sci-Fi Animator", loc: "Osaka, Japan" },
    { name: "Leila Haddad", username: "@leila_docu", title: "AI Synthetic Documentary Filmmaker", loc: "Beirut, Lebanon" },
    { name: "Arthur Pendelton", username: "@arthur_retro", title: "70s Retro Film GenAI Specialist", loc: "London, UK" },
    { name: "Camila Ruiz", username: "@camila_travel", title: "AI Virtual Destination Commercials", loc: "Mexico City, Mexico" },
    { name: "Gavin Zhao", username: "@gavin_tech", title: "SaaS & AI Tool Launch Explainer Artist", loc: "Singapore" },
    { name: "Evelyn Frost", username: "@evelyn_ice", title: "Surreal Frozen Landscapes Specialist", loc: "Oslo, Norway" },
    { name: "Nico Williams", username: "@nico_street", title: "Urban Streetwear AI Visual Director", loc: "Atlanta, GA" },
    { name: "Zara Khan", username: "@zara_jewelry", title: "High Jewelry Gen-3 Render Artist", loc: "London, UK" },
    { name: "Tobias Vance", username: "@tobias_lora", title: "Custom LoRA Model & Brand Fine-tuner", loc: "Amsterdam, Netherlands" },
    { name: "Astrid Lindberg", username: "@astrid_fantasy", title: "High Fantasy Worldbuilder & Animator", loc: "Helsinki, Finland" },
    { name: "Carlos Mendoza", username: "@carlos_automotive", title: "AI Hypercar & Automotive Commercials", loc: "Barcelona, Spain" },
    { name: "Seraphina Lee", username: "@seraphina_vocal", title: "AI Character Dubbing & ElevenLabs Pro", loc: "Vancouver, Canada" },
    { name: "Darius Thorne", username: "@darius_cinematic", title: "4K IMAX-Style AI Film Director", loc: "Los Angeles, CA" },
    { name: "Kiran Sharma", username: "@kiran_ecom", title: "E-Commerce GenAI Product Cataloger", loc: "New Delhi, India" },
    { name: "Mila Novak", username: "@mila_aesthetic", title: "Gen-Z Aesthetic & TikTok AI Reels", loc: "Vienna, Austria" },
    { name: "Harrison Forde", username: "@harrison_soundscapes", title: "AI Multi-Layer Sound & VFX Specialist", loc: "Bristol, UK" },
    { name: "Nadia Benali", username: "@nadia_boho", title: "Boho & Sustainable Fashion AI Creator", loc: "Casablanca, Morocco" },
    { name: "Orion Black", username: "@orion_space", title: "Space & Cosmic Generative Visualizer", loc: "Houston, TX" },
    { name: "Zoe Kraviz", username: "@zoe_pop", title: "Pop Culture & Music Album AI Visuals", loc: "Brooklyn, NY" }
  ];

  const toolsPool = [
    ["Runway Gen-3", "Midjourney v6", "ElevenLabs", "ComfyUI"],
    ["OpenAI Sora", "Midjourney v6", "Topaz Gigapixel AI", "Adobe Firefly"],
    ["Flux.1 Dev", "Runway Gen-2", "Stable Diffusion XL", "Sora"],
    ["Pika Labs", "Midjourney v6", "Luma Dream Machine", "Sunno AI"],
    ["ComfyUI", "Custom LoRA", "Stable Video Diffusion", "Magnific AI"],
    ["Midjourney v6", "Kling AI", "Haiper AI", "ElevenLabs"]
  ];

  const skillsPool = [
    ["Character Consistency", "AI VFX", "Prompt Engineering", "Commercial Spots"],
    ["Custom LoRA Fine-Tuning", "ComfyUI Workflows", "Photorealism", "Lip Sync"],
    ["3D Generative Motion", "Sound Design", "High-Fashion Aesthetics", "Color Grading"],
    ["Hypercar Rendering", "Product Teasers", "Temporal Stability", "Audio Dubbing"],
    ["Virtual Influencer Design", "Short-Form Reels", "Sci-Fi CGI", "Brand Integration"]
  ];

  const specsPool = [
    "AI Commercials", "Fashion & Luxury", "Product Visualization", "AI Music Videos", 
    "Short Film & CGI", "E-Commerce AI Ads", "Synthetic Humans", "Anime & Motion"
  ];

  const baseInfo = creatorNames[index];
  const tools = toolsPool[index % toolsPool.length];
  const skills = skillsPool[index % skillsPool.length];
  const specialization = specsPool[index % specsPool.length];
  
  // High ratings 4.7 to 5.0
  const rating = (4.7 + (index * 7 % 31) / 100).toFixed(2);
  const reviewCount = 12 + (index * 13 % 85);
  const hourlyRate = 65 + (index * 11 % 110);
  const projectsCompleted = 15 + (index * 9 % 60);

  const sampleImages = [
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
    "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800&q=80",
    "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&q=80",
    "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
  ];

  return {
    id,
    name: baseInfo.name,
    username: baseInfo.username,
    email: `${baseInfo.username.replace('@', '')}@gmail.com`,
    avatar: `https://i.pravatar.cc/150?img=${(index % 70) + 1}`,
    title: baseInfo.title,
    location: baseInfo.loc,
    rating: parseFloat(rating),
    reviewCount,
    hourlyRate,
    projectsCompleted,
    experienceYears: 2 + (index % 4),
    verified: index % 2 === 0,
    verificationBadge: index % 2 === 0 ? "Verified AI Workflow Pro" : "Rising AI Creator",
    specialization,
    tools,
    skills,
    bio: `Passionate GenAI artist with ${2 + (index % 4)} years of specialized experience in ${specialization}. Creator of viral brand campaigns utilizing ${tools.join(', ')}. Guaranteed prompt lineage, consistency, and full commercial usage rights.`,
    portfolio: [
      {
        id: `port-${index}-1`,
        title: `${specialization} - Hero Spot`,
        image: sampleImages[index % sampleImages.length],
        type: "AI Commercial Video",
        toolsUsed: tools.slice(0, 3),
        promptSnippet: `Cinematic photorealistic 8k render, ${specialization.toLowerCase()} prompt with dynamic lighting, volumetric atmosphere, octane render style --ar 16:9 --v 6.0`,
        aspectRatio: "16:9",
        renderTime: "4.2 hrs",
        aiQualityScore: 94 + (index % 6),
        licensing: "Full Perpetual Commercial Rights",
        description: `High-impact generative visual developed for premium brand client. Clean temporal stability and custom LoRA character consistency.`
      },
      {
        id: `port-${index}-2`,
        title: `Surreal Concept - ${skills[0]}`,
        image: sampleImages[(index + 3) % sampleImages.length],
        type: "Key Art Graphic",
        toolsUsed: [tools[0], "Magnific AI"],
        promptSnippet: `Hyper-detailed neon aesthetic, volumetric lighting, photorealistic textures, masterwork quality, octane lighting --ar 9:16`,
        aspectRatio: "9:16",
        renderTime: "2.1 hrs",
        aiQualityScore: 92 + (index % 7),
        licensing: "Worldwide Commercial License",
        description: `Visual exploration focusing on style transfer and prompt precision.`
      }
    ],
    experience: [
      { year: "2025 - Present", role: "Senior Generative AI Director", company: "Aura Creative Agency", notes: "Lead AI pipeline creation for Fortune 500 campaigns." },
      { year: "2023 - 2025", role: "Freelance AI Filmmaker", company: "Independent", notes: "Delivered over 30+ prompt-to-video commercials using Runway Gen-2/Gen-3." }
    ],
    reviews: [
      { client: "Apex Tech Inc.", rating: 5, comment: "Incredible prompt accuracy and character consistency across 5 video variations!", date: "2 weeks ago" },
      { client: "Vogue Creative Studio", rating: 5, comment: "Delivered 4K ultra-realistic fashion key art ahead of schedule. Exceptional AI workflow.", date: "1 month ago" }
    ]
  };
});

export const SEED_BRIEFS = Array.from({ length: 50 }, (_, index) => {
  const id = `brief-${index + 1}`;

  const brandNames = [
    { name: "Aura Tech Solutions", logo: "⚡", ind: "Technology & SaaS", username: "@auratech" },
    { name: "Luxe Vibe Fashion", logo: "👑", ind: "Haute Couture & Luxury", username: "@luxevibe" },
    { name: "CyberDrive Motors", logo: "🏎️", ind: "Automotive & Mobility", username: "@cyberdrive" },
    { name: "Zenith Beverage Co.", logo: "🥤", ind: "Food & Beverage", username: "@zenithbev" },
    { name: "NeoGaming Studios", logo: "🎮", ind: "Gaming & Esports", username: "@neogaming" },
    { name: "Solstice Skincare", logo: "✨", ind: "Cosmetics & Beauty", username: "@solsticeskin" },
    { name: "HyperSound Music Group", logo: "🎵", ind: "Entertainment", username: "@hypersound" },
    { name: "Quantum Wearables", logo: "⌚", ind: "Consumer Electronics", username: "@quantumwear" },
    { name: "Verde Organic Energy", logo: "🌿", ind: "Wellness & Health", username: "@verdeenergy" },
    { name: "Apex Real Estate AI", logo: "🏢", ind: "Real Estate & ArchViz", username: "@apexrealestate" }
  ];

  const briefTitles = [
    "Futuristic Electric Supercar Reveal Video (30s)",
    "Surreal Botanical Skincare Product Teaser",
    "Cyberpunk Sci-Fi Esports Tournament Intro",
    "Generative AI High-Fashion Runway Commercial",
    "AI Voiceover & Animated Explainer for Cloud App",
    "Hyper-Realistic Luxury Watch 3D Motion Spot",
    "Next-Gen Energy Drink Neon Commercial Reel",
    "AI Synthetic Human Model Fashion Lookbook",
    "Cosmic Space Exploration Album Visualizer",
    "Smart Architectural Home Interior AI Showcase",
    "AI Character Consistency Snack Brand Commercial",
    "Virtual Influencer Travel Campaign Series",
    "Generative AI Music Video for Synthwave Single",
    "Sustainable Eco-Fashion AI Key Art Campaign",
    "AI CGI Water & Liquid Simulation Product Video",
    "Futuristic Smart Drone Delivery Commercial",
    "Stylized Anime Commercial for Japanese Beverage",
    "AI Generative Avatar Explainer for FinTech App",
    "Luxury Diamond Ring Photorealistic AI Render",
    "AI Fantasy RPG Game Trailer (60 Seconds)"
  ];

  const contentTypes = ["AI Video Commercial", "3D Motion Graphic", "Short-Form Social Reel", "Key Art / Poster", "AI Character Animation", "Synthetic Voice + Video"];
  const aspectRatios = ["16:9 Horizontal", "9:16 Vertical Reel", "1:1 Square", "21:9 Ultrawide"];
  const budgets = ["$1,000 - $2,500", "$2,500 - $5,000", "$5,000 - $10,000", "$10,000 - $20,000"];
  const deadlines = ["7 Days", "14 Days", "21 Days", "30 Days"];

  const brandInfo = brandNames[index % brandNames.length];
  const title = briefTitles[index % briefTitles.length] + ` #${index + 1}`;
  const contentType = contentTypes[index % contentTypes.length];
  const aspectRatio = aspectRatios[index % aspectRatios.length];
  const budget = budgets[index % budgets.length];
  const deadline = deadlines[index % deadlines.length];

  const toolsRequired = [
    ["Runway Gen-3", "Midjourney v6", "ElevenLabs"],
    ["OpenAI Sora", "Topaz AI", "ComfyUI"],
    ["Flux.1 Dev", "Luma Dream Machine", "Sunno AI"],
    ["Midjourney v6", "Pika Labs", "Stable Diffusion XL"]
  ][index % 4];

  return {
    id,
    brandName: brandInfo.name,
    brandLogo: brandInfo.logo,
    brandUsername: brandInfo.username,
    brandIndustry: brandInfo.ind,
    title,
    contentType,
    aspectRatio,
    budget,
    deadline,
    status: index % 4 === 0 ? "In Review" : "Open for Bids",
    applicantsCount: 4 + (index * 7 % 22),
    createdAt: `${(index % 7) + 1} days ago`,
    toolsRequired,
    style: "Cinematic, Photorealistic, Hyper-detailed 8K, Volumetric Lighting",
    commercialUse: "Full Worldwide Commercial Distribution Rights + Source Prompt Nodes",
    description: `We are looking for an expert AI Creator to produce a ${contentType.toLowerCase()} titled '${title}'. Must demonstrate high temporal consistency, character control, and mastery of ${toolsRequired.join(' & ')}. Deliverables include 4K rendered video files, source prompts, and commercial asset rights.`,
    requirements: [
      "Must provide prompt history / workflow graph",
      "No flickering or temporal distortion in AI video frames",
      "Include custom sound design / AI vocal generation",
      "Full commercial usage rights upon delivery"
    ]
  };
});
