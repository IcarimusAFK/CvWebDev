import type { CvContent } from './types'

export const frCv: CvContent = {
  profile: {
    name: 'Colin Van Migom',
    title: 'Développeur Fullstack',
    location: 'Montpellier, France',
    email: 'colin.vanmigom@hotmail.com',
    phone: '+33 6 05 32 42 01',
    linkedin: 'linkedin.com/in/colin-vanmigom',
    github: 'github.com/IcarimusAFK',
    about: `
    Développeur Fullstack passionné par la création d'applications performantes et scalables.
    Fort d'une expérience sur un produit CRM/ERP utilisé dans une dizaine de pays, je maîtrise l'ensemble du cycle de développement, de la conception à la mise en production.
    J'aime autant écrire du code propre que faire grandir une équipe.
    `,
    softSkills: [
      { label: 'Management Agile (Scrum, Kanban)' },
      { label: 'Résolution de problèmes' },
      { label: 'Autonomie' },
      { label: 'Travail en équipe' },
      { label: 'Adaptabilité' },
      { label: 'Gestion de projet' },
    ],
    languages: [
      { label: 'Français', value: 100, level: 'Langue maternelle' },
      { label: 'Anglais', value: 90, level: 'Niveau C1 (Score TOEIC 975)' },
      { label: 'Portugais', value: 50, level: 'Niveau B1, conversationnel et compréhension de base' },
    ],
  },
  experiences: [
    {
      title: 'Développeur Fullstack',
      company: 'TILD',
      date: '2021 - Aujourd\'hui',
      items: [
        'Gestion développement et maintenance du projet ALMA MATER, outil CRM/ERP de 500k utilisateurs enregistrés, dans une dizaine de pays dans le monde',
        'Développement de fonctionnalités fullstack, en Vue.js, Node.js, React et utilisant un ORM Sequelize pour faciliter la gestion des données',
        'CI/CD Gitlab avec création d\'un pipeline de déploiement automatique et des tests unitaires, pour une rapidité de correction et de déploiement des fonctionnalités en production',
        'Environnements développement, préproduction, production avec Docker',
        'Management Agile d\'une équipe de 4 développeurs alternants',
      ],
    },
    {
      title: 'Alternant Développeur Fullstack',
      company: 'College de Paris',
      date: '2019 - 2021',
      items: [
        'Création d\'un outil de gestion étudiant CRM/ERP pour le groupe d\'école College de Paris, en Vue.js et Node.js',
        'Rédaction du cahier des charges, entretien client, établissement de maquettes Figma, rédaction de la base de données et de la documentation technique',
        'CI/CD Gitlab',
        'Docker',
      ],
    },
    {
      title: 'Side projects pour PME et associations',
      company: 'Auto-entrepreneur',
      date: '2018 - 2021',
      items: [
        'Créations de sites web pour PME locales et associations, en Vue.js, HTML, CSS, JavaScript et PHP',
        'Entretien client, établissement de maquettes Figma',
        'Mise à niveau technique, lecture de documentation, projets personnels divers',
      ],
    },
  ],
  education: [
    {
      title: 'Master Informatique & Gestion de Projet',
      school: 'Keyce Informatique Montpellier',
      date: '2019 - 2021',
    },
    {
      title: 'Licence Informatique',
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
      info: 'INFORMATIONS',
      about: 'À PROPOS',
      softSkills: 'COMPÉTENCES CLÉS',
      languages: 'LANGUES',
      experience: 'EXPÉRIENCES PROFESSIONNELLES',
      education: 'FORMATIONS',
      technicalSkills: 'COMPÉTENCES TECHNIQUES',
    },
    skillCategories: {
      frontend: 'frontend',
      backend: 'backend',
      database: 'database',
      tools: 'tools',
    },
    ui: {
      downloadPdf: 'Télécharger en PDF',
      downloadAtsPdf: 'Télécharger PDF ATS',
      generating: 'Génération…',
      pdfError: 'Impossible de générer le PDF. Réessayez.',
      atsPdfError: 'Impossible de générer le PDF ATS. Réessayez.',
      switchToEnglish: 'Anglais',
      switchToFrench: 'Français',
      profilePhotoAlt: 'Photo de profil',
    },
    ats: {
      about: 'À propos',
      experience: 'Expériences professionnelles',
      education: 'Formations',
      technicalSkills: 'Compétences techniques',
      softSkills: 'Compétences clés',
      languages: 'Langues',
    },
  },
}
