const whatsappNumber = '5514996002780';
const whatsappMessage = 'Olá! Vim pelo perfil do instagram.';

export const hero = {
  title: {
    mark: '13',
    lines: ['STREET', 'WEAR'],
  },
  tagline: ['Rua Dr. José Lisboa Jr - 58', 'Piratininga SP'],
  cta: {
    label: 'WhatsApp',
    href: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`,
  },
};
