import { Router } from "express";
import * as Webhook from "./controller"

const routerWebhook = Router();
routerWebhook.post("/pull-request", Webhook.postWH_pullRequest);

export default routerWebhook
