import type { CvContent } from './types'

export const enCv: CvContent = {
  profile: {
    name: 'Colin Van Migom',
    title: 'Fullstack Developer',
    location: 'Montpellier, France',
    email: 'colin.vanmigom@hotmail.com',
    phone: '+33 6 05 32 42 01',
    linkedin: 'linkedin.com/in/colin-vanmigom',
    github: 'github.com/IcarimusAFK',
    about: `
    Passionate Fullstack Developer focused on building performant and scalable applications.
    With experience on a CRM/ERP product used in around ten countries, I master the full development lifecycle from design to production.
    I enjoy writing clean code as much as growing a team.
    `,
    softSkills: [
      { label: 'Agile Management (Scrum, Kanban)' },
      { label: 'Problem solving' },
      { label: 'Autonomy' },
      { label: 'Teamwork' },
      { label: 'Adaptability' },
      { label: 'Project management' },
    ],
    languages: [
      { label: 'French', value: 100, level: 'Native language' },
      { label: 'English', value: 90, level: 'C1 level (TOEIC score 975)' },
      { label: 'Portuguese', value: 50, level: 'B1 level, conversational with basic comprehension' },
    ],
  },
  experiences: [
    {
      title: 'Fullstack Developer',
      company: 'TILD',
      date: '2021 - Present',
      items: [
        'Managed development and maintenance of the ALMA MATER project, a CRM/ERP tool with 500k registered users across a dozen countries worldwide',
        'Fullstack feature development using Vue.js, Node.js, React and the Sequelize ORM for data management',
        'GitLab CI/CD with an automated deployment pipeline and unit tests for rapid bug fixes and production deployments',
        'Development, staging and production environments with Docker',
        'Agile management of a team of 4 apprentice developers',
      ],
    },
    {
      title: 'Fullstack Developer Apprentice',
      company: 'College de Paris',
      date: '2019 - 2021',
      items: [
        'Built a student management CRM/ERP tool for the College de Paris school group using Vue.js and Node.js',
        'Wrote specifications, conducted client meetings, created Figma mockups, designed the database and wrote technical documentation',
        'GitLab CI/CD',
        'Docker',
      ],
    },
    {
      title: 'Side projects for SMEs and associations',
      company: 'Freelancer',
      date: '2018 - 2021',
      items: [
        'Created websites for local SMEs and associations using Vue.js, HTML, CSS, JavaScript and PHP',
        'Client meetings and Figma mockups',
        'Technical upskilling, documentation reading and various personal projects',
      ],
    },
  ],
  education: [
    {
      title: 'Master\'s in Computer Science & Project Management',
      school: 'Keyce Informatique Montpellier',
      date: '2019 - 2021',
    },
    {
      title: 'Bachelor\'s in Computer Science',
      school: 'SUPINFO International University Montpellier',
      date: '2016 - 2019',
    },
  ],
  skills: {
    frontend: ['Vue.js', 'React', 'Nuxt', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3'],
    backend: ['Node.js', 'Express', 'Laravel', 'PHP', 'Python', 'REST/API'],
    database: ['MySQL', 'PostgreSQL', 'MongoDB'],
    tools: ['Git', 'GitHub', 'Docker', 'VS Code', 'Cursor', 'Linux', 'Figma', 'Photoshop'],
  },
  labels: {
    sections: {
      info: 'CONTACT',
      about: 'ABOUT',
      softSkills: 'KEY SKILLS',
      languages: 'LANGUAGES',
      experience: 'PROFESSIONAL EXPERIENCE',
      education: 'EDUCATION',
      technicalSkills: 'TECHNICAL SKILLS',
      webProjects: 'WEB PROJECTS',
    },
    skillCategories: {
      frontend: 'Frontend',
      backend: 'Backend',
      database: 'Database',
      tools: 'Tools',
    },
    ui: {
      downloadPdf: 'Download PDF',
      downloadAtsPdf: 'Download ATS PDF',
      generatePdf: 'Generate PDF',
      generating: 'Generating…',
      pdfError: 'Unable to generate PDF. Please try again.',
      atsPdfError: 'Unable to generate ATS PDF. Please try again.',
      switchToEnglish: 'English',
      switchToFrench: 'French',
      profilePhotoAlt: 'Profile photo',
    },
    ats: {
      about: 'About',
      experience: 'Professional experience',
      education: 'Education',
      technicalSkills: 'Technical skills',
      softSkills: 'Key skills',
      languages: 'Languages',
    },
  },
}
