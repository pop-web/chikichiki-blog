import { DATABASE_ID, SITE_TITLE, SITE_URL } from "@/constants";
import { getDatabase, getDatabaseContentsAll } from "@/lib/notion/databases";
import {
  NotionDatabaseProperty,
  NotionPageObjectResponse,
} from "@/types/notion";
import { InferGetStaticPropsType, NextPage } from "next";
import { ArticleJsonLd, NextSeo } from "next-seo";
import dummy_notion_pages_array from "@/mocks/notion_pages_array.json";
import dummy_notion_database_properties from "@/mocks/notion_database_properties.json";
import { PostsTemplate } from "@/components/@templates/PostsTemplate";

export const getStaticProps = async () => {
  if (process.env.ENVIRONMENT === "local") {
    return {
      props: {
        postsArray: dummy_notion_pages_array as NotionPageObjectResponse[][],
        properties: dummy_notion_database_properties as NotionDatabaseProperty,
      },
    };
  }

  const { properties } = await getDatabase(DATABASE_ID);
  const postsArray = (await getDatabaseContentsAll({
    database_id: DATABASE_ID,
    page_size: 10,
    sorts: [
      {
        property: "Date",
        direction: "descending",
      },
    ],
    filter: {
      and: [
        {
          property: "Published",
          checkbox: {
            equals: true,
          },
        },
        {
          property: "Date",
          date: {
            is_not_empty: true,
          },
        },
      ],
    },
  })) as NotionPageObjectResponse[][];
  return {
    props: {
      postsArray,
      properties,
    },
    revalidate: 60 * 60 * 24, // 1日
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Index: NextPage<Props> = ({ postsArray, properties }) => {
  return (
    <>
      <PostsTemplate postsArray={postsArray} properties={properties} />
      {/* meta seo */}
      <NextSeo
        title={SITE_TITLE}
        openGraph={{
          url: SITE_TITLE,
        }}
      />
      <ArticleJsonLd
        type="BlogPosting"
        title={SITE_TITLE}
        url={SITE_URL}
        images={[`${SITE_URL}/image.png`]}
        datePublished="2015-02-05T08:00:00+08:00"
        dateModified={postsArray[0][0].last_edited_time}
        authorName="POP"
        description="記事一覧"
      />
    </>
  );
};

export default Index;
