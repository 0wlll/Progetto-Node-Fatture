const express = require('express');
const router = express.Router();
const { Fattura } = require('../models/Fattura.js');
const ajv = require('ajv');

const createFatturaSchema = require('../schemas/CreateFatturaSchema.json');
const updateFatturaSchema = require('../schemas/UpdateFatturaSchema.json');
const deleteFatturaSchema = require('../schemas/DeleteFatturaSchema.json');
const viewFatturaSchema = require('../schemas/ViewFatturaSchema.json');

/**
 * @swagger
 * components:
 *   schemas:
 *     Fattura:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the fattura.
 *         data:
 *           type: string
 *           description: The data of the fattura.
 *         utente:
 *          type: boolean
 *          description: The utente of the fattura.
 *         indirizzata:
 *          type: string
 *          description: The indirizzata of the fattura.
 *         motivazioni:
 *          type: string
 *          description: The motivazioni of the fattura.
 *         somma:
 *          type: number
 *          description: The somma of the fattura.
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
  *   name: Fatture
  *   description: The fatture managing API
  */  


const validateSchema = (schema, data) => {
  const ajvValidator = new ajv({ allErrors: true });
  const validate = ajvValidator.compile(schema);
  const valid = validate(data);
  if (!valid) {
    throw new Error(validate.errors.map((error) => error.message).join(', '));
    };
  }

/**
 * @swagger
 * /fatture:
 *   get:
 *     summary: GET ALL
 *     tags: [Fatture]
 *     parameters:
 *      - in: query
 *        name: utente
 *        schema:
 *         type: string
 *         description: The utente of the fattura.
 *         example: 40
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
router.get('/', async (req, res, next) => {
  try {
    const utente = req.query.utente;
    validateSchema(viewFatturaSchema, { utente });
    const fatture = await Fattura.findAll({ where: { utente } });
    res.json(fatture);
  } catch (err) {
    console.error('Errore durante la query: ' + err.stack);
    next(err);
  }
});
 /**
 * @swagger
 * /fatture:
 *   post:
 *     summary: Create a new fattura
 *     tags: [Fatture]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Fattura'
 *           example:
 *             data: 2021-01-01
 *             utente: "42"
 *             indirizzata: "Via Roma 1"
 *             motivazioni: "Motivazioni"
 *             somma: 100
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
router.post('/', async (req, res, next) => {
  try {
  const data = req.body;
 const validate= validateSchema(createFatturaSchema, data);
 console.log(validate,"validate")
  const { data: dataFattura, utente, indirizzata, motivazioni, somma } = data;
    await Fattura.create({ data: dataFattura, utente, indirizzata, motivazioni, somma });
    res.status(201).send('Fattura creata con successo');
  } catch (err) {
    console.error('Errore durante la query: ' + err.stack);
    next(err);
  }
});

 /**
 * @swagger
 * /fatture/{id}:
 *   put:
 *     summary: Update a fattura
 *     tags: [Fatture]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *         type: string
 *         description: The id of the fattura.
 *         example: 38
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Fattura'
 *           example:
 *             data: 2021-01-01
 *             utente: "42"
 *             indirizzata: "Via Roma 1"
 *             motivazioni: "Motivazioni"
 *             somma: 100
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
router.put('/:id', async (req, res, next) => {
  try {
  const data = req.body;
  validateSchema(updateFatturaSchema, data);

  const id = req.params.id;
  const { data: dataFattura, utente, indirizzata, motivazioni, somma } = data;
    const result = await Fattura.update(
      { data: dataFattura, utente, indirizzata, motivazioni, somma },
      { where: { id } }
    );
    if (result[0] === 0) {
      return res.status(404).json({ error: 'Fattura non trovata' });
    }
    res.send('Fattura modificata con successo');
  } catch (err) {
    console.error('Errore durante la query: ' + err.stack);
    next(err);
  }
});

 /**
 * @swagger
 * /fatture/{id}:
 *   delete:
 *     summary: Delete a fattura
 *     tags: [Fatture]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *         type: string
 *         description: The id of the fattura.
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
router.delete('/:id', async (req, res, next) => {
  try {
  const id = +req.params.id;
  validateSchema(deleteFatturaSchema, { id });
    const result = await Fattura.destroy({ where: { id } });
    if (result === 0) {
      return res.status(404).json({ error: 'Fattura non trovata' });
    }
    res.send('Fattura eliminata con successo');
  } catch (err) {
    console.error('Errore durante la query: ' + err.stack);
    next(err);
  }
});

module.exports = router;
