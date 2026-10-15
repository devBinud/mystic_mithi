import { createContext } from 'react';

export const CartContext = createContext(null);

// Flat shipping charge added at checkout. Set to 0 to hide the line.
// TODO: confirm the shipping charge with the author before launch.
export const SHIPPING_FEE = 0;

export const BOOK_FORMATS = ['Paperback', 'Hardcover Edition'];
