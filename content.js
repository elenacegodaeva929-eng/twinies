/* =====================================================================
   КОНТЕНТ САЙТА TWINIES

   Это единственный файл, который нужно править, чтобы поменять
   фаундеров, подразделения, сотрудников, фильмы, ленту работ и контакты.
   Дизайн и вёрстка живут в других файлах — их трогать не надо.

   ТРИ ПРАВИЛА, ЧТОБЫ НИЧЕГО НЕ СЛОМАТЬ:
     1. Текст всегда внутри кавычек:  name: "Kseniia Klever"
     2. После каждой строки — запятая, кроме самой последней в блоке.
     3. Если внутри текста нужны кавычки — ставьте «ёлочки» или ' ,
        но не " — она закроет строку раньше времени.

   Картинки лежат в корне репозитория, рядом с index.html.
   Поэтому путь — просто имя файла: "kseniia.jpg", без папок.

   После правки: сохранить файл и залить на GitHub поверх старого.
   ===================================================================== */

const CONTENT = {

  /* ================== КАРТИНКИ ГЛАВНОГО ЭКРАНА ================== */

  heroLogo:  "",                  /* доп. логотип над заголовком — обычно не нужен,
                                     настоящий логотип стоит в меню            */
  heroClown: "logo-hero.png",     /* иллюстрация клоуна                        */

  /* Показывать ли большую надпись TWINIES градиентом над иллюстрацией.
     Сейчас выключена: название уже есть на самой иллюстрации.
     Поставьте true, если хотите вернуть её.                                   */
  showTitle: false,


  /* ====================== КОНТАКТЫ И ФОРМЫ ======================
     createForm — ссылка на гугл-форму для заявок в студию
     joinForm   — ссылка на гугл-форму «стать частью команды»
     Пока ссылка пустая — показывается форма, которая собирает
     ответы и открывает почту с готовым письмом.                    */

  createForm: "",
  joinForm: "",
  email: "ceo@prodbytwinies.com",


  /* ====================== ГЛАВНЫЙ ЭКРАН ====================== */

  tagline: "Clown production studio",

  intro: [
    "Twinies is a clown production studio bringing artists from around the world together to create independent art in all its forms. Our mission is to make art accessible to everyone, regardless of their background, status, or experience.",
    "At Twinies, we're all twins. No two of us are alike, but we share a love for creating and a taste for the unconventional. Our twinies are always ready to jump into projects of any scale or complexity. Everyone on our team has the freedom to explore their own interests and grow in whatever direction they choose — and that's what makes each twinie unique.",
    "We bring the people, skills, and ideas that other projects need to come to life, while making plenty of our own. Rebellion against the system, creative freedom, unconventional thinking, and staying true to ourselves — that's what Twinies is all about."
  ],


  /* ========================== ФАУНДЕРЫ ==========================
     photo — имя файла, загруженного в репозиторий: "kseniia.jpg"   */

  founders: [
    {
      id: "kseniia",
      name: "Kseniia Klever",
      short: "Director, Producer, Screenwriter",
      title: "Founder & Lead Producer, Twinies",
      photo: "photo-a.jpg",
      achievements: [
        "Produced, wrote, and directed 120+ projects, managing over $600K in production budgets.",
        "Brought 157 emerging artists into paid productions through Twinies, with 80+ now working in the film industry.",
        "Won twelve international film and screenwriting festivals.",
        "Led a 124-person cast and crew on an original series backed by $225K in financing.",
        "Curated 160+ cultural events attended by 50,000+ people."
      ],
      about: "Over eight years, I've been a theater director, an art director, a horror writer, and a hundred other things. But through it all, I was always on my own. I was never what I was supposed to be. Always too strange, too crazy, too hard to understand. I created Twinies to bring together all the misfits and give them a chance to create something real.",
      quote: "If human foolishness had been as carefully nurtured and cultivated as intelligence has been for centuries, perhaps it would have turned into something extremely precious.",
      cite: "Yevgeny Zamyatin, We"
    },
    {
      id: "alisa",
      name: "Alisa Sakson",
      short: "Screenwriter, Producer",
      title: "Co-Founder & Lead Producer, Twinies",
      photo: "photo-c.jpg",
      achievements: [
        "Wrote, produced, and directed 30+ projects, managing over $200K in production budgets.",
        "Developed original television series for NMG — Russia's largest media holding — and pitched projects to three major streaming platforms: Okko, Kion, and Premier.",
        "Won sixteen international film and screenwriting festivals.",
        "Secured a $52K national arts grant for an original theatrical production."
      ],
      about: "For six years, I fought to make it as a screenwriter in the Russian film industry, and encountered more than my share of horrors. My scripts were stolen, major production companies cheated me, and once I even came close to going to prison over something I'd written. I left Russia to study in America, hoping to finally find the creative freedom I'd been fighting for. I joined Twinies because I want everyone, everywhere, to have the freedom to create art on their own terms.",
      quote: "If liberty means anything at all it means the right to tell people what they do not want to hear.",
      cite: "George Orwell, The Freedom of the Press"
    }
  ],


  /* ======================= ПОДРАЗДЕЛЕНИЯ =======================
     На главной — только логотип и название.
     Описание и состав открываются при клике.                       */

  divisions: [
    {
      id: "eye",
      name: "Eye",
      logo: "eye.png",
      roles: "Directors, Cinematographers & Editors",
      desc: "We bring visions to life, from the first wild idea to the final frame. We dream up, shoot, and edit films, commercials, music videos, and anything else meant to be seen."
    },
    {
      id: "hand",
      name: "Hand",
      logo: "hand.png",
      roles: "Design, Art & AI",
      desc: "We turn imagination into something you can see and touch. We build visual identities, create bold designs, graphics, illustrations, and entire digital worlds. No rules and no limits."
    },
    {
      id: "mouth",
      name: "Mouth",
      logo: "mouth.png",
      roles: "Producers, Marketing & Mediation",
      desc: "We make things happen. We turn impossible ideas into real projects, bring the right people together, break down barriers, build strategies, and lead productions from chaos to creation."
    },
    {
      id: "ear",
      name: "Ear",
      logo: "ear.png",
      roles: "Musicians, Sound Designers & Audio Engineers",
      desc: "We give ideas a voice. We compose original music, design soundscapes, and shape the sound of films, commercials, and digital experiences. From the first note to the final echo."
    }
  ],


  /* ========================= СОТРУДНИКИ =========================
     Ключи eye / hand / mouth / ear — те же id, что у подразделений.
     Чтобы добавить человека — скопировать строку { … } целиком,
     вставить ниже и переписать. Чтобы убрать — удалить её
     вместе с фигурными скобками и запятой.

     На каждого человека:
       name     — имя
       role     — должность
       photo    — файл фото, например "sergey.jpg"
       bio      — абзацы о нём, каждый в кавычках через запятую
       selected — блок «Selected work», одной строкой
       projects — картинки его работ: ["work1.jpg", "work2.jpg"]
                  они открываются по кнопке Projects в карточке
       portfolio— ссылка на папку с работами (Google Drive, Яндекс.Диск)
                  открывается кнопкой Projects в карточке
       links    — доп. кнопки: ["Подпись", "ссылка"]                */

  team: {
    eye: [
      {
        name: "Vladislav Zaitsev",
        role: "Editor, Director & Cinematographer",
        photo: "",
        bio: [
          "Postgraduate student in Documentary Film Directing at the Gerasimov Institute of Cinematography (VGIK).",
          "Nominee for Best Debut at the Lavr National Documentary Film Awards. His work has been featured at international documentary film festivals, including Artdocfest, Flahertiana, SiberiaDOC, the International Festival of Ethnological Film in Belgrade, Toronto International Short Film Awards, and Novaya Gazeta's Documentary Film Festival."
        ],
        selected: "Editor of FKN, a feature-length documentary about the Higher School of Economics and Yandex, premiered in Moscow and released on Kinopoisk. Director and cinematographer of the short films I Remember and I Live in Zoo. Editor of Twinies' short film Nothing Feels. Experienced in documentary directing, cinematography, narrative editing, and visual storytelling.",
        links: []
      },
      {
        name: "Timofey Novoselov",
        role: "Cinematographer & Director of Photography",
        photo: "",
        bio: [
          "Bachelor's degree in Cinematography from the GITR Film and Television School. Seven years of experience in cinematography.",
          "Cinematographer at Pygmalion Pictures (Russia-K TV channel), Divi Television Company, and Dronov Production."
        ],
        selected: "Cinematographer of the feature film Yesenin: Confession, the documentaries Rave Loneliness, In Spite of Childhood (Artdocfest 2026), and Invisible Happiness, and Twinies's short film Nothing Feels. Commercial cinematography for Italian musical instrument manufacturer Scandalli and the OUTLINE Music & Arts Festival. Experienced in feature films, documentaries, music videos, and commercial productions.",
        links: []
      },
      {
        name: "Ilya Voroshilov",
        role: "Director, Cinematographer & Producer",
        photo: "",
        bio: [
          "Postgraduate student in Fiction and Documentary Film Directing at the Gerasimov Institute of Cinematography (VGIK).",
          "Recipient of a film production grant from the Institute for Internet Development (IRI), 2023. Founder and producer of Komnata, a podcast production studio."
        ],
        selected: "Director of Voices, recipient of two special distinctions at the 43rd VGIK International Student Film Festival, including the Roman Karmen Documentary Film Foundation Diploma. Director of Maybe It's Scary, screened at the Message to Man International Film Festival, and the short film The Place Where You Sleep. Experienced in fiction and documentary filmmaking, cinematography, audiovisual storytelling, and creative production.",
        links: []
      },
      {
        name: "Sergey Sutyagin",
        role: "Director, Screenwriter, Digital Designer & Production Designer",
        photo: "",
        bio: [
          "Postgraduate student in Fiction Film Directing at the Gerasimov Institute of Cinematography (VGIK).",
          "Director of six short films, with work screened at Russian and international film festivals. Actor at the Pyotr Fomenko Workshop Theatre in Moscow. Collaborates with CINEVENT PRODUCTION as a director of music videos and commissioned productions."
        ],
        selected: "Director of The Power of Childhood, It Can't Be!, Coincidences, and The Snowman, all screened at VGIK film festivals. Director of the music video Paskuda for V Oknakh Aprel. Actors' Assistant on the feature film The Master and Margarita (2024), script supervisor for the series Friendzone, and production designer of Twinies's short film Nothing Feels.",
        links: []
      },
      {
        name: "Ruslan Buchugasov",
        role: "Cinematographer, Director, Editor & Colorist",
        photo: "",
        bio: [
          "Also known as BCHGSV. Studied Screenwriting and Dramaturgy at the New York Film Academy.",
          "Director, cinematographer, and editor for BIOMACHINE, Yan Toples, and Mark Miller. Editing Director for OKRASHENO."
        ],
        selected: "Cinematographer and editor of BIOMACHINE Doesn't Believe in Tears. Director of Volkramm — Together We Move and a Frame Tamer documentary (500K views). Edited BIOMACHINE productions reaching 1.8M views and shot Tonitut videos reaching up to 2.4M views. Experienced in documentary production, narrative editing, cinematography, color grading, and sound design.",
        links: []
      },
      {
        name: "Kirill Smirnov",
        role: "Director & Producer",
        photo: "",
        bio: [
          "Postgraduate student in Fiction Film Directing at the Gerasimov Institute of Cinematography (VGIK)."
        ],
        selected: "Director of the documentary A Silk Thread and the short film What Virginia Woolf Doesn't Say. First Assistant Director of Twinies's short film Nothing Feels. Experienced in fiction and documentary directing, creative production, and visual storytelling.",
        links: []
      },
      {
        name: "Vladimir Prudnikov",
        role: "Visual Artist, Editor, Cinematographer & Videographer",
        photo: "photo-b.jpg",
        bio: [
          "Also known as immoimmoimmo / HikkaWarrior.",
          "Cinematographer and editor at Thunderbike Production, specializing in commercial videography, branded content, and visual storytelling."
        ],
        selected: "Promotional films and social media productions for Thunderbike Production. Creator of experimental audiovisual projects showcased through #ARTPUNK, including music visuals, DJ performances, and backstage footage. Experienced in RED cinematography, VHS filmmaking, video editing, color grading, sound design, and motion graphics.",
        links: []
      }
    ],
    hand: [
      {
        name: "Maria Garkavaya",
        role: "Graphic Designer, Visual Artist, Animator & Brand Identity Designer",
        photo: "",
        bio: [
          "Vocational diploma from GBPOU OML (2024). Studied at bzik Creative Platform (2026). Nearly three years of professional experience in brand identity, print and packaging design, digital media, and web development.",
          "Graphic Designer at TSQ Consulting, TV and Radio Company Baltic Coast, a production agency, and Budyonny Military Academy Printing House. Independent freelance designer since 2025."
        ],
        selected: "Developed visual identities, logos, and brand guidelines for a kindergarten, children's camp, and digital services. Designed pitch decks and Tilda websites for TSQ Consulting; event posters, billboards, tickets, and media kits for a production agency; and corporate merchandise and packaging for Baltic Coast. Created book covers, magazine layouts, editorial publications, and print-ready materials. Experienced in branding, typography, packaging, editorial design, and digital visual communications.",
        links: []
      },
      {
        name: "Anna Alpatova",
        role: "AI Artist, Fashion Designer & Digital Creator",
        photo: "",
        bio: [
          "Independent digital artist specializing in AI-generated fashion, visual concept development, digital illustration, and experimental design. Creates fashion collections, brand identities, and audiovisual content using generative AI technologies."
        ],
        selected: "Creator of Whitelean, a conceptual fashion collection developed through AI-generated designs. Founder of an independent digital art project exploring cyberpunk fashion and Y2K aesthetics. Develops AI-generated advertising campaigns, fashion visuals, digital artwork, and social media content. Experienced in AI animation, fashion illustration, creative direction, visual storytelling, and generative design using Midjourney, Nano Banana, Kling, and Seedance.",
        links: []
      },
      {
        name: "Ilya Voroshilov",
        role: "AI Video Artist & Producer",
        photo: "",
        bio: [],
        selected: "",
        links: []
      },
      {
        name: "Alisa Zarubina",
        role: "Graphic Designer, Photographer & Pitch Deck Designer",
        photo: "",
        bio: [
          "Bachelor's degree in Fiction Film and Television Directing from Saint Petersburg State University of Film and Television (SPbGIKiT, 2026). Photographer and videographer since 2021. Photographer at Lensovet Palace of Culture and Rodeo Drive Water Park. Film Directing Instructor at LenDok Film Studio (2025–2026)."
        ],
        selected: "Designed pitch decks and key art for Zhivaya Ten' (Living Shadow) and Skazki Goroda K (Tales of City K). Created posters for film projects including The Rat, Buyan Island, Meshchera, The Thing, and Twinies's short film Nothing Feels. Also created cover art for the band Blind Seagull and photographed underground music festivals in Saint Petersburg. Experienced in poster design, pitch deck creation, conceptual photography, visual development, and post-production.",
        links: []
      },
      {
        name: "Anastasia Belova",
        role: "Stylist, Makeup Artist & Art Director",
        photo: "",
        bio: [
          "Diploma in Fashion Styling from Self Maid Styling School. Five years of experience in styling, makeup artistry, and art direction.",
          "Worked with Beograd Fashion Show, performance art project N.A.G, and Russian rapper Husky's fashion brand Papino Moloko."
        ],
        selected: "Makeup artist for music videos by Lurve and Lostlost. Featured in music videos by Poshlaya Molly (Ty Razbila Papinu Mashinu, 22M views) and DDT (Ne S Vami, 1.4M views). Experienced in fashion styling, special effects makeup, visual concept development, and art direction.",
        links: []
      },
      {
        name: "Alena Kupris",
        role: "Product Designer, UX/UI Designer, Graphic Designer & Brand Identity Designer",
        photo: "",
        bio: [
          "Diploma in Graphic Design from Petrovsky State College. Artwork exhibited at the Erarta Museum of Contemporary Art.",
          "Lead Designer at AVB Invest, managing a team of five designers and contributing to nine B2B projects. UX/UI Designer at Devim Team. Completed 30+ freelance projects."
        ],
        selected: "Visual design for the series Vibrate Higher (750K views), developed in collaboration with VK, Wink, and the Internet Development Institute. Designed digital platforms, brand identities, and promotional materials for commercial clients and Nochlezhka. Experienced in UX/UI design, branding, web development, and visual communications.",
        links: []
      },
      {
        name: "Katya Yakimova",
        role: "Illustrator, Visual Artist, Graphic Designer & Character Designer",
        photo: "",
        bio: [
          "Graduated from art school and studied Print Design at Saint Petersburg State University of Industrial Technologies and Design.",
          "Awarded a $6.5K grant for art school equipment through an original sculpture project. Recipient of 3 Grand Prix and 23 first-place awards at Art Ptitsa competitions."
        ],
        selected: "Illustrator of the forthcoming children's book Hedgehog on the Fence (40 illustrations), with artwork published in the Russian children's magazine Chitayka. Received an Honorable Mention at the international SAVE THE FROGS! Art Contest, with artwork published by the organizer. Designed the logo for Italian real estate company Lecito. Experienced in book illustration, character design, portraiture, and visual identity.",
        links: []
      },
      {
        name: "Vladimir Prudnikov",
        role: "Visual Artist, Graphic Designer & Fashion Designer",
        photo: "",
        bio: [
          "Also known as immoimmoimmo / HikkaWarrior. Multidisciplinary artist specializing in concept art, graffiti-inspired painting, digital illustration, hand-drawn lettering, graphic design, and experimental fashion.",
          "Founder of PAINTPUNK, an independent clothing and accessories line. Creates large-scale artworks, digital illustrations, custom typography, brand identities, and fashion merchandise."
        ],
        selected: "Created six large-scale graffiti artworks (1.5–4.5 meters) for Brancho, an American-style bistro in Moscow, alongside original paintings Riot and Rage for Blood. Designed digital artwork and album covers for Code80, RILEY BABY, JaySoulhaze, and TRICKY YAREZ. Developed a limited-edition clothing and accessories collection in collaboration with Tricky High Club. His original artwork is featured in Twinies's short film Nothing Feels. Experienced in character design, custom lettering, logo design, hand-painted accessories, and visual identity development.",
        links: []
      },
      {
        name: "Sasha Molnina",
        role: "Graphic Designer, Visual Artist, Animator, Fashion Designer",
        photo: "",
        bio: [
          "Studied Fashion and Costume Design at the Moscow Art and Industry Institute (2023).",
          "Event Manager at HRT.AIFF (2025–2026), specializing in visual concepts, creative direction, and event production."
        ],
        selected: "Creator of the Y2K Cyber Graduate Collection and the Mugler x SASHA MOLNIN collection concept. Designed visual materials for Rise Day & Night and developed the Creative Art Space interior concept. Experienced in graphic design, fashion illustration, costume design, styling, and visual identity development.",
        links: []
      },
      {
        name: "Maria Trushina",
        role: "Graphic Designer, Visual Artist",
        photo: "",
        bio: [
          "Five years of professional experience in graphic design and visual arts."
        ],
        selected: "Created graphic materials for the short film Wake Up!, nonprofit initiative Nochlezhka, and e-commerce platforms Wildberries and Ozon. Designed advertising visuals, promotional posters, product graphics, and editorial-style artwork. Specializes in digital illustration, photo manipulation, and experimental graphic design.",
        links: []
      }
    ],
    mouth: [
      {
        name: "Kseniia Klever",
        role: "Director, Producer, Screenwriter & U.S. Film Festival Coordinator",
        photo: "",
        bio: [
          "Studied Fiction and Documentary Film Directing at the Gerasimov Institute of Cinematography (VGIK) on a full state scholarship.",
          "Founder & Head of Film Studio at Twinies. Oversees creative development, leads writing teams, evaluates and edits screenplays, supervises film production, and manages U.S. and international film festival strategy and submissions."
        ],
        selected: "Creator, director, and producer of Nothing Feels. Creator and showrunner of Shkills, which attracted $225K in financing and generated 9.2M promotional views. Screenwriter and script editor for national television networks NTV and TV3. Winner and finalist at twelve international film and screenwriting festivals. Experienced in directing, creative producing, screenplay development, script editing, and international festival distribution.",
        links: []
      },
      {
        name: "Alisa Sakson",
        role: "Producer, Screenwriter & U.S. Film Festival Coordinator",
        photo: "",
        bio: [
          "Coursework toward a Bachelor's in Screenwriting, Dramaturgy, and Film Studies at Bennington, USA, on a full merit scholarship.",
          "Co-Founder & Head of Film Studio at Twinies. Oversees script development, leads creative meetings with writing teams, edits and evaluates screenplays, and manages U.S. and international film festival strategy and submissions."
        ],
        selected: "Screenwriter and producer of Nothing Feels. Head Writer of Infanta for National Media Group, Russia's largest media holding. Creator of Vaksa, pitched to Okko, Kion, and Premier ($85K offers). Secured a $52K grant from Russia's Presidential Fund for Cultural Initiatives for an original theatrical production. Winner and finalist at sixteen international film and screenwriting festivals. Experienced in creative producing, screenplay development, script editing, and international festival distribution.",
        links: []
      },
      {
        name: "Mikhelina Modebadze",
        role: "",
        photo: "",
        bio: [],
        selected: "",
        links: []
      }
    ],
    ear: [
      {
        name: "Konstantin Kutsyn",
        role: "Musician, Composer, Sound Designer & Music Producer",
        photo: "",
        bio: [
          "Also known as electrobolero. Studied Musicology at Humboldt University of Berlin and Cultural Studies at the Russian State University for the Humanities (RSUH). Trained in classical piano and electronic music production.",
          "Composer and sound designer for films, theatrical productions, contemporary dance, art installations, and commercial projects. Performed at major music and arts festivals and venues, including Outline, ARMA/Mutabor, Sun Spirit, and Archstoyanie."
        ],
        selected: "Composer of original music for the theatrical production Khto Ni Ya and the immersive performance Ubaiukivanie. Created the original soundtrack for Menkvy, premiered at Outline Festival 2025. Experienced in film scoring, experimental electronic music, orchestral composition, sound design, and live performance.",
        links: []
      },
      {
        name: "Anton Safronov",
        role: "Sound Designer, Sound Editor & Audio Post-Production Specialist",
        photo: "",
        bio: [
          "Studying Sound Engineering of Audiovisual Arts at the GITR Film and Television School. Graduated from music school and is a proficient guitarist.",
          "Specializes in sound design and audio post-production for short films, animation, and audiovisual projects. Experienced in creating immersive soundscapes, sound effects, and atmospheric audio compositions."
        ],
        selected: "Sound work featured in short-form projects including Twinies's short film Nothing Feels, Valentine's Day, the documentary reportage Dream–Run–Fly, and the animated project HAPOOGA. Created independent sound redesigns for Psych Rift and Transformers, alongside experimental sound compositions and foley-based scenes. Experienced in sound editing, sound effects design, and audio post-production.",
        links: []
      },
      {
        name: "Ruslan Buchugasov",
        role: "Sound Effects Editor, Video Editor & Post-Production Specialist",
        photo: "",
        bio: [
          "Also known as BCGSV. Studied Screenwriting and Dramaturgy at the New York Film Academy.",
          "Specializes in cinematic editing, sound effects integration, and audiovisual storytelling. Worked on documentary and digital productions for BIOMACHINE, Yan Toples, Mark Miller, and OKRASHENO."
        ],
        selected: "Editor of BIOMACHINE documentary and commercial productions, with videos reaching 1.8M views. Director and editor of a Frame Tamer documentary (500K views). Experienced in sound effects editing, SFX integration, music-driven pacing, atmospheric sound design, and audiovisual post-production.",
        links: []
      },
      {
        name: "Egor Gavrikov",
        role: "A&R Manager, Music Producer, Composer & Arranger",
        photo: "",
        bio: [
          "Also known as OTTO01. Studied Music Production and Songwriting at Moscow Music School.",
          "Music producer and A&R specialist with experience in artist development, composition, arrangement, and creative direction. Collaborated with artists including RaNo, Natalia Alexandrova (Yunona), Zwatte, Kirilik, and Liz, Pliz across multiple musical genres."
        ],
        selected: "Composer of original music for Twinies's short film Nothing Feels, including scene scores and end credits. Music producer and arranger at a production label, developing original compositions and collaborating with emerging artists. Specializes in Hip-Hop, Ambient, Lo-fi, Electronic, and Hardstyle music, with expertise in Ableton Live, FL Studio, and piano performance.",
        links: []
      },
      {
        name: "Sonya Anokhina",
        role: "",
        photo: "",
        bio: [],
        selected: "",
        links: []
      }
    ]
  },


  /* ====================== ФИЛЬМЫ СТУДИИ ======================
     Собственные проекты Твинис. Афиша + описание, трейлер позже.
     poster  — имя файла: "film-poster.jpg"
     trailer — ССЫЛКА-EMBED, именно в таком виде:
                 YouTube   https://www.youtube.com/embed/КОД
                 Vimeo     https://player.vimeo.com/video/НОМЕР
               Пока пусто — в окне написано, что трейлер скоро.     */

  films: [
    {
      title: "nothing feels",
      year: "2026",
      kind: "Feature film",
      poster: "film-nothing-feels.jpg",
      trailer: "",
      desc: "Kseniia Klever, Anna Alpatova, Alisa Sakson. Описание фильма впишите сюда — два-три абзаца, не больше."
    }
  ],


  /* ======================== ЛЕНТА РАБОТ ========================
     Лучшие работы команды — единственное место, где показываются
     проекты. У каждой работы подписан автор.

     img — имя файла картинки, лежит в корне репозитория
     by  — имя автора ТОЧНО так, как оно написано в блоке team выше.
           Тогда рядом сама подтянется его фотография-кружок.
           Если имя не совпадёт — подпись останется, кружка не будет.
     alt — короткое описание для поисковиков, можно оставить пустым

     Добавлять можно сколько угодно — лента сама разложится.        */

  works: [
    { img: "", by: "Katya Yakimova",    alt: "" },
    { img: "", by: "Ilya Voroshilov",   alt: "" },
    { img: "", by: "Maria Trushina",    alt: "" },
    { img: "", by: "Sergey Sutyagin",   alt: "" },
    { img: "", by: "Vladimir Prudnikov",alt: "" },
    { img: "", by: "Anton Safronov",    alt: "" },
    { img: "", by: "Alisa Zarubina",    alt: "" },
    { img: "", by: "Timofey Novoselov", alt: "" }
  ],


  /* ===================== ТЕКСТЫ СТРАНИЦ ===================== */

  createIntro: [
    "The same thing can be seen a thousand different ways. We bring together people with different perspectives, backgrounds, and creative minds to come up with ideas none of us could ever imagine alone.",
    "We create anything and everything across film, art, and everything that doesn't exist yet. From the smallest detail to an entire world, we dream it up, design it, make it happen, and bring it to life. Any form and any scale."
  ],

  joinIntro: [
    "If you're just starting out, we'll teach you everything we know. We'll show you how the industry works and help you find your place in it.",
    "And if you're already a master of your craft, we'll find you projects that make your eyes light up.",
    "We love teaching, creating, and meeting talented misfits.",
    "Fill out the form. Let's do some gloriously stupid things together!"
  ]

};
