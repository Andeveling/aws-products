const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.updateProduct = async (event) => {
  const { id } = event.pathParameters;
  const requestBody = JSON.parse(event.body); // Parsear el cuerpo de la solicitud

  const params = {
    TableName: 'ProductsDynamoDbTable',
    Key: {
      id: id, // Identificador único del producto
    },
    UpdateExpression: 'set #name = :name, price = :price, stock = :stock',
    ExpressionAttributeNames: {
      '#name': 'name', // Alias para "name" (palabra reservada en DynamoDB)
    },
    ExpressionAttributeValues: {
      ':name': requestBody.name,
      ':price': requestBody.price,
      ':stock': requestBody.stock,
    },
    ReturnValues: 'ALL_NEW', // Retornar los valores actualizados
  };

  try {
    const data = await dynamoDb.update(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Producto actualizado exitosamente',
        data: data.Attributes, // Los nuevos valores del producto
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: 'Error al actualizar el producto',
        error: error.message,
      }),
    };
  }
};
