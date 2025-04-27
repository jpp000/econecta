import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { EventsRepository } from './events.repository';
import { DatabaseModule } from 'src/common/database/database.module';
import { Event, EventSchema } from './models/event.schema';

@Module({
  imports: [
    DatabaseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
  ],
  controllers: [EventsController],
  providers: [EventsService, EventsRepository],
})
export class CalendarModule {}
