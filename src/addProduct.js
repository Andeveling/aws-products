// @ts-check
import crypto from "crypto";
import AWS from "aws-sdk";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

/**
 * 
 * @param {*} event 
 * @returns 
 */
const addProduct = async (event) => {
    const { body } = event;
    const { name, price, stock } = JSON.parse(body);
    

    const newProduct = {
        id: crypto.randomUUID(),
        name: name,
        price: price,
        stock: stock
    };


    const params = {
        TableName: "ProductsDynamoDbTable",
        Item: newProduct 
    };
    
    try {
        const data = await dynamoDb.put(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify(data)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify(error)
        };
    }
}  

module.exports = { addProduct };