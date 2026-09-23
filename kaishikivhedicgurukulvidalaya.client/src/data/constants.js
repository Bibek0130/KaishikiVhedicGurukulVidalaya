export const whatsappNumber = 9840425631;
export const contactNumber = 9851234199
// NOTE: reconciled from three inconsistent variants in circulation across the
// site (a misspelled "gmial.com" address here, and a separate
// "kausikhe@bedhgurukul.org" below). The real domain cannot be verified from
// available context, so this assumes the intended domain was gmail.com.
export const email = "kaushikibaidikgurukul@gmail.com";
// Corrected against the institution's own official profile document
// (Sept 2026): the ashram operates at the Bhimeshwar Temple premises,
// Kageshwori Manohara-1, Kathmandu — not "Sankhu/Bhramakhel" as the
// placeholder site previously said.
export const address = "Bhimeshwar Mandir, Subedi Gau, Kageshwori Manohara-1, Kathmandu";

export const mapUrl ="https://maps.app.goo.gl/bpsf1V8ynxhpMTSE9"

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
// BELIEFS — the Vedic Research Committee's own stated Main Objectives
// for the Gurukul, from its official institutional profile document.
// ═══════════════════════════════════════════
export const BELIEFS = [
    {
        num: "01",
        title: "Preserving Vedic & Ritual Tradition",
        text: "To preserve, promote, and practice Vedic and ritual traditions.",
    },
    {
        num: "02",
        title: "Character & Ethical Values",
        text: "To develop morality, discipline, service, responsibility, and ethical values in children.",
    },
    {
        num: "03",
        title: "Sanskrit & Vedic Study",
        text: "To teach Sanskrit language, the Vedas, rituals, and Eastern philosophy.",
    },
    {
        num: "04",
        title: "A Vedic Way of Life",
        text: "To familiarize children with Vedic values, culture, and way of life.",
    },
    {
        num: "05",
        title: "Carrying Knowledge Forward",
        text: "To pass ancient Vedic knowledge, culture, and tradition on to the new generation.",
    },
    {
        num: "06",
        title: "Spiritual & Self-Discipline",
        text: "To develop spiritual consciousness, self-discipline, cooperation, and a spirit of service in children.",
    },
    {
        num: "07",
        title: "Service-Oriented Citizens",
        text: "To create disciplined, responsible, service-oriented manpower for society and the nation.",
    },
    {
        num: "08",
        title: "Rescuing Disappearing Knowledge",
        text: "To preserve and promote Vedic knowledge, values, and cultural practices that are gradually disappearing.",
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
// ASHRAM FEATURES — kept honest against the institution's own official
// profile: the campus is genuinely simple today, and a library, ritual
// hall, and permanent buildings are stated as future goals, not current
// features. Overselling that as already-built was inaccurate.
// ═══════════════════════════════════════════
export const ASHRAM_FEATURES = [
    "Residential gurukul for grades 4–8, ages 8–15",
    "A simple current campus — a tin-roof, cement-board building with one open-air classroom",
    "A small goshala of 6 cows (3 mothers, 3 calves), cared for daily by students and a dedicated caretaker",
    "Located within the historic Bhimeshwar Temple premises, Kageshwori Manohara",
    "Run by the Vedic Research Committee, dedicated to studying and preserving Nepal's Vedic knowledge",
    "Growing toward real needs — a library, a ritual hall, and permanent classrooms — one contribution at a time",
];

export const ASHRAM_TAGS = [
    { bg: "saff-pale", border: "saff-lt", color: "saff", label: "🛕 Bhimeshwar Temple Premises" },
    { bg: "earth-pale", border: "earth-lt", color: "earth", label: "🐄 6 Cows, 3 Calves" },
    { bg: "cream-dark", border: "cream-deep", color: "ink-soft", label: "📚 Grades 4–8" },
    { bg: "saff-pale", border: "saff-lt", color: "saff", label: "🔥 Daily Agnihotra" },
    { bg: "earth-pale", border: "earth-lt", color: "earth", label: "🙏 Teaching Since 2018" },
];

// ═══════════════════════════════════════════
// GALLERY
// ═══════════════════════════════════════════
export const GALLERY_TABS = ["All", "Ashram", "Students", "Rituals", "Nature", "Videos"];

export const GALLERY_ITEMS = [
    // Photos
    {
        id: 1, type: "photo", tab: "Ashram",
        src: "",
        caption: "Morning mist over the ashram hill",
        span: "wide",
    },
    {
        id: 2, type: "photo", tab: "Students",
        src: "https://res.cloudinary.com/dcbmawpyb/image/upload/q_auto/f_auto/v1781110962/WhatsApp_Image_2026-06-10_at_10.33.42_PM_1_bduzhm.jpg",
        caption: "Students in morning Sanskrit recitation",
        span: "normal",
    },
    {
        id: 3, type: "photo", tab: "Rituals",
        src: "https://res.cloudinary.com/dcbmawpyb/image/upload/q_auto/f_auto/v1781110967/WhatsApp_Image_2026-06-10_at_10.33.34_PM_twmvpl.jpg",
        caption: "Agnihotra fire ritual at sunrise",
        span: "normal",
    },
    {
        id: 4, type: "photo", tab: "Nature",
        src: "https://res.cloudinary.com/dcbmawpyb/image/upload/q_auto/f_auto/v1781110967/WhatsApp_Image_2026-06-10_at_10.33.34_PM_twmvpl.jpg",
        caption: "The sacred hill at dawn",
        span: "tall",
    },
    {
        id: 5, type: "photo", tab: "Ashram",
        src: "https://res.cloudinary.com/dcbmawpyb/image/upload/q_auto/f_auto/v1781110968/WhatsApp_Image_2026-06-10_at_10.33.33_PM_udzjqd.jpg",
        caption: "Temple courtyard — the heart of campus",
        span: "normal",
    },
    {
        id: 6, type: "photo", tab: "Students",
        src: "https://res.cloudinary.com/dcbmawpyb/image/upload/q_auto/f_auto/v1781110967/WhatsApp_Image_2026-06-10_at_10.33.33_PM_1_s8rmlm.jpg",
        caption: "Children studying in the open-air pavilion",
        span: "normal",
    },
    {
        id: 15, type: "photo", tab: "Students",
        src: "https://res.cloudinary.com/dcbmawpyb/image/upload/q_auto/f_auto/v1781110967/WhatsApp_Image_2026-06-10_at_10.33.35_PM_c876ni.jpg",
        caption: "Morning Vedic chanting session in the courtyard",
        span: "normal",
    },
    {
        id: 16, type: "photo", tab: "Students",
        src: "https://res.cloudinary.com/dcbmawpyb/image/upload/q_auto/f_auto/v1781110967/WhatsApp_Image_2026-06-10_at_10.33.33_PM_2_p8iuvi.jpg",
        caption: "Students attending Gurukul classroom lecture",
        span: "normal",
    },
    {
        id: 17, type: "photo", tab: "Students",
        src: "https://res.cloudinary.com/dcbmawpyb/image/upload/q_auto/f_auto/v1781110963/WhatsApp_Image_2026-06-10_at_10.33.42_PM_fzekvp.jpg",
        caption: "Young Batuks writing Sanskrit shlokas on wooden slates",
        span: "normal",
    },
    {
        id: 18, type: "photo", tab: "Students",
        src: "https://res.cloudinary.com/dcbmawpyb/image/upload/q_auto/f_auto/v1781110963/WhatsApp_Image_2026-06-10_at_10.33.39_PM_arbjra.jpg",
        caption: "Group study under the shade of ancient trees",
        span: "normal",
    },
    {
        id: 19, type: "photo", tab: "Students",
        src: "https://res.cloudinary.com/dcbmawpyb/image/upload/q_auto/f_auto/v1781110965/WhatsApp_Image_2026-06-10_at_10.33.37_PM_1_jb8iji.jpg",
        caption: "Evening prayer and diya lighting ceremony",
        span: "normal",
    },
    {
        id: 20, type: "photo", tab: "Students",
        src: "https://res.cloudinary.com/dcbmawpyb/image/upload/q_auto/f_auto/v1781110966/WhatsApp_Image_2026-06-10_at_10.33.36_PM_gc2lfm.jpg",
        caption: "Students learning yoga and meditation techniques",
        span: "normal",
    },
    {
        id: 21, type: "photo", tab: "Students",
        src: "https://res.cloudinary.com/dcbmawpyb/image/upload/q_auto/f_auto/v1781110966/WhatsApp_Image_2026-06-10_at_10.33.35_PM_1_tgvvdi.jpg",
        caption: "Traditional storytelling session with guru",
        span: "normal",
    },
    {
        id: 22, type: "photo", tab: "Students",
        src: "https://res.cloudinary.com/dcbmawpyb/image/upload/q_auto/f_auto/v1781110966/WhatsApp_Image_2026-06-10_at_10.33.35_PM_1_tgvvdi.jpg",
        caption: "Students participating in morning assembly",
        span: "normal",
    },
    {
        id: 23, type: "photo", tab: "Students",
        src: "https://res.cloudinary.com/dcbmawpyb/image/upload/q_auto/f_auto/v1781110965/WhatsApp_Image_2026-06-10_at_10.33.37_PM_2_i6farf.jpg",
        caption: "Writing practice in Sanskrit grammar class",
        span: "normal",
    },
    {
        id: 24, type: "photo", tab: "Students",
        src: "https://res.cloudinary.com/dcbmawpyb/image/upload/q_auto/f_auto/v1781110967/WhatsApp_Image_2026-06-10_at_10.33.33_PM_2_p8iuvi.jpg",
        caption: "Students offering prayers before meals",
        span: "normal",
    },
    {
        id: 25, type: "photo", tab: "Students",
        src: "https://res.cloudinary.com/dcbmawpyb/image/upload/q_auto/f_auto/v1781110964/WhatsApp_Image_2026-06-10_at_10.33.40_PM_exrm0a.jpg",
        caption: "Group chanting of Vedic mantras in harmony",
        span: "normal",
    },
    {
        id: 26, type: "photo", tab: "Students",
        src: "https://res.cloudinary.com/dcbmawpyb/image/upload/q_auto/f_auto/v1781110964/WhatsApp_Image_2026-06-10_at_10.33.40_PM_1_xesbln.jpg",
        caption: "Students learning traditional Indian instruments",
        span: "normal",
    },
    {
        id: 27, type: "photo", tab: "Students",
        src: "https://res.cloudinary.com/dcbmawpyb/image/upload/q_auto/f_auto/v1781110964/WhatsApp_Image_2026-06-10_at_10.33.40_PM_2_r3mewj.jpg",
        caption: "Outdoor physical training and discipline session",
        span: "normal",
    },
    {
        id: 28, type: "photo", tab: "Students",
        src: "https://res.cloudinary.com/dcbmawpyb/image/upload/q_auto/f_auto/v1781110963/WhatsApp_Image_2026-06-10_at_10.33.41_PM_1_ybtuvv.jpg",
        caption: "Guru guiding students in spiritual teachings",
        span: "normal",
    },
    {
        id: 29, type: "photo", tab: "Students",
        src: "https://res.cloudinary.com/dcbmawpyb/image/upload/q_auto/f_auto/v1781110964/WhatsApp_Image_2026-06-10_at_10.33.38_PM_hz1nlk.jpg",
        caption: "Evening meditation under temple lamps",
        span: "normal",
    },
    {
        id: 30, type: "photo", tab: "Students",
        src: "https://res.cloudinary.com/dcbmawpyb/image/upload/q_auto/f_auto/v1781110963/WhatsApp_Image_2026-06-10_at_10.33.38_PM_1_q8lkg6.jpg",
        caption: "Students engaged in seva (service) activities",
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
        id: "vastra",
        icon: "👕",
        deva: "वस्त्रदान",
        title: "Provide Student Clothing",
        tagline: "Support uniforms and seasonal clothing",
        desc: "Help provide clean uniforms, traditional attire, winter clothing, and essential garments for Batuks. Proper clothing allows students to study comfortably and maintain the dignity of the Gurukul tradition.",
        options: [
            { label: "One Set", amount: "NPR 1,500", detail: "Uniform for one student" },
            { label: "Winter Support", amount: "NPR 5,000", detail: "Warm clothing package" },
            { label: "Annual Clothing", amount: "NPR 12,000", detail: "Year-round clothing support" },
        ],
        badge: "Essential Need",
        badgeColor: "earth"
    },
    {
        id: "goseva",
        icon: "🐄",
        deva: "गोसेवा",
        title: "Support the Ashram Cows",
        tagline: "Preserve and care for the sacred cows",
        desc: "The cows of the ashram provide nourishment and play an important role in daily spiritual life. Your support helps with fodder, shelter, veterinary care, and overall wellbeing of the goshala.",
        options: [
            { label: "Monthly Feed", amount: "NPR 2,500", detail: "Feed support for one month" },
            { label: "Cow Care", amount: "NPR 7,500", detail: "Nutrition and healthcare" },
            { label: "Goshala Patron", amount: "NPR 25,000", detail: "Comprehensive support" },
        ],
        badge: "Traditional Service",
        badgeColor: "earth"
    },
    {
        id: "festival",
        icon: "🪔",
        deva: "विशेष उत्सव सेवा",
        title: "Festival & Ritual Sponsorship",
        tagline: "Support sacred festivals, pujas, and homa ceremonies",
        desc: "Sponsor special religious observances conducted throughout the year, including Vedic rituals, homa (fire offerings), pujas, yajnas, and festival celebrations. Your contribution helps preserve ancient traditions while enabling devotees and students to participate in sacred ceremonies that promote spiritual growth and community wellbeing.",
        options: [
            { label: "Puja Seva", amount: "NPR 2,500", detail: "Support a special puja ceremony" },
            { label: "Homa Sponsorship", amount: "NPR 7,500", detail: "Sponsor a Vedic fire ritual" },
            { label: "Festival Patron", amount: "NPR 25,000", detail: "Support a major annual celebration" },
        ],
        badge: "Spiritual Merit",
        badgeColor: "saff"
    },
    {
        id: "brahman_bhojan",
        icon: "🍽️",
        deva: "ब्राह्मण भोजन",
        title: "Sacred Brahman Bhojan",
        tagline: "Sponsor traditional Vedic meals for Brahman and scholars",
        desc: "Support the offering of sacred meals to Brahman scholars, priests, and resident Vedic practitioners. Brahman Bhojan is an important tradition that honors knowledge, austerity, and spiritual practice while sustaining those who preserve Vedic learning and rituals.",
        options: [
            { label: "One Meal", amount: "NPR 2,000", detail: "Sponsor a single Brahman Bhojan" },
            { label: "Special Occasion", amount: "NPR 5,000", detail: "Festive or ritual meal sponsorship" },
            { label: "Monthly Seva", amount: "NPR 18,000", detail: "Regular meal support for scholars" },
        ],
        badge: "Traditional Seva",
        badgeColor: "earth"
    }
   
];

// ═══════════════════════════════════════════
// CONTACT
// ═══════════════════════════════════════════
export const CONTACT_DETAILS = [
    {
        icon: "📍",
        label: "Address",
        value: "Bhimeshwar Mandir, Subedi Gau\nKageshwori Manohara-1, Kathmandu",
    },
    {
        icon: "✉️",
        label: "Email",
        value: email,
    },
    {
        icon: "☏",
        label: "Phone / WhatsApp",
        value: whatsappNumber,
        sub: "Available 7–9 am and 5–7 pm only",
    },
    {
        icon: "🛕",
        label: "For Pujas & Rituals",
        value: email,
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
// Verified against the institution's own official profile document (2026):
// 15 students (grades 4-8, ages 8-15); 3 teachers + 1 cow caretaker + 2 cooks
// = 6 staff; 6 cows (3 mothers, 3 calves) in the goshala.
export const STATS = [
    { value: 15, label: "Students Enrolled", suffix: "", icon: "🎓", desc: "Grades 4–8, ages 8–15" },
    { value: 6, label: "Teachers & Staff", suffix: "", icon: "🏡", desc: "3 teachers, 1 cow caretaker, 2 cooks" },
    { value: 6, label: "Cows & Animals", suffix: "", icon: "🐄", desc: "3 mothers and 3 calves" },
];

export const DAILY_SCHEDULE = [
    { id: "WAKE_UP", start: "04:00", end: "05:00" },
    { id: "MORNING_PRAYER", start: "05:00", end: "06:20" },
    { id: "HERBAL_DRINK", start: "06:20", end: "06:30" },
    { id: "VEDIC_STUDIES", start: "06:30", end: "08:20" },
    { id: "CLEANING", start: "08:20", end: "09:00" },
    { id: "BREAKFAST", start: "09:00", end: "10:00" },
    { id: "ASSEMBLY", start: "10:00", end: "10:15" },
    { id: "ACADEMICS", start: "10:15", end: "12:00" },
    { id: "SNACKS_BREAK", start: "12:00", end: "12:15" },
    { id: "CLASS_START", start: "12:15", end: "14:00" },
    { id: "LUNCH_BREAK", start: "14:00", end: "14:30" },
    { id: "STUDY_RESUME", start: "14:15", end: "16:00" },
    { id: "SPORTS", start: "16:00", end: "17:00" },
    { id: "EVENING_PRAYER", start: "17:00", end: "18:00" },
    { id: "DINNER", start: "18:00", end: "19:00" },
    { id: "STUDY_HOMEWORK", start: "19:00", end: "21:00" },
    { id: "SLEEP", start: "21:00", end: "22:00" },
];
export const DAILY_SCHEDULE_ACTIVITIES = {
    WAKE_UP: {
        icon: "🌅",
        color: T.bark,
    },
    MORNING_PRAYER: {
        icon: "🙏",
        color: T.saff,
    },
    HERBAL_DRINK: {
        icon: "🍵",
        color: T.earth,
    },
    VEDIC_STUDIES: {
        icon: "📿",
        color: T.saffWarm,
    },
    CLEANING: {
        icon: "🧹",
        color: T.barkLt,
    },
    BREAKFAST: {
        icon: "🍲",
        color: T.earth,
    },
    ASSEMBLY: {
        icon: "🎶",
        color: T.saff,
    },
    ACADEMICS: {
        icon: "📚",
        color: T.inkMid,
    },
    SNACKS_BREAK: {
        icon: "🎶",
        color: T.saff,
    },
    CLASS_START: {
        icon: "🎶",
        color: T.saff,
    },
    LUNCH_BREAK: {
        icon: "🎶",
        color: T.saff,
    },
    STUDY_RESUME: {
        icon: "🎶",
        color: T.saff,
    },
    SPORTS: {
        icon: "⚽",
        color: T.earth,
    },
    EVENING_PRAYER: {
        icon: "🪔",
        color: T.saff,
    },
    DINNER: {
        icon: "🍛",
        color: T.bark,
    },
    STUDY_HOMEWORK: {
        icon: "📖",
        color: T.barkLt,
    },
    SLEEP: {
        icon: "🌙",
        color: T.bark,
    },
};
export const DAILY_SCHEDULE_ACTIVITY_TEXT = {
    WAKE_UP: {
        en: {
            label: "Wake Up & Personal Hygiene",
            desc: "Wake up, freshen up, and prepare for the day with bathing and personal hygiene.",
        },
        np: {
            label: "उठ्ने र व्यक्तिगत सरसफाइ",
            desc: "उठ्ने, शौच, स्नान ।",
        },
    },

    MORNING_PRAYER: {
        en: {
            label: "Morning Prayer & Devotion",
            desc: "Sandhyavandan, deity worship, and revision of Vedic lessons.",
        },
        np: {
            label: "प्रातः पूजा र ध्यान",
            desc: "सन्ध्यावन्दन, देवपूजा र वेद कक्षासम्बन्धी पाठ।",
        },
    },

    HERBAL_DRINK: {
        en: {
            label: "Herbal Drink",
            desc: "Drink traditional herbal water (Kadha) to promote health and well-being.",
        },
        np: {
            label: "काण्डापानी ग्रहण ",
            desc: "स्वास्थ्यका लागि परम्परागत काढा सेवन।",
        },
    },

    VEDIC_STUDIES: {
        en: {
            label: "Vedic Studies",
            desc: "Begin Vedic chanting, Sanskrit recitation, and traditional learning.",
        },
        np: {
            label: "वैदिक अध्ययन",
            desc: "रुद्री एवं वैदिक कक्षा सुरु।",
        },
    },

    CLEANING: {
        en: {
            label: "Cleaning & Preparation",
            desc: "Participate in cleaning duties and prepare for the academic day.",
        },
        np: {
            label: "सरसफाइ र तयारी",
            desc: "विद्यालय सफाइ र दिनको तयारी।",
        },
    },

    BREAKFAST: {
        en: {
            label: "Breakfast",
            desc: "Enjoy a nutritious meal following traditional dining etiquette.",
        },
        np: {
            label: "भोजन",
            desc: "विधिपूर्वक भोजन ग्रहण।",
        },
    },

    ASSEMBLY: {
        en: {
            label: "Assembly",
            desc: "Saraswati Vandana, National Anthem, and light physical exercise.",
        },
        np: {
            label: "सभा",
            desc: "सरस्वती वन्दना, राष्ट्रिय गान र लघु व्यायाम।",
        },
    },

    ACADEMICS: {
        en: {
            label: "Academic Classes",
            desc: "Formal classroom learning covering both modern and traditional subjects.",
        },
        np: {
            label: "कक्षा अध्ययन",
            desc: "कक्षागत अध्ययन-अध्यापन सुरु।",
        },
    },
    SNACKS_BREAK: {
        en: {
            label: "Snacks Break",
            desc: "Short refreshment break before afternoon studies. ",
        },
        np: {
            label: "फल खाजा समय",
            desc: "फल एवं मोही लागि विश्राम।",
        },
    },
    CLASS_START: {
        en: {
            label: "Classes resume ",
            desc: "classroom learning covering both modern and traditional subjects",
        },
        np: {
            label: "कक्षा सुरु ",
            desc: "कक्षा पुनः सञ्चालन ।",
        },
    },
    LUNCH_BREAK: {
        en: {
            label: "Lunch Break",
            desc: "Lunch break and rest period",
        },
        np: {
            label: "खाजा विश्राम",
            desc: "दिउँसोको खाजा र आरामको समय।",
        },
    },
    STUDY_RESUME: {
        en: {
            label: "Study resume",
            desc: "Study resume after lunch break.",
        },
        np: {
            label: "पढाइ सञ्चालन",
            desc: "खाजा छुट्टीपछि कक्षाहरू पुनः सञ्चालन।",
        },
    },
    SPORTS: {
        en: {
            label: "Sports & Games",
            desc: "Outdoor sports, games, and physical fitness activities.",
        },
        np: {
            label: "खेलकुद",
            desc: "शारीरिक व्यायाम र बाहिरी खेलकुद गतिविधि।",
        },
    },

    EVENING_PRAYER: {
        en: {
            label: "Evening Prayer",
            desc: "Evening Sandhyavandan, Aarti, Purusha Sukta, and Stotra recitation.",
        },
        np: {
            label: "साँझको पूजा",
            desc: "साँझ सन्ध्यावन्दन, आरती, पुरुषाञ्जली र स्तोत्र पाठ।",
        },
    },

    DINNER: {
        en: {
            label: "Dinner",
            desc: "Wholesome vegetarian dinner with the Gurukul community.",
        },
        np: {
            label: "रातको खाना",
            desc: "गुरुकुल समुदायसँग शुद्ध शाकाहारी भोजन।",
        },
    },
    STUDY_HOMEWORK: {
        en: {
            label: "Homework & Self Study",
            desc: "Complete assignments, revise lessons, and prepare for the next day.",
        },
        np: {
            label: "गृहकार्य र अध्ययन गर्ने",
            desc: "लेखापढी पूरा गर्नु, पाठ दोहोर्‍याउनु, र भोलिको तयारी गर्नु।",
        },
    },
    SLEEP: {
        en: {
            label: "Sleep",
            desc: "Go to the dormitory/bedroom (Lights out)",
        },
        np: {
            label: "शयनकक्ष प्रवेश",
            desc: "आरामदायक निद्राका लागि विश्राम।",
        },
    },
};
export const ACADEMICS = [
    {
        level: "Primary (I–X)",
        tag: "Ages 6–16",
        subjects: ["Sanskrit & Vedic Chanting", "Mathematics", "English Language", "Nepali", "Social Studies", "Yoga & Physical Education"],
        bg: T.earthPale,
        accent: T.earth,
        borderC: `rgba(90,120,69,.22)`,
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
    { q: "Is the Gurukul affiliated to any board?", a: "Yes. Kaushiki Baidik Gurukul is NEB-affiliated and follows the national curriculum while integrating deep Vedic studies alongside." },
    { q: "What is the language of instruction?", a: "Sanskrit and Hindi are primary; English is taught rigorously. Bilingual teaching ensures both traditional and modern fluency." },
    { q: "Are girls admitted to the Gurukul?", a: "Yes. We welcome both boys and girls. Separate residential facilities with traiNEB houseparents ensure a safe and nurturing environment." },
    { q: "Can parents visit during the academic term?", a: "Parents are warmly invited on designated visit days (second Saturday of each month) and during all festival celebrations." },
    { q: "Is prior knowledge of Sanskrit required?", a: "No. Students begin Sanskrit from foundational levels. The immersive environment ensures rapid and joyful mastery of the language." },
];
