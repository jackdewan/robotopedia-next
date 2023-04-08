import Container from "../components/container";
import MoreStories from "../components/more-stories";
import HeroPost from "../components/hero-post";
import Intro from "../components/intro";
import Layout from "../components/layout";
import { getAllArticles } from "../lib/api";
import Head from "next/head";
import { CMS_NAME } from "../lib/constants";
import ArticleType from "../interfaces/article";

import { request } from "../lib/datocms";

type IndexProps = {
  allArticles: ArticleType[];
};

const HOMEPAGE_QUERY = `query HomePage {
  allArticles(filter:{_status: {eq: published}}) {
    id
    title
    _status
    _firstPublishedAt
    _publishedAt
    slug
    coverImage {
      url
      alt
    }
  }
}`;

export default function Index({ allArticles }: IndexProps) {
  const heroPost = allArticles[0];
  const moreArticles = allArticles.slice(1);
  console.log(moreArticles);
  return (
    <>
      <Head>
        <title>{`Robotopedia: Industrial Robot and Automation Knowledge`}</title>
      </Head>
      <Container>
        <Intro />
        {heroPost && (
          <HeroPost
            title={heroPost.title}
            coverImage={
              heroPost.coverImage
                ? heroPost.coverImage.url
                : "/assets/blog/hello-world/cover.jpg"
            }
            date={heroPost._firstPublishedAt}
            slug={heroPost.slug}
          />
        )}

        {moreArticles.length > 0 && <MoreStories articles={moreArticles} />}
      </Container>
    </>
  );
}

export const getStaticProps = async () => {
  const { allArticles } = await request({
    query: HOMEPAGE_QUERY,
    variables: { limit: 10 },
    includeDrafts: {},
    excludeInvalid: {},
  });

  return {
    props: { allArticles },
  };
};
