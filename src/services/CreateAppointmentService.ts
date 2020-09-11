import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../models/Appointement';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface RequestDTO {
  provider: string;
  date: Date;
}
class CreateAppointmentService {
  public async execute({ provider, date }: RequestDTO): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const findAppointmentDateInSameDate = appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentDateInSameDate) {
      throw Error('Date is invalid.');
    }
    const appointment = appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
