import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class UpdateUserColumnUsername1600215184828
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'users',
      'username',
      new TableColumn({
        name: 'name',
        type: 'varchar',
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'users',
      'name',
      new TableColumn({
        name: 'username',
        type: 'varchar',
        isNullable: false,
      }),
    );
  }
}
