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
import type ArticleType from "../../interfaces/post";

type Props = {
  article: ArticleType;
  morearticles: ArticleType[];
  preview?: boolean;
};

export default function Post({ article, morearticles, preview }: Props) {
  const router = useRouter();
  const title = `${article.title} | Next.js Blog Example with ${CMS_NAME}`;
  if (!router.isFallback && !article?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    // <Layout preview={preview}>
      <Container>
        <Header />
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
                coverImage={article.coverImage}
                date={article.date}
                author={article.author}
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
  const article = getArticleBySlug(params.slug, [
    "title",
    "date",
    "slug",
    "author",
    "content",
    "ogImage",
    "coverImage",
  ]);
  const content = await markdownToHtml(article.content || "");

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
  const articles = getAllArticles(["slug"]);

  return {
    paths: articles.map((article) => {
      return {
        params: {
          slug: article.slug,
        },
      };
    }),
    fallback: false,
  };
}
