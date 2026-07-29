import type { SVGProps } from 'react';

export type IconName =
  | 'arrow'
  | 'menu'
  | 'close'
  | 'mail'
  | 'phone'
  | 'pin'
  | 'check'
  | 'leaf'
  | 'shield'
  | 'warehouse'
  | 'coffee'
  | 'globe'
  | 'quote'
  | 'whatsapp';

export function Icon({ name, ...props }: SVGProps<SVGSVGElement> & { name: IconName }) {
  const common = {
    width: 24,
    height: 24,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  };

  const paths: Record<IconName, React.ReactNode> = {
    arrow: <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>,
    menu: <><path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/></>,
    close: <><path d="m6 6 12 12"/><path d="m18 6-12 12"/></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></>,
    phone: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.62a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.28-1.28a2 2 0 0 1 2.11-.45c.84.29 1.72.5 2.62.62A2 2 0 0 1 22 16.92Z"/>,
    pin: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    leaf: <><path d="M11 20A7 7 0 0 1 9.8 6.1C14.3 5.4 18.8 2 20 2c0 8-3 15-9 18Z"/><path d="M2 21c4-5 8-8 14-12"/></>,
    shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/></>,
    warehouse: <><path d="m3 10 9-6 9 6v10H3V10Z"/><path d="M7 20v-6h10v6"/><path d="M8 10h.01M12 10h.01M16 10h.01"/></>,
    coffee: <><path d="M4 8h13v6a6 6 0 0 1-6 6H10a6 6 0 0 1-6-6V8Z"/><path d="M17 10h1a3 3 0 0 1 0 6h-1"/><path d="M7 4c0 1 1 1 1 2M11 3c0 1 1 1 1 2M15 4c0 1 1 1 1 2"/></>,
    globe: <><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></>,
    quote: <><path d="M9 11H5a4 4 0 0 1 4-4v8a4 4 0 0 1-4 4"/><path d="M19 11h-4a4 4 0 0 1 4-4v8a4 4 0 0 1-4 4"/></>,
    whatsapp: <><path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.45L3 20l1.1-5.2A8.5 8.5 0 1 1 21 11.5Z"/><path d="M8.3 8.1c.2-.4.5-.4.8-.4h.5c.2 0 .4.1.5.4l.7 1.7c.1.3 0 .5-.2.7l-.6.7c-.2.2-.1.4 0 .6.5 1 1.3 1.8 2.3 2.3.2.1.4.2.6 0l.8-1c.2-.2.4-.3.7-.2l1.8.8c.3.1.4.3.4.5 0 .3-.1 1.4-.7 1.9-.5.5-1.3.8-2.1.7-1-.1-2.5-.6-4.1-2-1.5-1.3-2.5-3-2.8-4-.3-.9-.1-2 .4-2.7Z"/></>,
  };

  return <svg {...common} {...props}>{paths[name]}</svg>;
}
