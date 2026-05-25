import { ReducedMotionProvider } from "@/lib/reduced-motion";
import Hero from "@/components/sections/Hero";
import ScrollRotate from "@/components/sections/ScrollRotate";
import Power from "@/components/sections/Power";
import FreshResult from "@/components/sections/FreshResult";
import TrustRow from "@/components/sections/TrustRow";
import CTA from "@/components/sections/CTA";

export default function Home() {
  return (
    <ReducedMotionProvider>
      <main>
        <Hero />
        <ScrollRotate />
        <Power />
        <FreshResult />
        <TrustRow />
        <CTA />
      </main>
    </ReducedMotionProvider>
  );
}
