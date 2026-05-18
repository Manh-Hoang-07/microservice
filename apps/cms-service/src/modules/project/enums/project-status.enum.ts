export enum ProjectStatus {
  planning = 'planning',
  in_progress = 'in_progress',
  completed = 'completed',
  cancelled = 'cancelled',
}

export const ProjectStatusOptions = [
  { id: ProjectStatus.planning, name: 'Lên kế hoạch' },
  { id: ProjectStatus.in_progress, name: 'Đang thực hiện' },
  { id: ProjectStatus.completed, name: 'Hoàn thành' },
  { id: ProjectStatus.cancelled, name: 'Đã hủy' },
];
