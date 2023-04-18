import Container from "../../components/container";
import MoreStories from "../../components/more-stories";
import ArticleType from "../../interfaces/article";
import { request } from "../../lib/datocms";

type ArticlesPageProps = {
  allArticles: ArticleType[];
};

const GET_ALL_ARTICLES = `query GET_ALL_ARTICLES {
  allArticles(filter: {_status: { eq: published}}, first: 100) {
    title
    slug
    _publishedAt
    coverImage {
      url
      alt
    }
  }
}
`;

export default function ArticlesPage({ allArticles }: ArticlesPageProps) {
  return (
    <Container>
      <h1 className="text-5xl my-5">Articles</h1>
      <MoreStories articles={allArticles} />
    </Container>
  );
}

export const getStaticProps = async () => {
  const { allArticles } = await request({
    query: GET_ALL_ARTICLES,
    variables: {},
    includeDrafts: {},
    excludeInvalid: {},
  });

  return {
    props: { allArticles },
  };
};
