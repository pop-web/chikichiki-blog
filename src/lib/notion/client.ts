import { NOTION_API_SECRET } from "@/constants";
import { Client } from "@notionhq/client";

export const client = new Client({
  auth: NOTION_API_SECRET,
});
