import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Ticket API",
            version: "1.0.0",
            description: "API documentation",
        },
    },
    apis: ["./src/modules/**/*.ts"],
};

export const specs = swaggerJsdoc(options);
