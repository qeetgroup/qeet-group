import type { ReactElement, SVGProps } from "react";
import { createElement } from "react";

/**
 * Central social-platform config. Edit URLs in one place — every consumer
 * (Footer, /press, /contact, JSON-LD Organization.sameAs) reads from here.
 *
 * Icons are inline SVGs using currentColor so they pick up the site's ink
 * colour and respect dark mode without extra styling.
 */

export type SocialPlatform = {
  name: string;
  ariaLabel: string;
  url: string;
  icon: (props: SVGProps<SVGSVGElement>) => ReactElement;
};

type IconProps = SVGProps<SVGSVGElement>;

const svg = (path: string, viewBox = "0 0 24 24") =>
  (props: IconProps) =>
    createElement(
      "svg",
      {
        viewBox,
        fill: "currentColor",
        "aria-hidden": true,
        ...props,
      },
      createElement("path", { d: path }),
    );

const XIcon = svg(
  "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
);

const LinkedInIcon = svg(
  "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
);

const GitHubIcon = svg(
  "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
);

const BlueskyIcon = svg(
  "M5.203 1.428C7.953 3.499 10.913 7.7 12 9.953c1.087-2.253 4.047-6.454 6.797-8.525 1.984-1.495 5.203-2.652 5.203 1.018 0 .733-.42 6.156-.667 7.037-.858 3.064-3.98 3.846-6.756 3.374 4.852.825 6.087 3.56 3.422 6.296-5.062 5.197-7.275-1.304-7.844-2.97-.104-.305-.153-.448-.155-.327-.002-.121-.051.022-.155.327-.569 1.666-2.782 8.167-7.844 2.97-2.665-2.736-1.43-5.471 3.422-6.296-2.776.472-5.898-.31-6.756-3.374C.42 8.602 0 3.179 0 2.446 0-1.224 3.219-.067 5.203 1.428Z",
);

const FacebookIcon = svg(
  "M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036c-.247-.014-.488-.029-.733-.029-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z",
);

const InstagramIcon = svg(
  "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
);

export const SOCIAL_PLATFORMS: SocialPlatform[] = [
  {
    name: "X",
    ariaLabel: "Qeet Group on X",
    url: "https://x.com/qeetgroup",
    icon: XIcon,
  },
  {
    name: "LinkedIn",
    ariaLabel: "Qeet Group on LinkedIn",
    url: "https://www.linkedin.com/company/qeetgroup",
    icon: LinkedInIcon,
  },
  {
    name: "GitHub",
    ariaLabel: "Qeet Group on GitHub",
    url: "https://github.com/qeetgroup",
    icon: GitHubIcon,
  },
  {
    name: "Bluesky",
    ariaLabel: "Qeet Group on Bluesky",
    url: "https://bsky.app/profile/qeetgroup.bsky.social",
    icon: BlueskyIcon,
  },
  {
    name: "Facebook",
    ariaLabel: "Qeet Group on Facebook",
    url: "https://www.facebook.com/qeetgroup",
    icon: FacebookIcon,
  },
  {
    name: "Instagram",
    ariaLabel: "Qeet Group on Instagram",
    url: "https://www.instagram.com/qeetgroup",
    icon: InstagramIcon,
  },
];
