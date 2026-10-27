import { EnvelopeIcon, PhoneIcon } from "@/components/icons";
import { Container } from "@/components/ui/container";
import { SocialLinks } from "@/components/ui/social-links";
import { siteConfig } from "@/config/site";

export function TopBar() {
  const { email, phone } = siteConfig.contact;

  return (
    <div className="text-brand">
      <Container className="flex h-[55px] items-center justify-between gap-4">
        <ul className="flex min-w-0 items-center gap-4 text-[15px] sm:gap-[30px]">
          <li>
            <a href={`mailto:${email}`} className="flex items-center gap-6 hover:text-white">
              <EnvelopeIcon className="size-[25px] shrink-0" />
              <span className="hidden sm:inline">{email}</span>
              <span className="sr-only sm:hidden">{email}</span>
            </a>
          </li>
          <li className="min-w-0">
            <a href={`tel:${phone}`} className="flex min-w-0 items-center gap-2.5 hover:text-white sm:gap-6">
              <PhoneIcon className="size-[25px] shrink-0" />
              <span className="sr-only min-[370px]:not-sr-only">{phone}</span>
            </a>
          </li>
        </ul>
        <div className="flex shrink-0 items-center gap-3 rounded-full bg-black/35 py-1 pr-1 pl-1 ring-1 ring-white/15 backdrop-blur-md sm:pl-4">
          <span className="hidden text-[11px] font-bold tracking-[0.2em] text-white/80 uppercase sm:inline">Follow us</span>
          <SocialLinks
            className="gap-1.5"
            itemClassName="size-8 rounded-full ring-2 ring-white/20 hover:ring-white/60"
            iconClassName="size-4"
          />
        </div>
      </Container>
    </div>
  );
}
