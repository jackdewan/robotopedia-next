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
  content: string;
};

export default ArticleType;
