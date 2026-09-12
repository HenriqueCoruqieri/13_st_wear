import { about } from '@/data/about';

function About() {
  return (
    <section aria-label="Sobre" className="bg-ink-950 px-6 py-20 sm:px-10">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-bone/80 font-sans text-base leading-relaxed">{about.paragraph}</p>
        <p className="text-paper mt-8 font-sans text-lg font-semibold md:text-xl">
          {about.highlight}
        </p>
      </div>
    </section>
  );
}

export { About };
