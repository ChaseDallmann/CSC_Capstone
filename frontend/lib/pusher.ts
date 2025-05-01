import PusherServer from "pusher";
import Pusher from "pusher-js";

export const pusherServer = new PusherServer({
  appId: "1982070",
  key: "6024a3eb434904f0d50c",
  secret: "d8a4c20459a578979d47",
  cluster: "us2",
});

export const pusherClient = new Pusher(
  process.env.NEXT_PUBLIC_PUSHER_PUBLISHABLE_KEY!,
  {
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
  }
);