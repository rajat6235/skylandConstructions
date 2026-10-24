import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";

export default function HomePage() {
  return (
    <main className="flex flex-1 items-center">
      <Container className="py-24 text-center">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          {siteConfig.name}
        </h1>
      </Container>
    </main>
  );
}
