# Readme

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Starting

To start the applicaion enter the project directory and run command:

### `npm start`

Open http://localhost:3000 to view it in the browser.

To run tests, type:

### `npm test`

## Usage example

![Example](./example.png?raw=true)

Pick a currency from both lists and type a number into either of the two fields using dot as comma.
If all input values are correct, a calculated value will appear automatically in the other text field.

## About the application

Each time any of the input values is modified, the application checks whether the values in one of the text fields and both currency lists are correct. That is whether the string in text field is a non-negative number and currencies are correct. The latter is checked by attempting do send a request to the NBP Web API in order to receive an exchange rate.

The function responsible for connecting to the API tries to find the given currency first in the table A, then, in case of failure, in the table B. If it finds the currency, the exchange rate is stored in the Key-Value map to prevent from sending unnecessarily many requests (The Application will not send a request about currency already present in the map). If the currency is PLN, the function simply returns value of 1.

If all three inputs are correct, the application proceeds to calculating a resulting value and returns it to the other text field. Additionally it displays a unit rate below the form.

The list of currencies can be found in file /src/currencyList.js. It contains all the currencies that can be found in the NBP's tables A and B.


