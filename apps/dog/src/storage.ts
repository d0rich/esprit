import path from 'path';
import { createStorage } from "unstorage";
import fsDriver from "unstorage/drivers/fs";

export const assetsStorage = createStorage({
  driver: fsDriver({ base: path.resolve(__dirname, "../assets/") }),
});

export const tmpStorage = createStorage({
  driver: fsDriver({ base: path.resolve(__dirname, "../.tmp/") }),
});
