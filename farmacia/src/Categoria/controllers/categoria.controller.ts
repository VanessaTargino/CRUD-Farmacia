import { CategoriaService } from '../services/categoria.service';
import { Categoria } from '../entities/categoria.entity';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';

@Controller('/categorias')
// define a rota base para este controlador
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {} // injetar o serviço CategoriaService

  @Get()
  @HttpCode(HttpStatus.OK)
  // define o método HTTP e o status de resposta
  findAll(): Promise<Categoria[]> {
    // método para buscar todas as categorias
    return this.categoriaService.findAll(); // chama o serviço para buscar todas as categorias
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  // define o método HTTP e o status de resposta
  findById(@Param('id', ParseIntPipe) id: number): Promise<Categoria> {
    // método para buscar uma categoria pelo ID
    return this.categoriaService.findById(id); // chama o serviço para buscar a categoria pelo ID
  }

  @Get('nome')
  @HttpCode(HttpStatus.OK)
  // define o método HTTP e o status de resposta
  findAllByNome(@Param('nome') nome: string): Promise<Categoria[]> {
    // método para buscar categorias pelo nome
    return this.categoriaService.findAllByNome(nome); // chama o serviço para buscar categorias pelo nome
  }

  @Get('descricao')
  @HttpCode(HttpStatus.OK)
  // define o método HTTP e o status de resposta
  findAllByDescricao(
    @Param('descricao') descricao: string,
  ): Promise<Categoria[]> {
    // método para buscar categorias pela descrição
    return this.categoriaService.findAllByDescricao(descricao); // chama o serviço para buscar categorias pela descrição
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  // define o método HTTP e o status de resposta
  create(@Body() categoria: Categoria): Promise<Categoria> {
    // método para criar uma nova categoria
    return this.categoriaService.create(categoria); // chama o serviço para criar a categoria
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  // define o método HTTP e o status de resposta
  update(@Body() categoria: Categoria): Promise<Categoria> {
    // método para atualizar uma categoria existente
    return this.categoriaService.update(categoria); // chama o serviço para atualizar a categoria
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  // define o método HTTP e o status de resposta
  delete(@Param('id', ParseIntPipe) id: number) {
    // método para deletar uma categoria pelo ID
    return this.categoriaService.delete(id); // chama o serviço para deletar a categoria
  }
}
