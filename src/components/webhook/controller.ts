import { Response, Request } from "express";
import { okTrue, okFalse } from "../../responses";

const { WebhookClient, EmbedBuilder } = require("discord.js");

const webhookClient = new WebhookClient({
  url: process.env.DISCORD_WEBHOOK ?? "",
});

const embed = new EmbedBuilder()
  .setTitle("Pull Request UPDATE!")
  .setColor(0x00ffff);

export const postWH_pullRequest = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const data = await req.body;

    const action = String(data.action).toUpperCase();
    const username = String(data.sender.login);
    const avatarURL = String(data.sender.avatar_url);
    const repository_name = String(data.repository.name);
    const repository_url = String(data.repository.html_url);
    const pull_request_url = String(data.pull_request.html_url);

    const content = `
        **Action:** ${action}
        **Repository:** ${repository_name}\n
        **Repository_URL:** *__${repository_url}__*\n
        **Pull_Request_URL:** *__${pull_request_url}__*`;

    webhookClient.send({
      username,
      content,
      avatarURL,
      embeds: [embed],
    });

    return okTrue({ res, result: null, message: "Success." });
  } catch (error) {
    return okFalse({ res, message: error });
  }
};
