import { MongoClient } from "mongodb";
import { GridFSBucket } from "mongodb";
import { Db } from "mongodb";

let gridFSBucket: GridFSBucket | undefined = undefined;

async function initGridFSBucket(): Promise<GridFSBucket> {
    const client = await MongoClient.connect(process.env.MONGODB_URI as string);
    const db: Db = client.db();
    gridFSBucket = new GridFSBucket(db, { bucketName: "fs" });
    return gridFSBucket;
  }

export async function getGridFSBucket(): Promise<GridFSBucket> {
  if (gridFSBucket) {
    return gridFSBucket;
  } else {
    return await initGridFSBucket();
  }
}

console.log("MONGODB_URI:", process.env.MONGODB_URI);