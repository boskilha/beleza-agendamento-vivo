import { useEffect } from 'react';

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product' | 'business.business';
  noindex?: boolean;
  canonical?: string;
  structuredData?: object;
}

export const useSEO = ({
  title = "Ello - Marketplace de Beleza e Produtos Locais de Maricá",
  description = "Marketplace local de Maricá com serviços de beleza, produtos artesanais e moeda social Mumbuca aceita. Agende serviços e compre produtos locais online.",
  keywords = "maricá, beleza, marketplace, salão, artesanato, mumbuca, agendamento, produtos locais, são paulo",
  image = "https://lovable.dev/opengraph-image-p98pqg.png",
  url,
  type = "website",
  noindex = false,
  canonical,
  structuredData
}: SEOProps = {}) => {
  useEffect(() => {
    // Update title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, property?: boolean) => {
      const attribute = property ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    
    // Open Graph meta tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:image', image, true);
    
    if (url) {
      updateMetaTag('og:url', url, true);
    }

    // Twitter Card meta tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);

    // Robots meta tag
    const robotsContent = noindex ? 'noindex, nofollow' : 'index, follow';
    updateMetaTag('robots', robotsContent);

    // Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    
    if (canonical) {
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.rel = 'canonical';
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.href = canonical;
    } else if (canonicalLink) {
      canonicalLink.remove();
    }

    // Structured Data
    if (structuredData) {
      let script = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
      if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);
    }

  }, [title, description, keywords, image, url, type, noindex, canonical, structuredData]);
};

export const createLocalBusinessSchema = (business: {
  name: string;
  description: string;
  address: string;
  city: string;
  phone?: string;
  email?: string;
  website?: string;
  rating?: number;
  reviewCount?: number;
}) => ({
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  "name": business.name,
  "description": business.description,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": business.address,
    "addressLocality": business.city,
    "addressRegion": "SP",
    "addressCountry": "BR"
  },
  "telephone": business.phone,
  "email": business.email,
  "url": business.website,
  "aggregateRating": business.rating ? {
    "@type": "AggregateRating",
    "ratingValue": business.rating,
    "reviewCount": business.reviewCount || 0
  } : undefined
});

export const createProductSchema = (product: {
  name: string;
  description: string;
  price: number;
  currency?: string;
  availability?: string;
  category?: string;
  image?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  "name": product.name,
  "description": product.description,
  "image": product.image,
  "category": product.category,
  "offers": {
    "@type": "Offer",
    "price": product.price,
    "priceCurrency": product.currency || "BRL",
    "availability": product.availability || "https://schema.org/InStock"
  }
});

export const createOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Ello",
  "description": "Marketplace local de Maricá com serviços de beleza, produtos artesanais e moeda social Mumbuca aceita",
  "url": "https://ello-marketplace.com",
  "logo": "https://lovable.dev/opengraph-image-p98pqg.png",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Maricá",
    "addressRegion": "RJ",
    "addressCountry": "BR"
  },
  "sameAs": [
    "https://www.facebook.com/ello",
    "https://www.instagram.com/ello",
    "https://twitter.com/ello"
  ]
});