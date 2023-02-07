import { it, describe, expect } from "vitest";
import { config } from "dotenv";
import axios from "axios";

config();
const NODE_PORT = process.env.NODE_PORT;

describe("Test API Tags - Get all Tags", () => {
  it("Get all Tags", async () => {
    const response = await axios.get(`http://localhost:${NODE_PORT}/tags`);
    expect(response.status).toBe(200);
  }, 15000);

  it("Get Tag by ID", async () => {
    const idURL: string = "1";
    const response = await axios.get(
      `http://localhost:${NODE_PORT}/tags/${idURL}`
    );

    expect(response.status).toBe(200);
  }, 15000);

  it("Get Tag by ID - Tag not found", async () => {
    const idURL: string = "100000";
    try {
      const response = await axios.get(
        `http://localhost:${NODE_PORT}/tags/${idURL}`
      );
    } catch (error) {
      expect(error.response.status).toBe(404);
    }
  }, 15000);
});

describe("Test API Tags - Post Tag", () => {
  it("Post Tag", async () => {
    const data = {
      name: "tag-test-delete",
    };
    const response = await axios.post(
      `http://localhost:${NODE_PORT}/tags`,
      data
    );

    expect(response.status).toBe(201);
  }, 15000);
});

describe("Test API Tags - Put Tag", () => {
  it("Put Tag", async () => {
    const data = {
      name: "Backend",
    };
    const idURL: string = "1";
    const response = await axios.put(
      `http://localhost:${NODE_PORT}/tags/${idURL}`,
      data
    );

    expect(response.status).toBe(202);
  }, 15000);
});

describe("Test API Tags - Delete Tag", () => {
  it("Delete Tag", async () => {
    const response = await axios.delete(
      `http://localhost:${NODE_PORT}/test/test2`
    );

    expect(response.status).toBe(200);
  }, 15000);
});
