const request = require("supertest");
const { Utente } = require("../models/Utente");
const app = require("../app");

describe("UtenteRoute", () => {
  describe("GET /utente", () => {
    test("should return an array of all the utente", async () => {
      const response = await request(app).get("/utente");
      expect(response.status).toBe(200);
    });
  });
  describe("POST /utente", () => {
    test("should create a new utente", async () => {
      const random = Math.floor(Math.random() * 1000);
      const utenteData = {
        nome: "Mario",
        cognome: "Rossi",
        email: `user${random}@gmail.com`,
        password: "123456",
        ruolo: "admin",
        area: "area1",
        portafoglio_di: 1,
      };
      const response = await request(app).post("/utente").send(utenteData);
      expect(response.status).toBe(201);
      expect(response.text).toBe("Utente creata con successo");
    });
    test("should return an error if the request body is missing required fields", async () => {
      const invalidUtenteData = {
        cognome: "Rossi",
        email: "user@gmail.com",
        password: "123456",
        ruolo: "admin",
        area: "area1",
        portafoglio_di: 1,
      };
      const response = await request(app)
        .post("/utente")
        .send(invalidUtenteData);
      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        erorr: "must have required property 'nome'",
      });
    });
  });
  describe("PUT /utente/:id", () => {
    let utente;
    const random = Math.floor(Math.random() * 1000);
    beforeAll(async () => {
      utente = await Utente.create({
        nome: "Mario",
        cognome: "Rossi",
        email: `user${random}@gmail.com`,
        password: "123456",
        ruolo: "admin",
        area: "area1",
        portafoglio_di: 1,
      });
    });
    test("should update an existing fattura", async () => {
      const updatedFatturaData = {
        nome: "Mario Updated",
        cognome: "Rossi",
      };
      const response = await request(app)
        .put(`/utente/${utente.id}`)
        .send(updatedFatturaData);
      expect(response.status).toBe(200);
      expect(response.text).toBe("Utente modificata con successo");
    });
  });
  describe("DELETE /utente/:id", () => {
    let utente;
    const random = Math.floor(Math.random() * 1000);
    beforeAll(async () => {
      utente = await Utente.create({
        nome: "Mario",
        cognome: "Rossi",
        email: `user${random}@gmail.com`,
        password: "123456",
        ruolo: "admin",
        area: "area1",
        portafoglio_di: 1,
      });
    });
    test("should delete an existing utente", async () => {
      const response = await request(app).delete(`/utente/${utente.id}`);
      expect(response.status).toBe(200);
      expect(response.text).toBe("Utente eliminata con successo");
    });
    test("should return an error if the id is not valid", async () => {
      const response = await request(app).delete("/utente/2123");
      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        error: "Utente non trovata",
      });
    });
  });
});
