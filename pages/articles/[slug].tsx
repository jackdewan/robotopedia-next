import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Container from "../../components/container";
import PostBody from "../../components/post-body";
import Header from "../../components/header";
import PostHeader from "../../components/post-header";
import Layout from "../../components/layout";
import { getArticleBySlug, getAllArticles } from "../../lib/api";
import PostTitle from "../../components/post-title";
import Head from "next/head";
import { CMS_NAME } from "../../lib/constants";
import markdownToHtml from "../../lib/markdownToHtml";
import type ArticleType from "../../interfaces/article";
import { request } from "../../lib/datocms";

type Props = {
  article: ArticleType;
  morearticles?: ArticleType[];
  preview?: boolean;
};

const GET_ALL_SLUGS_QUERY = `query {
  allArticles(filter:{_status: {eq: published}}) {
    slug
  }
}`;

const GET_ARTICLE_BY_SLUG = `query GET_ARTICLE_BY_SLUG($slug: String) {
  article(filter:{slug: { eq: $slug}}) {
    title
    markdown
    slug
    _publishedAt
    coverImage {
      url
      alt
    }
  }
}

`;

export default function Post({ article, morearticles, preview }: Props) {
  const router = useRouter();
  const title = `${article.title} | Robotopedia`;
  if (!router.isFallback && !article?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    // <Layout preview={preview}>
    <Container>
      {/* <Header /> */}
      {router.isFallback ? (
        <PostTitle>Loading…</PostTitle>
      ) : (
        <>
          <article className="mb-32">
            <Head>
              <title>{title}</title>
              {/* <meta property="og:image" content={article.ogImage.url} /> */}
            </Head>
            <PostHeader
              title={article.title}
              coverImage={
                article.coverImage
                  ? article.coverImage.url
                  : "/assets/blog/hello-world/cover.jpg"
              }
              date={article._publishedAt}
            />
            <PostBody content={article.content} />
          </article>
        </>
      )}
    </Container>
    // </Layout>
  );
}

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const { article } = await request({
    query: GET_ARTICLE_BY_SLUG,
    variables: { slug: params.slug },
    includeDrafts: {},
    excludeInvalid: {},
  });

  const content = await markdownToHtml(article.markdown || "");

  return {
    props: {
      article: {
        ...article,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const { allArticles } = await request({
    query: GET_ALL_SLUGS_QUERY,
    variables: {},
    includeDrafts: {},
    excludeInvalid: {},
  });

  return {
    paths: allArticles.map((article: { slug: string }) => {
      return {
        params: {
          slug: article.slug,
        },
      };
    }),
    fallback: false,
  };
}
