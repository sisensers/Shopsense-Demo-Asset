import {
  Dimension,
  DateDimension,
  Attribute,
  createAttribute,
  createDateDimension,
  createDimension,
} from "@sisense/sdk-data";

export const DataSource = "Ecommerce Data [MASTER]";

interface BrandDimension extends Dimension {
  ID: Attribute;
  Name: Attribute;
}
export const Brand = createDimension({
  name: "Brand",
  ID: createAttribute({
    name: "ID",
    type: "numeric-attribute",
    expression: "[Brand.ID]",
  }),
  Name: createAttribute({
    name: "Name",
    type: "text-attribute",
    expression: "[Brand.Name]",
  }),
}) as BrandDimension;

interface CategoryDimension extends Dimension {
  ID: Attribute;
  Name: Attribute;
}
export const Category = createDimension({
  name: "Category",
  ID: createAttribute({
    name: "ID",
    type: "numeric-attribute",
    expression: "[Category.ID]",
  }),
  Name: createAttribute({
    name: "Name",
    type: "text-attribute",
    expression: "[Category.Name]",
  }),
}) as CategoryDimension;

interface CommerceDimension extends Dimension {
  BrandID: Attribute;
  CategoryID: Attribute;
  Cost: Attribute;
  Country: Attribute;
  CustomerName: Attribute;
  Gender: Attribute;
  ProductID: Attribute;
  Status: Attribute;
  TransactionAmount: Attribute;
  TransactionID: Attribute;
  Date: DateDimension;
}
export const Commerce = createDimension({
  name: "Commerce",
  BrandID: createAttribute({
    name: "BrandID",
    type: "numeric-attribute",
    expression: "[Commerce.Brand ID]",
  }),
  CategoryID: createAttribute({
    name: "CategoryID",
    type: "numeric-attribute",
    expression: "[Commerce.Category ID]",
  }),
  Cost: createAttribute({
    name: "Cost",
    type: "numeric-attribute",
    expression: "[Commerce.Cost]",
  }),
  Country: createAttribute({
    name: "Country",
    type: "text-attribute",
    expression: "[Commerce.Country]",
  }),
  CustomerName: createAttribute({
    name: "CustomerName",
    type: "text-attribute",
    expression: "[Commerce.Customer Name]",
  }),
  Gender: createAttribute({
    name: "Gender",
    type: "text-attribute",
    expression: "[Commerce.Gender]",
  }),
  ProductID: createAttribute({
    name: "ProductID",
    type: "numeric-attribute",
    expression: "[Commerce.Product ID]",
  }),
  Status: createAttribute({
    name: "Status",
    type: "text-attribute",
    expression: "[Commerce.Status]",
  }),
  TransactionAmount: createAttribute({
    name: "TransactionAmount",
    type: "numeric-attribute",
    expression: "[Commerce.Transaction Amount]",
  }),
  TransactionID: createAttribute({
    name: "TransactionID",
    type: "numeric-attribute",
    expression: "[Commerce.Transaction ID]",
  }),
  Date: createDateDimension({
    name: "Date",
    expression: "[Commerce.Date (Calendar)]",
  }),
}) as CommerceDimension;

interface ProductDimension extends Dimension {
  BrandID: Attribute;
  ID: Attribute;
  Name: Attribute;
  Product_Image: Attribute;
}
export const Product = createDimension({
  name: "Product",
  BrandID: createAttribute({
    name: "BrandID",
    type: "numeric-attribute",
    expression: "[Product.Brand ID]",
  }),
  ID: createAttribute({
    name: "ID",
    type: "numeric-attribute",
    expression: "[Product.ID]",
  }),
  Name: createAttribute({
    name: "Name",
    type: "text-attribute",
    expression: "[Product.Name]",
  }),
  Product_Image: createAttribute({
    name: "Product_Image",
    type: "text-attribute",
    expression: "[Product.Product_Image]",
  }),
}) as ProductDimension;
