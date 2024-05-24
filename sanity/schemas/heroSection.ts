export default {
    type: "document",
    name: "heroSection",
    title: "Hero Sections",
    fields: [
        {
            type: "string",
            name: "name",
            title: "Hero Name"
        },
        {
            type: "string",
            name: "mainText",
            title: "Hero Main Text"
        },
        {
            type: "text",
            name: "desc",
            title: "Hero Description"
        },
        {
            type: "image",
            name: "heroImg",
            title: "Hero Image"
        },
        {
            type: "array",
            name: "featuredImgs",
            title: "Featured Images",
            of: [{ type: "image" }]
        },
        {
            type: "boolean",
            name: "status",
            title: "Status of Hero",
        },
    ]
}