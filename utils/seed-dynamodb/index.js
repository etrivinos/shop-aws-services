
import { saveItemsToDynamoDB } from "./utils/db.js";
import { getItemFromJSONFile } from "./utils/file.js";

const run = async () => {
  const items = await getItemFromJSONFile(process.env.FILEPATH);
  saveItemsToDynamoDB(items);
}

run();