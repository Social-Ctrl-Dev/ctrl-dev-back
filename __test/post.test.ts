import { describe, expect, it } from "vitest";
import { config } from "dotenv";
import axios from "axios";

config();
const NODE_PORT = process.env.NODE_PORT;

// * Test 1
describe("Test API Post - GET all Posts", () => {
  it("GET all Post - status", async () => {
    const response = await axios.get(`http://localhost:${NODE_PORT}/posts`);

    expect(response.status).toBe(200);
  }, 15000);

  it("GET all Post - type results", async () => {
    const response = await axios.get(`http://localhost:${NODE_PORT}/posts`);

    expect(typeof response.data.result).toBe("object");
  }, 15000);

  it("GET all Post - lenght results", async () => {
    const response = await axios.get(`http://localhost:${NODE_PORT}/posts`);

    expect(response.data.result.length).toBeGreaterThanOrEqual(0);
  }, 15000);
});

// * Test 2
describe("Test API Posts - Get ID Post", () => {
  it("Get post by ID", async () => {
    const idURL: string = "1";
    const response = await axios.get(
      `http://localhost:${NODE_PORT}/posts/${idURL}`
    );
    expect(response.status).toBe(200);
  }, 15000);

  it("Get post by ID - type results", async () => {
    const idURL: string = "1";
    const response = await axios.get(
      `http://localhost:${NODE_PORT}/posts/${idURL}`
    );
    expect(typeof response.data.result).toBe("object");
  }, 15000);

  it("Get post by ID - Post not found", async () => {
    const idURL: string = "10000";
    try {
      const response = await axios.get(
        `http://localhost:${NODE_PORT}/posts/${idURL}`
      );
    } catch (error) {
      expect(error.response.status).toBe(404);
    }
  }, 15000);
});

// * Test 3
describe("Test API Posts - Get Post by User", () => {
  it("Get post by User", async () => {
    const idURL: string = "1";
    const response = await axios.get(
      `http://localhost:${NODE_PORT}/posts/user/${idURL}`
    );
    expect(response.status).toBe(200);
  }, 15000);

  it("Get post by User - User not found", async () => {
    const idURL: string = "10000";
    try {
      const response = await axios.get(
        `http://localhost:${NODE_PORT}/posts/user/${idURL}`
      );
    } catch (error) {
      expect(error.response.data.ok).toBe(false);
    }
  }, 15000);
});

// * Test 4
describe("Test API POST - POST a Post", () => {
  it("POST a Post", async () => {
    const response = await axios.post(`http://localhost:${NODE_PORT}/posts`, {
      title: "test-delete",
      body: "test-delete",
      user_id: 1,
    });

    expect(response.status).toBe(201);
  }, 15000);
});

// * Test 5
describe("Test API POST - DELETE a Post", () => {
  it("DELETE a Post", async () => {
    const response = await axios.delete(
      `http://localhost:${NODE_PORT}/demo/test`
    );

    expect(response.status).toBe(200);
  }, 15000);
});

// * Test 6
describe("Test API POST - PUT a Post", () => {
  it("PUT a Post", async () => {
    const response = await axios.put(`http://localhost:${NODE_PORT}/posts/1`, {
      title: "test-delete",
      body: "test-delete",
      user_id: 1,
      tag_id: [1, 2, 4],
    });

    expect(response.status).toBe(200);
  }, 15000);
});
