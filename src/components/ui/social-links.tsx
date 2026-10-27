import { FacebookIcon, InstagramIcon, TikTokIcon } from "@/components/icons";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/** Each network in its official brand colours, so visitors recognise it at a glance. */
const brands = {
  facebook: { icon: FacebookIcon, tile: "bg-[#1877F2] text-white", iconClass: "" },
  instagram: {
    icon: InstagramIcon,
    tile: "bg-[radial-gradient(circle_at_30%_107%,#fdf497_0%,#fdf497_5%,#fd5949_45%,#d6249f_60%,#285aeb_90%)] text-white",
    iconClass: "",
  },
  tiktok: {
    icon: TikTokIcon,
    tile: "bg-black text-white",
    // TikTok's cyan and red offset glyph.
    iconClass: "[filter:drop-shadow(1px_1px_0_#fe2c55)_drop-shadow(-1px_-1px_0_#25f4ee)]",
  },
};

type SocialLinksProps = {
  /** Size and shape of each tile, e.g. "size-10 rounded-full". */
  itemClassName: string;
  /** Classes for the icon inside each tile. */
  iconClassName?: string;
  className?: string;
};

/** Links to the company's social profiles, in the order set in `siteConfig.social`. */
export function SocialLinks({ itemClassName, iconClassName = "size-4", className }: SocialLinksProps) {
  return (
    <ul className={cn("flex items-center gap-2.5", className)}>
      {siteConfig.social.map(({ network, label, href }) => {
        const brand = brands[network];
        return (
          <li key={network}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${siteConfig.name} on ${label}`}
              title={label}
              className={cn(
                "flex items-center justify-center shadow-sm transition-[transform,box-shadow,filter] duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:brightness-110",
                brand.tile,
                itemClassName,
              )}
            >
              <brand.icon className={cn(iconClassName, brand.iconClass)} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
