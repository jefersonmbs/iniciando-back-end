import { isEqual } from 'date-fns';
import Appointment from '../models/Appointement';

interface createAppointmentDTO {
  provider: string;
  date: Date;
}

class AppointmentsRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public findByDate(date: Date): Appointment | null {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(date, appointment.date),
    );
    return findAppointment || null;
  }

  public create({ provider, date }: createAppointmentDTO): Appointment {
    const appointment = new Appointment({ provider, date });

    this.appointments.push(appointment);

    return appointment;
  }

  public listAll(): Appointment[] {
    return this.appointments;
  }
}

export default AppointmentsRepository;
