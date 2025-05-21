import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [process.env.FRONT_END_URL || 'https://lucasbilbao.github.io'], // frontend URL
    methods: ['GET', 'POST'],
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('FoodLabs API')
    .setDescription(
      `The FoodLabs API empowers developers with advanced AI-driven features for modern recipe applications. It offers intelligent recipe generation, allowing users to create custom recipes based on natural language prompts. The API also includes AI-enhanced search, enabling flexible, accurate querying by ingredients, cuisine, dietary preferences, and more. Built-in pagination support ensures efficient data handling and smooth user experiences across large recipe datasets. Ideal for apps that prioritize personalization, discovery, and performance.`,
    )
    .setVersion('1.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/recipes/swagger', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
