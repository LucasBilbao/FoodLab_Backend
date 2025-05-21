# FoodLabs API

The FoodLabs API empowers developers with advanced AI-driven features for modern recipe applications. It offers intelligent recipe generation, allowing users to create custom recipes based on natural language prompts. The API also includes AI-enhanced search, enabling flexible, accurate querying by ingredients, cuisine, dietary preferences, and more. Built-in pagination support ensures efficient data handling and smooth user experiences across large recipe datasets. Ideal for apps that prioritize personalization, discovery, and performance.

## Technologies

- [NestJS@11.0.1](https://docs.nestjs.com/)
- [MySQL2@3.14.0](https://docs.nestjs.com/recipes/sql-typeorm)
- [OpenAI@4.97.0](https://www.npmjs.com/package/openai)
- [PostgreSQL@8.16.0](https://www.npmjs.com/package/pg)
- [TypeORM@0.3.22](https://docs.nestjs.com/recipes/sql-typeorm)
- [NestJS/Config@4.0.2](https://docs.nestjs.com/techniques/configuration)

## Run Web Service Locally

Clone repository with `ssh`:

```shell
git clone git@github.com:LucasBilbao/FoodLabs_Backend.git
```

OR

Clone repository with `http`:

```shell
git clone https://github.com/LucasBilbao/FoodLabs_Backend.git
```

Install node dependencies:

```shell
npm install
```

Then run the application

```shell
npm start
```

OR

Run the application with watch to restart if you make any changes

```shell
npm run start:dev
```

The application is running locally here: http://localhost:3000/

## Hosting

This web service is hosted in [Render](https://render.com/)

## Swagger

Review [Swagger](https://foodlabs-backend.onrender.com/api/swagger) for documentation.
