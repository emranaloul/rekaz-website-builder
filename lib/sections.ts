import type { SectionTemplate } from '@/types/builder';

export const sectionTemplates: SectionTemplate[] = [
  {
    id: 'header',
    name: 'Header',
    type: 'header',
    preview: '🏠 Navigation Header',
    defaultData: {
      type: 'header',
      title: 'Your Brand',
      links: [
        { text: 'Home', url: '#' },
        { text: 'About', url: '#' },
        { text: 'Services', url: '#' },
        { text: 'Contact', url: '#' },
      ],
    },
  },
  {
    id: 'hero',
    name: 'Hero Section',
    type: 'hero',
    preview: '🚀 Hero Banner',
    defaultData: {
      type: 'hero',
      title: 'Welcome to Our Amazing Product',
      description:
        'Transform your business with our innovative solutions. Get started today and see the difference.',
      buttonText: 'Get Started',
      buttonUrl: '#',
      imageUrl: '/placeholder.svg?height=400&width=600',
    },
  },
  {
    id: 'features',
    name: 'Features',
    type: 'features',
    preview: '⭐ Feature Grid',
    defaultData: {
      type: 'features',
      title: 'Our Features',
      description: 'Discover what makes us different',
      items: [
        {
          title: 'Fast Performance',
          description:
            'Lightning-fast loading times for better user experience',
        },
        {
          title: 'Secure & Reliable',
          description: 'Enterprise-grade security with 99.9% uptime guarantee',
        },
        {
          title: '24/7 Support',
          description:
            'Round-the-clock customer support whenever you need help',
        },
      ],
    },
  },
  {
    id: 'about',
    name: 'About Section',
    type: 'about',
    preview: '👥 About Us',
    defaultData: {
      type: 'about',
      title: 'About Our Company',
      description:
        'We are passionate about creating innovative solutions that help businesses grow and succeed in the digital age.',
      imageUrl: '/placeholder.svg?height=300&width=400',
    },
  },
  {
    id: 'contact',
    name: 'Contact',
    type: 'contact',
    preview: '📧 Contact Form',
    defaultData: {
      type: 'contact',
      title: 'Get In Touch',
      description:
        'Ready to start your project? Contact us today for a free consultation.',
    },
  },
  {
    id: 'footer',
    name: 'Footer',
    type: 'footer',
    preview: '🔗 Site Footer',
    defaultData: {
      type: 'footer',
      title: 'Your Brand',
      description: 'Building the future, one project at a time.',
      links: [
        { text: 'Privacy Policy', url: '#' },
        { text: 'Terms of Service', url: '#' },
        { text: 'Support', url: '#' },
      ],
    },
  },
];
