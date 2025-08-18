import type { TableFieldData, ITable } from '@/entities/tables/model/interfaces';

const usersTableFields: TableFieldData[] = [
  { title: 'Name', key: 'name', type: 'text' },
  { title: 'Email', key: 'email', type: 'text' },
  { title: 'Age', key: 'age', type: 'number' },
  { title: 'Active', key: 'active', type: 'boolean' },
  {
    title: 'Role',
    key: 'role',
    type: 'select',
    options: [
      { value: 'admin', label: 'Admin' },
      { value: 'user', label: 'User' },
      { value: 'guest', label: 'Guest' },
    ],
  },
];

const productsTableFields: TableFieldData[] = [
  { title: 'Product Name', key: 'productName', type: 'text' },
  { title: 'Price', key: 'price', type: 'number' },
  { title: 'In Stock', key: 'inStock', type: 'boolean' },
  {
    title: 'Category',
    key: 'category',
    type: 'select',
    options: [
      { value: 'electronics', label: 'Electronics' },
      { value: 'clothing', label: 'Clothing' },
      { value: 'food', label: 'Food' },
      { value: 'books', label: 'Books' },
    ],
  },
];

const ordersTableFields: TableFieldData[] = [
  { title: 'Order ID', key: 'orderId', type: 'text' },
  { title: 'Customer', key: 'customer', type: 'text' },
  { title: 'Total', key: 'total', type: 'number' },
  {
    title: 'Status',
    key: 'status',
    type: 'select',
    options: [
      { value: 'pending', label: 'Pending' },
      { value: 'processing', label: 'Processing' },
      { value: 'shipped', label: 'Shipped' },
      { value: 'delivered', label: 'Delivered' },
    ],
  },
  { title: 'Paid', key: 'paid', type: 'boolean' },
];

const createMockTables = (): ITable[] => {
  const usersTable: ITable = {
    id: 'users-table-1',
    name: 'Users',
    description: 'Table containing user information',
    fields: usersTableFields,
    rows: [
      {
        name: 'John Smith',
        email: 'john.smith@example.com',
        age: 32,
        active: 'true',
        role: 'admin',
      },
      {
        name: 'Sarah Johnson',
        email: 'sarah.j@example.com',
        age: 28,
        active: 'true',
        role: 'user',
      },
      {
        name: 'Michael Brown',
        email: 'mbrown@example.com',
        age: 45,
        active: 'false',
        role: 'guest',
      },
      {
        name: 'Emily Davis',
        email: 'emily.davis@example.com',
        age: 24,
        active: 'true',
        role: 'guest',
      },
    ],
  };

  const productsTable: ITable = {
    id: 'products-table-1',
    name: 'Products',
    description: 'Table containing product information',
    fields: productsTableFields,
    rows: [
      {
        productName: 'Smartphone X',
        price: 799.99,
        inStock: 'true',
        category: 'electronics',
      },
      {
        productName: 'Designer Jeans',
        price: 89.95,
        inStock: 'true',
        category: 'clothing',
      },
      {
        productName: 'Gourmet Chocolate Box',
        price: 24.5,
        inStock: 'false',
        category: 'food',
      },
      {
        productName: 'Bestseller Novel',
        price: 15.99,
        inStock: 'true',
        category: 'books',
      },
    ],
  };

  const ordersTable: ITable = {
    id: 'orders-table-1',
    name: 'Orders',
    description: 'Table containing order information',
    fields: ordersTableFields,
    rows: [
      {
        orderId: 'ORD-12345',
        customer: 'John Smith',
        total: 825.48,
        status: 'delivered',
        paid: 'true',
      },
      {
        orderId: 'ORD-12346',
        customer: 'Sarah Johnson',
        total: 89.95,
        status: 'processing',
        paid: 'true',
      },
      {
        orderId: 'ORD-12347',
        customer: 'Michael Brown',
        total: 40.49,
        status: 'pending',
        paid: 'false',
      },
      {
        orderId: 'ORD-12348',
        customer: 'Emily Davis',
        total: 15.99,
        status: 'shipped',
        paid: 'true',
      },
    ],
  };

  return [usersTable, productsTable, ordersTable];
};

export { createMockTables };
