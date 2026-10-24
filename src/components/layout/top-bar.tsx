import { EnvelopeIcon, FacebookIcon, PhoneIcon } from "@/components/icons";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";

export function TopBar() {
  const { email, phone } = siteConfig.contact;

  return (
    <div className="text-brand">
      <Container className="flex h-[55px] items-center justify-between gap-4">
        <ul className="flex min-w-0 items-center gap-[30px] text-[15px]">
          <li>
            <a href={`mailto:${email}`} className="flex items-center gap-6 hover:text-white">
              <EnvelopeIcon className="size-[25px] shrink-0" />
              <span className="hidden sm:inline">{email}</span>
              <span className="sr-only sm:hidden">{email}</span>
            </a>
          </li>
          <li>
            <a href={`tel:${phone}`} className="flex items-center gap-6 hover:text-white">
              <PhoneIcon className="size-[25px] shrink-0" />
              <span>{phone}</span>
            </a>
          </li>
        </ul>
        <a
          href={siteConfig.social.facebook}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          className="flex size-[30px] shrink-0 items-center justify-center rounded-[3px] bg-white transition-opacity hover:opacity-90"
        >
          <FacebookIcon className="h-[15px]" />
        </a>
      </Container>
    </div>
  );
}
