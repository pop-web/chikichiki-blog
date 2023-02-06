import {
  QueryDatabaseParameters,
  QueryDatabaseResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { client } from "./client";

/**
 * Get Database
 * @param database_id DatabaseのID
 */
export const getDatabase = (database_id: string) =>
  client.databases.retrieve({ database_id });

/**
 * Get Database Contents
 * @param params QueryDatabaseParameters
 */
export const getDatabaseContents = (params: QueryDatabaseParameters) =>
  client.databases.query(params);

/**
 * Get All Database
 * @param params QueryDatabaseParameters
 */
export const getDatabaseContentsAll = async (
  params: QueryDatabaseParameters
) => {
  const postArray = [];
  let nextCursor: string | undefined = undefined;
  do {
    const response: QueryDatabaseResponse = await getDatabaseContents({
      ...params,
      start_cursor: nextCursor,
    });
    postArray.push(response.results);
    if (response.has_more && response.next_cursor) {
      nextCursor = response.next_cursor;
    } else {
      nextCursor = undefined;
    }
  } while (nextCursor);

  return postArray;
};
