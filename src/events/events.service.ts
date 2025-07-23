import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Event, EventDocument } from './schemas/event.schema';
import { Model } from 'mongoose';
import { CreateEventDto } from './dto/create-event.dto';
import { User, UserDocument } from '../auth/schemas/user.schema';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  // ✅ Create new event from user
  // async create(createEventDto: CreateEventDto): Promise<Event> {
  //   const user = await this.userModel.findById(createEventDto.user);
  //   if (!user) {
  //     throw new NotFoundException('User not found');
  //   }

  //   const event = new this.eventModel({
  //     ...createEventDto,
  //     firstName: user.firstName,
  //     lastName: user.lastName,
  //     dob: user.dob,
  //     joiningDate: user.joiningDate,
  //     profileImage: user.profileImage,
  //   });

  //   return event.save();
  // }

  async createEvent(createEventDto: CreateEventDto): Promise<Event> {
  const { dob, joiningDate } = createEventDto as any;

  // Automatically set type based on date fields
  if (!createEventDto.type) {
    if (dob) {
      createEventDto.type = 'birthday';
    } else if (joiningDate) {
      createEventDto.type = 'anniversary';
    }
  }

  const createdEvent = new this.eventModel(createEventDto);
  return await createdEvent.save();
}


  // ✅ Get all events (optionally filtered by type)
  async findAll(type?: string): Promise<Event[]> {
    const query: any = {};
    if (type) {
      query.type = type;
    }

    return this.eventModel
      .find(query)
      .populate('user', 'firstName lastName profileImage') // only needed fields
      .sort({ createdAt: -1 });
  }

  // ✅ Get today's birthdays and anniversaries
  async findTodayEvents(): Promise<Event[]> {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth();

    const allEvents = await this.eventModel.find().populate('user', 'firstName lastName profileImage');

    return allEvents.filter((event) => {
      if (event.type === 'birthday' && event.dob) {
        const dob = new Date(event.dob);
        return dob.getDate() === day && dob.getMonth() === month;
      }

      if (event.type === 'anniversary' && event.joiningDate) {
        const joinDate = new Date(event.joiningDate);
        return joinDate.getDate() === day && joinDate.getMonth() === month;
      }

      return false;
    });
  }
  async findByType(type: string): Promise<Event[]> {
  return this.eventModel.find({ type }).exec();
}

}
