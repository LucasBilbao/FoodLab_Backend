import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

const decoratorParams = [
  {
    name: 'sortBy',
    required: false,
    description: 'Sort by field',
    type: 'string',
    example: 'createdAt',
  },
  {
    name: 'order',
    required: false,
    description: 'Order of the results',
    enum: ['ASC', 'DESC'],
    enumName: 'OrderType',
    example: 'DESC',
    type: 'string',
    default: 'DESC',
  },
  {
    name: 'limit',
    required: false,
    description: 'Limit of results',
    example: 10,
    type: 'number',
  },
  {
    name: 'page',
    required: false,
    description: 'Page number',
    example: 1,
    type: 'number',
  },
  {
    name: 'tags',
    required: false,
    description: 'Tags to filter by',
    isArray: true,
    type: 'string',
  },
  {
    name: 'search',
    required: false,
    description: 'Search term',
    type: 'string',
  },
];

export function FindAllQueries() {
  const appliedDecorators = decoratorParams.map((param) => ApiQuery(param));
  return applyDecorators(...appliedDecorators);
}
