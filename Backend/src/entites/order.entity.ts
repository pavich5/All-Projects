import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "orders" })
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  useremail: string;

  @Column({ type: 'jsonb' })
  products: any[]; 
}
