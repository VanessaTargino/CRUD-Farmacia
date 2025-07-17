import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoModule } from './produto/produto.module'; // importar o módulo Produto
import { Produto } from './produto/entities/produto.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Pdg@@2022',
      database: 'db_crudfarmacia',
      entities: [Produto],
      synchronize: true,
    }),
    ProdutoModule, // registrar o módulo Produto
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
