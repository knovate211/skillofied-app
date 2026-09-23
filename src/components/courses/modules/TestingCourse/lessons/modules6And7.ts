import type { Lesson } from '../TestingCourseData';

/*
 * Module 6 (API Testing) and Module 7 (Database Testing) lesson bodies.
 * Running demo app: "ShopEasy", a small online shop (login, search, cart, checkout).
 * Public practice API: https://jsonplaceholder.typicode.com (free, no key needed).
 */

/* ------------------------------------------------------------------ */
/* Shared ShopEasy sample data for the SQL lessons                     */
/* ------------------------------------------------------------------ */

const USERS_HEADERS = ['id', 'name', 'email', 'city', 'status'];
const USERS_ROWS = [
  ['1', 'Asha Rao', 'asha@shopeasy.test', 'Pune', 'active'],
  ['2', 'Ben Carter', 'ben@shopeasy.test', 'London', 'active'],
  ['3', 'Chen Li', 'chen@shopeasy.test', 'Singapore', 'blocked'],
  ['4', 'Diego Ruiz', 'diego@shopeasy.test', 'Madrid', 'active'],
];

const PRODUCTS_HEADERS = ['id', 'name', 'price', 'stock'];
const PRODUCTS_ROWS = [
  ['101', 'Wireless Mouse', '25.00', '40'],
  ['102', 'USB-C Cable', '9.50', '120'],
  ['103', 'Laptop Stand', '45.00', '0'],
  ['104', 'Headphones', '80.00', '15'],
];

const ORDERS_HEADERS = ['id', 'user_id', 'status', 'total', 'created_at'];
const ORDERS_ROWS = [
  ['5001', '1', 'PAID', '59.50', '2026-09-01'],
  ['5002', '2', 'SHIPPED', '80.00', '2026-09-02'],
  ['5003', '1', 'CANCELLED', '45.00', '2026-09-03'],
  ['5004', '4', 'PAID', '34.50', '2026-09-05'],
];

const ORDER_ITEMS_HEADERS = ['id', 'order_id', 'product_id', 'quantity', 'unit_price'];
const ORDER_ITEMS_ROWS = [
  ['1', '5001', '101', '2', '25.00'],
  ['2', '5001', '102', '1', '9.50'],
  ['3', '5002', '104', '1', '80.00'],
  ['4', '5003', '103', '1', '45.00'],
  ['5', '5004', '101', '1', '25.00'],
  ['6', '5004', '102', '1', '9.50'],
];

export const modules6And7Lessons: Record<string, Lesson> = {
  /* ================================================================ */
  /* MODULE 6: API TESTING                                             */
  /* ================================================================ */

  'm6-l1': {
    id: 'm6-l1',
    title: 'Lesson 6.1 What is an API?',
    objectives: [
      'Explain in simple words what an API is.',
      'Name the parts of an API call: client, server, request, response and endpoint.',
      'Explain why testers test the API and not only the screen (UI).',
    ],
    theory:
      'An API (Application Programming Interface) is a messenger that lets two programs talk to each other. The client sends a request, the server does the work, and the API carries back a response.',
    blocks: [
      {
        type: 'text',
        value:
          'When you use the ShopEasy website, you see buttons, pictures and forms. This is the UI (user interface). But the page does not keep the products or your orders. Another program, the server, keeps them. The page and the server talk to each other through an API.',
      },
      {
        type: 'text',
        value:
          'API means Application Programming Interface. "Interface" means a meeting point. An API is a set of rules: "Send me a message in this format, and I will send you an answer in that format."',
      },
      { type: 'heading', value: 'Key terms' },
      {
        type: 'table',
        headers: ['Term', 'Simple meaning', 'ShopEasy example'],
        rows: [
          ['Client', 'The program that asks for something.', 'The ShopEasy website or mobile app.'],
          ['Server', 'The program that does the work and answers.', 'The ShopEasy backend that stores products and orders.'],
          ['Request', 'The message the client sends.', '"Give me all products with the word mouse."'],
          ['Response', 'The message the server sends back.', 'A list of 3 mouse products.'],
          ['Endpoint', 'The exact address (URL) of one API action.', 'https://api.shopeasy.test/products'],
          ['Payload / body', 'The data inside a request or response.', 'The product list in JSON format.'],
        ],
      },
      { type: 'heading', value: 'What happens when you search on ShopEasy' },
      {
        type: 'steps',
        title: 'One search, step by step',
        steps: [
          { label: 'You type "mouse" and press Search', text: 'This happens in the UI.' },
          { label: 'The website sends a request', text: 'GET https://api.shopeasy.test/products?search=mouse' },
          { label: 'The server does the work', text: 'It looks in the database for matching products.' },
          { label: 'The server sends a response', text: 'Status 200 OK and a JSON list of products.' },
          { label: 'The website shows the result', text: 'The UI turns the JSON into product cards.' },
        ],
      },
      {
        type: 'code',
        language: 'http',
        value: `GET /products?search=mouse HTTP/1.1
Host: api.shopeasy.test
Accept: application/json

HTTP/1.1 200 OK
Content-Type: application/json

[
  { "id": 101, "name": "Wireless Mouse", "price": 25.00 }
]`,
      },
      { type: 'heading', value: 'What is API testing?' },
      {
        type: 'text',
        value:
          'API testing means you send requests directly to the server, without the UI, and you check the responses. You check the status code, the data, the speed and the error messages.',
      },
      {
        type: 'compare',
        columns: [
          {
            title: 'UI testing',
            subtitle: 'Test through the screen',
            tone: 'honey',
            items: ['Clicks buttons and fills forms', 'Slower to run', 'Breaks when the page design changes', 'Needs the UI to be finished'],
          },
          {
            title: 'API testing',
            subtitle: 'Test the messages directly',
            tone: 'olive',
            items: ['Sends requests with a tool like Postman', 'Fast: often less than one second per test', 'Stable when the design changes', 'Can start before the UI exists'],
          },
        ],
      },
      {
        type: 'alert',
        value:
          'One API can serve many clients. The ShopEasy website, Android app and iPhone app all use the same API. If the API has a bug, all three apps have the bug. This is why API testing finds bugs early and saves time.',
      },
      { type: 'heading', value: 'Try it yourself' },
      {
        type: 'list',
        ordered: true,
        items: [
          'Open this address in your browser: https://jsonplaceholder.typicode.com/users/1',
          'Look at the text you get back. This is a real API response in JSON format.',
          'Find the value of "name" and "email".',
          'Change the 1 at the end to 2. You asked the API for a different user.',
        ],
      },
      { type: 'heading', value: 'Check your understanding' },
      {
        type: 'list',
        items: [
          'Who sends the request: the client or the server? (The client.)',
          'What is an endpoint? (The exact URL of one API action, like /products.)',
          'Why can API tests start before the UI is ready? (Because they talk to the server directly and do not need the screen.)',
        ],
      },
    ],
    callout: {
      lead: 'Think of it like this:',
      text: 'An API is like a waiter in a restaurant. You (the client) do not go into the kitchen (the server). You give your order to the waiter, the waiter takes it to the kitchen, and brings back your food (the response).',
    },
    mistakes: [
      'Thinking the API is the same as the website. The website only uses the API.',
      'Testing only through the UI, so bugs in the server are found late.',
      'Checking only that "something came back" instead of checking the real data.',
      'Forgetting that mobile apps and other systems use the same API.',
    ],
    takeaways: [
      'An API lets two programs talk using requests and responses.',
      'The client asks, the server answers.',
      'An endpoint is the URL of one API action.',
      'API testing checks the server directly, without the UI.',
      'API tests are fast, stable and can start early.',
      'APIs separate backend services from client applications, so many apps can share one API.',
    ],
  },

  'm6-l2': {
    id: 'm6-l2',
    title: 'Lesson 6.2 REST APIs',
    objectives: [
      'Explain what REST means in simple words.',
      'Read a REST URL and find the resource, the ID and the query parameters.',
      'Describe the main REST rules: resources, HTTP methods, and stateless requests.',
    ],
    theory:
      'REST is a popular style for building APIs. Everything is a resource with its own URL, you use HTTP methods to act on it, and every request carries all the information the server needs (stateless).',
    blocks: [
      {
        type: 'text',
        value:
          'There are many ways to build an API. The most common way on the web today is REST. REST means Representational State Transfer. The name is hard, but the idea is simple.',
      },
      { type: 'heading', value: 'Key terms' },
      {
        type: 'table',
        headers: ['Term', 'Simple meaning'],
        rows: [
          ['Resource', 'A "thing" the API manages, like a user, a product or an order.'],
          ['URI / URL', 'The address of a resource, for example /products/101.'],
          ['Base URL', 'The start of every address, for example https://api.shopeasy.test.'],
          ['Path parameter', 'A value inside the path, like 101 in /products/101.'],
          ['Query parameter', 'Extra options after a ?, like ?search=mouse&sort=price.'],
          ['Header', 'Extra information about the request, like Authorization or Content-Type.'],
          ['Stateless', 'The server does not remember you between requests. Each request must carry everything it needs.'],
        ],
      },
      { type: 'heading', value: 'The main REST rules' },
      {
        type: 'list',
        ordered: true,
        items: [
          'Everything is a resource. Each resource has its own URL.',
          'Use HTTP methods (GET, POST, PUT, PATCH, DELETE) to say what you want to do.',
          'Client and server are separate. The client does not care how the server stores data.',
          'Stateless: every request includes all needed data, for example the login token.',
          'Responses use a standard format. Today this is almost always JSON.',
        ],
      },
      { type: 'heading', value: 'Reading a REST URL' },
      {
        type: 'syntax',
        title: 'GET https://api.shopeasy.test/users/1/orders?status=PAID&limit=10',
        parts: [
          { clause: 'GET', text: 'The HTTP method. GET means "read".' },
          { clause: 'https://api.shopeasy.test', text: 'The base URL. It is the same for all ShopEasy endpoints.' },
          { clause: '/users/1', text: 'The resource "users" and the path parameter 1 (user with ID 1).' },
          { clause: '/orders', text: 'A sub-resource: the orders of that user.' },
          { clause: '?status=PAID&limit=10', text: 'Query parameters: only PAID orders, at most 10.' },
        ],
      },
      { type: 'heading', value: 'Good REST endpoints for ShopEasy' },
      {
        type: 'table',
        headers: ['Action', 'Method and endpoint'],
        rows: [
          ['List all products', 'GET /products'],
          ['Search products', 'GET /products?search=mouse'],
          ['Get one product', 'GET /products/101'],
          ['Add an item to the cart', 'POST /cart/items'],
          ['Change the quantity of a cart item', 'PATCH /cart/items/7'],
          ['Remove a cart item', 'DELETE /cart/items/7'],
          ['Place an order (checkout)', 'POST /orders'],
        ],
      },
      {
        type: 'warning',
        value:
          'Bad REST design puts the action in the URL, like GET /deleteProduct?id=101. In REST, the method says the action: DELETE /products/101. Report badly designed endpoints to the team.',
      },
      { type: 'heading', value: 'Stateless in practice' },
      {
        type: 'text',
        value:
          'Because the server does not remember you, every private request must send your login token in a header. If you forget the token, the server answers 401 Unauthorized.',
      },
      {
        type: 'code',
        language: 'http',
        value: `GET /users/1/orders HTTP/1.1
Host: api.shopeasy.test
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.example.token
Accept: application/json`,
      },
      {
        type: 'example',
        title: 'What a tester checks in a REST API',
        value:
          'Does each URL return the right resource? Does GET /products/999999 return 404 for a product that does not exist? Do query parameters really filter the data? Does a request without a token return 401? Is the response always JSON?',
      },
      { type: 'heading', value: 'Try it yourself' },
      {
        type: 'list',
        ordered: true,
        items: [
          'Open https://jsonplaceholder.typicode.com/posts/1 in your browser. This is one "post" resource.',
          'Open https://jsonplaceholder.typicode.com/posts/1/comments. This is a sub-resource.',
          'Open https://jsonplaceholder.typicode.com/comments?postId=1. This uses a query parameter.',
          'Compare steps 2 and 3. Do you get the same comments?',
        ],
      },
      { type: 'heading', value: 'Check your understanding' },
      {
        type: 'list',
        items: [
          'In /products/101, what is 101? (A path parameter: the ID of the product.)',
          'What does "stateless" mean? (The server does not remember earlier requests; each request carries all needed data.)',
          'Which is better REST: GET /getOrders or GET /orders? (GET /orders.)',
        ],
      },
    ],
    callout: {
      lead: 'Think of it like this:',
      text: 'REST is like a library. Every book (resource) has its own shelf number (URL). You tell the librarian what to do with it: borrow, return, or replace (the HTTP method). The librarian does not remember you, so you show your library card (token) every time.',
    },
    mistakes: [
      'Mixing up path parameters (/products/101) and query parameters (?search=mouse).',
      'Expecting the server to remember a login from an earlier request.',
      'Not testing what happens with an ID that does not exist.',
      'Ignoring headers such as Authorization and Content-Type.',
    ],
    takeaways: [
      'REST is a style of API where everything is a resource with a URL.',
      'REST endpoints represent system resources, like /users or /orders.',
      'The HTTP method says the action; the URL says the thing.',
      'REST is stateless: send the token with every private request.',
      'Query parameters filter, sort and limit results.',
    ],
  },

  'm6-l3': {
    id: 'm6-l3',
    title: 'Lesson 6.3 HTTP Methods',
    objectives: [
      'Map CRUD actions (Create, Read, Update, Delete) to HTTP methods.',
      'Explain the difference between PUT and PATCH.',
      'Explain what "safe" and "idempotent" mean and why testers care.',
    ],
    theory:
      'HTTP methods tell the server what to do: GET reads, POST creates, PUT replaces a whole resource, PATCH changes part of it, and DELETE removes it.',
    blocks: [
      {
        type: 'text',
        value:
          'Every API request has a method. The method is a verb. It tells the server what you want to do with the resource. Most apps only need four actions, called CRUD: Create, Read, Update, Delete.',
      },
      { type: 'heading', value: 'Key terms' },
      {
        type: 'table',
        headers: ['Term', 'Simple meaning'],
        rows: [
          ['CRUD', 'Create, Read, Update, Delete: the four basic data actions.'],
          ['Safe', 'The method only reads. It does not change any data on the server.'],
          ['Idempotent', 'Sending the same request 1 time or 10 times leaves the server in the same final state.'],
          ['Request body', 'Data you send with the request, usually JSON. GET normally has no body.'],
        ],
      },
      { type: 'heading', value: 'The five main methods' },
      {
        type: 'table',
        headers: ['Method', 'CRUD', 'ShopEasy example', 'Safe?', 'Idempotent?', 'Usual success code'],
        rows: [
          ['GET', 'Read', 'GET /products/101', 'Yes', 'Yes', '200 OK'],
          ['POST', 'Create', 'POST /orders (place an order)', 'No', 'No', '201 Created'],
          ['PUT', 'Update (whole)', 'PUT /users/1 (send the full user)', 'No', 'Yes', '200 OK or 204 No Content'],
          ['PATCH', 'Update (part)', 'PATCH /cart/items/7 (only quantity)', 'No', 'Not guaranteed', '200 OK'],
          ['DELETE', 'Delete', 'DELETE /cart/items/7', 'No', 'Yes', '200 OK or 204 No Content'],
        ],
      },
      {
        type: 'alert',
        value:
          'Idempotent example: PUT /users/1 with the same body 5 times gives the same user every time. POST /orders 5 times creates 5 orders. That is why a double click on "Place order" is dangerous, and a good tester always checks it.',
      },
      { type: 'heading', value: 'POST: create a new resource' },
      {
        type: 'code',
        language: 'http',
        value: `POST /posts HTTP/1.1
Host: jsonplaceholder.typicode.com
Content-Type: application/json

{ "title": "My first post", "body": "Hello API", "userId": 1 }

HTTP/1.1 201 Created
Content-Type: application/json; charset=utf-8

{ "title": "My first post", "body": "Hello API", "userId": 1, "id": 101 }`,
      },
      { type: 'heading', value: 'PUT vs PATCH' },
      {
        type: 'compare',
        columns: [
          {
            title: 'PUT',
            subtitle: 'Replace the whole resource',
            tone: 'olive',
            items: [
              'Send ALL fields.',
              'Missing fields may be cleared or set to default.',
              'Idempotent: same request, same result.',
              'Example body: { "name": "Asha Rao", "email": "asha@shopeasy.test", "city": "Mumbai" }',
            ],
          },
          {
            title: 'PATCH',
            subtitle: 'Change only some fields',
            tone: 'honey',
            items: [
              'Send only the fields you change.',
              'Other fields stay the same.',
              'Not guaranteed to be idempotent.',
              'Example body: { "city": "Mumbai" }',
            ],
          },
        ],
      },
      {
        type: 'code',
        language: 'json',
        value: `{
  "quantity": 3
}`,
      },
      {
        type: 'text',
        value:
          'The body above is a PATCH to /cart/items/7. Only the quantity changes. The product and price of the cart item stay the same.',
      },
      { type: 'heading', value: 'What a tester checks for each method' },
      {
        type: 'list',
        items: [
          'GET: correct data, no data changed, 404 for an unknown ID.',
          'POST: 201 Created, a new ID in the response, the new record really exists (GET it after).',
          'PUT: all fields updated; check what happens to fields you did not send.',
          'PATCH: only the sent fields changed; other fields are untouched.',
          'DELETE: success code, then a GET on the same ID returns 404.',
          'Wrong method: DELETE /products (all products!) should be blocked, often with 405 Method Not Allowed.',
        ],
      },
      { type: 'heading', value: 'Try it yourself' },
      {
        type: 'list',
        ordered: true,
        items: [
          'Install Postman (or open the web version) and create a new request.',
          'Send GET https://jsonplaceholder.typicode.com/posts/1 and note the status code.',
          'Change the method to POST, the URL to https://jsonplaceholder.typicode.com/posts, add a JSON body with title, body and userId. Send it. Did you get 201 and "id": 101?',
          'Send PATCH https://jsonplaceholder.typicode.com/posts/1 with body { "title": "Changed" }. Which fields came back?',
          'Send DELETE https://jsonplaceholder.typicode.com/posts/1. Note: this practice API does not really save changes, it only pretends.',
        ],
      },
      { type: 'heading', value: 'Check your understanding' },
      {
        type: 'list',
        items: [
          'Which method creates a new resource? (POST.)',
          'Which method is idempotent for updating a whole resource? (PUT.)',
          'You want to change only the city of a user. PUT or PATCH? (PATCH.)',
          'Is GET safe? (Yes. It only reads data.)',
        ],
      },
    ],
    callout: {
      lead: 'Think of it like this:',
      text: 'HTTP methods are like actions on a paper form in an office. GET is reading the form. POST is filling in a new form. PUT is throwing the old form away and writing a full new one. PATCH is correcting one box with a pen. DELETE is shredding the form.',
    },
    mistakes: [
      'Using GET to change data. GET must never change anything.',
      'Sending only one field with PUT and losing the other fields.',
      'Not testing a double POST, which can create duplicate orders.',
      'After DELETE, not checking that GET returns 404.',
      'Thinking POST is idempotent. It is not.',
    ],
    takeaways: [
      'GET reads, POST creates, PUT replaces, PATCH changes part, DELETE removes.',
      'Methods should match their meaning: never change data with GET.',
      'Safe means "no change". Only GET (of these five) is safe.',
      'Idempotent means repeating gives the same final state: GET, PUT and DELETE are idempotent; POST is not.',
      'Always confirm the effect of a write with a follow-up GET.',
    ],
  },

  'm6-l4': {
    id: 'm6-l4',
    title: 'Lesson 6.4 Status Codes',
    objectives: [
      'Name the five status code families and what each one means.',
      'Know the most common codes: 200, 201, 204, 400, 401, 403, 404, 409, 500, 503.',
      'Decide what status code a test should expect, for both good and bad input.',
    ],
    theory:
      'A status code is a 3-digit number in every response. 1xx is information, 2xx is success, 3xx is redirect, 4xx is a client error, and 5xx is a server error.',
    blocks: [
      {
        type: 'text',
        value:
          'Every API response starts with a status code. It is a short number that tells you how the request went. It is the first thing a tester checks, before reading the body.',
      },
      {
        type: 'code',
        language: 'http',
        value: `HTTP/1.1 404 Not Found
Content-Type: application/json

{ "error": "Product 999999 does not exist" }`,
      },
      { type: 'heading', value: 'The five families' },
      {
        type: 'table',
        headers: ['Family', 'Meaning', 'Common codes', 'What a tester checks'],
        rows: [
          ['1xx', 'Information: "keep going"', '100 Continue', 'Rarely seen in API tests.'],
          ['2xx', 'Success', '200 OK, 201 Created, 204 No Content', 'The code matches the action (POST gives 201) and the body is correct.'],
          ['3xx', 'Redirect: "look somewhere else"', '301 Moved Permanently, 304 Not Modified', 'The Location header points to the right new URL.'],
          ['4xx', 'Client error: the request is wrong', '400, 401, 403, 404, 409, 422', 'Bad input is rejected with a clear error message, and no data is changed.'],
          ['5xx', 'Server error: the server failed', '500 Internal Server Error, 503 Service Unavailable', 'Should never happen for normal or bad input. A 5xx is usually a bug to report.'],
        ],
      },
      { type: 'heading', value: 'The codes you will see most' },
      {
        type: 'table',
        headers: ['Code', 'Name', 'ShopEasy situation'],
        rows: [
          ['200', 'OK', 'GET /products returns the product list.'],
          ['201', 'Created', 'POST /orders creates a new order.'],
          ['204', 'No Content', 'DELETE /cart/items/7 worked; there is no body.'],
          ['400', 'Bad Request', 'POST /cart/items with "quantity": "abc" (not a number).'],
          ['401', 'Unauthorized', 'No token, or a wrong password: authentication failed.'],
          ['403', 'Forbidden', 'You are logged in as a customer but try to open an admin endpoint.'],
          ['404', 'Not Found', 'GET /products/999999: the resource was not found.'],
          ['409', 'Conflict', 'Sign up with an email that already exists.'],
          ['422', 'Unprocessable Entity', 'The JSON is valid, but "quantity": -2 breaks a business rule (some APIs use 400 here).'],
          ['500', 'Internal Server Error', 'The server crashed while placing the order. Problem on the server side.'],
          ['503', 'Service Unavailable', 'The payment service is down for maintenance.'],
        ],
      },
      { type: 'heading', value: '401 vs 403' },
      {
        type: 'compare',
        columns: [
          {
            title: '401 Unauthorized',
            subtitle: 'Who are you?',
            tone: 'rose',
            items: ['Authentication failed.', 'Token is missing, wrong or expired.', 'Fix: log in again.'],
          },
          {
            title: '403 Forbidden',
            subtitle: 'I know you, but no.',
            tone: 'honey',
            items: ['You are logged in.', 'You do not have permission for this action.', 'Fix: use a user with the right role.'],
          },
        ],
      },
      {
        type: 'warning',
        value:
          'Some APIs return 200 OK with an error inside the body, like { "success": false }. Do not trust the code alone. Always check the body too, and report this design as a problem.',
      },
      { type: 'heading', value: 'Status code checks in Postman' },
      {
        type: 'code',
        language: 'javascript',
        value: `pm.test("Status code is 201 Created", function () {
    pm.response.to.have.status(201);
});

pm.test("Status is one of the success codes", function () {
    pm.expect(pm.response.code).to.be.oneOf([200, 201, 204]);
});`,
      },
      { type: 'heading', value: 'Try it yourself' },
      {
        type: 'list',
        ordered: true,
        items: [
          'In Postman, send GET https://jsonplaceholder.typicode.com/posts/1. Write down the code.',
          'Send GET https://jsonplaceholder.typicode.com/posts/99999. Which code do you get?',
          'Send POST https://jsonplaceholder.typicode.com/posts with a small JSON body. Which code do you get?',
          'For ShopEasy, write the expected code for: login with a wrong password, add to cart without a token, get an order that does not exist.',
        ],
      },
      { type: 'heading', value: 'Check your understanding' },
      {
        type: 'list',
        items: [
          'What does 401 mean? (Unauthorized: authentication failed.)',
          'A 500 code points to a problem where? (On the server side.)',
          'What does 404 mean? (The resource was not found.)',
          'Which code should a successful POST that creates an order return? (201 Created.)',
        ],
      },
    ],
    callout: {
      lead: 'Think of it like this:',
      text: 'Status codes are like traffic signals for your request. 2xx is green: all good. 3xx is a detour sign: go another way. 4xx means you, the driver, made a mistake. 5xx means the road itself is broken.',
    },
    mistakes: [
      'Checking only the status code and not the response body.',
      'Accepting 200 when the correct code for creating a resource is 201.',
      'Mixing up 401 (not logged in) and 403 (no permission).',
      'Thinking a 500 for bad input is fine. Bad input should give a 4xx, never a 5xx.',
    ],
    takeaways: [
      'Every response has a 3-digit status code; check it first.',
      '2xx success, 3xx redirect, 4xx client error, 5xx server error.',
      '401 is "authentication failed"; 403 is "not allowed".',
      '404 means the resource was not found.',
      'Negative tests must expect the correct 4xx code and a clear error message.',
      'Proper status codes are essential for apps that integrate with the API.',
    ],
  },

  'm6-l5': {
    id: 'm6-l5',
    title: 'Lesson 6.5 JSON Basics',
    objectives: [
      'Read a JSON document and name its data types.',
      'Find a value inside nested objects and arrays.',
      'Spot common JSON syntax errors.',
    ],
    theory:
      'JSON (JavaScript Object Notation) is a simple text format for data. It uses key-value pairs inside { } and lists inside [ ]. Most REST APIs send and receive JSON.',
    blocks: [
      {
        type: 'text',
        value:
          'When ShopEasy sends you a product or an order, the data comes as JSON. JSON is just text, so people and programs can both read it. As an API tester, you will read JSON every day.',
      },
      { type: 'heading', value: 'Key terms' },
      {
        type: 'table',
        headers: ['Term', 'Simple meaning', 'Example'],
        rows: [
          ['Key', 'The name of a field. Always in double quotes.', '"price"'],
          ['Value', 'The data for that key.', '25.00'],
          ['Object', 'A group of key-value pairs inside curly braces { }.', '{ "id": 101, "name": "Wireless Mouse" }'],
          ['Array', 'An ordered list of values inside square brackets [ ].', '[101, 102, 103]'],
          ['Nested', 'An object or array inside another object or array.', '{ "user": { "id": 1 } }'],
        ],
      },
      { type: 'heading', value: 'The six JSON data types' },
      {
        type: 'table',
        headers: ['Type', 'Looks like', 'ShopEasy example'],
        rows: [
          ['String', 'Text in double quotes', '"status": "PAID"'],
          ['Number', 'No quotes; can have decimals', '"total": 59.5'],
          ['Boolean', 'true or false (no quotes)', '"inStock": true'],
          ['null', 'No value', '"couponCode": null'],
          ['Object', '{ ... }', '"shippingAddress": { "city": "Pune" }'],
          ['Array', '[ ... ]', '"items": [ ... ]'],
        ],
      },
      { type: 'heading', value: 'A real ShopEasy order' },
      {
        type: 'code',
        language: 'json',
        value: `{
  "orderId": 5001,
  "status": "PAID",
  "total": 59.5,
  "paid": true,
  "couponCode": null,
  "customer": {
    "id": 1,
    "name": "Asha Rao",
    "email": "asha@shopeasy.test"
  },
  "items": [
    { "productId": 101, "name": "Wireless Mouse", "quantity": 2, "unitPrice": 25.0 },
    { "productId": 102, "name": "USB-C Cable", "quantity": 1, "unitPrice": 9.5 }
  ]
}`,
      },
      { type: 'heading', value: 'Finding a value (the "path")' },
      {
        type: 'text',
        value:
          'To reach a value, start at the top and go down. Use a dot for an object key and [number] for an array position. Array positions start at 0, not 1.',
      },
      {
        type: 'table',
        headers: ['Path', 'Value'],
        rows: [
          ['status', '"PAID"'],
          ['customer.name', '"Asha Rao"'],
          ['items[0].name', '"Wireless Mouse"'],
          ['items[1].quantity', '1'],
          ['items.length', '2 (the number of items)'],
        ],
      },
      {
        type: 'code',
        language: 'javascript',
        value: `// In a Postman test script
const order = pm.response.json();

pm.test("First item is the Wireless Mouse", function () {
    pm.expect(order.items[0].name).to.eql("Wireless Mouse");
});

pm.test("Total is a number", function () {
    pm.expect(order.total).to.be.a("number");
});`,
      },
      { type: 'heading', value: 'Common JSON errors' },
      {
        type: 'list',
        items: [
          'Single quotes: { \'name\': \'Asha\' } is wrong. JSON needs double quotes.',
          'Trailing comma: { "id": 1, } is wrong. No comma after the last item.',
          'Keys without quotes: { id: 1 } is wrong.',
          'Comments: // and /* */ are not allowed in JSON.',
          'Numbers as strings: "total": "59.5" is valid JSON, but the type is string, not number. This is often a bug.',
        ],
      },
      {
        type: 'warning',
        value:
          'Testers often check only the value and miss the type. "59.5" (string) and 59.5 (number) look the same on screen, but a mobile app may crash on the wrong type. Check types too.',
      },
      { type: 'heading', value: 'Try it yourself' },
      {
        type: 'list',
        ordered: true,
        items: [
          'Open https://jsonplaceholder.typicode.com/users/1.',
          'Find the path to the city. (Hint: it is inside "address".)',
          'Find the path to the company name.',
          'Write the type of "id", "name" and "address".',
          'Paste the JSON into any online JSON validator, remove one comma, and see the error.',
        ],
      },
      { type: 'heading', value: 'Check your understanding' },
      {
        type: 'list',
        items: [
          'In the ShopEasy order, what is items[1].name? ("USB-C Cable".)',
          'Is { "paid": "true" } a boolean? (No, it is a string because of the quotes.)',
          'What brackets does an array use? (Square brackets [ ].)',
          'At what number do array positions start? (0.)',
        ],
      },
    ],
    callout: {
      lead: 'Think of it like this:',
      text: 'JSON is like a well-labelled storage box. Each label (key) tells you what is inside (value). Some boxes hold smaller boxes (objects) or a row of identical boxes (arrays). You find things by following the labels.',
    },
    mistakes: [
      'Counting array positions from 1 instead of 0.',
      'Using single quotes or trailing commas when writing a request body.',
      'Checking the value but not the data type.',
      'Not checking null values and missing fields.',
    ],
    takeaways: [
      'JSON is the standard payload format for REST services.',
      'Objects use { }, arrays use [ ], keys use double quotes.',
      'There are six types: string, number, boolean, null, object, array.',
      'Use dots and [index] to reach nested values; arrays start at 0.',
      'Always check both the value and its type.',
    ],
  },

  'm6-l6': {
    id: 'm6-l6',
    title: 'Lesson 6.6 API Testing using Postman',
    objectives: [
      'Create and send a request in Postman.',
      'Add headers, query parameters and a JSON body.',
      'Read the response: status, time, headers and body, and write a first test.',
    ],
    theory:
      'Postman is a free app to send API requests and see the responses. You choose the method and URL, add headers or a body, click Send, and check the result. You can also add JavaScript tests.',
    blocks: [
      {
        type: 'text',
        value:
          'You do not need to write code to start API testing. Postman gives you a simple window: choose a method, type a URL, click Send. In this lesson you will test the practice API and see how the same steps work for ShopEasy.',
      },
      { type: 'heading', value: 'Key terms' },
      {
        type: 'table',
        headers: ['Postman area', 'What it is for'],
        rows: [
          ['Workspace', 'Your personal or team space for requests.'],
          ['Request tab', 'One request: method, URL, Params, Headers, Body.'],
          ['Params tab', 'Add query parameters as a table; Postman adds them to the URL.'],
          ['Headers tab', 'Add headers like Content-Type or Authorization.'],
          ['Body tab', 'Add data for POST, PUT and PATCH. Choose raw and JSON.'],
          ['Scripts tab (Post-response)', 'JavaScript tests that run after the response arrives. Older versions call this the Tests tab.'],
          ['Response panel', 'Shows status, time, size, body, headers and test results.'],
        ],
      },
      {
        type: 'steps',
        title: 'Send your first GET request',
        steps: [
          { label: 'Open Postman', text: 'Use the desktop app or the web version at postman.com. Sign in.' },
          { label: 'Create a new request', text: 'Click New, then HTTP (or the + tab).' },
          { label: 'Choose the method', text: 'Keep GET selected.' },
          { label: 'Type the URL', text: 'https://jsonplaceholder.typicode.com/posts' },
          { label: 'Add a query parameter', text: 'In Params, add key userId with value 1. The URL becomes .../posts?userId=1.' },
          { label: 'Click Send', text: 'Look at the response panel: 200 OK, the time in ms, and a JSON array.' },
          { label: 'Save the request', text: 'Click Save, name it "Get posts by user", and put it in a new collection.' },
        ],
      },
      {
        type: 'steps',
        title: 'Send a POST request with a JSON body',
        steps: [
          { label: 'New request, method POST', text: 'URL: https://jsonplaceholder.typicode.com/posts' },
          { label: 'Open the Body tab', text: 'Choose raw, then JSON from the dropdown. Postman adds the Content-Type: application/json header.' },
          { label: 'Type the body', text: '{ "title": "Test post", "body": "Created from Postman", "userId": 1 }' },
          { label: 'Click Send', text: 'Expect 201 Created and a body with "id": 101.' },
        ],
      },
      { type: 'heading', value: 'Add your first tests' },
      {
        type: 'text',
        value:
          'Open the Scripts tab of the POST request and choose Post-response. Paste this code. Click Send again and open Test Results in the response panel.',
      },
      {
        type: 'code',
        language: 'javascript',
        value: `pm.test("Status is 201 Created", function () {
    pm.response.to.have.status(201);
});

pm.test("Response time is below 1000 ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(1000);
});

pm.test("Response is JSON", function () {
    pm.expect(pm.response.headers.get("Content-Type")).to.include("application/json");
});

pm.test("Body contains the data we sent", function () {
    const body = pm.response.json();
    pm.expect(body.title).to.eql("Test post");
    pm.expect(body.userId).to.eql(1);
    pm.expect(body).to.have.property("id");
});`,
      },
      {
        type: 'alert',
        value:
          'Postman has ready-made test code. In the Scripts tab, open the Snippets list (for example "Status code: Code is 200") and click one to insert it. This is a great way to learn.',
      },
      { type: 'heading', value: 'A ShopEasy test checklist for one endpoint' },
      {
        type: 'table',
        headers: ['Check', 'Example for POST /cart/items'],
        rows: [
          ['Happy path', 'Valid productId and quantity 1: expect 201 and the item in the body.'],
          ['Missing field', 'No quantity: expect 400 and a clear error message.'],
          ['Wrong type', '"quantity": "two": expect 400.'],
          ['Boundary', 'quantity 0 and quantity above stock: expect 400 or 422.'],
          ['No token', 'Remove Authorization: expect 401.'],
          ['Unknown product', 'productId 999999: expect 404.'],
        ],
      },
      { type: 'heading', value: 'Try it yourself' },
      {
        type: 'list',
        ordered: true,
        items: [
          'Create a GET request to https://jsonplaceholder.typicode.com/users/1 and send it.',
          'Add a test that the status is 200.',
          'Add a test that name equals "Leanne Graham".',
          'Change the URL to /users/999 and send again. Which tests fail? Why?',
          'Save both requests in a collection called "Practice API".',
        ],
      },
      { type: 'heading', value: 'Check your understanding' },
      {
        type: 'list',
        items: [
          'Where do you put JSON data for a POST request? (In the Body tab, raw, JSON.)',
          'Where do Postman tests go? (In the Scripts tab, Post-response.)',
          'Which line checks the status code is 200? (pm.response.to.have.status(200);)',
        ],
      },
    ],
    callout: {
      lead: 'Think of it like this:',
      text: 'Postman is like a remote control for APIs. Instead of walking through the whole website to press one button, you press the button directly and see exactly what the server sends back.',
    },
    mistakes: [
      'Sending a JSON body without choosing raw and JSON, so the server rejects the Content-Type.',
      'Using a GET request when the endpoint needs POST.',
      'Only looking at the response by eye and never writing tests.',
      'Not saving requests, so the work is lost or cannot be shared.',
      'Testing only the happy path and forgetting negative cases.',
    ],
    takeaways: [
      'Postman lets you send requests and inspect responses without writing an app.',
      'Method, URL, Params, Headers and Body make up a request.',
      'The response panel shows status, time, headers and body.',
      'pm.test with pm.response and pm.expect turns checks into repeatable tests.',
      'Postman allows rapid manual and automated API checking.',
    ],
  },

  'm6-l7': {
    id: 'm6-l7',
    title: 'Lesson 6.7 Environment Variables',
    objectives: [
      'Explain why we use variables instead of fixed values.',
      'Create dev, staging and production environments in Postman.',
      'Save a login token from a response into a variable and reuse it.',
    ],
    theory:
      'Environment variables store values like the base URL and tokens in one place, for example {{baseUrl}}. You switch environments to run the same requests against dev, staging or production.',
    blocks: [
      {
        type: 'text',
        value:
          'ShopEasy has three copies of its server. Developers use "dev". Testers use "staging". Customers use "production". Each copy has a different address. If you type the address inside every request, you must change 50 requests when you switch. Variables fix this.',
      },
      { type: 'heading', value: 'Key terms' },
      {
        type: 'table',
        headers: ['Term', 'Simple meaning'],
        rows: [
          ['Variable', 'A name that holds a value, like baseUrl = https://staging-api.shopeasy.test.'],
          ['Environment', 'A named set of variables, for example "ShopEasy Staging".'],
          ['{{variableName}}', 'How you use a variable inside a URL, header or body in Postman.'],
          ['Hardcoding', 'Typing a fixed value directly into the request. Avoid it.'],
          ['Secret', 'A sensitive value like a password or token. Mark it as secret in Postman.'],
        ],
      },
      { type: 'heading', value: 'One request, three environments' },
      {
        type: 'table',
        headers: ['Variable', 'ShopEasy Dev', 'ShopEasy Staging', 'ShopEasy Production'],
        rows: [
          ['baseUrl', 'https://dev-api.shopeasy.test', 'https://staging-api.shopeasy.test', 'https://api.shopeasy.test'],
          ['userEmail', 'dev.tester@shopeasy.test', 'qa.tester@shopeasy.test', 'readonly.monitor@shopeasy.test'],
          ['token', '(set by the login test)', '(set by the login test)', '(set by the login test)'],
        ],
      },
      {
        type: 'code',
        language: 'http',
        value: `GET {{baseUrl}}/products?search=mouse
Authorization: Bearer {{token}}`,
      },
      {
        type: 'steps',
        title: 'Create an environment in Postman',
        steps: [
          { label: 'Open Environments', text: 'Click Environments in the left sidebar, then + (Create).' },
          { label: 'Name it', text: '"ShopEasy Staging".' },
          { label: 'Add variables', text: 'baseUrl = https://staging-api.shopeasy.test, userEmail, userPassword (type: secret), token (empty).' },
          { label: 'Save', text: 'Click Save.' },
          { label: 'Select it', text: 'Choose "ShopEasy Staging" in the environment dropdown at the top right.' },
          { label: 'Use the variables', text: 'Change request URLs to start with {{baseUrl}}. Hover over a variable to see its current value.' },
        ],
      },
      { type: 'heading', value: 'Save the login token automatically' },
      {
        type: 'text',
        value:
          'The login request is POST {{baseUrl}}/auth/login with the email and password in the body. Its response contains a token. Add this script in the Post-response Scripts tab of the login request.',
      },
      {
        type: 'code',
        language: 'json',
        value: `{
  "email": "{{userEmail}}",
  "password": "{{userPassword}}"
}`,
      },
      {
        type: 'code',
        language: 'javascript',
        value: `pm.test("Login returns 200", function () {
    pm.response.to.have.status(200);
});

const body = pm.response.json();

pm.test("Response has a token", function () {
    pm.expect(body.token).to.be.a("string").and.not.be.empty;
});

// Save the token so later requests can use {{token}}
pm.environment.set("token", body.token);`,
      },
      {
        type: 'text',
        value:
          'Now every other request uses the header Authorization: Bearer {{token}}. When the token expires, run the login request again.',
      },
      { type: 'heading', value: 'Variable scopes' },
      {
        type: 'table',
        headers: ['Scope', 'Lives in', 'Good for'],
        rows: [
          ['Global', 'The whole workspace', 'Rarely needed values used everywhere.'],
          ['Collection', 'One collection', 'Values the same in every environment, like apiVersion.'],
          ['Environment', 'The selected environment', 'baseUrl, test user, token.'],
          ['Data', 'A CSV or JSON file in a collection run', 'Many rows of test input.'],
          ['Local', 'One request run only', 'Temporary values inside a script.'],
        ],
      },
      {
        type: 'alert',
        value:
          'If the same variable name exists in two scopes, the narrower scope wins. Order from widest to narrowest: global, collection, environment, data, local.',
      },
      {
        type: 'warning',
        value:
          'Never run create or delete tests against production by mistake. Always look at the environment dropdown before you click Send or Run. Many teams give production only read-only tests.',
      },
      { type: 'heading', value: 'Try it yourself' },
      {
        type: 'list',
        ordered: true,
        items: [
          'Create an environment "Practice" with baseUrl = https://jsonplaceholder.typicode.com.',
          'Change your saved requests to use {{baseUrl}}/posts/1 and {{baseUrl}}/users/1.',
          'In the GET /posts/1 test script, add: pm.environment.set("userId", pm.response.json().userId);',
          'Create a new request GET {{baseUrl}}/users/{{userId}} and send it.',
          'Open the environment and confirm userId now has a value.',
        ],
      },
      { type: 'heading', value: 'Check your understanding' },
      {
        type: 'list',
        items: [
          'Why use environment variables? (To run the same requests against dev, staging and prod without editing them.)',
          'How do you write a variable in a Postman URL? (With double curly braces, like {{baseUrl}}.)',
          'Which code saves a value into the environment? (pm.environment.set("name", value);)',
        ],
      },
    ],
    callout: {
      lead: 'Think of it like this:',
      text: 'An environment is like a SIM card. Your phone (the requests) stays the same. When you travel, you swap the SIM card (the environment) and the same phone works on a different network (server).',
    },
    mistakes: [
      'Hardcoding URLs and tokens in every request.',
      'Forgetting which environment is selected and running tests on production.',
      'Saving passwords as normal variables and sharing them with the team.',
      'Using the same variable name in two scopes and getting the wrong value.',
    ],
    takeaways: [
      'Variables keep changing values (URLs, users, tokens) in one place.',
      'Use {{variableName}} in URLs, headers and bodies.',
      'An environment is a set of variables for one server copy.',
      'pm.environment.set saves values from responses, like a login token.',
      'The same test suite can run against dev, staging and production.',
    ],
  },

  'm6-l8': {
    id: 'm6-l8',
    title: 'Lesson 6.8 API Collections',
    objectives: [
      'Organise requests into a collection with folders.',
      'Build a business flow (login, search, cart, checkout) in the right order.',
      'Run a whole collection with the Collection Runner, including a data file.',
    ],
    theory:
      'A collection is a folder of saved API requests. You group requests by feature, put them in order, and run them all together with the Collection Runner for fast regression testing.',
    blocks: [
      {
        type: 'text',
        value:
          'One request tests one thing. A real feature needs many requests in order. To buy a product on ShopEasy, you must log in, search, add to cart and check out. A collection keeps these requests together and runs them as one flow.',
      },
      { type: 'heading', value: 'Key terms' },
      {
        type: 'table',
        headers: ['Term', 'Simple meaning'],
        rows: [
          ['Collection', 'A saved group of requests, like a project folder.'],
          ['Folder', 'A group inside a collection, usually one feature.'],
          ['Collection Runner', 'The Postman tool that runs all requests in a collection in order.'],
          ['Iteration', 'One full run of the collection. 3 iterations = the flow runs 3 times.'],
          ['Data file', 'A CSV or JSON file with test data; each row is one iteration.'],
          ['Regression testing', 'Running old tests again to check new changes did not break anything.'],
        ],
      },
      { type: 'heading', value: 'A ShopEasy collection' },
      {
        type: 'code',
        language: 'text',
        value: `ShopEasy API (collection)
|-- 01 Auth
|   |-- POST Login                  -> saves {{token}}
|-- 02 Products
|   |-- GET Search products         -> saves {{productId}}
|   |-- GET Product details
|-- 03 Cart
|   |-- POST Add item to cart       -> saves {{cartItemId}}
|   |-- PATCH Change quantity
|-- 04 Checkout
|   |-- POST Place order            -> saves {{orderId}}
|   |-- GET Order details
|-- 05 Negative tests
    |-- POST Login wrong password   -> expects 401
    |-- GET Product 999999          -> expects 404`,
      },
      { type: 'heading', value: 'Pass data from one request to the next' },
      {
        type: 'text',
        value:
          'This is called chaining. The search request saves the first product ID. The cart request uses it with {{productId}}.',
      },
      {
        type: 'code',
        language: 'javascript',
        value: `// Post-response script of "GET Search products"
pm.test("Search returns at least one product", function () {
    pm.response.to.have.status(200);
    const products = pm.response.json();
    pm.expect(products).to.be.an("array").that.is.not.empty;
    pm.collectionVariables.set("productId", products[0].id);
});`,
      },
      {
        type: 'code',
        language: 'json',
        value: `{
  "productId": {{productId}},
  "quantity": 1
}`,
      },
      {
        type: 'text',
        value:
          'The body above is for "POST Add item to cart". Postman replaces {{productId}} with the saved number before it sends the request.',
      },
      {
        type: 'steps',
        title: 'Run the collection with the Collection Runner',
        steps: [
          { label: 'Select the environment', text: 'Choose "ShopEasy Staging" at the top right.' },
          { label: 'Open the runner', text: 'Click the collection, then click Run (or use the ... menu and choose Run collection).' },
          { label: 'Check the order', text: 'Requests run from top to bottom. Drag them to change the order, and untick any you want to skip.' },
          { label: 'Set iterations and delay', text: 'For example 1 iteration and 0 ms delay.' },
          { label: 'Click Run', text: 'Postman sends every request and shows each test as passed or failed.' },
          { label: 'Read the results', text: 'Click a failed test to see the request, the response and the error message.' },
        ],
      },
      { type: 'heading', value: 'Data-driven run with a CSV file' },
      {
        type: 'text',
        value:
          'To test login with many users, make a CSV file. The first row holds column names. Each column name becomes a variable in the run.',
      },
      {
        type: 'code',
        language: 'text',
        value: `email,password,expectedStatus
asha@shopeasy.test,Correct#123,200
asha@shopeasy.test,wrongpass,401
,Correct#123,400`,
      },
      {
        type: 'code',
        language: 'javascript',
        value: `// Post-response script of "POST Login" (body uses {{email}} and {{password}})
const expected = Number(pm.iterationData.get("expectedStatus"));

pm.test("Login returns " + expected + " for " + pm.iterationData.get("email"), function () {
    pm.response.to.have.status(expected);
});`,
      },
      {
        type: 'text',
        value: 'In the Collection Runner, click Select File, choose the CSV, and Postman sets iterations to 3 (one per row).',
      },
      {
        type: 'warning',
        value:
          'Do not make one request depend on data from a request you skipped. If "Place order" needs {{cartItemId}} and "Add item to cart" did not run, the order test fails for the wrong reason.',
      },
      { type: 'heading', value: 'Try it yourself' },
      {
        type: 'list',
        ordered: true,
        items: [
          'Create a collection "Practice API" with folders "Posts" and "Users".',
          'In Posts, add GET {{baseUrl}}/posts and a test that saves the first post id with pm.collectionVariables.set("postId", ...).',
          'Add GET {{baseUrl}}/posts/{{postId}}/comments with a test that the status is 200.',
          'Run the collection in the Collection Runner. Did all tests pass?',
          'Add a CSV with a column postId (values 1, 2, 3) and run again with the data file.',
        ],
      },
      { type: 'heading', value: 'Check your understanding' },
      {
        type: 'list',
        items: [
          'What is a collection? (A saved group of related API requests.)',
          'What does one row in a CSV data file equal in a run? (One iteration.)',
          'What is chaining? (Saving a value from one response and using it in a later request.)',
        ],
      },
    ],
    callout: {
      lead: 'Think of it like this:',
      text: 'A collection is like a recipe book. Each request is one step of a recipe. The Collection Runner is the cook who follows every step, in order, every time, and tells you if a dish went wrong.',
    },
    mistakes: [
      'Putting all requests in one long list with no folders or names.',
      'Running requests in the wrong order, for example checkout before login.',
      'Hardcoding IDs instead of chaining them from earlier responses.',
      'Leaving test data behind (for example many fake orders) with no clean-up step.',
    ],
    takeaways: [
      'Collections group related endpoints; folders group features.',
      'Collections help organise complex multi-step business workflows.',
      'Chaining passes IDs and tokens between requests.',
      'The Collection Runner runs everything in order and shows pass or fail.',
      'Data files let one flow test many inputs.',
      'Collections are the base for automated regression testing.',
    ],
  },

  'm6-l9': {
    id: 'm6-l9',
    title: 'Lesson 6.9 API Automation Basics',
    objectives: [
      'Write Postman assertions for status, headers, body values and JSON schema.',
      'Run a collection from the command line with Newman.',
      'Read a simple REST Assured test in Java and know when teams use it.',
    ],
    theory:
      'API automation means tests run by themselves, without clicking. Postman runs JavaScript assertions after each response, Newman runs collections from the command line or a CI pipeline, and code libraries like REST Assured do the same in Java.',
    blocks: [
      {
        type: 'text',
        value:
          'Manual API checks are good for learning. But ShopEasy changes every day. Nobody can click Send on 200 requests every morning. Automation means writing checks once and letting a computer run them again and again.',
      },
      { type: 'heading', value: 'Key terms' },
      {
        type: 'table',
        headers: ['Term', 'Simple meaning'],
        rows: [
          ['Assertion', 'A line that checks one fact, for example "status is 200". If the fact is false, the test fails.'],
          ['pm.test', 'Postman function that gives a name to a group of assertions.'],
          ['pm.expect', 'Postman function to compare a real value with the expected value.'],
          ['JSON schema', 'A description of the shape of the JSON: which fields exist and their types.'],
          ['Newman', 'The command-line tool that runs Postman collections.'],
          ['CI (Continuous Integration)', 'A server (like GitHub Actions or Jenkins) that runs tests on every code change.'],
          ['REST Assured', 'A Java library for writing API tests in code.'],
        ],
      },
      { type: 'heading', value: 'Useful Postman assertions' },
      {
        type: 'code',
        language: 'javascript',
        value: `// Post-response script for GET {{baseUrl}}/posts/1
const post = pm.response.json();

pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Content-Type header is JSON", function () {
    pm.response.to.have.header("Content-Type");
    pm.expect(pm.response.headers.get("Content-Type")).to.include("application/json");
});

pm.test("Response time is under 800 ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(800);
});

pm.test("Post has the correct id and owner", function () {
    pm.expect(post.id).to.eql(1);
    pm.expect(post.userId).to.eql(1);
});

pm.test("Title is a non-empty string", function () {
    pm.expect(post.title).to.be.a("string").and.not.be.empty;
});`,
      },
      {
        type: 'code',
        language: 'javascript',
        value: `// Check the shape (schema) of the response
const schema = {
    type: "object",
    required: ["userId", "id", "title", "body"],
    properties: {
        userId: { type: "number" },
        id: { type: "number" },
        title: { type: "string" },
        body: { type: "string" }
    }
};

pm.test("Response matches the post schema", function () {
    pm.response.to.have.jsonSchema(schema);
});`,
      },
      {
        type: 'table',
        headers: ['You want to check', 'Assertion'],
        rows: [
          ['Exact status', 'pm.response.to.have.status(201);'],
          ['Equal value', 'pm.expect(body.status).to.eql("PAID");'],
          ['Text contains', 'pm.expect(body.message).to.include("added");'],
          ['Type', 'pm.expect(body.total).to.be.a("number");'],
          ['Field exists', 'pm.expect(body).to.have.property("orderId");'],
          ['List size', 'pm.expect(body.items).to.have.lengthOf(2);'],
          ['Number range', 'pm.expect(body.total).to.be.above(0);'],
        ],
      },
      { type: 'heading', value: 'Run collections with Newman' },
      {
        type: 'steps',
        title: 'From Postman to the command line',
        steps: [
          { label: 'Export the collection', text: 'Collection ... menu, Export, save as ShopEasy.postman_collection.json.' },
          { label: 'Export the environment', text: 'Environment ... menu, Export, save as staging.postman_environment.json.' },
          { label: 'Install Node.js and Newman', text: 'Newman runs on Node.js.' },
          { label: 'Run the command', text: 'See the commands below.' },
          { label: 'Add it to CI', text: 'The same command runs in GitHub Actions or Jenkins on every code change.' },
        ],
      },
      {
        type: 'code',
        language: 'bash',
        value: `# Install Newman once
npm install -g newman

# Run the collection against staging
newman run ShopEasy.postman_collection.json -e staging.postman_environment.json

# Run with a data file and save a JUnit report for CI
newman run ShopEasy.postman_collection.json \\
  -e staging.postman_environment.json \\
  -d login-data.csv \\
  --reporters cli,junit \\
  --reporter-junit-export results/newman-report.xml`,
      },
      {
        type: 'alert',
        value:
          'Newman exits with code 1 if any test fails. CI tools use this exit code to mark the build as failed, so a broken API is noticed before it reaches customers.',
      },
      { type: 'heading', value: 'The same test in Java with REST Assured' },
      {
        type: 'text',
        value:
          'Some teams write API tests in code, next to their UI automation. REST Assured uses a readable given / when / then style.',
      },
      {
        type: 'code',
        language: 'java',
        value: `import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.notNullValue;

import io.restassured.http.ContentType;
import org.junit.jupiter.api.Test;

class PostsApiTest {

    private static final String BASE_URL = "https://jsonplaceholder.typicode.com";

    @Test
    void getPostReturnsCorrectData() {
        given()
            .baseUri(BASE_URL)
        .when()
            .get("/posts/1")
        .then()
            .statusCode(200)
            .contentType(ContentType.JSON)
            .body("id", equalTo(1))
            .body("userId", equalTo(1));
    }

    @Test
    void createPostReturns201() {
        given()
            .baseUri(BASE_URL)
            .contentType(ContentType.JSON)
            .body("{\\"title\\": \\"Test post\\", \\"body\\": \\"Hello\\", \\"userId\\": 1}")
        .when()
            .post("/posts")
        .then()
            .statusCode(201)
            .body("id", notNullValue());
    }
}`,
      },
      {
        type: 'compare',
        columns: [
          {
            title: 'Postman + Newman',
            tone: 'olive',
            items: ['Easy to start, visual', 'Tests in small JavaScript scripts', 'Good for testers new to code', 'Runs in CI with Newman'],
          },
          {
            title: 'REST Assured (Java)',
            tone: 'honey',
            items: ['Tests live in the code project', 'Full power of Java (loops, helpers)', 'Fits teams already using Java and Selenium', 'Runs in CI with Maven or Gradle'],
          },
        ],
      },
      { type: 'heading', value: 'Try it yourself' },
      {
        type: 'list',
        ordered: true,
        items: [
          'Add the five assertions above to GET {{baseUrl}}/posts/1 and send it. All should pass.',
          'Change to.eql(1) for userId into to.eql(2). Send again and read the failure message.',
          'Add the schema test. Then change title: { type: "number" } and see it fail.',
          'Export the Practice API collection and environment, install Newman, and run it from the terminal.',
          'Add --reporters cli,junit and open the XML report file.',
        ],
      },
      { type: 'heading', value: 'Check your understanding' },
      {
        type: 'list',
        items: [
          'Which assertion checks that the status is 201 Created? (pm.response.to.have.status(201);)',
          'When do Postman test scripts run? (Automatically, after the response is received.)',
          'What is Newman? (A command-line tool that runs Postman collections, for example in CI.)',
          'In REST Assured, which part holds the checks: given, when or then? (then.)',
        ],
      },
    ],
    callout: {
      lead: 'Think of it like this:',
      text: 'Automated API tests are like a smoke alarm. You install it once. After that it checks the air all the time, day and night, and makes noise the moment something goes wrong, even when nobody is watching.',
    },
    mistakes: [
      'Writing pm.expect outside pm.test, so the failure has no clear name.',
      'Checking only the status code and not the body values.',
      'Using a wrong form like pm.expect(pm.status).to.eql(201) instead of pm.response.to.have.status(201).',
      'Tests that depend on data that changes every day, so they fail randomly.',
      'Running automation only on a laptop and never in CI.',
    ],
    takeaways: [
      'Assertions run automatically after each response is received.',
      'pm.test names a check; pm.expect and pm.response.to.have.* do the checking.',
      'Check status, headers, body values, types and schema.',
      'Newman runs collections from the command line and in CI.',
      'REST Assured writes the same kind of tests in Java.',
    ],
  },

  /* ================================================================ */
  /* MODULE 7: DATABASE TESTING                                        */
  /* ================================================================ */

  'm7-l1': {
    id: 'm7-l1',
    title: 'Lesson 7.1 Introduction to Databases',
    objectives: [
      'Explain what a database is and why apps need one.',
      'Name the parts of a relational table: table, row, column, primary key, foreign key.',
      'Explain why testers look inside the database.',
    ],
    theory:
      'A database is an organised store of data. A relational database keeps data in tables made of rows and columns, and links tables together with keys.',
    blocks: [
      {
        type: 'text',
        value:
          'When Asha places an order on ShopEasy, the order must still be there tomorrow. The app saves it in a database. A database (DB) is a program that stores data safely and lets other programs find it fast.',
      },
      {
        type: 'text',
        value:
          'Most business apps use a relational database. "Relational" means the data is in tables, and the tables are related (linked) to each other. Popular ones are MySQL, PostgreSQL, Oracle and Microsoft SQL Server.',
      },
      { type: 'heading', value: 'Key terms' },
      {
        type: 'table',
        headers: ['Term', 'Simple meaning', 'ShopEasy example'],
        rows: [
          ['Table', 'A set of data about one kind of thing.', 'users, products, orders'],
          ['Row (record)', 'One item in the table.', 'The user Asha Rao.'],
          ['Column (field)', 'One piece of information that every row has.', 'email'],
          ['Primary key (PK)', 'A column that identifies each row. It must be unique and not empty.', 'users.id'],
          ['Foreign key (FK)', 'A column that points to the primary key of another table.', 'orders.user_id points to users.id'],
          ['Schema', 'The design of the database: tables, columns, types and rules.', 'The ShopEasy table plan.'],
          ['RDBMS', 'Relational Database Management System: the software.', 'PostgreSQL'],
        ],
      },
      { type: 'heading', value: 'The ShopEasy database' },
      {
        type: 'text',
        value: 'We will use these four small tables in every lesson of this module. Look at them carefully.',
      },
      { type: 'dataset', name: 'users', caption: 'People who have an account', headers: USERS_HEADERS, rows: USERS_ROWS },
      { type: 'dataset', name: 'products', caption: 'Things the shop sells', headers: PRODUCTS_HEADERS, rows: PRODUCTS_ROWS },
      {
        type: 'dataset',
        name: 'orders',
        caption: 'user_id is a foreign key to users.id',
        headers: ORDERS_HEADERS,
        rows: ORDERS_ROWS,
        highlightCols: [1],
      },
      {
        type: 'dataset',
        name: 'order_items',
        caption: 'Which products are in each order',
        headers: ORDER_ITEMS_HEADERS,
        rows: ORDER_ITEMS_ROWS,
        highlightCols: [1, 2],
      },
      { type: 'heading', value: 'How the tables link' },
      {
        type: 'list',
        items: [
          'One user can have many orders: orders.user_id points to users.id. Asha (id 1) has orders 5001 and 5003.',
          'One order can have many items: order_items.order_id points to orders.id.',
          'Each order item is one product: order_items.product_id points to products.id.',
          'Chen (id 3) has no orders yet. That is allowed.',
        ],
      },
      {
        type: 'example',
        title: 'Check the data yourself',
        value:
          'Order 5001 has 2 x Wireless Mouse at 25.00 = 50.00 and 1 x USB-C Cable at 9.50. 50.00 + 9.50 = 59.50, which matches orders.total. Checks like this are the heart of database testing.',
      },
      { type: 'heading', value: 'Why testers look inside the database' },
      {
        type: 'list',
        items: [
          'The UI can show "Order placed!" even when nothing was saved.',
          'The API can return 201 but save a wrong total or a wrong status.',
          'Bugs can leave "orphan" rows, like an order item with no order.',
          'Testers create and clean test data directly in the DB.',
        ],
      },
      { type: 'heading', value: 'Try it yourself' },
      {
        type: 'list',
        ordered: true,
        items: [
          'Look at the orders table. Which user placed order 5002?',
          'Look at order_items. Which products are in order 5004?',
          'Add the prices of order 5004. Does the total match orders.total?',
          'Which product can no customer buy right now? Why?',
        ],
      },
      { type: 'heading', value: 'Check your understanding' },
      {
        type: 'list',
        items: [
          'What is a row? (One record, one item in a table.)',
          'What must be true about a primary key? (Unique and never empty.)',
          'In orders, what kind of column is user_id? (A foreign key to users.id.)',
          'Who placed order 5002? (Ben Carter, user 2.)',
        ],
      },
    ],
    callout: {
      lead: 'Think of it like this:',
      text: 'A relational database is like a set of spreadsheets that know about each other. Each sheet is a table. A foreign key is like writing a customer number on an invoice instead of copying the whole customer address.',
    },
    mistakes: [
      'Thinking the screen shows exactly what is stored. It may not.',
      'Mixing up primary keys (identify this row) and foreign keys (point to another row).',
      'Believing a table has any order by default. Rows have no guaranteed order.',
      'Testing on the production database instead of a test copy.',
    ],
    takeaways: [
      'A database stores app data safely; a relational DB uses tables.',
      'Tables have rows (records) and columns (fields).',
      'A primary key uniquely identifies each row.',
      'A foreign key links a row to a row in another table.',
      'Relational systems enforce schemas and relationships using keys.',
      'Testers check the DB because the UI and API can hide data bugs.',
    ],
  },

  'm7-l2': {
    id: 'm7-l2',
    title: 'Lesson 7.2 SQL Basics',
    objectives: [
      'Explain what SQL is and what testers use it for.',
      'Name the main groups of SQL commands (DDL, DML, DQL).',
      'Follow the basic writing rules of SQL: keywords, quotes, semicolons and NULL.',
    ],
    theory:
      'SQL (Structured Query Language) is the standard language to read and change data in relational databases. Testers mostly use SELECT to check data, and sometimes INSERT, UPDATE and DELETE to prepare test data.',
    blocks: [
      {
        type: 'text',
        value:
          'To talk to a database, you use SQL. SQL means Structured Query Language. People say "S-Q-L" or "sequel". A command in SQL is often called a query. SQL reads almost like English: SELECT name FROM users.',
      },
      { type: 'heading', value: 'Key terms' },
      {
        type: 'table',
        headers: ['Term', 'Simple meaning'],
        rows: [
          ['Query', 'One SQL command you send to the database.'],
          ['Keyword', 'A reserved SQL word like SELECT, FROM, WHERE.'],
          ['Data type', 'The kind of value a column holds: INT, VARCHAR (text), DECIMAL, DATE.'],
          ['NULL', 'No value at all. It is not 0 and not an empty text.'],
          ['Constraint', 'A rule on a column, like NOT NULL or UNIQUE.'],
          ['SQL client', 'A program to write and run queries, like DBeaver, MySQL Workbench or pgAdmin.'],
        ],
      },
      { type: 'heading', value: 'Groups of SQL commands' },
      {
        type: 'table',
        headers: ['Group', 'Full name', 'Commands', 'Tester uses it to...'],
        rows: [
          ['DQL', 'Data Query Language', 'SELECT', 'Check data. Used most of the time.'],
          ['DML', 'Data Manipulation Language', 'INSERT, UPDATE, DELETE', 'Create, change and clean test data.'],
          ['DDL', 'Data Definition Language', 'CREATE, ALTER, DROP', 'Read table design; rarely run by testers.'],
          ['DCL / TCL', 'Control and Transaction commands', 'GRANT, COMMIT, ROLLBACK', 'Check permissions; undo test changes.'],
        ],
      },
      { type: 'heading', value: 'How a table is defined' },
      {
        type: 'text',
        value:
          'This is the DDL for two ShopEasy tables. You do not need to write it, but reading it tells you the rules the data must follow.',
      },
      {
        type: 'code',
        language: 'sql',
        value: `CREATE TABLE users (
  id      INT          PRIMARY KEY,
  name    VARCHAR(100) NOT NULL,
  email   VARCHAR(255) NOT NULL UNIQUE,
  city    VARCHAR(100),
  status  VARCHAR(20)  NOT NULL DEFAULT 'active'
);

CREATE TABLE orders (
  id          INT           PRIMARY KEY,
  user_id     INT           NOT NULL REFERENCES users(id),
  status      VARCHAR(20)   NOT NULL,
  total       DECIMAL(10,2) NOT NULL CHECK (total >= 0),
  created_at  DATE          NOT NULL
);`,
      },
      {
        type: 'list',
        items: [
          'PRIMARY KEY: id is unique and never empty.',
          'NOT NULL: this column must always have a value.',
          'UNIQUE: two users cannot have the same email.',
          'REFERENCES users(id): user_id must match an existing user (foreign key).',
          'CHECK (total >= 0): an order total can never be negative.',
        ],
      },
      { type: 'heading', value: 'Your first query' },
      {
        type: 'queryResult',
        query: `SELECT name, email
FROM users;`,
        caption: 'Two columns, every row',
        headers: ['name', 'email'],
        rows: [
          ['Asha Rao', 'asha@shopeasy.test'],
          ['Ben Carter', 'ben@shopeasy.test'],
          ['Chen Li', 'chen@shopeasy.test'],
          ['Diego Ruiz', 'diego@shopeasy.test'],
        ],
        note: 'SELECT chooses the columns. FROM chooses the table.',
      },
      { type: 'heading', value: 'Writing rules' },
      {
        type: 'list',
        items: [
          'Keywords are not case-sensitive: select and SELECT work the same. We write them in CAPITALS so they are easy to see.',
          'Text values use single quotes: WHERE city = \'Pune\'. Numbers do not: WHERE id = 1.',
          'End each query with a semicolon ;',
          'Line breaks and spaces do not matter. Use them to make queries readable.',
          'A comment starts with two dashes: -- this is a comment',
          'To check for "no value", write IS NULL, never = NULL.',
        ],
      },
      {
        type: 'code',
        language: 'sql',
        value: `-- Users with no city saved
SELECT id, name
FROM users
WHERE city IS NULL;`,
      },
      {
        type: 'warning',
        value:
          'Different databases have small differences (for example, LIMIT in MySQL and PostgreSQL, TOP in SQL Server). The basics in this module work almost everywhere. Ask your team which database ShopEasy uses.',
      },
      { type: 'heading', value: 'Try it yourself' },
      {
        type: 'list',
        ordered: true,
        items: [
          'Open a free online SQL playground (search for "SQL online editor") or install DB Browser for SQLite.',
          'Create the users table with the CREATE TABLE code above.',
          'Write a query that shows only the name and city of every user.',
          'Try to write WHERE city = Pune without quotes. Read the error.',
        ],
      },
      { type: 'heading', value: 'Check your understanding' },
      {
        type: 'list',
        items: [
          'Which SQL command group do testers use most? (DQL: SELECT.)',
          'How do you write text values in SQL? (In single quotes, like \'Pune\'.)',
          'How do you find rows with no value in a column? (WHERE column IS NULL.)',
          'What does UNIQUE on email mean? (No two rows can have the same email.)',
        ],
      },
    ],
    callout: {
      lead: 'Think of it like this:',
      text: 'SQL is like asking a very exact librarian for information. If you say "Bring me the name and email from the users shelf", you get exactly that. If your sentence has a grammar mistake, the librarian refuses and tells you the error.',
    },
    mistakes: [
      'Using double quotes for text values. Most databases expect single quotes.',
      'Writing = NULL instead of IS NULL.',
      'Running DDL like DROP TABLE on a shared test database.',
      'Writing long queries on one line so errors are hard to find.',
    ],
    takeaways: [
      'SQL is the standard language to query and change relational databases.',
      'SELECT reads; INSERT, UPDATE and DELETE change data.',
      'Constraints (PRIMARY KEY, NOT NULL, UNIQUE, CHECK, foreign keys) are data rules.',
      'Text uses single quotes; NULL is checked with IS NULL.',
      'SQL queries are essential to verify backend updates.',
    ],
  },

  'm7-l3': {
    id: 'm7-l3',
    title: 'Lesson 7.3 SELECT Queries',
    objectives: [
      'Filter rows with WHERE, AND, OR, IN, LIKE and BETWEEN.',
      'Sort and limit results with ORDER BY and LIMIT.',
      'Count and group data with COUNT, SUM, GROUP BY and HAVING.',
    ],
    theory:
      'SELECT reads rows from a table. WHERE keeps only the rows you want, ORDER BY sorts them, LIMIT shows only some, and GROUP BY with HAVING summarises groups of rows.',
    blocks: [
      {
        type: 'text',
        value:
          'SELECT is the query testers run most. After every test action, you ask the database: "Show me the rows that should have changed." In this lesson, we use the ShopEasy orders table.',
      },
      { type: 'dataset', name: 'orders', headers: ORDERS_HEADERS, rows: ORDERS_ROWS },
      { type: 'heading', value: 'The parts of a SELECT query' },
      {
        type: 'syntax',
        title: 'SELECT query skeleton',
        parts: [
          { clause: 'SELECT id, total', text: 'Which columns to show. * means all columns.' },
          { clause: 'FROM orders', text: 'Which table to read.' },
          { clause: "WHERE status = 'PAID'", text: 'Keep only rows where the condition is true.' },
          { clause: 'GROUP BY user_id', text: 'Put rows with the same value together (optional).' },
          { clause: 'HAVING COUNT(*) > 1', text: 'Keep only groups that match a condition (optional).' },
          { clause: 'ORDER BY total DESC', text: 'Sort: ASC is small to big (default), DESC is big to small.' },
          { clause: 'LIMIT 10', text: 'Show at most this many rows.' },
        ],
      },
      { type: 'heading', value: 'Filter with WHERE' },
      {
        type: 'queryResult',
        query: `SELECT id, user_id, total
FROM orders
WHERE status = 'PAID';`,
        headers: ['id', 'user_id', 'total'],
        rows: [
          ['5001', '1', '59.50'],
          ['5004', '4', '34.50'],
        ],
        note: 'Only the two PAID orders are returned.',
      },
      {
        type: 'table',
        headers: ['Operator', 'Meaning', 'Example'],
        rows: [
          ['= , <> , > , < , >= , <=', 'Compare', 'total > 50'],
          ['AND', 'Both conditions true', "status = 'PAID' AND total > 50"],
          ['OR', 'At least one true', "status = 'PAID' OR status = 'SHIPPED'"],
          ['IN (...)', 'Value is in a list', "status IN ('PAID', 'SHIPPED')"],
          ['BETWEEN a AND b', 'In a range (includes a and b)', "created_at BETWEEN '2026-09-01' AND '2026-09-03'"],
          ['LIKE', 'Text pattern; % means "any text"', "email LIKE '%@shopeasy.test'"],
          ['IS NULL', 'No value', 'city IS NULL'],
        ],
      },
      {
        type: 'queryResult',
        query: `SELECT id, name, price
FROM products
WHERE name LIKE '%Mouse%' AND stock > 0;`,
        caption: 'The ShopEasy search "mouse", in SQL',
        headers: ['id', 'name', 'price'],
        rows: [['101', 'Wireless Mouse', '25.00']],
        note: 'Use a query like this to check that the search results in the UI match the database.',
      },
      { type: 'heading', value: 'Sort and limit' },
      {
        type: 'queryResult',
        query: `SELECT id, total
FROM orders
ORDER BY total DESC
LIMIT 2;`,
        caption: 'The two biggest orders',
        headers: ['id', 'total'],
        rows: [
          ['5002', '80.00'],
          ['5001', '59.50'],
        ],
      },
      { type: 'heading', value: 'Count and group' },
      {
        type: 'text',
        value:
          'COUNT counts rows. SUM adds numbers. AVG finds the average. GROUP BY makes one result row per group. HAVING filters the groups after grouping.',
      },
      {
        type: 'queryResult',
        query: `SELECT user_id, COUNT(*) AS order_count, SUM(total) AS spent
FROM orders
GROUP BY user_id
HAVING COUNT(*) > 1;`,
        caption: 'Users with more than one order',
        headers: ['user_id', 'order_count', 'spent'],
        rows: [['1', '2', '104.50']],
        note: 'Without HAVING, users 2 and 4 would also appear with 1 order each.',
      },
      {
        type: 'compare',
        columns: [
          {
            title: 'WHERE',
            subtitle: 'Filters rows',
            tone: 'olive',
            items: ['Runs before grouping', 'Works on single rows', "Example: WHERE status = 'PAID'", 'Cannot use COUNT or SUM'],
          },
          {
            title: 'HAVING',
            subtitle: 'Filters groups',
            tone: 'honey',
            items: ['Runs after GROUP BY', 'Works on grouped results', 'Example: HAVING COUNT(*) > 1', 'Used with COUNT, SUM, AVG'],
          },
        ],
      },
      {
        type: 'warning',
        value:
          'Do not trust the order of rows unless you use ORDER BY. Without it, the database can return rows in any order, and your test may pass today and fail tomorrow.',
      },
      { type: 'heading', value: 'Try it yourself' },
      {
        type: 'list',
        ordered: true,
        items: [
          'Write a query for all orders of user 1, newest first.',
          'Write a query for products that cost between 10 and 50.',
          'Count how many orders have status CANCELLED.',
          'Show each status and how many orders have it (GROUP BY status).',
          'Write a query for employees with salary greater than 50000, sorted by last_name (use a table called employees).',
        ],
      },
      { type: 'heading', value: 'Check your understanding' },
      {
        type: 'list',
        items: [
          'Which clause filters grouped results? (HAVING.)',
          'How do you sort from the highest total to the lowest? (ORDER BY total DESC.)',
          "What does LIKE 'Head%' find? (Text that starts with Head.)",
          'Is SELECT * FROM employees WHERE salary > 50000 ORDER BY last_name; correct SQL? (Yes. WHERE comes before ORDER BY.)',
        ],
      },
    ],
    callout: {
      lead: 'Think of it like this:',
      text: 'A SELECT query is like using filters in an online shop. FROM picks the category, WHERE ticks the filter boxes, ORDER BY chooses "price: high to low", and LIMIT says "show 10 per page".',
    },
    mistakes: [
      'Putting ORDER BY before WHERE. The order of clauses matters.',
      'Using WHERE with COUNT or SUM instead of HAVING.',
      'Forgetting quotes around text values like \'PAID\'.',
      'Using SELECT * on huge tables when you need two columns.',
      'Relying on row order without ORDER BY.',
    ],
    takeaways: [
      'SELECT chooses columns, FROM chooses the table, WHERE filters rows.',
      'AND, OR, IN, BETWEEN and LIKE build flexible filters.',
      'ORDER BY and LIMIT help organise retrieved records.',
      'COUNT, SUM and GROUP BY summarise data.',
      'HAVING filters groups; WHERE filters rows.',
    ],
  },

  'm7-l4': {
    id: 'm7-l4',
    title: 'Lesson 7.4 INSERT, UPDATE & DELETE',
    objectives: [
      'Add rows with INSERT, change rows with UPDATE, and remove rows with DELETE.',
      'Always use WHERE safely and check changes with SELECT.',
      'Use transactions (BEGIN, ROLLBACK, COMMIT) to protect test data.',
    ],
    theory:
      'INSERT adds new rows, UPDATE changes existing rows, and DELETE removes rows. Testers use them to prepare and clean test data, and always check the result with SELECT.',
    blocks: [
      {
        type: 'text',
        value:
          'Sometimes a tester needs special data. For example, a product with 0 stock, or a user who is blocked. Creating this data through the UI is slow. With SQL you can create it in seconds. These three commands change data, so be careful.',
      },
      { type: 'heading', value: 'Key terms' },
      {
        type: 'table',
        headers: ['Term', 'Simple meaning'],
        rows: [
          ['INSERT', 'Add a new row.'],
          ['UPDATE', 'Change values in rows that already exist.'],
          ['DELETE', 'Remove rows.'],
          ['Transaction', 'A group of changes that are saved together or not at all.'],
          ['COMMIT', 'Save the changes of a transaction for good.'],
          ['ROLLBACK', 'Cancel the changes of a transaction.'],
          ['Rows affected', 'The number the database reports after a change. Always read it.'],
        ],
      },
      { type: 'heading', value: 'INSERT: add a row' },
      {
        type: 'code',
        language: 'sql',
        value: `INSERT INTO users (id, name, email, city, status)
VALUES (5, 'Test Buyer', 'qa.buyer@shopeasy.test', 'Delhi', 'active');
-- 1 row affected`,
      },
      {
        type: 'queryResult',
        query: `SELECT id, name, email, status
FROM users
WHERE id = 5;`,
        caption: 'Always check the insert',
        headers: ['id', 'name', 'email', 'status'],
        rows: [['5', 'Test Buyer', 'qa.buyer@shopeasy.test', 'active']],
      },
      { type: 'heading', value: 'UPDATE: change rows' },
      {
        type: 'text',
        value: 'To test the "Out of stock" message on ShopEasy, set the stock of the headphones to 0.',
      },
      {
        type: 'code',
        language: 'sql',
        value: `UPDATE products
SET stock = 0
WHERE id = 104;
-- 1 row affected`,
      },
      {
        type: 'queryResult',
        query: `SELECT id, name, stock
FROM products
WHERE stock = 0;`,
        headers: ['id', 'name', 'stock'],
        rows: [
          ['103', 'Laptop Stand', '0'],
          ['104', 'Headphones', '0'],
        ],
        highlightRows: [1],
        note: 'Row 2 is the one we changed. Now open the Headphones page in the UI and check the "Out of stock" message.',
      },
      { type: 'heading', value: 'DELETE: remove rows' },
      {
        type: 'code',
        language: 'sql',
        value: `DELETE FROM users
WHERE id = 5;
-- 1 row affected

SELECT COUNT(*) FROM users WHERE id = 5;
-- returns 0`,
      },
      {
        type: 'warning',
        value:
          'UPDATE or DELETE without WHERE changes EVERY row. DELETE FROM users; removes all users. Before you run UPDATE or DELETE, run a SELECT with the same WHERE and check that it returns only the rows you expect.',
      },
      { type: 'heading', value: 'The safe way: use a transaction' },
      {
        type: 'steps',
        title: 'Change data safely',
        steps: [
          { label: 'BEGIN', text: 'Start a transaction. (Some databases write START TRANSACTION.)' },
          { label: 'SELECT with your WHERE', text: 'Check which rows will change.' },
          { label: 'Run UPDATE or DELETE', text: 'Read the "rows affected" number.' },
          { label: 'SELECT again', text: 'Check the new values.' },
          { label: 'COMMIT or ROLLBACK', text: 'COMMIT if correct. ROLLBACK if anything looks wrong.' },
        ],
      },
      {
        type: 'code',
        language: 'sql',
        value: `BEGIN;

SELECT id, status FROM orders WHERE user_id = 1;   -- expect 2 rows

UPDATE orders
SET status = 'SHIPPED'
WHERE user_id = 1 AND status = 'PAID';             -- expect 1 row affected

SELECT id, status FROM orders WHERE user_id = 1;   -- check 5001 is SHIPPED

ROLLBACK;  -- this was only a test, so undo it`,
      },
      {
        type: 'alert',
        value:
          'Testers normally change data only on a test database, and mark test rows clearly, for example emails starting with qa. This makes clean-up easy: DELETE FROM users WHERE email LIKE \'qa.%@shopeasy.test\';',
      },
      { type: 'heading', value: 'Try it yourself' },
      {
        type: 'list',
        ordered: true,
        items: [
          'INSERT a new product: id 105, name Webcam, price 39.99, stock 10.',
          'SELECT it to check all values.',
          'UPDATE its price to 34.99. Check that exactly 1 row was affected.',
          'Start a transaction, DELETE the product, SELECT to see it is gone, then ROLLBACK. Is it back?',
          'Finally DELETE the product for real to clean up.',
        ],
      },
      { type: 'heading', value: 'Check your understanding' },
      {
        type: 'list',
        items: [
          'Which command modifies existing records? (UPDATE.)',
          'What happens with DELETE FROM orders; (no WHERE)? (All orders are deleted.)',
          'How do you undo changes inside a transaction? (ROLLBACK.)',
          'What should you do right after an UPDATE? (Run a SELECT to verify the change.)',
        ],
      },
    ],
    callout: {
      lead: 'Think of it like this:',
      text: 'INSERT, UPDATE and DELETE are like writing, correcting and erasing in a notebook with a pen. A transaction is like writing in pencil first: you can still erase everything (ROLLBACK) before you go over it in ink (COMMIT).',
    },
    mistakes: [
      'Running UPDATE or DELETE without a WHERE clause.',
      'Not reading the "rows affected" number.',
      'Changing data on production or on a shared database without permission.',
      'Deleting a user who still has orders, and getting a foreign key error (or orphan rows).',
      'Forgetting to clean up test data after the test.',
    ],
    takeaways: [
      'INSERT adds rows, UPDATE changes rows, DELETE removes rows.',
      'Always test your WHERE with a SELECT first.',
      'Always verify changes with SELECT immediately after.',
      'Transactions let you COMMIT or ROLLBACK a group of changes.',
      'Use clearly marked test data and clean it up.',
    ],
  },

  'm7-l5': {
    id: 'm7-l5',
    title: 'Lesson 7.5 JOIN Operations',
    objectives: [
      'Explain why data is spread across tables and how JOIN puts it back together.',
      'Use INNER JOIN and LEFT JOIN and predict their results.',
      'Use a LEFT JOIN to find missing or orphan data.',
    ],
    theory:
      'A JOIN combines rows from two or more tables using a shared key. INNER JOIN returns only rows that match in both tables. LEFT JOIN returns all rows from the left table, with NULL where the right table has no match.',
    blocks: [
      {
        type: 'text',
        value:
          'The orders table has user_id, but not the user name. To see "who bought what", you need data from both tables. A JOIN connects the tables using the key they share.',
      },
      { type: 'heading', value: 'Key terms' },
      {
        type: 'table',
        headers: ['Term', 'Simple meaning'],
        rows: [
          ['JOIN', 'Combine rows from two tables.'],
          ['ON', 'The condition that says which rows belong together, like orders.user_id = users.id.'],
          ['Left table', 'The table written first (after FROM).'],
          ['Right table', 'The table written after JOIN.'],
          ['Alias', 'A short name for a table, like u for users.'],
          ['Orphan row', 'A row whose foreign key points to nothing.'],
        ],
      },
      { type: 'heading', value: 'Our two tables' },
      { type: 'dataset', name: 'users', headers: USERS_HEADERS, rows: USERS_ROWS, highlightCols: [0] },
      { type: 'dataset', name: 'orders', headers: ORDERS_HEADERS, rows: ORDERS_ROWS, highlightCols: [1] },
      { type: 'heading', value: 'INNER JOIN: only matches' },
      {
        type: 'queryResult',
        query: `SELECT o.id AS order_id, u.name, o.status, o.total
FROM orders o
INNER JOIN users u ON o.user_id = u.id
ORDER BY o.id;`,
        headers: ['order_id', 'name', 'status', 'total'],
        rows: [
          ['5001', 'Asha Rao', 'PAID', '59.50'],
          ['5002', 'Ben Carter', 'SHIPPED', '80.00'],
          ['5003', 'Asha Rao', 'CANCELLED', '45.00'],
          ['5004', 'Diego Ruiz', 'PAID', '34.50'],
        ],
        note: 'Chen Li does not appear because Chen has no orders. INNER JOIN keeps only rows with a match in both tables.',
      },
      { type: 'heading', value: 'LEFT JOIN: all rows from the left table' },
      {
        type: 'queryResult',
        query: `SELECT u.name, o.id AS order_id, o.total
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
ORDER BY u.id;`,
        headers: ['name', 'order_id', 'total'],
        rows: [
          ['Asha Rao', '5001', '59.50'],
          ['Asha Rao', '5003', '45.00'],
          ['Ben Carter', '5002', '80.00'],
          ['Chen Li', '', ''],
          ['Diego Ruiz', '5004', '34.50'],
        ],
        highlightRows: [3],
        note: 'Every user is shown. Chen has no order, so the order columns are NULL.',
      },
      {
        type: 'table',
        headers: ['JOIN type', 'Returns', 'Tester use'],
        rows: [
          ['INNER JOIN', 'Only rows with a match in both tables.', 'Show full order details.'],
          ['LEFT JOIN', 'All left rows, plus matches from the right (NULL if none).', 'Find users with no orders, or items with no product.'],
          ['RIGHT JOIN', 'All right rows, plus matches from the left.', 'Same as LEFT JOIN with the tables swapped.'],
          ['FULL JOIN', 'All rows from both tables.', 'Compare two tables for differences (not in MySQL).'],
        ],
      },
      { type: 'heading', value: 'Joining three tables' },
      {
        type: 'queryResult',
        query: `SELECT oi.order_id, p.name, oi.quantity, oi.unit_price,
       oi.quantity * oi.unit_price AS line_total
FROM order_items oi
INNER JOIN products p ON oi.product_id = p.id
INNER JOIN orders o ON oi.order_id = o.id
WHERE o.user_id = 1
ORDER BY oi.order_id, p.name;`,
        caption: 'Everything Asha bought',
        headers: ['order_id', 'name', 'quantity', 'unit_price', 'line_total'],
        rows: [
          ['5001', 'USB-C Cable', '1', '9.50', '9.50'],
          ['5001', 'Wireless Mouse', '2', '25.00', '50.00'],
          ['5003', 'Laptop Stand', '1', '45.00', '45.00'],
        ],
      },
      { type: 'heading', value: 'Find bugs with LEFT JOIN' },
      {
        type: 'text',
        value:
          'A LEFT JOIN plus WHERE ... IS NULL finds rows that have no partner. If this query returns any row, there is an orphan order item: a data bug.',
      },
      {
        type: 'code',
        language: 'sql',
        value: `-- Order items whose order does not exist (expected: 0 rows)
SELECT oi.id, oi.order_id
FROM order_items oi
LEFT JOIN orders o ON oi.order_id = o.id
WHERE o.id IS NULL;`,
      },
      {
        type: 'warning',
        value:
          'If you forget the ON condition (or write the wrong one), every row joins with every other row. 4 users x 4 orders = 16 rows of nonsense. If your result has far too many rows, check the ON clause.',
      },
      { type: 'heading', value: 'Try it yourself' },
      {
        type: 'list',
        ordered: true,
        items: [
          'Write an INNER JOIN that shows each order id with the user email.',
          'Write a LEFT JOIN that lists all products and the order_id of any order item that uses them. Which product has no orders?',
          'Change the LEFT JOIN from step 2 to find only products that were never ordered (WHERE oi.id IS NULL).',
          'Join order_items and orders and compare SUM(quantity * unit_price) per order with orders.total.',
        ],
      },
      { type: 'heading', value: 'Check your understanding' },
      {
        type: 'list',
        items: [
          'Which JOIN returns all rows from the left table and matched rows from the right table? (LEFT JOIN.)',
          'An INNER JOIN returns what? (Only rows with matches in both tables.)',
          'Why is Chen Li missing from the INNER JOIN result? (Chen has no orders, so there is no match.)',
          'What does NULL in a LEFT JOIN result mean? (The right table had no matching row.)',
        ],
      },
    ],
    callout: {
      lead: 'Think of it like this:',
      text: 'A JOIN is like matching guest names with table numbers at a wedding. INNER JOIN lists only guests who have a table. LEFT JOIN lists every guest, and writes "no table yet" for guests without one.',
    },
    mistakes: [
      'Forgetting the ON condition and getting far too many rows.',
      'Using INNER JOIN when you need to see missing data (use LEFT JOIN).',
      'Not using table aliases, so column names like id become unclear.',
      'Putting a right-table filter in WHERE after a LEFT JOIN, which removes the NULL rows you wanted.',
    ],
    takeaways: [
      'JOIN combines data from two or more tables using shared keys.',
      'INNER JOIN: only rows with matches in both tables.',
      'LEFT JOIN: all left rows, NULL where no match.',
      'INNER, LEFT and RIGHT joins meet different reporting needs.',
      'LEFT JOIN with IS NULL finds orphan and missing records.',
    ],
  },

  'm7-l6': {
    id: 'm7-l6',
    title: 'Lesson 7.6 Database Validation',
    objectives: [
      'Explain database validation: comparing a UI or API action with the stored rows.',
      'Write validation queries for a ShopEasy checkout.',
      'Build a checklist of what to compare: values, types, counts, dates and side effects.',
    ],
    theory:
      'Database validation checks that an action in the UI or API is saved correctly in the database. You do the action, query the tables, and compare the stored values with what you entered and what the app showed.',
    blocks: [
      {
        type: 'text',
        value:
          'The ShopEasy screen says "Thank you! Order placed." The API returned 201 Created. Is the test finished? Not yet. A good tester checks the database to prove the order was really saved with the right data.',
      },
      { type: 'heading', value: 'Key terms' },
      {
        type: 'table',
        headers: ['Term', 'Simple meaning'],
        rows: [
          ['Database validation', 'Comparing what the app did with what is stored in the tables.'],
          ['Expected value', 'What should be stored, based on your input and the requirements.'],
          ['Actual value', 'What the query shows is really stored.'],
          ['Side effect', 'Another change the action should cause, like stock going down.'],
          ['Truncation', 'Data cut short because the column is too small, like a name losing its last letters.'],
          ['Precision', 'How many decimal places are kept, like 59.50 vs 59.5 vs 60.'],
        ],
      },
      { type: 'heading', value: 'The validation flow' },
      {
        type: 'steps',
        title: 'Validate a ShopEasy checkout',
        steps: [
          { label: 'Record the state before', text: 'Note the stock of products 101 and 102, and the number of orders for the user.' },
          { label: 'Do the action', text: 'As Diego (user 4), buy 1 Wireless Mouse and 2 USB-C Cables in the UI or with POST /orders.' },
          { label: 'Note what the app shows', text: 'Order id (for example 5005), total 44.00, status PAID.' },
          { label: 'Query the database', text: 'Check orders, order_items and products.' },
          { label: 'Compare', text: 'Input vs UI/API vs DB. Every value must match.' },
          { label: 'Report', text: 'If any value differs, log a bug with the query and both results.' },
        ],
      },
      {
        type: 'code',
        language: 'http',
        value: `HTTP/1.1 201 Created
Content-Type: application/json

{
  "orderId": 5005,
  "status": "PAID",
  "total": 44.0,
  "items": [
    { "productId": 101, "quantity": 1, "unitPrice": 25.0 },
    { "productId": 102, "quantity": 2, "unitPrice": 9.5 }
  ]
}`,
      },
      { type: 'heading', value: 'Check 1: the order row' },
      {
        type: 'queryResult',
        query: `SELECT id, user_id, status, total, created_at
FROM orders
WHERE id = 5005;`,
        headers: ['id', 'user_id', 'status', 'total', 'created_at'],
        rows: [['5005', '4', 'PAID', '44.00', '2026-09-15']],
        note: 'Exactly 1 row. user_id is 4 (Diego, not another user), status PAID, total 44.00, date is today.',
      },
      { type: 'heading', value: 'Check 2: the order items' },
      {
        type: 'queryResult',
        query: `SELECT oi.product_id, p.name, oi.quantity, oi.unit_price
FROM order_items oi
INNER JOIN products p ON oi.product_id = p.id
WHERE oi.order_id = 5005
ORDER BY oi.product_id;`,
        headers: ['product_id', 'name', 'quantity', 'unit_price'],
        rows: [
          ['101', 'Wireless Mouse', '1', '25.00'],
          ['102', 'USB-C Cable', '2', '9.50'],
        ],
        note: 'Two rows, not more (no duplicates) and not fewer (nothing lost).',
      },
      { type: 'heading', value: 'Check 3: the total matches the items' },
      {
        type: 'queryResult',
        query: `SELECT o.id, o.total,
       SUM(oi.quantity * oi.unit_price) AS items_sum
FROM orders o
INNER JOIN order_items oi ON oi.order_id = o.id
WHERE o.id = 5005
GROUP BY o.id, o.total;`,
        headers: ['id', 'total', 'items_sum'],
        rows: [['5005', '44.00', '44.00']],
        note: '1 x 25.00 + 2 x 9.50 = 44.00. The stored total matches the items.',
      },
      { type: 'heading', value: 'Check 4: side effects (stock went down)' },
      {
        type: 'queryResult',
        query: `SELECT id, name, stock
FROM products
WHERE id IN (101, 102);`,
        caption: 'Before: 101 = 40, 102 = 120',
        headers: ['id', 'name', 'stock'],
        rows: [
          ['101', 'Wireless Mouse', '39'],
          ['102', 'USB-C Cable', '118'],
        ],
        note: 'Stock went down by exactly the quantities bought.',
      },
      { type: 'heading', value: 'Comparison sheet' },
      {
        type: 'table',
        headers: ['Field', 'Input / expected', 'API response', 'Database', 'Result'],
        rows: [
          ['Customer', 'Diego (id 4)', '(from token)', 'user_id = 4', 'Pass'],
          ['Items', 'Mouse x1, Cable x2', '2 items', '2 rows', 'Pass'],
          ['Total', '44.00', '44.0', '44.00', 'Pass'],
          ['Status', 'PAID', 'PAID', 'PAID', 'Pass'],
          ['Stock 101', '40 - 1 = 39', '-', '39', 'Pass'],
          ['Stock 102', '120 - 2 = 118', '-', '118', 'Pass'],
        ],
      },
      { type: 'heading', value: 'What else to check' },
      {
        type: 'list',
        items: [
          'Text is not cut (truncated): save a 100-letter name and compare every letter.',
          'Special characters survive: names like O\'Brien or Zoë, and emojis.',
          'Numbers keep their decimals: 9.99 is not stored as 9.9 or 10.',
          'Dates and times are correct and in the expected time zone.',
          'A failed action saves nothing: a declined card creates no PAID order and does not reduce stock.',
          'Delete in the UI removes (or marks as deleted) the right row only.',
        ],
      },
      {
        type: 'warning',
        value:
          'Refreshing the page is not database validation. The page may read from a cache. Only a query on the table proves what is stored.',
      },
      { type: 'heading', value: 'Try it yourself' },
      {
        type: 'list',
        ordered: true,
        items: [
          'Imagine Ben changes his city from London to Bristol on the profile page. Write the SELECT to validate it.',
          'Write the expected value for every column of Ben\'s row after the change.',
          'Imagine Asha cancels order 5001. Write queries to check the order status and the stock of products 101 and 102.',
          'Write one negative test: what should the DB look like after a checkout with an empty cart?',
        ],
      },
      { type: 'heading', value: 'Check your understanding' },
      {
        type: 'list',
        items: [
          'After a UI form saves a record, how do you validate it in the database? (Query the table and compare the stored values to the input.)',
          'Why is a 201 response not enough? (The API can return success but save wrong or missing data.)',
          'What is a side effect in checkout? (Another change, like stock going down.)',
          'What is truncation? (Data cut short when it is saved.)',
        ],
      },
    ],
    callout: {
      lead: 'Think of it like this:',
      text: 'Database validation is like checking your bank statement after shopping. The shop said "Payment successful", but you still check the statement to see the right amount left your account, only once.',
    },
    mistakes: [
      'Trusting the UI message or the API status code without checking the tables.',
      'Checking only the main table and forgetting related tables and side effects.',
      'Not recording the "before" state, so you cannot prove what changed.',
      'Comparing values but not counts, so duplicate rows are missed.',
      'Not checking that a failed action left the database unchanged.',
    ],
    takeaways: [
      'Database validation compares UI/API actions with stored rows.',
      'Record the before state, act, query, compare.',
      'Check values, counts, totals, dates and side effects.',
      'Verify that no data truncation or precision loss happens during writes.',
      'Failed actions must not leave partial data behind.',
    ],
  },

  'm7-l7': {
    id: 'm7-l7',
    title: 'Lesson 7.7 Data Integrity Testing',
    objectives: [
      'Explain data integrity and the constraints that protect it.',
      'Write negative tests that try to break primary key, foreign key, NOT NULL, UNIQUE and CHECK rules.',
      'Write queries that find duplicates, orphans and invalid values.',
    ],
    theory:
      'Data integrity means data stays accurate and consistent across all operations. Integrity testing checks rules like unique primary keys, valid foreign keys, required (NOT NULL) columns and allowed values.',
    blocks: [
      {
        type: 'text',
        value:
          'Imagine two ShopEasy users with the same email, or an order that belongs to a user who does not exist. The app would show wrong data, send emails to the wrong person, or crash. Data integrity testing makes sure this cannot happen.',
      },
      { type: 'heading', value: 'Key terms' },
      {
        type: 'table',
        headers: ['Constraint', 'Rule', 'ShopEasy example'],
        rows: [
          ['PRIMARY KEY', 'Each row has a unique, non-empty ID.', 'Two orders cannot both have id 5001.'],
          ['FOREIGN KEY', 'A reference must point to a real row (referential integrity).', 'orders.user_id must exist in users.id.'],
          ['NOT NULL', 'The column must have a value.', 'orders.total cannot be empty.'],
          ['UNIQUE', 'No two rows can share this value.', 'users.email.'],
          ['CHECK', 'The value must follow a rule.', 'total >= 0; quantity > 0.'],
          ['DEFAULT', 'A value used when none is given.', "users.status is 'active' by default."],
        ],
      },
      {
        type: 'text',
        value:
          'Constraints are the database guards. A tester checks two things: the guards exist and work (negative tests), and the data already stored is clean (audit queries).',
      },
      { type: 'heading', value: 'Part 1: negative tests (try to break the rules)' },
      {
        type: 'text',
        value: 'Each statement below should FAIL. If the database accepts it, you have found a bug.',
      },
      {
        type: 'code',
        language: 'sql',
        value: `-- 1. Duplicate primary key  -> expect an error
INSERT INTO orders (id, user_id, status, total, created_at)
VALUES (5001, 2, 'PAID', 10.00, '2026-09-15');

-- 2. Foreign key to a user that does not exist -> expect an error
INSERT INTO orders (id, user_id, status, total, created_at)
VALUES (6000, 999, 'PAID', 10.00, '2026-09-15');

-- 3. Missing required value (NOT NULL) -> expect an error
INSERT INTO users (id, name, email)
VALUES (6, NULL, 'no.name@shopeasy.test');

-- 4. Duplicate email (UNIQUE) -> expect an error
INSERT INTO users (id, name, email)
VALUES (7, 'Copy Cat', 'asha@shopeasy.test');

-- 5. Negative total (CHECK) -> expect an error
UPDATE orders SET total = -5.00 WHERE id = 5004;

-- 6. Delete a user who still has orders -> expect an error (or a defined cascade rule)
DELETE FROM users WHERE id = 1;`,
      },
      {
        type: 'alert',
        value:
          'Run negative tests inside a transaction (BEGIN ... ROLLBACK) on a test database. Then nothing stays behind, even if a rule is missing and the bad row is accepted.',
      },
      {
        type: 'table',
        headers: ['Test', 'Expected result', 'If it is accepted...'],
        rows: [
          ['Duplicate primary key', 'Error: duplicate key', 'Two orders share one ID; the wrong order may be shown.'],
          ['Bad foreign key', 'Error: foreign key violation', 'Orphan order with no customer.'],
          ['NULL name', 'Error: null value not allowed', 'Emails and invoices show blank names.'],
          ['Duplicate email', 'Error: unique violation', 'Two accounts; password reset goes to the wrong one.'],
          ['Negative total', 'Error: check constraint', 'Refund or revenue reports are wrong.'],
          ['Delete user with orders', 'Error, or orders handled by a documented rule', 'Orders lose their owner.'],
        ],
      },
      { type: 'heading', value: 'Part 2: audit queries (is the stored data clean?)' },
      {
        type: 'text',
        value:
          'Old data, imports, or bugs can break integrity even when the rules exist now. These queries should all return 0 rows.',
      },
      {
        type: 'code',
        language: 'sql',
        value: `-- Duplicate emails
SELECT email, COUNT(*) AS copies
FROM users
GROUP BY email
HAVING COUNT(*) > 1;

-- Orphan orders (user does not exist)
SELECT o.id, o.user_id
FROM orders o
LEFT JOIN users u ON o.user_id = u.id
WHERE u.id IS NULL;

-- Invalid values
SELECT id, quantity FROM order_items WHERE quantity <= 0;
SELECT id, status  FROM orders WHERE status NOT IN ('PAID', 'SHIPPED', 'CANCELLED');`,
      },
      {
        type: 'queryResult',
        query: `-- Order totals that do not match their items
SELECT o.id, o.total, SUM(oi.quantity * oi.unit_price) AS items_sum
FROM orders o
INNER JOIN order_items oi ON oi.order_id = o.id
GROUP BY o.id, o.total
HAVING o.total <> SUM(oi.quantity * oi.unit_price);`,
        caption: 'Consistency between two tables',
        headers: ['id', 'total', 'items_sum'],
        rows: [],
        note: '0 rows: every ShopEasy order total matches its items. Any row here would be a data integrity bug.',
      },
      {
        type: 'example',
        title: 'Integrity across operations',
        value:
          'Integrity is not only about one table. When Asha cancels order 5001, the status must become CANCELLED, stock for products 101 and 102 must go back up, and no order_items may be left pointing to a deleted order. Test the full operation, not one column.',
      },
      { type: 'heading', value: 'Try it yourself' },
      {
        type: 'list',
        ordered: true,
        items: [
          'Inside BEGIN ... ROLLBACK, try to insert an order_items row with product_id 999. What error do you get?',
          'Write a query that finds products with a negative price or negative stock.',
          'Write a query that finds order_items whose product does not exist.',
          'Write a query that finds users with an email that does not contain @.',
          'List three constraints you would ask developers to add to the order_items table.',
        ],
      },
      { type: 'heading', value: 'Check your understanding' },
      {
        type: 'list',
        items: [
          'What is the goal of data integrity testing? (Confirming data stays accurate and consistent across operations.)',
          'Which constraint stops orphan orders? (A foreign key from orders.user_id to users.id.)',
          'How do you find duplicate emails? (GROUP BY email HAVING COUNT(*) > 1.)',
          'Is data integrity testing about query speed? (No. Speed is performance testing.)',
        ],
      },
    ],
    callout: {
      lead: 'Think of it like this:',
      text: 'Constraints are like the rules at a passport office. Every passport number is unique, every passport must belong to a real person, and the name field cannot be empty. Integrity testing is trying to get a fake passport, and checking the office always says no.',
    },
    mistakes: [
      'Testing only that good data saves, never that bad data is rejected.',
      'Trusting the app to check rules instead of the database constraints.',
      'Running negative tests without a transaction and leaving bad rows behind.',
      'Checking one table and forgetting consistency between related tables.',
    ],
    takeaways: [
      'Data integrity means data stays accurate and consistent across operations.',
      'Primary keys ensure uniqueness; foreign keys ensure references are real.',
      'NOT NULL, UNIQUE and CHECK stop missing, duplicate and invalid values.',
      'Negative tests prove the rules reject bad data.',
      'Audit queries find duplicates, orphans and wrong totals.',
      'Integrity rules prevent orphan records and inconsistent states.',
    ],
  },
};
