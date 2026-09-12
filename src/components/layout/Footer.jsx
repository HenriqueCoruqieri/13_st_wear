import logoMark from '@/assets/logo-mark.png';
import { footer } from '@/data/footer';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-ink-950 border-paper/10 flex items-center justify-between border-t px-2 py-4">
      <img
        src={logoMark}
        width={192}
        height={193}
        alt="13 Street Wear"
        loading="lazy"
        className="h-11 w-auto sm:h-12"
      />
      <p className="text-bone/55 font-sans text-xs">
        © {currentYear} {footer.brandName}
      </p>
    </footer>
  );
}

export { Footer };
