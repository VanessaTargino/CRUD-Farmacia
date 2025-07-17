import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoModule } from './produto/produto.module'; // importar o módulo Produto
import { Produto } from './produto/entities/produto.entity';
import { CategoriaModule } from './Categoria/categoria.module'; // importar o módulo Categoria
import { Categoria } from './Categoria/entities/categoria.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Pdg@@2022',
      database: 'db_crudfarmacia',
      entities: [Produto, Categoria], // registrar as entidades Produto e Categoria
      synchronize: true,
    }),
    ProdutoModule, // registrar o módulo Produto
    CategoriaModule, // registrar o módulo Categoria
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
