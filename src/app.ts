import express, { type Application } from "express";
import cors from "cors";
import * as Routes from "./components";

const app: Application = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

// Absolute URLs;
app.use("/auth", Routes.routerUser);
app.use("/posts", Routes.routerPost);
app.use("/tags", Routes.routerTags);
app.use("/comments", Routes.routerComment);
app.use("/likes", Routes.routerLike);
app.use("/test", Routes.routerTest);
app.use("/webhooks", Routes.routerWebhook);

export default app;
