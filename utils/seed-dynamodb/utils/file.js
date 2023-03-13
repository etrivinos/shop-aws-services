import * as fs from 'fs';

export const getItemFromJSONFile = async (filepath) => {
    const content = await fs.promises.readFile(filepath);
    return JSON.parse(content);
}
