import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { EnrollmentService } from '../enrollment/enrollment.service';

@Injectable()
export class NotificationService {
  constructor(
    @Inject(forwardRef(() => EnrollmentService))
    private enrollmentService: EnrollmentService,
  ) {}

  sendNotification(studentName: string, message: string) {
    return { message: `Notification sent to ${studentName}: ${message}` };
  }

  async checkEnrollmentAndNotify(studentName: string, courseId: string) {
    const enrollments = await this.enrollmentService.getEnrollments();
    return {
      message: 'Checked enrollment',
      student: studentName,
      courseId,
      enrollments,
    };
  }
}