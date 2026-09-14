import { about } from '@/data/about';

function About() {
  return (
    <section aria-label="Sobre" className="bg-ink-950 px-6 py-20 sm:px-10">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-muted-foreground text-base leading-relaxed font-bold">
          {about.paragraph}
        </p>
        <p className="text-muted-foreground mt-8 text-lg font-extrabold md:text-xl">
          {about.highlight}
        </p>
      </div>
    </section>
  );
}

export { About };
