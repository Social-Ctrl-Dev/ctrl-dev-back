import { it, expect, describe } from "vitest";
import axios from "axios";
import { config } from "dotenv";

config();
const NODE_PORT = process.env.NODE_PORT;

describe("Test API Comment - Get Comment from user", () => {
  it("Get comment by user", async () => {
    const idURL: string = "2";
    try {
      const response = await axios.get(
        `http://localhost:${NODE_PORT}/comments/user/${idURL}`
      );
    } catch (error) {
      expect(error.response.data.ok).toBe(true);
    }
  }, 15000);

  it("Get comment from post", async () => {
    const idURL: string = "10";

    try {
      const response = await axios.get(
        `http://localhost:${NODE_PORT}/comments/post/${idURL}`
      );
    } catch (error) {
      expect(error.response.data.ok).toBe(true);
    }
  }, 15000);
});

describe("Test API Comment - Post a comment", () => {
  it("Post a comment", async () => {
    const comment = {
      user_id: 1,
      post_id: 1,
      body: "comment-test-delete",
    };

    const response = await axios.post(
      `http://localhost:${NODE_PORT}/comments`,
      comment
    );
    expect(response.data.message).toBe("Comment created");
  }, 15000);
});

describe("Test API Comment - Delete a comment", () => {
  it("Delete a comment", async () => {
    const response = await axios.delete(
      `http://localhost:${NODE_PORT}/test/test3`
    );
    expect(response.data.ok).toBe(true);
  }, 15000);
});
