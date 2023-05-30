const express = require("express");
const router = express.Router();
const { Utente } = require("../models/Utente.js");
const { Fattura } = require("../models/Fattura.js");
const ajv = require("ajv");
const bcrypt = require("bcrypt");

const createUtenteSchema = require("../schemas/CreateUtenteSchema.json");
const updateUtenteSchema = require("../schemas/UpdateUtenteSchema.json");
const deleteUtenteSchema = require("../schemas/DeleteUtenteSchema.json");

/**
 * @swagger
 * components:
 *   schemas:
 *     Utente:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the Utente.
 *         nome:
 *           type: string
 *           description: The nome of the Utente.
 *         cognome:
 *          type: string
 *          description: The cognome of the Utente.
 *         email:
 *          type: string
 *          description: The email of the Utente.
 *         password:
 *          type: string
 *          description: The password of the Utente.
 *         ruolo:
 *          type: string
 *          description: The ruolo of the Utente.
 *   responses:
 *    200:
 *     description: Successfull Response.
 *     content:
 *      application/json: {}
 *    400:
 *     description: Bad Request.
 *     content:
 *      application/json: {}
 *    404:
 *     description: Not found.
 *     content:
 *      application/json: {}
 *    422:
 *     description: Validation Error.
 *     content:
 *      application/json: {}
 *    500:
 *     description: Internal server error.
 *     content:
 *      application/json: {}
 */

/**
 * @swagger
 * tags:
 *   name: Utente
 *   description: The Utente managing API
 */

const validateSchema = (schema, data) => {
  const ajvValidator = new ajv({ allErrors: true });
  const validate = ajvValidator.compile(schema);
  const valid = validate(data);
  if (!valid) {
    throw new Error(validate.errors.map((error) => error.message).join(", "));
  }
};

/**
 * @swagger
 * /utente:
 *   get:
 *     summary: GET ALL utente
 *     tags: [Utente]
 *     responses:
 *       200:
 *        $ref: '#/components/responses/200'
 *       404:
 *        $ref: '#/components/responses/404'
 *       422:
 *        $ref: '#/components/responses/422'
 *       500:
 *        $ref: '#/components/responses/500'
 */
router.get("/", async (req, res, next) => {
  try {
    const utente = await Utente.findAll({});
    res.json(utente);
  } catch (err) {
    console.error("Errore durante la query: " + err.stack);
    next(err);
  }
});
/**
 * @swagger
 * /utente:
 *   post:
 *     summary: Create a new utente
 *     tags: [Utente]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Utente'
 *           example:
 *             nome: "Mario"
 *             cognome: "Rossi"
 *             email: "user@gmail.com"
 *             password: "123456"
 *             ruolo: "admin"
 *             area: "area1"
 *             portafoglio_di: 1
 *     responses:
 *       200:
 *        $ref: '#/components/responses/200'
 *       404:
 *        $ref: '#/components/responses/404'
 *       422:
 *        $ref: '#/components/responses/422'
 *       500:
 *        $ref: '#/components/responses/500'
 */
router.post("/", async (req, res, next) => {
  try {
    const data = req.body;
    validateSchema(createUtenteSchema, data);
    data.password = await bcrypt.hash(data.password, 10);
    await Utente.create(data);
    res.status(201).send("Utente creata con successo");
  } catch (err) {
    console.error("Errore durante la query: " + err.stack);
    next(err);
  }
});

/**
 * @swagger
 * /utente/{id}:
 *   put:
 *     summary: Update a utente
 *     tags: [Utente]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *         type: string
 *         description: The id of the utente
 *         example: 38
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Fattura'
 *           example:
 *             nome: "Mario"
 *             cognome: "Rossi"
 *             email: "user323@gmail.com"
 *             password: "123456"
 *             ruolo: "admin"
 *             area: "area1"
 *             portafoglio_di: 1
 *     responses:
 *       200:
 *        $ref: '#/components/responses/200'
 *       404:
 *        $ref: '#/components/responses/404'
 *       422:
 *        $ref: '#/components/responses/422'
 *       500:
 *        $ref: '#/components/responses/500'
 */
router.put("/:id", async (req, res, next) => {
  try {
    const data = req.body;
    validateSchema(updateUtenteSchema, data);

    const id = +req.params.id;
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    const result = await Utente.update(req.body, { where: { id } });
    if (result[0] === 0) {
      return res.status(404).json({ error: "Utente non trovata" });
    }
    res.send("Utente modificata con successo");
  } catch (err) {
    console.error("Errore durante la query: " + err.stack);
    next(err);
  }
});

/**
 * @swagger
 * /utente/{id}:
 *   delete:
 *     summary: Delete a utente
 *     tags: [Utente]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *         type: string
 *         description: The id of the utente
 *         example: 38
 *         required: true
 *     responses:
 *       200:
 *        $ref: '#/components/responses/200'
 *       404:
 *        $ref: '#/components/responses/404'
 *       422:
 *        $ref: '#/components/responses/422'
 *       500:
 *        $ref: '#/components/responses/500'
 */
router.delete("/:id", async (req, res, next) => {
  try {
    const id = +req.params.id;
    validateSchema(deleteUtenteSchema, { id });
    await Fattura.destroy({ where: { utente: id } });

    const result = await Utente.destroy({ where: { id } });

    if (result === 0) {
      return res.status(404).json({ error: "Utente non trovata" });
    }
    res.send("Utente eliminata con successo");
  } catch (err) {
    console.error("Errore durante la query: " + err.stack);
    next(err);
  }
});

module.exports = router;
