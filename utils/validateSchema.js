const Ajv = require('ajv');

function validateSchema(schema, data) {
  const ajv = new Ajv();
  const validate = ajv.compile(schema);
  const valid = validate(data);
  if (!valid) {
    throw new Error('Invalid request body');
  }
}

module.exports = validateSchema;
