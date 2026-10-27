import { FacebookIcon, InstagramIcon, TikTokIcon } from "@/components/icons";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const icons = { facebook: FacebookIcon, instagram: InstagramIcon, tiktok: TikTokIcon };

type SocialLinksProps = {
  /** Classes for each round/square link. */
  itemClassName: string;
  /** Classes for the icon inside each link. */
  iconClassName?: string;
  className?: string;
};

/** Links to the company's social profiles, in the order set in `siteConfig.social`. */
export function SocialLinks({ itemClassName, iconClassName = "size-4", className }: SocialLinksProps) {
  return (
    <ul className={cn("flex items-center gap-2.5", className)}>
      {siteConfig.social.map(({ network, label, href }) => {
        const Icon = icons[network];
        return (
          <li key={network}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${siteConfig.name} on ${label}`}
              title={label}
              className={itemClassName}
            >
              <Icon className={iconClassName} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
