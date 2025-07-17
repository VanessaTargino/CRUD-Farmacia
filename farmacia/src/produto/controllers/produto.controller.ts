import { ProdutoService } from './../services/produto.service'; // importar o serviço ProdutoService
import { Produto } from '../entities/produto.entity'; // importar a entidade Produto
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
} from '@nestjs/common'; // importar o decorador Controller para definir um controlador

@Controller('/produtos') // Define o caminho da requisição // Controlador responsável por gerenciar as requisições relacionadas aos produtos
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {} // injetar o serviço ProdutoService

  @Get() // definir o método HTTP GET para este endpoint
  @HttpCode(HttpStatus.OK) // definir o código de status HTTP para OK (200)
  findAll(): Promise<Produto[]> {
    // método para buscar todos os produtos
    return this.produtoService.findAll(); // chamar o método findAll do serviço ProdutoService
  }

  @Get('/:id') // definir o método HTTP GET para buscar um produto específico pelo ID
  @HttpCode(HttpStatus.OK) // definir o código de status HTTP para OK (200
  findById(@Param('id', ParseIntPipe) id: number): Promise<Produto> {
    // método para buscar um produto pelo ID
    return this.produtoService.findById(id); // chamar o método findById do serviço ProdutoService
  }

  @Get('/nome/:nome') // definir o método HTTP GET para buscar produtos pelo nome
  @HttpCode(HttpStatus.OK) // definir o código de status HTTP para OK (200)
  findAllByNome(@Param('nome') nome: string): Promise<Produto[]> {
    // recebe o nome como parâmetro e retorna uma lista de produtos que correspondem ao nome
    return this.produtoService.findAllByNome(nome); // chamar o método findAllByNome do serviço ProdutoService
  }
  @Post() // definir o método HTTP POST para criar um novo produto
  @HttpCode(HttpStatus.CREATED) // definir o código de status HTTP para Created (201)
  create(@Body() produto: Produto): Promise<Produto> {
    // método para criar um novo produto
    return this.produtoService.create(produto); // chamar o método create do serviço ProdutoService
  }
  @Put() // definir o método HTTP PUT para atualizar um produto existente
  @HttpCode(HttpStatus.OK) // definir o código de status HTTP para OK (200)
  update(@Body() produto: Produto): Promise<Produto> {
    // método para atualizar um produto existente
    return this.produtoService.update(produto); // chamar o método update do serviço ProdutoService
  }
  @Delete('/:id') // definir o método HTTP DELETE para remover um produto pelo ID
  @HttpCode(HttpStatus.NO_CONTENT) // definir o código de status HTTP para No Content (204)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.produtoService.delete(id); // chamar o método delete do serviço ProdutoService
  }
}
