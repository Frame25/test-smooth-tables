import { faker } from '@faker-js/faker';
import { nanoid } from '@reduxjs/toolkit';
import type { ITable, TableFieldData, TableRowData } from '@/entities/tables/model/interfaces';

// Helper function to create a row with random data based on field type
const createRandomRowData = (fields: TableFieldData[]): TableRowData => {
  const rowData: TableRowData = {};
  
  fields.forEach((field) => {
    switch (field.type) {
      case 'text':
        if (field.key.toString().toLowerCase().includes('name')) {
          rowData[field.key] = faker.person.fullName();
        } else if (field.key.toString().toLowerCase().includes('email')) {
          rowData[field.key] = faker.internet.email();
        } else if (field.key.toString().toLowerCase().includes('address')) {
          rowData[field.key] = faker.location.streetAddress();
        } else if (field.key.toString().toLowerCase().includes('phone')) {
          rowData[field.key] = faker.phone.number();
        } else {
          rowData[field.key] = faker.lorem.words(2);
        }
        break;
      case 'number':
        if (field.key.toString().toLowerCase().includes('age')) {
          rowData[field.key] = faker.number.int({ min: 18, max: 80 });
        } else if (field.key.toString().toLowerCase().includes('price')) {
          rowData[field.key] = faker.number.float({ min: 10, max: 1000, fractionDigits: 2 });
        } else if (field.key.toString().toLowerCase().includes('quantity')) {
          rowData[field.key] = faker.number.int({ min: 1, max: 100 });
        } else {
          rowData[field.key] = faker.number.int({ min: 0, max: 1000 });
        }
        break;
      case 'boolean':
        rowData[field.key] = faker.datatype.boolean() ? 'true' : 'false';
        break;
      case 'select':
        if (field.options && field.options.length > 0) {
          const randomIndex = faker.number.int({ min: 0, max: field.options.length - 1 });
          rowData[field.key] = field.options[randomIndex];
        } else {
          rowData[field.key] = '';
        }
        break;
      default:
        rowData[field.key] = '';
    }
  });
  
  return rowData;
};

// Define the fields for each table
const usersTableFields: TableFieldData[] = [
  { title: 'Name', key: 'name', type: 'text' },
  { title: 'Email', key: 'email', type: 'text' },
  { title: 'Age', key: 'age', type: 'number' },
  { title: 'Active', key: 'active', type: 'boolean' },
  { title: 'Role', key: 'role', type: 'select', options: ['Admin', 'User', 'Guest'] },
];

const productsTableFields: TableFieldData[] = [
  { title: 'Product Name', key: 'productName', type: 'text' },
  { title: 'Price', key: 'price', type: 'number' },
  { title: 'In Stock', key: 'inStock', type: 'boolean' },
  { title: 'Category', key: 'category', type: 'select', options: ['Electronics', 'Clothing', 'Food', 'Books'] },
];

const ordersTableFields: TableFieldData[] = [
  { title: 'Order ID', key: 'orderId', type: 'text' },
  { title: 'Customer', key: 'customer', type: 'text' },
  { title: 'Total', key: 'total', type: 'number' },
  { title: 'Status', key: 'status', type: 'select', options: ['Pending', 'Processing', 'Shipped', 'Delivered'] },
  { title: 'Paid', key: 'paid', type: 'boolean' },
];

// Create tables with random data
const createMockTables = (): ITable[] => {
  const tables: ITable[] = [];
  
  // Users table
  const usersTable: ITable = {
    id: nanoid(),
    name: 'Users',
    description: 'Table containing user information',
    fields: usersTableFields,
    rows: [],
  };
  
  // Products table
  const productsTable: ITable = {
    id: nanoid(),
    name: 'Products',
    description: 'Table containing product information',
    fields: productsTableFields,
    rows: [],
  };
  
  // Orders table
  const ordersTable: ITable = {
    id: nanoid(),
    name: 'Orders',
    description: 'Table containing order information',
    fields: ordersTableFields,
    rows: [],
  };
  
  // Add 4 rows of random data to each table
  for (let i = 0; i < 4; i++) {
    usersTable.rows.push(createRandomRowData(usersTableFields));
    productsTable.rows.push(createRandomRowData(productsTableFields));
    ordersTable.rows.push(createRandomRowData(ordersTableFields));
  }
  
  tables.push(usersTable, productsTable, ordersTable);
  
  return tables;
};

export { createMockTables };
