import { OrderType } from 'src/types/order.type';
import { Brackets, ObjectLiteral, SelectQueryBuilder } from 'typeorm';

export class QueryBuilderFacade<T extends ObjectLiteral> {
  private readonly queryBuilder: SelectQueryBuilder<T>;

  constructor(queryBuilder: SelectQueryBuilder<T>) {
    this.queryBuilder = queryBuilder;
  }

  public addSearchQuery(searchWords: string[]): QueryBuilderFacade<T> {
    if (searchWords.length === 0) {
      return this;
    }

    this.queryBuilder.andWhere(
      new Brackets((qb) => {
        searchWords.forEach((word, index) => {
          const param = `searchWord${index}`;
          qb.orWhere(
            new Brackets((qb) => {
              qb.orWhere(`LOWER(recipe.title) LIKE LOWER(:${param})`, {
                [param]: `%${word}%`,
              })
                .orWhere(`LOWER(recipe.description) LIKE LOWER(:${param})`, {
                  [param]: `%${word}%`,
                })
                .orWhere(`LOWER(tag.name) LIKE LOWER(:${param})`, {
                  [param]: `%${word}%`,
                });
            }),
          );
        });
      }),
    );
    return this;
  }

  public addTagsQuery(tags: string[]): QueryBuilderFacade<T> {
    if (tags.length) {
      this.queryBuilder.andWhere('tag.name IN (:...tags)', { tags });
    }
    return this;
  }

  public orderBy(sortColumn: string, order: OrderType): QueryBuilderFacade<T> {
    this.queryBuilder.orderBy(sortColumn, order);
    return this;
  }

  public skipToBy(page: number, limit: number): QueryBuilderFacade<T> {
    this.queryBuilder.skip((page - 1) * limit).take(limit);
    return this;
  }

  public get(): Promise<[T[], number]> {
    return this.queryBuilder.getManyAndCount();
  }

  public leftJoinAndSelect(
    table: string,
    alias: string,
  ): QueryBuilderFacade<T> {
    this.queryBuilder.leftJoinAndSelect(table, alias);
    return this;
  }
}
