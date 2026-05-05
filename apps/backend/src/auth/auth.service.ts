import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { prisma } from '../lib/db';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async register(data: any) {
    const { nome, email, senha } = data;

    const usuarioExists = await prisma.usuario.findUnique({
      where: { email },
    });

    if (usuarioExists) {
      throw new ConflictException('Usuário já existe');
    }

    const hashedSenha = await bcrypt.hash(senha, 10);

    const usuario = await prisma.usuario.create({
      data: {
        nome,
        email,
        senha: hashedSenha,
        role: 'usuario',
      },
    });

    const { senha: _, ...result } = usuario;
    return result;
  }

  async login(data: any) {
    const { email, senha } = data;

    const usuario = await prisma.usuario.findUnique({
      where: { email },
    });

    if (!usuario) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const isSenhaValid = await bcrypt.compare(senha, usuario.senha);

    if (!isSenhaValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload = {
      sub: usuario.id,
      email: usuario.email,
      role: usuario.role,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        role: usuario.role,
      },
    };
  }
}
