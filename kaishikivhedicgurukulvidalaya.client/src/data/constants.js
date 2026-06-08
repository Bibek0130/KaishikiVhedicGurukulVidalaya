export const whatsappNumber = 9840425631;

// ═══════════════════════════════════════════
// NAVIGATION
// ═══════════════════════════════════════════
export const NAV_ITEMS = [
    { label: "Home", href: "home" },
    { label: "About", href: "about" },
    { label: "Activities", href: "activities" },
    { label: "Believes", href: "believes" },
    { label: "Admission", href: "admission"},
    { label: "Resources", href: "resources" },
    { label: "The Ashram", href: "ashram" },
    { label: "Founder", href: "founder" },
    { label: "Gallery", href: "gallery" },
    { label: "Get Involved", href: "getInvolved" },
    { label: "Contact", href: "contact" },
];

export const SECTION_IDS = [
    "hero", "about", "activities", "believes",
    "resources", "the-ashram", "founder",
    "gallery", "get-involved", "contact",
];

// ═══════════════════════════════════════════
// ACTIVITIES
// ═══════════════════════════════════════════
export const ACTIVITIES = [
    {
        deva: "संस्कृत",
        title: "Sanskrit Pathshala",
        desc: "Daily instruction in Devanagari script, Sanskrit grammar (Ashtadhyayi), and classical literature for children aged 6–18.",
        accent: "saff",
    },
    {
        deva: "वेद",
        title: "Vedic Recitation",
        desc: "Oral transmission of the Vedas with correct Swara and Chhandas, preserving their phonetic integrity across generations.",
        accent: "earth",
    },
    {
        deva: "पूजा",
        title: "Puja & Ritual Services",
        desc: "The ashram performs a wide range of Vedic rituals — from daily Agnihotra to elaborate Yajna ceremonies — for families.",
        accent: "bark",
    },
    {
        deva: "योग",
        title: "Yoga & Pranayama",
        desc: "Daily yoga sadhana, pranayama, and silent meditation to cultivate physical vitality and inner stillness.",
        accent: "saff",
    },
    {
        deva: "अनुस",
        title: "Vedic Research",
        desc: "Scholarly study of Vedic mathematics, Ayurveda, Jyotisha, and other traditional knowledge systems.",
        accent: "earth",
    },
    {
        deva: "सेवा",
        title: "Seva & Community",
        desc: "Students participate in ashram upkeep, garden care, cooking, and service to the surrounding village community.",
        accent: "bark",
    },
];

// ═══════════════════════════════════════════
// BELIEFS
// ═══════════════════════════════════════════
export const BELIEFS = [
    {
        num: "01",
        title: "Education as Enlightenment",
        text: "True education transforms not just the mind but the soul. Every child carries infinite potential that Vedic knowledge is uniquely equipped to awaken.",
    },
    {
        num: "02",
        title: "Sanskrit as Living Heritage",
        text: "Sanskrit is not a dead language — it is the mother of all knowledge systems. Preserving and propagating it is a sacred duty to humanity.",
    },
    {
        num: "03",
        title: "Ritual as Inner Discipline",
        text: "Puja, havan, and daily sadhana are not superstition — they are a precise science of attention, intention, and the training of the heart toward the divine.",
    },
    {
        num: "04",
        title: "Nature as the First Teacher",
        text: "The hill, the river, the morning sky — nature is the oldest classroom. Living close to it teaches patience, humility, and the rhythms of life.",
    },
    {
        num: "05",
        title: "Free Knowledge for All",
        text: "Vidya — knowledge — must never be commodified. Every child, regardless of background, deserves access to the highest wisdom of our tradition.",
    },
    {
        num: "06",
        title: "Simplicity as Strength",
        text: "The fewer the distractions, the deeper the learning. Simple food, simple clothing, and simple living are not limitations — they are liberation.",
    },
];

// ═══════════════════════════════════════════
// RESOURCES
// ═══════════════════════════════════════════
export const RESOURCES = [
    { type: "PDF", typeColor: "saff", title: "Laghu Siddhanta Kaumudi — Sanskrit Grammar Primer", link: "Download →", href:"https://res.cloudinary.com/dcbmawpyb/image/upload/q_auto/f_auto/v1779954697/week_test_1_i6qgau.pdf" },
    { type: "PDF", typeColor: "saff", title: "Daily Puja Vidhi — Step-by-step Guide in Sanskrit & Hindi", link: "Download →", href:"https://res.cloudinary.com/dcbmawpyb/image/upload/q_auto/f_auto/v1779954697/week_test_1_i6qgau.pdf" },
];

// ═══════════════════════════════════════════
// ASHRAM FEATURES
// ═══════════════════════════════════════════
export const ASHRAM_FEATURES = [
    "Residential gurukul with accommodation for students from all backgrounds",
    "Traditional yajnashala for Vedic fire rituals and daily Agnihotra",
    "Library of over 3,000 Sanskrit manuscripts and printed texts",
    "Organic herb garden — students learn Ayurvedic plants and seasonal cultivation",
    "Open-air meditation and yoga pavilion surrounded by forest and birdsong",
    "Ancient Shiva temple on the hill — the spiritual heart of the campus",
    "Community hall for festivals, satsangs, and public discourses",
    "Small goshala — students learn cow care as part of traditional ashram life",
];

export const ASHRAM_TAGS = [
    { bg: "saff-pale", border: "saff-lt", color: "saff", label: "🌿 Hill Location" },
    { bg: "earth-pale", border: "earth-lt", color: "earth", label: "🛕 Near Shiva Temple" },
    { bg: "cream-dark", border: "cream-deep", color: "ink-soft", label: "🌊 Hillside Stream" },
    { bg: "saff-pale", border: "saff-lt", color: "saff", label: "🔥 Daily Agnihotra" },
    { bg: "earth-pale", border: "earth-lt", color: "earth", label: "📚 Manuscript Library" },
];

// ═══════════════════════════════════════════
// GALLERY
// ═══════════════════════════════════════════
export const GALLERY_TABS = ["All", "Ashram", "Students", "Rituals", "Nature", "Videos"];

export const GALLERY_ITEMS = [
    // Photos
    {
        id: 1, type: "photo", tab: "Ashram",
        src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=70",
        caption: "Morning mist over the ashram hill",
        span: "wide",
    },
    {
        id: 2, type: "photo", tab: "Students",
        src: "https://images.unsplash.com/photo-1588072432836-e10032774350?w=600&q=70",
        caption: "Students in morning Sanskrit recitation",
        span: "normal",
    },
    {
        id: 3, type: "photo", tab: "Rituals",
        src: "https://images.unsplash.com/photo-1577495508048-b635879837f1?w=600&q=70",
        caption: "Agnihotra fire ritual at sunrise",
        span: "normal",
    },
    {
        id: 4, type: "photo", tab: "Nature",
        src: "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=800&q=70",
        caption: "The sacred hill at dawn",
        span: "tall",
    },
    {
        id: 5, type: "photo", tab: "Ashram",
        src: "https://images.unsplash.com/photo-1600289031464-74d374b64991?w=600&q=70",
        caption: "Temple courtyard — the heart of campus",
        span: "normal",
    },
    {
        id: 6, type: "photo", tab: "Students",
        src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=70",
        caption: "Children studying in the open-air pavilion",
        span: "normal",
    },
    // Videos
    {
        id: 7, type: "video", tab: "Videos",
        src: "https://www.w3schools.com/html/mov_bbb.mp4",
        thumb: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&q=70",
        caption: "Morning Vedic chanting — full session",
        duration: "12:34",
        span: "normal",
    },
    {
        id: 8, type: "video", tab: "Videos",
        src: "https://www.w3schools.com/html/mov_bbb.mp4",
        thumb: "https://images.unsplash.com/photo-1467173572719-f14b9fb86e5f?w=600&q=70",
        caption: "Rudrabhishek at the ashram temple",
        duration: "28:05",
        span: "normal",
    },
    {
        id: 9, type: "photo", tab: "Rituals",
        src: "https://images.unsplash.com/photo-1562095204-7c5e3b36e2db?w=800&q=70",
        caption: "Lamps lit for Diwali at the ashram",
        span: "wide",
    },
    {
        id: 10, type: "photo", tab: "Nature",
        src: "https://images.unsplash.com/photo-1571994487461-86be1b763df3?w=600&q=70",
        caption: "Forest path leading to meditation grove",
        span: "normal",
    },
    {
        id: 11, type: "photo", tab: "Ashram",
        src: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=600&q=70",
        caption: "View from the ashram at sunrise",
        span: "normal",
    },
    {
        id: 12, type: "video", tab: "Videos",
        src: "https://www.w3schools.com/html/mov_bbb.mp4",
        thumb: "https://images.unsplash.com/photo-1555441377-89c6ea6b42b5?w=600&q=70",
        caption: "Daily life documentary — a week at the ashram",
        duration: "8:22",
        span: "wide",
    },
];

// ═══════════════════════════════════════════
// GET INVOLVED — SCHEMES
// ═══════════════════════════════════════════
export const INVOLVEMENT_SCHEMES = [
    {
        id: "birthday",
        icon: "🎂",
        deva: "जन्मदिन",
        title: "Birthday Blessing Scheme",
        tagline: "Celebrate your day by lighting a lamp of learning",
        desc: "Mark your birthday or that of a loved one by sponsoring a day's meals, books, or ritual materials for the ashram students. The ashram will perform a special puja on that day and send you a personalised blessing letter.",
        options: [
            { label: "Astachiranjibi puja", amount: "NPR 5100", detail: "Perform puja ", feature: [ "astachiranjibi puja from students", "Vhedic pathh from students" ,"feeding all students for a full day" ] },
        ],
        badge: "Most Beloved",
        badgeColor: "saff",
    },
    {
        id: "guardian",
        icon: "🌱",
        deva: "संरक्षक",
        title: "Become a Guardian",
        tagline: "Sponsor a student's entire ashram education",
        desc: "As a Guardian, you fully sponsor one student's education, food, accommodation, and books for an entire year. You receive quarterly letters from your student, a photo, and an invitation to visit the ashram.",
        options: [
            { label: "One Month", amount: "NPR 4,500", detail: "Full sponsorship for 30 days" },
            { label: "Six Months", amount: "NPR 24,000", detail: "Half-year commitment — most popular" },
            { label: "Full Year", amount: "NPR 45,000", detail: "Complete annual guardianship" },
        ],
        badge: "High Impact",
        badgeColor: "earth",
    },
    {
        id: "library",
        icon: "📚",
        deva: "पुस्तकालय",
        title: "Library Patron",
        tagline: "Preserve ancient texts for future generations",
        desc: "Help us digitise, restore, and acquire Sanskrit manuscripts and Vedic texts. Patrons are recognised with a dedicated nameplate in the ashram library and receive a printed copy of one digitised manuscript.",
        options: [
            { label: "Single Text", amount: "NPR 2,000", detail: "Digitisation of one manuscript" },
            { label: "Shelf Sponsor", amount: "NPR 10,000", detail: "Fund an entire shelf of 20 texts" },
            { label: "Named Patron", amount: "NPR 25,000", detail: "Nameplate + 5 manuscript acquisitions" },
        ],
        badge: "Timeless Gift",
        badgeColor: "bark",
    },
    {
        id: "temple",
        icon: "🪔",
        deva: "मन्दिर",
        title: "Temple Seva Scheme",
        tagline: "Keep the sacred flame burning",
        desc: "Support the daily puja, maintenance of the hilltop Shiva temple, and the supply of ritual materials. Donors receive a monthly puja performed in their name and the ashram's blessing.",
        options: [
            { label: "Daily Puja", amount: "NPR 500 / day", detail: "One day's temple ritual materials" },
            { label: "Weekly Seva", amount: "NPR 3,000", detail: "Full week of temple operations" },
            { label: "Monthly Seva", amount: "NPR 11,000", detail: "Complete monthly temple support" },
        ],
        badge: "Sacred Service",
        badgeColor: "saff",
    },
];

// ═══════════════════════════════════════════
// CONTACT
// ═══════════════════════════════════════════
export const CONTACT_DETAILS = [
    {
        icon: "📍",
        label: "Address",
        value: "Near Bhramakhel, Sankhu\nBagmati Province, Nepal",
    },
    {
        icon: "✉️",
        label: "Email",
        value: "kausikhe@bedhgurukul.org",
    },
    {
        icon: "☏",
        label: "Phone / WhatsApp",
        value: "+977 980 000 0000",
        sub: "Available 7–9 am and 5–7 pm only",
    },
    {
        icon: "🛕",
        label: "For Pujas & Rituals",
        value: "puja@bedhgurukul.org",
        sub: "Book at least 7 days in advance",
    },
];

//Ornament Divider
//Ornament Designs
export const T = {
    cream: "#F8F3E8",
    creamDark: "#EDE4CC",
    creamDeep: "#E2D5B8",
    saff: "#C47B2B",
    saffLt: "#F0DFC0",
    saffPale: "#FBF6ED",
    saffWarm: "#D4935A",
    earth: "#5A7845",
    earthLt: "#D4E6C8",
    earthPale: "#EEF5E7",
    bark: "#7A5435",
    barkLt: "#C4A882",
    ink: "#2A1C0C",
    inkMid: "#5A4228",
    inkSoft: "#8A7258",
    border: "rgba(122,84,53,.13)",
    borderSoft: "rgba(122,84,53,.07)",
    white: "#FFFFFF",
    // shadows derived from ink
    shadow: "rgba(42,28,12,.10)",
    shadowMd: "rgba(42,28,12,.16)",
};
export const STATS = [
    { value: 340, label: "Students Enrolled", suffix: "+", icon: "🎓", desc: "Young scholars in residence" },
    { value: 220, label: "Residential Students", suffix: "+", icon: "🏡", desc: "Living & breathing Gurukul life" },
    { value: 48, label: "Cows & Animals", suffix: "", icon: "🐄", desc: "Sacred Goshala & farm family" },
];

export const DAILY_SCHEDULE = [
    { time: "04:30", label: "Brahma Muhurta", icon: "🌙", desc: "Rise before dawn for sacred silence and self-reflection", color: T.bark },
    { time: "05:00", label: "Yoga & Pranayama", icon: "🧘", desc: "Asanas, breathing exercises, and body-mind awakening", color: T.earth },
    { time: "06:00", label: "Vedic Studies", icon: "📿", desc: "Mantras, Sanskrit recitation, and scriptural study", color: T.saff },
    { time: "07:30", label: "Breakfast & Seva", icon: "🍲", desc: "Nutritious sattvic meal followed by collective service", color: T.bark },
    { time: "08:30", label: "School Classes", icon: "📚", desc: "CBSE curriculum — Maths, Science, English, Social Studies", color: T.inkMid },
    { time: "13:00", label: "Lunch & Rest", icon: "🌿", desc: "Wholesome ashram meal and midday restoration", color: T.earth },
    { time: "14:30", label: "Arts & Electives", icon: "🎨", desc: "Music, painting, craft, and vocational skills", color: T.saffWarm },
    { time: "16:00", label: "Sports & Nature", icon: "⚽", desc: "Outdoor games, farming, and nature walks", color: T.earth },
    { time: "17:30", label: "Evening Prayer", icon: "🪔", desc: "Sandhya Vandanam, aarti, and devotional singing", color: T.saff },
    { time: "19:00", label: "Self Study", icon: "📖", desc: "Guided revision, homework, and personal reflection", color: T.barkLt },
    { time: "21:00", label: "Rest", icon: "🌟", desc: "Early sleep for a rested body and a clear mind", color: T.bark },
];

export const ACADEMICS = [
    {
        level: "Primary (I–V)",
        tag: "Ages 6–11",
        subjects: ["Sanskrit & Vedic Chanting", "Mathematics", "English Language", "Hindi", "Environmental Science", "Arts & Crafts", "Yoga & Physical Education"],
        bg: T.earthPale,
        accent: T.earth,
        borderC: `rgba(90,120,69,.22)`,
    },
    {
        level: "Middle (VI–VIII)",
        tag: "Ages 11–14",
        subjects: ["Sanskrit Grammar & Literature", "Mathematics & Science", "Social Studies", "English & Hindi", "Computer Basics", "Music & Fine Arts", "Ayurveda Basics"],
        bg: T.saffPale,
        accent: T.saff,
        borderC: `rgba(196,123,43,.22)`,
    },
    {
        level: "Secondary (IX–X)",
        tag: "Ages 14–16",
        subjects: ["Vedic Philosophy & Ethics", "Mathematics & Science", "Social Science", "English Literature", "Sanskrit Advanced", "Agriculture & Ecology", "Life Skills"],
        bg: "#F5EDE0",
        accent: T.bark,
        borderC: `rgba(122,84,53,.22)`,
    },
];

export const ADMISSION_STEPS = [
    { step: "01", title: "Inquiry", icon: "📬", desc: "Fill the online inquiry form or call the ashram. Our team responds within 48 hours." },
    { step: "02", title: "Visit", icon: "🏛️", desc: "Schedule a campus visit to experience Gurukul life firsthand. Open visits every Saturday." },
    { step: "03", title: "Application", icon: "📝", desc: "Submit the formal application along with the student's previous academic records." },
    { step: "04", title: "Interview", icon: "🤝", desc: "A warm conversation with the student and family to understand values and expectations." },
    { step: "05", title: "Enrollment", icon: "✅", desc: "Confirm admission, complete documentation, and begin your child's Gurukul journey." },
];

export const FAQS = [
    { q: "Is the Gurukul affiliated to any board?", a: "Yes. Kaushiki Baidik Gurukul is CBSE-affiliated and follows the national curriculum while integrating deep Vedic studies alongside." },
    { q: "What is the language of instruction?", a: "Sanskrit and Hindi are primary; English is taught rigorously. Bilingual teaching ensures both traditional and modern fluency." },
    { q: "Are girls admitted to the Gurukul?", a: "Yes. We welcome both boys and girls. Separate residential facilities with trained houseparents ensure a safe and nurturing environment." },
    { q: "Can parents visit during the academic term?", a: "Parents are warmly invited on designated visit days (second Saturday of each month) and during all festival celebrations." },
    { q: "Is prior knowledge of Sanskrit required?", a: "No. Students begin Sanskrit from foundational levels. The immersive environment ensures rapid and joyful mastery of the language." },
];
