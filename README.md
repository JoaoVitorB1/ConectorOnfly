# ConectorOnfly
Este projeto é um nó customizado para o n8n, criado para o processo seletivo Recruta Onfly para gerar números aleatórios.  

---

## Instalação
Clone o repositório e entre na pasta do projeto:
```bash
    git clone https://github.com/JoaoVitorB1/ConectorOnfly.git
    cd ConectorOnfly/custom/n8n-nodes-random
```

Para instalar as dependências rode:
```bash
    npm install
```

---

## Compilação
Para compilar o código TypeScript rode:
```bash
    npm run build
```

---

## Executando o Docker
O projeto já possui um **docket-compose.yml** que ja está configurado para subir o **n8n** e o **PostgreSQL**

Para subir os containers:
```bash
    cd ../../        # volta para a pasta ConectorOnfly
    docker compose up -d
```

Para verificar se os serviços estão rodando:
```bash
    docker compose ps
```

Para obter os logs do n8n rode:
```bash
    docker compose logs -f n8n
```

Para obter os logs banco rode:
```bash
    docker compose logs -f postgres
```

Após isso, o editor do n8n estará disponível em:
http://localhost:5678

---
## Estrutura do Projeto
```bash
ConectorOnfly/
 └─ custom/
    └─ n8n-nodes-random/
        ├─ dist/                # Arquivos compilados (gerados pelo build)
        ├─ node_modules/        # Dependências instaladas
        ├─ src/
        │   └─ nodes/
        │       ├─ Random.node.ts   # Implementação principal do nó
        │       └─ random.svg       # Ícone customizado do nó
        │   └─ index.ts
        ├─ package.json
        └─ tsconfig.json
 ├─ .env
 ├─ docker-compose.yml
 └─ README.md
```

---

## Executando o Docker
As variáveis de ambientes estão definidas no arquivo .env
```bash
    POSTGRES_USER=postgres
    POSTGRES_PASSWORD=postgres
    POSTGRES_DB=n8n
    TZ=America/Sao_Paulo
```

---

## Executando os testes
1-É necessário validar a compilação do TypeScript:
```bash
    npm run build
```

2-Para rodar o nó Random dentro do n8n via interface
markdown
- Adicione o nó Random;
- Configure os valores mínimos e máximos;
- Clique em Test Step para validar a resposta;
    
---

## Informações Adicionais
Para apagar o banco e configurações
```bash
    docker compose down -v
    docker compose up -d
```
