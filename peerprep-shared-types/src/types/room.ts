import { DifficultyLevel, QuestionDto } from "./question";

interface RoomDto {
  _id: string;
  users: string[];
  question: QuestionDto;
  topic: string;
  difficulty: DifficultyLevel;
  //   messages: {
  //     userId: string;
  //     content: string;
  //     timestamp: Date;
  //   }[];
  createdAt: Date;
  updatedAt: Date;
}