export interface ChapterData {
  id: string
  index: number
  title: string
  titleNative: string
  language: "jp" | "kr"
  videoSrc: string
  posterSrc: string
  beatA: {
    headline: string
    caption: string
    metadata: {
      location: string
      coordinates: string
      season: string
    }
  }
  beatB: {
    text: string
    textNative?: string
    imageSrc: string
    imageAlt: string
  }
}

export const chapters: ChapterData[] = [
  {
    id: "tokyo-night",
    index: 1,
    title: "TOKYO NIGHT (JAPAN)",
    titleNative: "東京の夜",
    language: "jp",
    videoSrc: "/videos/tokyo_intro.mp4",
    posterSrc: "/images/japan1.jpeg",
    beatA: {
      headline: "WHERE LIGHT BECOMES LIQUID",
      caption: "Neon reflections dance on rain-slicked streets, a symphony of color in the urban night.",
      metadata: {
        location: "Shibuya, Tokyo",
        coordinates: "35.6595° N, 139.7004° E",
        season: "Autumn",
      },
    },
    beatB: {
      text: "The city breathes in electric pulses. Each crossing, each alleyway holds a thousand stories written in flickering kanji. Here, solitude finds company in the glow of vending machines and the distant hum of trains that never sleep.",
      textNative: "街は電気の脈動で呼吸する。それぞれの交差点、路地裏には、ちらつく漢字で書かれた千の物語がある。",
      imageSrc: "",
      imageAlt: "Tokyo alley at night with neon reflections",
    },
  },
  {
    id: "seoul-pulse",
    index: 2,
    title: "SEOUL PULSE (KOREA)",
    titleNative: "서울의 맥박",
    language: "kr",
    videoSrc: "/placeholder.svg?height=1080&width=1920",
    posterSrc: "/placeholder.svg?height=1080&width=1920",
    beatA: {
      headline: "BETWEEN ANCIENT AND MODERN",
      caption: "Hanok rooftops whisper to glass skyscrapers under the shadow of Namsan.",
      metadata: {
        location: "Bukchon, Seoul",
        coordinates: "37.5826° N, 126.9836° E",
        season: "Spring",
      },
    },
    beatB: {
      text: "Seoul is a paradox of time. In the narrow alleys of Bukchon, the Joseon dynasty feels alive, while a subway ride away, the future is already here. The city doesn't just move forward; it harmonizes with its past.",
      textNative: "서울은 시간의 역설이다. 북촌의 좁은 골목에서는 조선 왕조가 살아 숨 쉬는 듯하고, 지하철로 조금만 가면 미래가 이미 와 있다.",
      imageSrc: "/placeholder.svg?height=600&width=800",
      imageAlt: "Seoul skyline contrast",
    },
  },
  {
    id: "kyoto-zen",
    index: 3,
    title: "KYOTO ZEN (JAPAN)",
    titleNative: "京都の禅",
    language: "jp",
    videoSrc: "/placeholder.svg?height=1080&width=1920",
    posterSrc: "/placeholder.svg?height=1080&width=1920",
    beatA: {
      headline: "THE SILENCE OF STONES",
      caption: "In the gardens of Ryoan-ji, the world is reduced to rock, moss, and mind.",
      metadata: {
        location: "Kyoto, Japan",
        coordinates: "35.0345° N, 135.7182° E",
        season: "Spring",
      },
    },
    beatB: {
      text: "Kyoto teaches the art of observation. It is a city of hidden courtyards and whispered prayers. To walk here is to tread on centuries of devotion, where even the falling of a leaf seems intentional.",
      textNative: "京都は観察の芸術を教えてくれる。隠れた中庭と囁かれる祈りの街だ。",
      imageSrc: "/placeholder.svg?height=600&width=800",
      imageAlt: "Zen garden in Kyoto",
    },
  },
  {
    id: "jeju-wind",
    index: 4,
    title: "JEJU WIND (KOREA)",
    titleNative: "제주의 바람",
    language: "kr",
    videoSrc: "/placeholder.svg?height=1080&width=1920",
    posterSrc: "/placeholder.svg?height=1080&width=1920",
    beatA: {
      headline: "ISLAND OF VOLCANIC STONE",
      caption: "Black basalt meets the emerald sea, guarded by ancient stone grandfathers.",
      metadata: {
        location: "Seongsan, Jeju",
        coordinates: "33.4581° N, 126.9426° E",
        season: "Summer",
      },
    },
    beatB: {
      text: "Jeju breathes with the ocean. The wind here carries the salt of the East Sea and the stories of the Haenyeo divers. It is a raw, elemental beauty that demands nothing but presence.",
      textNative: "제주는 바다와 함께 숨 쉰다. 이곳의 바람은 동해의 소금기와 해녀들의 이야기를 싣고 온다.",
      imageSrc: "/placeholder.svg?height=600&width=800",
      imageAlt: "Jeju coastline with volcanic rocks",
    },
  },
  {
    id: "sapporo-winter",
    index: 5,
    title: "SAPPORO WINTER (JAPAN)",
    titleNative: "札幌の冬",
    language: "jp",
    videoSrc: "/placeholder.svg?height=1080&width=1920",
    posterSrc: "/placeholder.svg?height=1080&width=1920",
    beatA: {
      headline: "SNOW FALLING ON AMBER LIGHT",
      caption: "In Hokkaido's capital, winter transforms the ordinary into the magical.",
      metadata: {
        location: "Sapporo, Hokkaido",
        coordinates: "43.0618° N, 141.3545° E",
        season: "Winter",
      },
    },
    beatB: {
      text: "Snowflakes descend like whispered secrets through pools of amber lamplight. The streets of Sapporo wear winter like a kimono—elegant, quiet, purposeful.",
      textNative: "雪片は琥珀色の街灯の中を囁かれた秘密のように降りてくる。札幌の街は着物を纏うように冬を着る。",
      imageSrc: "/placeholder.svg?height=600&width=800",
      imageAlt: "Snow-covered Sapporo street",
    },
  },
  {
    id: "gyeongju-history",
    index: 6,
    title: "GYEONGJU (KOREA)",
    titleNative: "경주의 역사",
    language: "kr",
    videoSrc: "/placeholder.svg?height=1080&width=1920",
    posterSrc: "/placeholder.svg?height=1080&width=1920",
    beatA: {
      headline: "MUSEUM WITHOUT WALLS",
      caption: "Burial mounds rise from the earth like green islands in a sea of history.",
      metadata: {
        location: "Gyeongju, North Gyeongsang",
        coordinates: "35.8328° N, 129.2066° E",
        season: "Autumn",
      },
    },
    beatB: {
      text: "To walk in Gyeongju is to walk among kings. The silence of the tumuli speaks louder than words, a reminder of the golden kingdom of Silla that once ruled this peninsula.",
      textNative: "경주를 걷는 것은 왕들 사이를 걷는 것이다. 고분의 침묵은 말보다 더 크게 울린다.",
      imageSrc: "/placeholder.svg?height=600&width=800",
      imageAlt: "Royal tumuli park in Gyeongju",
    },
  },
]
