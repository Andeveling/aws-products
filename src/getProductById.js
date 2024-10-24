const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.getProductById = async (event) => {
  
    // Obtiene el ID del producto desde los parámetros de la URL
    const { id } = event.pathParameters;
  const params = {
    TableName: 'ProductsDynamoDbTable', 
    Key: {
      id: id, // El identificador único del producto
    },
  };

  try {
    const data = await dynamoDb.get(params).promise();

    if (!data.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          success: false,
          message: `Producto con ID ${id} no encontrado`,
        }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        data: data.Item,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: 'Error al obtener el producto',
        error: error.message,
      }),
    };
  }
};
