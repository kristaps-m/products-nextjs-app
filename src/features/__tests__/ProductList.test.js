import '@testing-library/jest-dom'
import {render, screen, cleanup} from '@testing-library/react';
import ProductList from '../product/ProductList'
import TestRenderer from 'react-test-renderer';

afterEach(() => {
  cleanup();
});

test('should render ProductList feature/product', () => {
  const productList = [{ "id": 1,
    "name": "Apple",
    "price": 1.10,
    "currency": "EUR",
    "category": "Fruits",
    "description": "Fresh and delicious apples from the local orchard."}]

  render(<ProductList products={productList}/>);
  const productListElement = screen.getByTestId('productList-1');

  expect(productListElement).toBeInTheDocument();
  expect(productListElement).toHaveTextContent('Apple');
})