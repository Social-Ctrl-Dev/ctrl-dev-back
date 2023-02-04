import { describe, expect, it } from "vitest";

function sumar(a: number, b: number) {
  if (!a || !b) throw new Error("Faltan parametros");
  if (typeof a || typeof b !== "number") return "Parametros no validos";
  return a + b;
}

describe("Test para el modulo de app", () => {
  it("primer test", () => {
    expect(typeof sumar).toBe("function");
  });
  it("segundo test", () => {
    expect(() => sumar()).toThrow();
  });
  it("tercer test", () => {
    expect(sumar(1, "3")).toBe("Parametros no validos");
  });
  it("cuarto test", () => {
    expect(sumar(true, 3)).toBe("Parametros no validos");
  });
});
