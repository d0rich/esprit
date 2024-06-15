import { createStorage } from "unstorage";
import fsDriver from "unstorage/drivers/fs";

export const dist = createStorage({
  driver: fsDriver({ base: "./dist" }),
});
