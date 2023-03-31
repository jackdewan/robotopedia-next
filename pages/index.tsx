import Container from "../components/container";
import MoreStories from "../components/more-stories";
import HeroPost from "../components/hero-post";
import Intro from "../components/intro";
import Layout from "../components/layout";
import { getAllArticles } from "../lib/api";
import Head from "next/head";
import { CMS_NAME } from "../lib/constants";
import ArticleType from "../interfaces/post";

type Props = {
  allArticles: ArticleType[];
};

export default function Index({ allArticles }: Props) {
  const heroPost = allArticles[0];
  const morearticles = allArticles.slice(1);
  return (
    <>
      {/* <Layout> */}
      <Head>
        <title>{`Robotopedia: Industrial Robot and Automation Knowledge`}</title>
      </Head>
      <Container>
        {/* <Intro /> */}
        {heroPost && (
          <HeroPost
            title={heroPost.title}
            coverImage={heroPost.coverImage}
            date={heroPost.date}
            // author={heroPost.author}
            slug={heroPost.slug}
            // excerpt={heroPost.excerpt}
          />
        )}

        {morearticles.length > 0 && <MoreStories articles={morearticles} />}
      </Container>
      {/* </Layout> */}
    </>
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
