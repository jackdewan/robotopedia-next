import Container from "../../components/container";
import MoreStories from "../../components/more-stories";
import ArticleType from "../../interfaces/post";
import { getAllArticles } from "../../lib/api";

type ArticlesPageProps = {
  allArticles: ArticleType[];
};

export default function ArticlesPage({ allArticles }: ArticlesPageProps) {
  return (
    <Container>
      <MoreStories articles={allArticles} />
    </Container>
  );
}

export const getStaticProps = async () => {
  const allArticles = getAllArticles([
    "title",
    "date",
    "slug",
    "author",
    "coverImage",
    "excerpt",
  ]);

  return {
    props: { allArticles },
  };
};
