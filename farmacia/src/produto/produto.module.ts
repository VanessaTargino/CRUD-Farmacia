import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaModule } from '../Categoria/categoria.module';
import { Produto } from './entities/produto.entity'; // importar a entidade Produto
import { ProdutoController } from './controllers/produto.controller';
import { ProdutoService } from './services/produto.service';

@Module({
  imports: [TypeOrmModule.forFeature([Produto]), CategoriaModule], // registrar a entidade Produto no TypeOrmModule
  // permite que a entidade Produto seja injetada em outros serviços e controladores
  providers: [ProdutoService], // registrar o serviço ProdutoService //
  controllers: [ProdutoController], // permite que os endpoints definidos dentro dessa classe sejam acessíveis para processar as requisições HTTP. O controlador irá definir as rotas e mapeá-las para métodos específicos, como GET, POST, PUT e DELETE.
  exports: [],
})
export class ProdutoModule {}
// Módulo que encapsula a entidade Produto e permite sua utilização em outros módulos
