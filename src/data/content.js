// ─────────────────────────────────────────────────────────────
//  EDIT YOUR SITE HERE
//  This is the single source of truth for all content on the site.
//  Update text, links, projects, and skills below — no need to touch
//  the components. Add a new project by copying one object in `projects`.
// ─────────────────────────────────────────────────────────────

import profileImg from '../assets/profile.jpg'

export const profile = {
  name: 'Fisher Obillos',
  role: 'Computer Science Student',
  // Short, punchy line under your name. One sentence.
  tagline: 'I build things in C++, Python, and computer vision.',
  // The longer intro paragraph.
  bio: `Hey there — I'm Fisher, a Computer Science student at the University of Waterloo. I've been hooked on technology since I was young, and I love turning ideas into projects I can actually run. Always learning, always building. Let's connect.`,
  location: 'University of Waterloo',
  image: profileImg,
  resumeUrl: 'resume.pdf', // file lives in /public
  email: '', // optional: set to show a direct mailto link
}

export const socials = {
  linkedin: 'https://www.linkedin.com/in/fisher-obillos-33054b255/',
  github: 'https://github.com/BrodyFisher',
  instagram: 'https://www.instagram.com/fisherobillos/',
}

// Grouped skills — add/remove freely.
export const skills = [
  {
    group: 'Languages',
    items: ['C / C++', 'Python', 'JavaScript'],
  },
  {
    group: 'Domains',
    items: ['Computer Vision (OpenCV)', 'Game Development', 'Modular Program Design'],
  },
  {
    group: 'Foundations',
    items: ['Problem Solving', 'Data Structures & Algorithms', 'Hardware & Electronics (FTC/FRC)'],
  },
]

// EmailJS configuration for the contact form.
// Get these from https://dashboard.emailjs.com  (Account → API keys / Services / Templates)
export const emailjs = {
  serviceId: 'service_ee2hj7e',
  templateId: 'template_5epjmmt',
  publicKey: '6Hu61AIFmhuh0QOUq',
}
