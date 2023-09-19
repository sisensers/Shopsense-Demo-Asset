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
  Amount: Attribute;
  Brand_ID: Attribute;
  Category_ID: Attribute;
  Cost: Attribute;
  Country: Attribute;
  CustomerName: Attribute;
  DayinDate: Attribute;
  Gender: Attribute;
  Product_ID: Attribute;
  Status: Attribute;
  Transaction_ID: Attribute;
  Transaction_Date: DateDimension;
}
export const Commerce = createDimension({
  name: "Commerce",
  Amount: createAttribute({
    name: "Amount",
    type: "numeric-attribute",
    expression: "[Commerce.Amount]",
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
  DayinDate: createAttribute({
    name: "DayinDate",
    type: "text-attribute",
    expression: "[Commerce.Day in Date]",
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

interface CommerceTableUpdatedcsvDimension extends Dimension {
  Brand_ID: Attribute;
  Category_ID: Attribute;
  Cost: Attribute;
  Country: Attribute;
  Customer_Gender: Attribute;
  Customer_ID: Attribute;
  Customer_Name: Attribute;
  Product_ID: Attribute;
  Transaction_Amount: Attribute;
  Transaction_ID: Attribute;
  Transaction_Status: Attribute;
  Transaction_Date: DateDimension;
}
export const CommerceTableUpdatedcsv = createDimension({
  name: "CommerceTableUpdated.csv",
  Brand_ID: createAttribute({
    name: "Brand_ID",
    type: "numeric-attribute",
    expression: "[CommerceTableUpdated.csv.Brand_ID]",
  }),
  Category_ID: createAttribute({
    name: "Category_ID",
    type: "numeric-attribute",
    expression: "[CommerceTableUpdated.csv.Category_ID]",
  }),
  Cost: createAttribute({
    name: "Cost",
    type: "numeric-attribute",
    expression: "[CommerceTableUpdated.csv.Cost]",
  }),
  Country: createAttribute({
    name: "Country",
    type: "text-attribute",
    expression: "[CommerceTableUpdated.csv.Country]",
  }),
  Customer_Gender: createAttribute({
    name: "Customer_Gender",
    type: "text-attribute",
    expression: "[CommerceTableUpdated.csv.Customer_Gender]",
  }),
  Customer_ID: createAttribute({
    name: "Customer_ID",
    type: "numeric-attribute",
    expression: "[CommerceTableUpdated.csv.Customer_ID]",
  }),
  Customer_Name: createAttribute({
    name: "Customer_Name",
    type: "text-attribute",
    expression: "[CommerceTableUpdated.csv.Customer_Name]",
  }),
  Product_ID: createAttribute({
    name: "Product_ID",
    type: "numeric-attribute",
    expression: "[CommerceTableUpdated.csv.Product_ID]",
  }),
  Transaction_Amount: createAttribute({
    name: "Transaction_Amount",
    type: "numeric-attribute",
    expression: "[CommerceTableUpdated.csv.Transaction_Amount]",
  }),
  Transaction_ID: createAttribute({
    name: "Transaction_ID",
    type: "numeric-attribute",
    expression: "[CommerceTableUpdated.csv.Transaction_ID]",
  }),
  Transaction_Status: createAttribute({
    name: "Transaction_Status",
    type: "text-attribute",
    expression: "[CommerceTableUpdated.csv.Transaction_Status]",
  }),
  Transaction_Date: createDateDimension({
    name: "Transaction_Date",
    expression: "[CommerceTableUpdated.csv.Transaction_Date (Calendar)]",
  }),
}) as CommerceTableUpdatedcsvDimension;

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

interface TransactionsDimension extends Dimension {
  Product_ID: Attribute;
  transaction_amount: Attribute;
  Transaction_ID: Attribute;
  transaction_status: Attribute;
  Transaction_Date: DateDimension;
}
export const Transactions = createDimension({
  name: "Transactions",
  Product_ID: createAttribute({
    name: "Product_ID",
    type: "numeric-attribute",
    expression: "[Transactions.Product_ID]",
  }),
  transaction_amount: createAttribute({
    name: "transaction_amount",
    type: "numeric-attribute",
    expression: "[Transactions.transaction_amount]",
  }),
  Transaction_ID: createAttribute({
    name: "Transaction_ID",
    type: "numeric-attribute",
    expression: "[Transactions.Transaction_ID]",
  }),
  transaction_status: createAttribute({
    name: "transaction_status",
    type: "text-attribute",
    expression: "[Transactions.transaction_status]",
  }),
  Transaction_Date: createDateDimension({
    name: "Transaction_Date",
    expression: "[Transactions.Transaction_Date (Calendar)]",
  }),
}) as TransactionsDimension;
