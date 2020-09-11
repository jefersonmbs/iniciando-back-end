import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('appointmens')
class Appointments {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  provider: string;

  @Column('timestamp with time zone')
  date: Date;
}

export default Appointments;
