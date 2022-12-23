import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: [true, 'Full name is required!'] })
  fullname: string;

  @Prop({
    required: [true, 'Email is required!'],
    unique: true,
    lowercase: true,
  })
  email: string;

  @Prop({ required: [true, 'Password is required!'] })
  password: string;

  @Prop({ required: true, default: Date.now() })
  createdDate: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
