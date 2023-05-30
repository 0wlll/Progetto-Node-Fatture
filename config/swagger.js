module.exports={

    swaggerDefinition: {
        definition: {
            openapi: "3.0.0",
            info: {
                title: "Fattura API",
                version: "1.0.0",
                description: "Fattura API documnetation.",
            },
            servers: [
                {
                    url: "http://localhost:5000/",
               },
              
            ],
            
        },
      apis: ["./routes/*.js"],
    }
}