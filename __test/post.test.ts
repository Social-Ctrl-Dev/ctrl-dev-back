import { get } from "http";
import { describe, expect, it } from "vitest";


describe("Test para ruta api", () => {
  it("test para ruta api", async () => {
    const request = get("http://localhost:8000/posts", (res) => {
      expect(res.statusCode).toBe(200);
    });
    request.on("error", (error) => {
      console.log(error);
    });
  });
});
