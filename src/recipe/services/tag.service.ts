import { Injectable } from '@nestjs/common';
import { Tag } from '../entities/tag.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTagDto } from '../dto/create-recipe.dto';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag) private readonly tagRepo: Repository<Tag>,
  ) {}

  public async create(createTagParams: CreateTagDto[]) {
    return await Promise.all(
      createTagParams.map(async (tag) => {
        const existing = await this.tagRepo.findOneBy({
          name: tag.name,
        });
        console.log(existing);
        if (existing) return existing;

        const newTag = this.tagRepo.create(tag);
        return await this.tagRepo.save(newTag);
      }),
    );
  }

  public getTags() {
    return this.tagRepo.find({
      select: {
        id: true,
        name: true,
        createdAt: false,
      },
    });
  }
}
