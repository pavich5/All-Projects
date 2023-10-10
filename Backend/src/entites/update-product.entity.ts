import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({
  name: "products",
})
export class UpdateProductsEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({
    nullable: true,
  })
  name?: string;

  @Column({
    nullable: true,
  })
  description?: string;

  @Column({
    nullable: true,
  })
  price?: number;

  @Column({
    nullable: true,
  })
  image?: string;
}
