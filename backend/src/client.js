import { Redis } from "ioredis";

const client = new Redis({
  host: "redis",
  port: 6379,
});

client.on("connect", () => console.log("Redis connected"));
client.on("error", (err) => console.error("Redis error", err));
export { client };
