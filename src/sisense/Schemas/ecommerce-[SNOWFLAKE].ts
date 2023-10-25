import {
  Dimension,
  DateDimension,
  Attribute,
  createAttribute,
  createDateDimension,
  createDimension,
} from "@sisense/sdk-data";

export const DataSource = "ECommerce Demo [SNOWFLAKE]";

interface ActualVPotentialDimension extends Dimension {
  Actual_Revenue: Attribute;
  Potential_Revenue: Attribute;
  ProductName: Attribute;
  Product_ID: Attribute;
}
export const ActualVPotential = createDimension({
  name: "Actual V Potential",
  Actual_Revenue: createAttribute({
    name: "Actual_Revenue",
    type: "numeric-attribute",
    expression: "[Actual V Potential.Actual_Revenue]",
  }),
  Potential_Revenue: createAttribute({
    name: "Potential_Revenue",
    type: "numeric-attribute",
    expression: "[Actual V Potential.Potential_Revenue]",
  }),
  ProductName: createAttribute({
    name: "ProductName",
    type: "text-attribute",
    expression: "[Actual V Potential.Product Name]",
  }),
  Product_ID: createAttribute({
    name: "Product_ID",
    type: "numeric-attribute",
    expression: "[Actual V Potential.Product_ID]",
  }),
}) as ActualVPotentialDimension;

interface BrandDimension extends Dimension {
  BrandName: Attribute;
  Brnad_ID: Attribute;
}
export const Brand = createDimension({
  name: "Brand",
  BrandName: createAttribute({
    name: "BrandName",
    type: "text-attribute",
    expression: "[Brand.Brand Name]",
  }),
  Brnad_ID: createAttribute({
    name: "Brnad_ID",
    type: "numeric-attribute",
    expression: "[Brand.Brnad_ID]",
  }),
}) as BrandDimension;

interface CategoryDimension extends Dimension {
  CategoryName: Attribute;
  Category_ID: Attribute;
}
export const Category = createDimension({
  name: "Category",
  CategoryName: createAttribute({
    name: "CategoryName",
    type: "text-attribute",
    expression: "[Category.Category Name]",
  }),
  Category_ID: createAttribute({
    name: "Category_ID",
    type: "numeric-attribute",
    expression: "[Category.Category_ID]",
  }),
}) as CategoryDimension;

interface CommerceDimension extends Dimension {
  Age: Attribute;
  AgeRange: Attribute;
  Brand_ID: Attribute;
  Category_ID: Attribute;
  Cost: Attribute;
  Country: Attribute;
  CustomerName: Attribute;
  Customer_ID: Attribute;
  DayOfWeek: Attribute;
  Product_ID: Attribute;
  Quantity: Attribute;
  Revenue: Attribute;
  Status: Attribute;
  Transaction_ID: Attribute;
  Transaction_Date: DateDimension;
}
export const Commerce = createDimension({
  name: "Commerce",
  Age: createAttribute({
    name: "Age",
    type: "numeric-attribute",
    expression: "[Commerce.Age]",
  }),
  AgeRange: createAttribute({
    name: "AgeRange",
    type: "text-attribute",
    expression: "[Commerce.Age Range]",
  }),
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
  DayOfWeek: createAttribute({
    name: "DayOfWeek",
    type: "text-attribute",
    expression: "[Commerce.DayOfWeek]",
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
