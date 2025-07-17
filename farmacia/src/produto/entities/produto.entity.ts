import { IsNotEmpty } from 'class-validator'; // implementar as regras de validação
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'; // realizar a interação com o banco de dados
import { Categoria } from '../../Categoria/entities/categoria.entity';

@Entity({ name: 'tb_produtos' }) // nome da tabela no banco de dados
export class Produto {
  // entidade que representa a tabela no banco de dados

  @PrimaryGeneratedColumn() // coluna de chave primária, auto incrementável
  id: number;

  @IsNotEmpty({ message: 'O nome do produto é obrigatório.' }) // validação para garantir que o nome não esteja vazio
  @Column({ length: 100, nullable: false }) // coluna do banco de dados com tamanho máximo de
  nome: string;

  @IsNotEmpty({ message: 'A descrição do produto é obrigatória.' }) // validação para garantir que a descrição não esteja vazia
  @Column({ length: 255, nullable: false }) // coluna do banco de dados com tamanho máximo de  255 caracteres
  descricao: string;

  @IsNotEmpty({ message: 'O preço do produto é obrigatório.' }) // validação para garantir que o preço não esteja vazio
  @Column('decimal', { precision: 10, scale: 2 }) // coluna do banco de dados para armazenar valores decimais, com precisão de 10 dígitos
  preco: number;

  @IsNotEmpty({ message: 'A quantidade do produto é obrigatória.' }) // validação para garantir que a quantidade não esteja vazia
  @Column('int') // coluna do banco de dados para armazenar valores inteiros
  quantidade: number;

  @UpdateDateColumn() // coluna que armazena a data da última atualização do registro
  data: Date;

  @ManyToOne(() => Categoria, (categoria) => categoria.produto, {
    onDelete: 'CASCADE',
  })
  categoria: Categoria; // relacionamento muitos-para-um com a entidade Categoria, onde um produto pertence a uma categoria
}
