import {
  SITE_URL,
  NAME,
  NICKNAME,
  ROLE,
  DESCRIPTION,
  SOCIAL_LINKS,
  SITE_TECHNOLOGIES,
} from "@/lib/site";

interface PersonGraphNode {
  "@type": "Person";
  "@id": string;
  name: string;
  alternateName: string;
  url: string;
  image: string;
  jobTitle: string;
  description: string;
  knowsAbout: readonly string[];
  sameAs: readonly string[];
}

interface WebSiteGraphNode {
  "@type": "WebSite";
  "@id": string;
  url: string;
  name: string;
  publisher: {
    "@id": string;
  };
}

interface StructuredDataGraph {
  "@context": "https://schema.org";
  "@graph": [PersonGraphNode, WebSiteGraphNode];
}

/**
 * Builds the Schema.org @graph typed structure for Person & WebSite.
 * Email is strictly excluded per privacy and SEO guidelines.
 */
export function buildStructuredData(): StructuredDataGraph {
  const personId = `${SITE_URL}/#person`;
  const websiteId = `${SITE_URL}/#website`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: NAME,
        alternateName: NICKNAME,
        url: SITE_URL,
        image: `${SITE_URL}/profile.jpg`,
        jobTitle: ROLE,
        description: DESCRIPTION,
        knowsAbout: SITE_TECHNOLOGIES,
        sameAs: [
          SOCIAL_LINKS.github,
          SOCIAL_LINKS.linkedin,
          SOCIAL_LINKS.instagram,
        ],
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: SITE_URL,
        name: NAME,
        publisher: {
          "@id": personId,
        },
      },
    ],
  };
}

/**
 * Server Component rendering structured data script in <head> or <body>.
 * Escapes '<' as '\u003c' to prevent script injection / XSS vulnerabilities.
 */
export default function JsonLd() {
  const data = buildStructuredData();
  const jsonString = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonString }}
    />
  );
}
