import { HttpException, HttpStatus, Injectable } from '@nestjs/common'; // importar o decorador Injectable para permitir a injeção de dependências
import { InjectRepository } from '@nestjs/typeorm'; // importar o decorador InjectRepository para injetar o repositório entidade Produto
import { DeleteResult, ILike, Repository } from 'typeorm'; // importar a classe Repository para realizar operações no banco de dados
import { Produto } from '../entities/produto.entity'; // importar a entidade Produto

@Injectable() // tornar o serviço injetável, permite que este serviço seja injetado em outros componentes
export class ProdutoService {
  constructor(
    @InjectRepository(Produto) // injetar o repositório da entidade Produto
    private readonly produtoRepository: Repository<Produto>, // repositório para realizar operações CRUD na entidade Produto
  ) {}

  async findAll(): Promise<Produto[]> {
    return this.produtoRepository.find(); // retorna todos os produtos do banco de dados
  }

  async findById(id: number): Promise<Produto> {
    const produto = await this.produtoRepository.findOne({
      where: { id }, // busca um produto pelo ID
    });

    if (!produto) {
      // verifica se o produto foi encontrado, se não encontrado, lança uma exceção HTTP com status 404 (Not Found)
      throw new HttpException(
        `Produto com ID ${id} não encontrado.`,
        HttpStatus.NOT_FOUND,
      ); // lança um erro
    }
    return produto; // retorna o produto encontrado
  }

  async findAllByNome(nome: string): Promise<Produto[]> {
    return await this.produtoRepository.find({
      where: {
        nome: ILike(`%${nome}%`),
      }, // busca produtos pelo nome
    });
  }
  async create(Produto: Produto): Promise<Produto> {
    return this.produtoRepository.save(Produto); // salva um novo produto no banco de dados
  }

  async update(produto: Produto): Promise<Produto> {
    await this.findById(produto.id); // verifica se o produto existe antes de atualizar

    if (!produto.id) {
      // se o ID do produto não for fornecido, lança uma exceção HTTP com status 400 (Bad Request)
      throw new HttpException(
        'ID do produto é obrigatório para atualização.',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.produtoRepository.save(produto); // atualiza o produto no banco de dados
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id); // verifica se o produto existe antes de deletar

    if (!id) {
      // se o produto não for encontrado, lança uma exceção HTTP com status 404 (Not Found)
      throw new HttpException(
        `Produto com ID ${id} não encontrado.`,
        HttpStatus.NOT_FOUND,
      );
    }

    return await this.produtoRepository.delete(id); // remove o produto do banco de dados e retorna o resultado
  }
}
