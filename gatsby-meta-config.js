module.exports = {
  title: `imhappycoder.com`,
  description: `오늘도 행복한 개발일기`,
  language: `ko`, // `ko`, `en` => currently support versions for Korean and English
  siteUrl: `https://www.imhappycoder.com`,
  ogImage: `/og-image.png`, // Path to your in the 'static' folder
  comments: {
    utterances: {
      repo: `im-happy-coder/im-happy-coder.github.io`, // `zoomkoding/zoomkoding-gatsby-blog`,
    },
  },
  ga: 'G-GHFWZZ1GFP', // Google Analytics Tracking ID
  author: {
    name: `장태인`,
    bio: {
      role: `행복한`,
      description: ['매우', '너무', '정말'],
      thumbnail: 'sample.png', // Path to the image in the 'asset' folder
    },
    social: {
      github: `https://github.com/im-happy-coder`, // `https://github.com/zoomKoding`,
      linkedIn: `https://www.linkedin.com/in/taein-jang-3a03ab20b/`, // `https://www.linkedin.com/in/jinhyeok-jeong-800871192`,
      email: `dev.taein@gmail.com`, // `zoomkoding@gmail.com`,
    },
  },

  // metadata for About Page
  about: {
    timestamps: [
      // =====       [Timestamp Sample and Structure]      =====
      // ===== 🚫 Don't erase this sample (여기 지우지 마세요!) =====
      {
        date: '',
        activity: '',
        links: {
          github: '',
          post: '',
          googlePlay: '',
          appStore: '',
          demo: '',
        },
      },
      // ========================================================
      // ========================================================
      {
        date: '2022.05 ~ 2022.06',
        activity: 'Docker 개발 환경 구성',
        links: {
          post: '/docker-devland',
          github: 'https://github.com/im-happy-coder/docker-devland',
        },
      },
      {
        date: '2022.06 ~ 2022.07',
        activity: 'VM환경에서 3Tier 구성',
        links: {
          post: '/vm3tier',
          github: 'https://github.com/im-happy-coder/vm3tier',
        },
      },
    ],

    projects: [
      // =====        [Project Sample and Structure]        =====
      // ===== 🚫 Don't erase this sample (여기 지우지 마세요!)  =====
      {
        title: '',
        description: '',
        techStack: ['', ''],
        thumbnailUrl: '',
        links: {
          post: '',
          github: '',
          googlePlay: '',
          appStore: '',
          demo: '',
        },
      },
      // ========================================================
      // ========================================================
      {
        title: 'Docker 개발 환경 구성',
        description:
          'Docker를 사용하여 어디서든 개발 환경을 구성할 수 있도록 컨테이너화 했습니다. ',
        techStack: ['docker', 'CentOS', 'java', 'spring'],
        thumbnailUrl: 'docker-devland.png',
        links: {
          post: '/docker-devland',
          github: 'https://github.com/im-happy-coder/docker-devland',
        },
      },
      {
        title: 'VM환경에서 3Tier 구성',
        description:
            'VM환경에서 3Tier 구성입니다. ',
        techStack: ['CentOS', 'apache', 'tomcat', 'mysql', 'svn', 'jenkins'],
        thumbnailUrl: '3tier.png',
        links: {
          post: '/vm3tier',
          github: 'https://github.com/im-happy-coder/vm3tier',
        },
      },
    ],
  },
};
