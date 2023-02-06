import type {
  CreatePageParameters,
  UpdatePageParameters,
} from "@notionhq/client/build/src/api-endpoints";

import { client } from "./client";

/**
 * Get Page
 * @param page_id PageまたはBlockのID
 */
export const getPage = async (page_id: string) =>
  await client.pages.retrieve({ page_id });

/**
 * Create Page
 * @param params PageObject（Parent Database IDが必要）
 */
export const createPage = async (params: CreatePageParameters) =>
  await client.pages.create({
    ...params,
  });

/**
 * Edit Page
 * @param page_id PageまたはBlockのID
 * @param properties 編集するPageのPropertyObject
 */
export const updatePage = async (params: UpdatePageParameters) =>
  client.pages.update(params);

/* 削除はBlockのAPIを使用する */

/* https://developers.notion.com/reference/page */
