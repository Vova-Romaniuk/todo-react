export enum TaskType {
	Task = "task",
	Reminder = "reminder",
}

export interface TaskModel {
	id: string;
	description: string;
	isDone?: boolean;
	type: TaskType;
	deadline: string;
	raceId: string;
}
