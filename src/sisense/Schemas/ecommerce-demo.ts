import {
  Dimension,
  DateDimension,
  Attribute,
  createAttribute,
  createDateDimension,
  createDimension,
} from "@sisense/sdk-data";

export const DataSource = "ECommerce Demo";

interface BrandDimension extends Dimension {
  BrandID: Attribute;
  BrandName: Attribute;
}
export const Brand = createDimension({
  name: "Brand",
  BrandID: createAttribute({
    name: "BrandID",
    type: "numeric-attribute",
    expression: "[Brand.Brand ID]",
  }),
  BrandName: createAttribute({
    name: "BrandName",
    type: "text-attribute",
    expression: "[Brand.Brand Name]",
  }),
}) as BrandDimension;

interface CategoryDimension extends Dimension {
  CategoryID: Attribute;
  CategoryName: Attribute;
}
export const Category = createDimension({
  name: "Category",
  CategoryID: createAttribute({
    name: "CategoryID",
    type: "numeric-attribute",
    expression: "[Category.Category ID]",
  }),
  CategoryName: createAttribute({
    name: "CategoryName",
    type: "text-attribute",
    expression: "[Category.Category Name]",
  }),
}) as CategoryDimension;

interface CommerceDimension extends Dimension {
  BrandID: Attribute;
  CategoryID: Attribute;
  Cost: Attribute;
  Country: Attribute;
  CountryID: Attribute;
  QuantitySold: Attribute;
  Revenue: Attribute;
  DateSold: DateDimension;
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
  CountryID: createAttribute({
    name: "CountryID",
    type: "numeric-attribute",
    expression: "[Commerce.Country ID]",
  }),
  QuantitySold: createAttribute({
    name: "QuantitySold",
    type: "numeric-attribute",
    expression: "[Commerce.Quantity Sold]",
  }),
  Revenue: createAttribute({
    name: "Revenue",
    type: "numeric-attribute",
    expression: "[Commerce.Revenue]",
  }),
  DateSold: createDateDimension({
    name: "DateSold",
    expression: "[Commerce.Date Sold (Calendar)]",
  }),
}) as CommerceDimension;

interface OrdersDimension extends Dimension {
  BrandID: Attribute;
  CategoryID: Attribute;
  Country: Attribute;
  CustomerName: Attribute;
  Gender: Attribute;
  OrderAmount: Attribute;
  ProductID: Attribute;
  DateOrdered: DateDimension;
}
export const Orders = createDimension({
  name: "Orders",
  BrandID: createAttribute({
    name: "BrandID",
    type: "numeric-attribute",
    expression: "[Orders.Brand ID]",
  }),
  CategoryID: createAttribute({
    name: "CategoryID",
    type: "numeric-attribute",
    expression: "[Orders.Category ID]",
  }),
  Country: createAttribute({
    name: "Country",
    type: "text-attribute",
    expression: "[Orders.Country]",
  }),
  CustomerName: createAttribute({
    name: "CustomerName",
    type: "text-attribute",
    expression: "[Orders.Customer Name]",
  }),
  Gender: createAttribute({
    name: "Gender",
    type: "text-attribute",
    expression: "[Orders.Gender]",
  }),
  OrderAmount: createAttribute({
    name: "OrderAmount",
    type: "numeric-attribute",
    expression: "[Orders.Order Amount]",
  }),
  ProductID: createAttribute({
    name: "ProductID",
    type: "numeric-attribute",
    expression: "[Orders.Product ID]",
  }),
  DateOrdered: createDateDimension({
    name: "DateOrdered",
    expression: "[Orders.Date Ordered (Calendar)]",
  }),
}) as OrdersDimension;

interface ProductDimension extends Dimension {
  BrandID: Attribute;
  ProductID: Attribute;
  ProductName: Attribute;
}
export const Product = createDimension({
  name: "Product",
  BrandID: createAttribute({
    name: "BrandID",
    type: "numeric-attribute",
    expression: "[Product.Brand ID]",
  }),
  ProductID: createAttribute({
    name: "ProductID",
    type: "numeric-attribute",
    expression: "[Product.Product ID]",
  }),
  ProductName: createAttribute({
    name: "ProductName",
    type: "text-attribute",
    expression: "[Product.Product Name]",
  }),
}) as ProductDimension;
