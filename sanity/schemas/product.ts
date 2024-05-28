export default {
    type: "document",
    name: "product",
    title: "Products",
    fields: [
        {
            type: "string",
            name: "name",
            title: "Name of Product"
        },
        {
            type: "array",
            name: "images",
            title: "images of product",
            of: [{ type: "image" }]
        },
        {
            type: "number",
            name: "weight",
            title: "Weight of product (In grams)",
        },
        {
            type: "number",
            name: "price",
            title: "Price of product",
        },
        {
            type: "reference",
            name: "category",
            title: "Category of Product",
            to: [{ type: "category" }]
        },
        {
            type: "slug",
            name: "slug",
            title: "Slug of Product",
            options:{ source: "name" }
        },
        {
            type: "string",
            name: "price_id",
            title: "Stripe Product Id",
        
        },
    ]
}