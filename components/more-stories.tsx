import PostPreview from "./post-preview";
import type ArticleType from "../interfaces/article";

type Props = {
  articles: ArticleType[];
};

const MoreStories = ({ articles }: Props) => {
  return (
    <section>
      {/* <h2 className="mb-8 text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
        Articles
      </h2> */}
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:grid-cols-3 gap-y-20 md:gap-y-32 mb-32">
        {articles.map((article) => (
          <PostPreview
            key={article.slug}
            title={article.title}
            coverImage={
              article.coverImage
                ? article.coverImage.url
                : "/assets/blog/hello-world/cover.jpg"
            }
            date={article._publishedAt}
            slug={article.slug}
            excerpt={article.excerpt}
          />
        ))}
      </div>
    </section>
  );
};

export default MoreStories;
