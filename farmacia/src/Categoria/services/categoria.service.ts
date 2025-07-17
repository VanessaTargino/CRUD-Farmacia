import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { Categoria } from '../entities/categoria.entity';

@Injectable() // tornar o serviço injetável, permite que este serviço seja injetado em outros componentes
export class CategoriaService {
  // serviço para gerenciar categorias

  constructor(
    @InjectRepository(Categoria) // injetar o repositório da entidade Categoria
    private categoriaRepository: Repository<Categoria>, // repositório para realizar operações CRUD na entidade Categoria
  ) {}

  async findAll(): Promise<Categoria[]> {
    // retorna todas as categorias do banco de dados
    // busca todas as categorias, incluindo os produtos relacionados
    return await this.categoriaRepository.find({
      // busca todas as categorias
      relations: {
        produto: true,
      },
    });
  }

  async findById(id: number): Promise<Categoria> {
    const categoria = await this.categoriaRepository.findOne({
      // busca uma categoria pelo ID
      where: {
        id,
      },
      relations: {
        // carrega os produtos relacionados à categoria
        produto: true,
      },
    });

    if (!categoria) {
      // verifica se a categoria foi encontrada, se não encontrada, lança uma exceção HTTP com
      throw new HttpException(
        'Categoria não encontrada!',
        HttpStatus.NOT_FOUND, // status 404 (Not Found)
      );
    }

    return categoria; // retorna a categoria encontrada
  }

  async findAllByNome(nome: string): Promise<Categoria[]> {
    // busca categorias pelo nome, utilizando ILike para permitir busca parcial
    return await this.categoriaRepository.find({
      where: {
        nome: ILike(`%${nome}%`),
      },
      relations: {
        produto: true, // carrega os produtos relacionados à categoria
      },
    });
  }
  async findAllByDescricao(descricao: string): Promise<Categoria[]> {
    // busca categorias pelo nome
    // busca categorias pelo nome, utilizando ILike para permitir busca parcial
    return await this.categoriaRepository.find({
      where: {
        descricao: ILike(`%${descricao}%`),
      },
      relations: {
        produto: true, // carrega os produtos relacionados à categoria
      },
    });
  }

  async create(Categoria: Categoria): Promise<Categoria> {
    // cria uma nova categoria
    // verifica se o nome da categoria já existe
    return await this.categoriaRepository.save(Categoria);
  }

  async update(categoria: Categoria): Promise<Categoria> {
    await this.findById(categoria.id); // verifica se a categoria existe antes de atualizar

    if (!categoria.id) {
      // se o ID da categoria não for fornecido, lança uma exceção HTTP com status 400 (Bad Request)
      throw new HttpException(
        'ID da categoria é obrigatório para atualização.',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.categoriaRepository.save(categoria); // atualiza a categoria no banco de dados
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);
    // verifica se a categoria existe antes de deletar
    if (!id) {
      // se o ID da categoria não for fornecido, lança uma exceção HTTP com status 404 (Not Found)
      throw new HttpException(
        `Categoria com ID ${id} não encontrada.`,
        HttpStatus.NOT_FOUND,
      );
    }

    return await this.categoriaRepository.delete(id); // remove a categoria do banco de dados
  }
}
