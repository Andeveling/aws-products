const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.deleteProduct = async (event) => {
  const { id } = event.pathParameters;

  const params = {
    TableName: 'ProductsDynamoDbTable',
    Key: {
      id: id, // El identificador único del producto
    },
  };

  try {
    await dynamoDb.delete(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: `Producto con ID ${id} eliminado exitosamente`,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: 'Error al eliminar el producto',
        error: error.message,
      }),
    };
  }
};
