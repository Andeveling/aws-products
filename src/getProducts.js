const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.getProducts = async (event) => {
  const params = {
    TableName: "ProductsDynamoDbTable", 
  };

  try {
    const data = await dynamoDb.scan(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        data: data.Items,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: 'Error al obtener los productos',
        error: error.message,
      }),
    };
  }
};
