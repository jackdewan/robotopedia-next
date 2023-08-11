type ArticleType = {
  slug: string;
  title: string;
  _firstPublishedAt: string;
  _publishedAt: string;
  coverImage: { url: string };
  excerpt: string;
  ogImage: {
    url: string;
  };
  seoSettings: {
    description: string;
    title: string;
  };
  content: string;
};

export default ArticleType;
