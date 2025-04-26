import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { GetEventDto } from './dto/get-event.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from 'src/users/models/user.schema';

@Controller('calendar')
export class EventsController {
  constructor(private readonly EventsService: EventsService) {}

  @Post()
  createEvent(
    @CurrentUser() user: User,
    @Body() createEventDto: CreateEventDto,
  ) {
    return this.EventsService.create({
      ...createEventDto,
      creator: user._id.toHexString(),
    });
  }

  @Get()
  findAll() {
    return this.EventsService.findAll();
  }

  @Get(':id')
  findOne(@Body() getEventDto: GetEventDto) {
    return this.EventsService.findOne(getEventDto);
  }

  @Put(':id')
  update(@Body() updateEventDto: UpdateEventDto) {
    return this.EventsService.updateEvent(updateEventDto);
  }

  @Delete(':id')
  remove(@Body() getEventDto: GetEventDto) {
    return this.EventsService.remove(getEventDto);
  }
}
