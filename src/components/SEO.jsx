import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({ 
  title = "WebSage Agency | Premium WordPress, Shopify & Digital Marketing", 
  description = "WebSage Agency crafts stunning WordPress sites, Shopify stores, SEO strategies, landing pages, and brand identities that drive real business growth.", 
  keywords = "web design agency, WordPress development, Shopify development, SEO services, landing pages, digital marketing, graphic design, e-commerce",
  type = "website",
  url = "https://websageagency.com",
  image = "/logo.png"
}) {
  const absoluteImage = image.startsWith('http') 
    ? image 
    : `${window.location.origin}${import.meta.env.BASE_URL.slice(0, -1)}${image}`;

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph tags for social media sharing */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={absoluteImage} />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImage} />
    </Helmet>
  );
}
