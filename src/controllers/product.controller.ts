import { Request, Response } from "https://deno.land/x/oak/mod.ts";
import * as uuid from "https://deno.land/std@0.168.0/uuid/mod.ts";

let productsDB = [
  {
    "name": "Teclado Hyperex",
    "price": 25000,
    "description": "teclado rgb mecanico soñado",
    "stock": 5,
    "id": "3034feb5-006b-45a8-ad5b-fe26505f6e35",
  },
];

export const getProducts = ({ response }: { response: Response }) => {
  response.body = {
    message: "Sucessfull Query",
    productsDB,
  };
};

export const getProduct = (
  { params, response }: { params: { id: string }; response: Response },
) => {
  const productFound = productsDB.find((product) => product.id === params.id);
  if (productFound) {
    response.status = 200;
    response.body = {
      message: "You got a single User",
      productFound,
    };
  } else {
    response.status = 404;
    response.body = {
      message: "Product Not Found",
    };
  }
};

export const createProduct = async ({
  request,
  response,
}: {
  request: Request;
  response: Response;
}) => {
  const body = await request.body();

  if (!request.hasBody) {
    response.status = 404;
    response.body = {
      message: "You need to provide data",
    };
  } else {
    // Create the new Product
    const newProduct = await body.value;
    newProduct.id = uuid.v1.generate();

    // Add the new product to the list
    productsDB.push(newProduct);

    // respond to the client
    response.status = 200;
    response.body = {
      message: "New Product Created",
      newProduct,
    };
  }
};

export const updateProduct = async ({
  params,
  request,
  response,
}: {
  params: { id: string };
  request: Request;
  response: Response;
}) => {
  const productIndex = productsDB.findIndex((product) =>
    product.id === params.id
  );

  if (!productIndex) {
    response.status = 404;
    response.body = {
      message: "Product Not Found",
    };
  } else {
    const body = await request.body();
    const updatedProduct = await body.value;

    productsDB[productIndex] = updatedProduct;

    response.status = 200;
    response.body = {
      message: "Product update successfully",
      productsDB,
    };
  }
};

export const deleteProduct = ({
  params,
  response,
}: {
  params: { id: string };
  response: Response;
}) => {
  productsDB = productsDB.filter((product) => product.id !== params.id);
  response.status = 200;
  response.body = {
    message: "Product deleted successfully",
    productsDB,
  };
};
