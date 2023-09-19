import {
  Dimension,
  DateDimension,
  Attribute,
  createAttribute,
  createDateDimension,
  createDimension,
} from "@sisense/sdk-data";

export const DataSource = "Ecommerce Demo [MASTER]";

interface BrandDimension extends Dimension {
  BrandName: Attribute;
  Brand_Id: Attribute;
}
export const Brand = createDimension({
  name: "Brand",
  BrandName: createAttribute({
    name: "BrandName",
    type: "text-attribute",
    expression: "[Brand.Brand Name]",
  }),
  Brand_Id: createAttribute({
    name: "Brand_Id",
    type: "numeric-attribute",
    expression: "[Brand.Brand_Id]",
  }),
}) as BrandDimension;

interface CategoryDimension extends Dimension {
  CategoryName: Attribute;
  Category_Id: Attribute;
}
export const Category = createDimension({
  name: "Category",
  CategoryName: createAttribute({
    name: "CategoryName",
    type: "text-attribute",
    expression: "[Category.Category Name]",
  }),
  Category_Id: createAttribute({
    name: "Category_Id",
    type: "numeric-attribute",
    expression: "[Category.Category_Id]",
  }),
}) as CategoryDimension;

interface CommerceDimension extends Dimension {
  Brand_ID: Attribute;
  Category_ID: Attribute;
  Cost: Attribute;
  Country: Attribute;
  CustomerName: Attribute;
  Customer_ID: Attribute;
  Gender: Attribute;
  Product_ID: Attribute;
  Quantity: Attribute;
  Revenue: Attribute;
  Status: Attribute;
  Transaction_ID: Attribute;
  Transaction_Date: DateDimension;
}
export const Commerce = createDimension({
  name: "Commerce",
  Brand_ID: createAttribute({
    name: "Brand_ID",
    type: "numeric-attribute",
    expression: "[Commerce.Brand_ID]",
  }),
  Category_ID: createAttribute({
    name: "Category_ID",
    type: "numeric-attribute",
    expression: "[Commerce.Category_ID]",
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
  Customer_ID: createAttribute({
    name: "Customer_ID",
    type: "numeric-attribute",
    expression: "[Commerce.Customer_ID]",
  }),
  Gender: createAttribute({
    name: "Gender",
    type: "text-attribute",
    expression: "[Commerce.Gender]",
  }),
  Product_ID: createAttribute({
    name: "Product_ID",
    type: "numeric-attribute",
    expression: "[Commerce.Product_ID]",
  }),
  Quantity: createAttribute({
    name: "Quantity",
    type: "numeric-attribute",
    expression: "[Commerce.Quantity]",
  }),
  Revenue: createAttribute({
    name: "Revenue",
    type: "numeric-attribute",
    expression: "[Commerce.Revenue]",
  }),
  Status: createAttribute({
    name: "Status",
    type: "text-attribute",
    expression: "[Commerce.Status]",
  }),
  Transaction_ID: createAttribute({
    name: "Transaction_ID",
    type: "numeric-attribute",
    expression: "[Commerce.Transaction_ID]",
  }),
  Transaction_Date: createDateDimension({
    name: "Transaction_Date",
    expression: "[Commerce.Transaction_Date (Calendar)]",
  }),
}) as CommerceDimension;

interface CustomerReviewsDimension extends Dimension {
  Customer_ID: Attribute;
  Rating: Attribute;
  Review: Attribute;
  Sentiment: Attribute;
}
export const CustomerReviews = createDimension({
  name: "Customer Reviews",
  Customer_ID: createAttribute({
    name: "Customer_ID",
    type: "numeric-attribute",
    expression: "[Customer Reviews.Customer_ID]",
  }),
  Rating: createAttribute({
    name: "Rating",
    type: "numeric-attribute",
    expression: "[Customer Reviews.Rating]",
  }),
  Review: createAttribute({
    name: "Review",
    type: "text-attribute",
    expression: "[Customer Reviews.Review]",
  }),
  Sentiment: createAttribute({
    name: "Sentiment",
    type: "text-attribute",
    expression: "[Customer Reviews.Sentiment]",
  }),
}) as CustomerReviewsDimension;

interface ProductDimension extends Dimension {
  Brand_ID: Attribute;
  ProductName: Attribute;
  Product_ID: Attribute;
  Product_Image: Attribute;
}
export const Product = createDimension({
  name: "Product",
  Brand_ID: createAttribute({
    name: "Brand_ID",
    type: "numeric-attribute",
    expression: "[Product.Brand_ID]",
  }),
  ProductName: createAttribute({
    name: "ProductName",
    type: "text-attribute",
    expression: "[Product.Product Name]",
  }),
  Product_ID: createAttribute({
    name: "Product_ID",
    type: "numeric-attribute",
    expression: "[Product.Product_ID]",
  }),
  Product_Image: createAttribute({
    name: "Product_Image",
    type: "text-attribute",
    expression: "[Product.Product_Image]",
  }),
}) as ProductDimension;
