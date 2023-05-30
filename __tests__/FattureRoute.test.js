const request = require("supertest");
const { Fattura } = require("../models/Fattura");
const app = require("../app");

describe("FattureRoute", () => {
  describe("GET /fatture/?utente", () => {
    test("should return an empty array when no fatture are present for the given utente", async () => {
      const response = await request(app).get("/fatture/?utente=2323");
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });
    test("should return an array of fatture when they exist for the given utente", async () => {
      await Fattura.create({
        data: "2022-01-01",
        utente: "42",
        indirizzata: "test",
        motivazioni: "test",
        somma: 1000,
      });
      const response = await request(app).get("/fatture/?utente=42");
      expect(response.status).toBe(200);
    });
  });
  describe("POST /fatture", () => {
    test("should create a new fattura", async () => {
      const fatturaData = {
        data: "2022-01-01",
        utente: "43",
        indirizzata: "test",
        motivazioni: "test",
        somma: 1000,
      };
      const response = await request(app).post("/fatture").send(fatturaData);
      expect(response.status).toBe(201);
      expect(response.text).toBe("Fattura creata con successo");
    });
    test("should return an error if the request body is missing required fields", async () => {
      const invalidFatturaData = {
        data: "2022-01-01",
        indirizzata: "test",
        motivazioni: "test",
        somma: 1000,
      };
      const response = await request(app)
        .post("/fatture")
        .send(invalidFatturaData);
      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        erorr: "must have required property 'utente'",
      });
    });
  });
  describe("PUT /fatture/:id", () => {
    let fattura;
    beforeAll(async () => {
      fattura = await Fattura.create({
        data: "2022-01-01",
        utente: "43",
        indirizzata: "test",
        motivazioni: "test",
        somma: 1000,
      });
    });
    test("should update an existing fattura", async () => {
      const updatedFatturaData = {
        data: "2022-02-01",
        utente: "43",
        indirizzata: "test2",
        motivazioni: "test2",
        somma: 1000,
      };
      const response = await request(app)
        .put(`/fatture/${fattura.id}`)
        .send(updatedFatturaData);
      expect(response.status).toBe(200);
      expect(response.text).toBe("Fattura modificata con successo");
    });
    test("should return an error if the request body is missing required fields", async () => {
      const invalidFatturaData = {
        indirizzata: "test",
        motivazioni: "test",
        data: "2022-01-01",
        somma: 1000,
      };
      const response = await request(app)
        .put(`/fatture/${fattura.id}`)
        .send(invalidFatturaData);
      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        erorr: "must have required property 'utente'",
      });
    });
  });
  describe("DELETE /fatture/:id", () => {
    let fattura;
    beforeAll(async () => {
      fattura = await Fattura.create({
        data: "2022-01-01",
        utente: "43",
        indirizzata: "test",
        motivazioni: "test",
        somma: 1000,
      });
    });
    test("should delete an existing fattura", async () => {
      const response = await request(app).delete(`/fatture/${fattura.id}`);
      expect(response.status).toBe(200);
      expect(response.text).toBe("Fattura eliminata con successo");
    });
    test("should return an error if the id is not valid", async () => {
      const response = await request(app).delete("/fatture/212");
      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        error: "Fattura non trovata",
      });
    });
  });
});
