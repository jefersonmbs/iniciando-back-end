import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../models/Appointement';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface RequestDTO {
  provider_id: string;
  date: Date;
}
class CreateAppointmentService {
  // eslint-disable-next-line camelcase
  public async execute({
                         // eslint-disable-next-line camelcase
    provider_id,
    date,
  }: RequestDTO): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const findAppointmentDateInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentDateInSameDate) {
      throw Error('Date is invalid.');
    }
    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
