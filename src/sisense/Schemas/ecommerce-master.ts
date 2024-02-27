import {
  Dimension,
  DateDimension,
  Attribute,
  createAttribute,
  createDateDimension,
  createDimension,
} from "@sisense/sdk-data";

export const DataSource = "Shopsense [DEV V2]";

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

interface AdReportDimension extends Dimension {
  AdName: Attribute;
  AdSetName: Attribute;
  Ad_ID: Attribute;
  Ad_Set_ID: Attribute;
  Age: Attribute;
  AmountSpent: Attribute;
  CampaignDuration: Attribute;
  CostPerPurchase: Attribute;
  CostPerResult: Attribute;
  Day: Attribute;
  Frequency: Attribute;
  Gender: Attribute;
  Impressions: Attribute;
  Network: Attribute;
  Objective: Attribute;
  Purchases: Attribute;
  Reach: Attribute;
  Results: Attribute;
  UniquePurchases: Attribute;
  Ends: DateDimension;
  Starts: DateDimension;
}
export const AdReport = createDimension({
  name: "Ad Report",
  AdName: createAttribute({
    name: "AdName",
    type: "text-attribute",
    expression: "[Ad Report.Ad Name]",
  }),
  AdSetName: createAttribute({
    name: "AdSetName",
    type: "text-attribute",
    expression: "[Ad Report.Ad Set Name]",
  }),
  Ad_ID: createAttribute({
    name: "Ad_ID",
    type: "numeric-attribute",
    expression: "[Ad Report.Ad_ID]",
  }),
  Ad_Set_ID: createAttribute({
    name: "Ad_Set_ID",
    type: "numeric-attribute",
    expression: "[Ad Report.Ad_Set_ID]",
  }),
  Age: createAttribute({
    name: "Age",
    type: "text-attribute",
    expression: "[Ad Report.Age]",
  }),
  AmountSpent: createAttribute({
    name: "AmountSpent",
    type: "numeric-attribute",
    expression: "[Ad Report.Amount Spent]",
  }),
  CampaignDuration: createAttribute({
    name: "CampaignDuration",
    type: "numeric-attribute",
    expression: "[Ad Report.Campaign Duration]",
  }),
  CostPerPurchase: createAttribute({
    name: "CostPerPurchase",
    type: "numeric-attribute",
    expression: "[Ad Report.Cost Per Purchase]",
  }),
  CostPerResult: createAttribute({
    name: "CostPerResult",
    type: "numeric-attribute",
    expression: "[Ad Report.Cost Per Result]",
  }),
  Day: createAttribute({
    name: "Day",
    type: "numeric-attribute",
    expression: "[Ad Report.Day]",
  }),
  Frequency: createAttribute({
    name: "Frequency",
    type: "numeric-attribute",
    expression: "[Ad Report.Frequency]",
  }),
  Gender: createAttribute({
    name: "Gender",
    type: "text-attribute",
    expression: "[Ad Report.Gender]",
  }),
  Impressions: createAttribute({
    name: "Impressions",
    type: "numeric-attribute",
    expression: "[Ad Report.Impressions]",
  }),
  Network: createAttribute({
    name: "Network",
    type: "text-attribute",
    expression: "[Ad Report.Network]",
  }),
  Objective: createAttribute({
    name: "Objective",
    type: "text-attribute",
    expression: "[Ad Report.Objective]",
  }),
  Purchases: createAttribute({
    name: "Purchases",
    type: "numeric-attribute",
    expression: "[Ad Report.Purchases]",
  }),
  Reach: createAttribute({
    name: "Reach",
    type: "numeric-attribute",
    expression: "[Ad Report.Reach]",
  }),
  Results: createAttribute({
    name: "Results",
    type: "numeric-attribute",
    expression: "[Ad Report.Results]",
  }),
  UniquePurchases: createAttribute({
    name: "UniquePurchases",
    type: "numeric-attribute",
    expression: "[Ad Report.Unique Purchases]",
  }),
  Ends: createDateDimension({
    name: "Ends",
    expression: "[Ad Report.Ends (Calendar)]",
  }),
  Starts: createDateDimension({
    name: "Starts",
    expression: "[Ad Report.Starts (Calendar)]",
  }),
}) as AdReportDimension;

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
  AD_ID: Attribute;
  Age: Attribute;
  AgeRange: Attribute;
  Brand_ID: Attribute;
  Category_ID: Attribute;
  Cost: Attribute;
  Country: Attribute;
  CustomerName: Attribute;
  Customer_ID: Attribute;
  DayOfWeek: Attribute;
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
  AD_ID: createAttribute({
    name: "AD_ID",
    type: "numeric-attribute",
    expression: "[Commerce.AD_ID]",
  }),
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
