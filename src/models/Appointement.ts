import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Users from './Users';

@Entity('appointments')
class Appointments {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  provider_id: string;
  /*
  @ManyToOne(() => Users)
  @JoinColumn({ name: 'provide_id' })
  provider: Users;
  */

  @Column('timestamp with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updatad_at: Date;
}

export default Appointments;
