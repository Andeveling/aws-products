const crypto = require('crypto');
const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.addProduct = async (event) => {
  const { body } = event;
  const { name, price, stock } = JSON.parse(body); // Parsear el cuerpo de la solicitud

  const newProduct = {
    id: crypto.randomUUID(), // Genera un nuevo ID único
    name: name,
    price: price,
    stock: stock,
  };

  const params = {
    TableName: "ProductsDynamoDbTable",
    Item: newProduct, // El nuevo producto a agregar
  };
  
  try {
    await dynamoDb.put(params).promise(); // Guardar el nuevo producto en DynamoDB
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Producto agregado exitosamente',
        data: newProduct, // Devuelve el producto agregado
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: 'Error al agregar el producto',
        error: error.message,
      }),
    };
  }
};
