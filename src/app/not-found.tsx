import { Container } from "@/components/layout/Container";
import { Link } from "@/components/ui/Link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FadeRise } from "@/components/motion/FadeRise";

export default function NotFound() {
  return (
    <section className="flex min-h-[70svh] items-center pb-24 pt-12 md:pb-32 md:pt-20">
      <Container>
        <FadeRise>
          <Eyebrow className="mb-10 md:mb-12">404</Eyebrow>
        </FadeRise>
        <FadeRise delay={0.1}>
          <h1 className="text-balance font-serif font-normal tracking-[-0.015em] text-ink text-[3rem] leading-[1.05] sm:text-[4rem] md:text-[5.5rem] md:leading-[1.04] lg:text-[7rem] lg:leading-[1.02]">
            Nothing here.
          </h1>
        </FadeRise>
        <FadeRise delay={0.35} className="mt-10 max-w-xl md:mt-12">
          <p className="text-body-l text-ink-muted">
            The page you were looking for doesn&rsquo;t exist or has moved.
          </p>
        </FadeRise>
        <FadeRise delay={0.55} className="mt-10 md:mt-14">
          <Link href="/" variant="arrow" className="text-body text-ink">
            Return home
          </Link>
        </FadeRise>
      </Container>
    </section>
  );
}
