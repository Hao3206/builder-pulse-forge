interface DynamicMeta {
  title: string;
  description: string;
  image?: string;
  type?: "article" | "website";
  noIndex?: boolean;
}

function setMeta(name: string, content: string, property = false) {
  const selector = property
    ? `meta[property="${name}"]`
    : `meta[name="${name}"]`;
  const element = document.head.querySelector<HTMLMetaElement>(selector);
  if (element) element.content = content;
}

export function applyDynamicMeta({
  title,
  description,
  image,
  type = "website",
  noIndex = false,
}: DynamicMeta) {
  document.title = title;
  setMeta("description", description);
  setMeta("robots", noIndex ? "noindex,nofollow" : "index,follow");
  setMeta("og:title", title, true);
  setMeta("og:description", description, true);
  setMeta("og:type", type, true);
  setMeta("twitter:title", title);
  setMeta("twitter:description", description);
  if (image) {
    const absoluteImage = new URL(image, window.location.origin).href;
    setMeta("og:image", absoluteImage, true);
    setMeta("twitter:image", absoluteImage);
  }
}
