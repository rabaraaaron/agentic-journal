// Mood Categories Enum
export const MoodCategory = {
  POSITIVE_HIGH_ENERGY: "positive_high_energy",
  POSITIVE_LOW_ENERGY: "positive_low_energy",
  NEGATIVE_HIGH_ENERGY: "negative_high_energy",
  NEGATIVE_LOW_ENERGY: "negative_low_energy",
  NEUTRAL_ENERGY: "neutral_energy",
  PHYSICAL_STATES: "physical_states",
};

// Moods Enum
export const Mood = {
  // POSITIVE HIGH ENERGY - Upbeat, energetic, active positive emotions
  HAPPY: "happy",
  EXCITED: "excited",
  PLAYFUL: "playful",
  OPTIMISTIC: "optimistic",
  ADVENTUROUS: "adventurous",
  MOTIVATED: "motivated",
  DETERMINED: "determined",
  PROUD: "proud",
  ENERGETIC: "energetic",
  ENTHUSIASTIC: "enthusiastic",
  CONFIDENT: "confident",
  INSPIRED: "inspired",
  PASSIONATE: "passionate",
  AMBITIOUS: "ambitious",
  EMPOWERED: "empowered",
  CREATIVE: "creative",
  ACCOMPLISHED: "accomplished",
  VICTORIOUS: "victorious",
  THRILLED: "thrilled",
  ELATED: "elated",
  JUBILANT: "jubilant",
  ECSTATIC: "ecstatic",

  // POSITIVE LOW ENERGY - Calm, peaceful, satisfied positive emotions
  RELAXED: "relaxed",
  HOPEFUL: "hopeful",
  GRATEFUL: "grateful",
  CONTENT: "content",
  LOVING: "loving",
  CHILL: "chill",
  FOCUSED: "focused",
  PEACEFUL: "peaceful",
  SERENE: "serene",
  TRANQUIL: "tranquil",
  SATISFIED: "satisfied",
  BLESSED: "blessed",
  COMFORTABLE: "comfortable",
  SECURE: "secure",
  WARM: "warm",
  TENDER: "tender",
  NURTURING: "nurturing",
  COMPASSIONATE: "compassionate",
  MINDFUL: "mindful",
  CENTERED: "centered",
  BALANCED: "balanced",
  CALM: "calm",

  // NEGATIVE HIGH ENERGY - Intense, agitated negative emotions
  FRUSTRATED: "frustrated",
  OVERSTIMULATED: "overstimulated",
  ANXIOUS: "anxious",
  IRRITATED: "irritated",
  ANGRY: "angry",
  FURIOUS: "furious",
  ENRAGED: "enraged",
  PANICKED: "panicked",
  STRESSED: "stressed",
  OVERWHELMED: "overwhelmed",
  AGITATED: "agitated",
  RESTLESS: "restless",
  TENSE: "tense",
  WORRIED: "worried",
  NERVOUS: "nervous",
  JITTERY: "jittery",
  HYPER: "hyper",
  MANIC: "manic",
  FRANTIC: "frantic",
  OUTRAGED: "outraged",
  LIVID: "livid",
  HOSTILE: "hostile",

  // NEGATIVE LOW ENERGY - Depleted, withdrawn negative emotions
  SAD: "sad",
  LONELY: "lonely",
  IGNORED: "ignored",
  INSECURE: "insecure",
  HOPELESS: "hopeless",
  BORED: "bored",
  LAZY: "lazy",
  STUCK: "stuck",
  DEPRESSED: "depressed",
  MELANCHOLY: "melancholy",
  GLOOMY: "gloomy",
  DEJECTED: "dejected",
  DESPAIRING: "despairing",
  DEFEATED: "defeated",
  DISCOURAGED: "discouraged",
  WITHDRAWN: "withdrawn",
  NUMB: "numb",
  EMPTY: "empty",
  DRAINED: "drained",
  SLUGGISH: "sluggish",
  APATHETIC: "apathetic",
  UNMOTIVATED: "unmotivated",
  DISCONNECTED: "disconnected",
  ISOLATED: "isolated",
  ABANDONED: "abandoned",
  REJECTED: "rejected",
  WORTHLESS: "worthless",
  GUILTY: "guilty",
  ASHAMED: "ashamed",

  // NEUTRAL/LOW ENERGY - Neither positive nor negative
  NEUTRAL: "neutral",
  INDIFFERENT: "indifferent",
  MEH: "meh",
  OKAY: "okay",
  FINE: "fine",
  STABLE: "stable",
  STEADY: "steady",

  // PHYSICAL STATES - Body-focused states
  TIRED: "tired",
  HUNGRY: "hungry",
  EXHAUSTED: "exhausted",
  ENERGIZED: "energized",
  REFRESHED: "refreshed",
  RESTFUL: "restful",
  SLEEPY: "sleepy",
  DROWSY: "drowsy",
  ALERT: "alert",
  WIRED: "wired",
  sluggish: "sluggish",
  HEAVY: "heavy",
  LIGHT: "light",
  STRONG: "strong",
  WEAK: "weak",
  SICK: "sick",
  HEALTHY: "healthy",
  PAIN: "pain",
  UNCOMFORTABLE: "uncomfortable",
  restless: "restless",
};

// Mapping for easy categorization
export const MOOD_CATEGORIES = {
  [MoodCategory.POSITIVE_HIGH_ENERGY]: [
    Mood.HAPPY,
    Mood.EXCITED,
    Mood.PLAYFUL,
    Mood.OPTIMISTIC,
    Mood.ADVENTUROUS,
    Mood.MOTIVATED,
    Mood.DETERMINED,
    Mood.PROUD,
    Mood.ENERGETIC,
    Mood.ENTHUSIASTIC,
    Mood.CONFIDENT,
    Mood.INSPIRED,
    Mood.PASSIONATE,
    Mood.AMBITIOUS,
    Mood.EMPOWERED,
    Mood.CREATIVE,
    Mood.ACCOMPLISHED,
    Mood.VICTORIOUS,
    Mood.THRILLED,
    Mood.ELATED,
    Mood.JUBILANT,
    Mood.ECSTATIC,
  ],
  [MoodCategory.POSITIVE_LOW_ENERGY]: [
    Mood.RELAXED,
    Mood.HOPEFUL,
    Mood.GRATEFUL,
    Mood.CONTENT,
    Mood.LOVING,
    Mood.CHILL,
    Mood.FOCUSED,
    Mood.PEACEFUL,
    Mood.SERENE,
    Mood.TRANQUIL,
    Mood.SATISFIED,
    Mood.BLESSED,
    Mood.COMFORTABLE,
    Mood.SECURE,
    Mood.WARM,
    Mood.TENDER,
    Mood.NURTURING,
    Mood.COMPASSIONATE,
    Mood.MINDFUL,
    Mood.CENTERED,
    Mood.BALANCED,
    Mood.CALM,
  ],
  [MoodCategory.NEGATIVE_HIGH_ENERGY]: [
    Mood.FRUSTRATED,
    Mood.OVERSTIMULATED,
    Mood.ANXIOUS,
    Mood.IRRITATED,
    Mood.ANGRY,
    Mood.FURIOUS,
    Mood.ENRAGED,
    Mood.PANICKED,
    Mood.STRESSED,
    Mood.OVERWHELMED,
    Mood.AGITATED,
    Mood.RESTLESS,
    Mood.TENSE,
    Mood.WORRIED,
    Mood.NERVOUS,
    Mood.JITTERY,
    Mood.HYPER,
    Mood.MANIC,
    Mood.FRANTIC,
    Mood.OUTRAGED,
    Mood.LIVID,
    Mood.HOSTILE,
  ],
  [MoodCategory.NEGATIVE_LOW_ENERGY]: [
    Mood.SAD,
    Mood.LONELY,
    Mood.IGNORED,
    Mood.INSECURE,
    Mood.HOPELESS,
    Mood.BORED,
    Mood.LAZY,
    Mood.STUCK,
    Mood.DEPRESSED,
    Mood.MELANCHOLY,
    Mood.GLOOMY,
    Mood.DEJECTED,
    Mood.DESPAIRING,
    Mood.DEFEATED,
    Mood.DISCOURAGED,
    Mood.WITHDRAWN,
    Mood.NUMB,
    Mood.EMPTY,
    Mood.DRAINED,
    Mood.SLUGGISH,
    Mood.APATHETIC,
    Mood.UNMOTIVATED,
    Mood.DISCONNECTED,
    Mood.ISOLATED,
    Mood.ABANDONED,
    Mood.REJECTED,
    Mood.WORTHLESS,
    Mood.GUILTY,
    Mood.ASHAMED,
  ],
  [MoodCategory.NEUTRAL_ENERGY]: [
    Mood.NEUTRAL,
    Mood.INDIFFERENT,
    Mood.MEH,
    Mood.OKAY,
    Mood.FINE,
    Mood.STABLE,
    Mood.STEADY,
  ],
  [MoodCategory.PHYSICAL_STATES]: [
    Mood.TIRED,
    Mood.HUNGRY,
    Mood.EXHAUSTED,
    Mood.ENERGIZED,
    Mood.REFRESHED,
    Mood.RESTFUL,
    Mood.SLEEPY,
    Mood.DROWSY,
    Mood.ALERT,
    Mood.WIRED,
    Mood.sluggish,
    Mood.HEAVY,
    Mood.LIGHT,
    Mood.STRONG,
    Mood.WEAK,
    Mood.SICK,
    Mood.HEALTHY,
    Mood.PAIN,
    Mood.UNCOMFORTABLE,
    Mood.restless,
  ],
};

// Helper function to get category for a mood
export const getMoodCategory = (mood) => {
  for (const [category, moods] of Object.entries(MOOD_CATEGORIES)) {
    if (moods.includes(mood)) {
      return category;
    }
  }
  return null;
};

const categoryOrder = [
  MoodCategory.POSITIVE_HIGH_ENERGY,
  MoodCategory.POSITIVE_LOW_ENERGY,
  MoodCategory.NEUTRAL_ENERGY,
  MoodCategory.NEGATIVE_LOW_ENERGY,
  MoodCategory.NEGATIVE_HIGH_ENERGY,
  MoodCategory.PHYSICAL_STATES,
];

export const getCategoryColors = (mood) => {
  const moodCategory = getMoodCategory(mood);
  switch (moodCategory) {
    case MoodCategory.POSITIVE_HIGH_ENERGY:
      return "#FFD700";
    case MoodCategory.POSITIVE_LOW_ENERGY:
      return "#87CEEB";
    case MoodCategory.NEUTRAL_ENERGY:
      return "#D3D3D3";
    case MoodCategory.NEGATIVE_LOW_ENERGY:
      return "#4169E1";
    case MoodCategory.NEGATIVE_HIGH_ENERGY:
      return "#DC143C";
    case MoodCategory.PHYSICAL_STATES:
      return "#DDA0DD";
  }
};

// Helper function to get all moods as an organized array (useful for dropdowns)
export const getAllMoodsCustomOrder = () => {
  const orderedMoods = [];
  categoryOrder.forEach((category) => {
    orderedMoods.push(...MOOD_CATEGORIES[category]);
  });
  return orderedMoods;
};

// Helper function to get moods by category
export const getMoodsByCategory = (category) => {
  return MOOD_CATEGORIES[category] || [];
};

// Helper function to get mood display name (capitalize first letter)
export const getMoodDisplayName = (mood) => {
  return mood.charAt(0).toUpperCase() + mood.slice(1).replace(/_/g, " ");
};

// Helper function to get category display name
export const getCategoryDisplayName = (category) => {
  return category
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
