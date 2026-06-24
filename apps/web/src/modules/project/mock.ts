import type { ProjectDTO } from "@/modules/project/dto";

export const mock: ProjectDTO[] = [
	{
		id: "8f6c6f8d-2e1f-4d2a-bd2e-9d3e0b7d3f01",
		title: "Source Anything Birds",
		slug: "source-anything-birds",
		summary:
			"Plataforma para catalogação e busca de observações de aves com suporte a imagens, localização e filtros avançados.",
		impact:
			"Centraliza registros de campo e facilita a consulta de espécies por pesquisadores e observadores.",
		content: `# Source Anything Birds

Source Anything Birds é uma plataforma voltada para catalogação e consulta de registros de aves.

O sistema permite cadastrar observações, anexar imagens, registrar coordenadas geográficas e aplicar filtros para encontrar espécies específicas.

O projeto foi concebido para simplificar o gerenciamento de dados coletados em campo e oferecer uma experiência rápida de busca e visualização.

## Principais objetivos

- Organizar observações de aves
- Facilitar pesquisas por localização
- Centralizar imagens e registros históricos
- Melhorar a experiência de consulta dos usuários`,
		highlights: [
			{
				id: "h1",
				content:
					"Busca otimizada por espécie, localização e período de observação.",
				sortOrder: 1,
			},
			{
				id: "h2",
				content:
					"Upload de imagens integrado ao fluxo de cadastro de registros.",
				sortOrder: 2,
			},
		],
		category: "fullstack",
		status: "active",
		tech: ["React", "Fastify", "PostgreSQL"],
		repositoryUrl: "https://github.com/username/source-anything-birds",
		liveUrl: "https://birds.example.com",
		visible: true,
		createdAt: "2024-02-18T14:12:00Z",
		updatedAt: "2026-04-10T08:25:00Z",
	},
	{
		id: "fc1c4c31-4d6c-4d9a-a9e1-ff52d6f11a02",
		title: "Field Operations Hub",
		slug: "field-operations-hub",
		summary:
			"Sistema para gerenciamento de equipes de campo, atividades georreferenciadas e acompanhamento operacional.",
		impact:
			"Reduz o uso de planilhas e centraliza informações críticas em um único ambiente.",
		content: `# Field Operations Hub

Projeto criado para auxiliar equipes responsáveis por atividades externas.

A aplicação reúne informações operacionais, histórico de atividades e acompanhamento de tarefas executadas em campo.

O foco principal foi reduzir retrabalho e fornecer uma visão consolidada das operações.

## Funcionalidades

- Gestão de equipes
- Controle de tarefas
- Histórico operacional
- Consulta de registros geográficos`,
		highlights: [
			{
				id: "h3",
				content:
					"Centralização de dados operacionais anteriormente distribuídos em múltiplos sistemas.",
				sortOrder: 1,
			},
			{
				id: "h4",
				content: "Fluxo simplificado para criação e acompanhamento de tarefas.",
				sortOrder: 2,
			},
		],
		category: "fullstack",
		status: "active",
		tech: ["React", "Node.js", "SQLite"],
		repositoryUrl: "https://github.com/username/field-operations-hub",
		liveUrl: "https://operations.example.com",
		visible: true,
		createdAt: "2024-05-07T10:45:00Z",
		updatedAt: "2026-02-21T17:11:00Z",
	},
	{
		id: "5c6c3fd2-937a-4f14-b0df-17e70a421103",
		title: "Insight Dashboard",
		slug: "insight-dashboard",
		summary:
			"Painel analítico para visualização de métricas, indicadores e relatórios operacionais.",
		impact:
			"Facilita a tomada de decisão através da consolidação de dados em tempo real.",
		content: `# Insight Dashboard

Aplicação frontend focada na apresentação de indicadores de desempenho.

O projeto prioriza visualização de dados, navegação intuitiva e experiência de uso em dispositivos desktop.

Os dashboards podem ser configurados para diferentes contextos de negócio.

## Destaques

- Visualização de métricas
- Filtros avançados
- Relatórios consolidados`,
		highlights: [
			{
				id: "h5",
				content:
					"Interface otimizada para análise rápida de grandes volumes de dados.",
				sortOrder: 1,
			},
			{
				id: "h6",
				content: "Componentes reutilizáveis para construção de dashboards.",
				sortOrder: 2,
			},
		],
		category: "frontend",
		status: "active",
		tech: ["React", "TypeScript", "Tailwind"],
		repositoryUrl: "https://github.com/username/insight-dashboard",
		liveUrl: "https://dashboard.example.com",
		visible: true,
		createdAt: "2023-11-14T09:20:00Z",
		updatedAt: "2026-03-03T13:04:00Z",
	},
	{
		id: "9e7b0f8a-f0b7-4c79-a5d8-3d4ab8f51104",
		title: "Portfolio Builder",
		slug: "portfolio-builder",
		summary:
			"Ferramenta visual para criação e publicação de portfólios profissionais personalizados.",
		impact:
			"Permite gerar páginas profissionais sem necessidade de conhecimento técnico.",
		content: `# Portfolio Builder

Projeto frontend desenvolvido para simplificar a criação de portfólios.

Usuários podem configurar conteúdo, personalizar aparência e publicar páginas em poucos passos.

O foco está na facilidade de uso e velocidade de configuração.

## Recursos

- Editor visual
- Templates personalizáveis
- Publicação simplificada`,
		highlights: [
			{
				id: "h7",
				content:
					"Fluxo de configuração projetado para usuários sem experiência técnica.",
				sortOrder: 1,
			},
			{
				id: "h8",
				content:
					"Componentes configuráveis para diferentes estilos de apresentação.",
				sortOrder: 2,
			},
		],
		category: "frontend",
		status: "wip",
		tech: ["React", "Vite", "Tailwind"],
		repositoryUrl: "https://github.com/username/portfolio-builder",
		liveUrl: undefined,
		visible: true,
		createdAt: "2025-08-01T12:10:00Z",
		updatedAt: "2026-06-12T11:22:00Z",
	},
	{
		id: "6d88e67d-7e17-45d2-a4f0-f4d46b8a1105",
		title: "Audit Trail API",
		slug: "audit-trail-api",
		summary:
			"Serviço responsável pelo armazenamento e consulta de eventos de auditoria.",
		impact:
			"Melhora rastreabilidade e facilita investigações de alterações realizadas no sistema.",
		content: `# Audit Trail API

API desenvolvida para registrar eventos importantes gerados por aplicações corporativas.

O serviço recebe eventos estruturados e disponibiliza mecanismos de consulta para auditoria.

A solução foi projetada para suportar grande volume de registros.

## Objetivos

- Centralizar auditorias
- Facilitar consultas
- Melhorar rastreabilidade`,
		highlights: [
			{
				id: "h9",
				content:
					"Armazenamento centralizado de eventos provenientes de múltiplos sistemas.",
				sortOrder: 1,
			},
			{
				id: "h10",
				content:
					"Consultas otimizadas para análise de histórico de alterações.",
				sortOrder: 2,
			},
		],
		category: "backend",
		status: "active",
		tech: ["Fastify", "PostgreSQL", "Docker"],
		repositoryUrl: "https://github.com/username/audit-trail-api",
		liveUrl: undefined,
		visible: true,
		createdAt: "2024-07-09T15:33:00Z",
		updatedAt: "2026-05-17T09:12:00Z",
	},
	{
		id: "be1fd987-cd9d-44ef-8df2-7fbfb9a51106",
		title: "Notification Gateway",
		slug: "notification-gateway",
		summary:
			"Backend para envio centralizado de notificações por múltiplos canais.",
		impact:
			"Reduz duplicação de integrações e padroniza o processo de comunicação.",
		content: `# Notification Gateway

Serviço responsável por orquestrar o envio de notificações.

A aplicação abstrai integrações externas e oferece uma interface única para consumo pelos sistemas internos.

O objetivo principal é simplificar integrações e reduzir manutenção.

## Funcionalidades

- Filas de processamento
- Integrações externas
- Histórico de envios`,
		highlights: [
			{
				id: "h11",
				content: "Interface única para diferentes provedores de comunicação.",
				sortOrder: 1,
			},
			{
				id: "h12",
				content:
					"Arquitetura desacoplada para facilitar inclusão de novos canais.",
				sortOrder: 2,
			},
		],
		category: "backend",
		status: "archived",
		tech: ["Node.js", "Redis", "PostgreSQL"],
		repositoryUrl: "https://github.com/username/notification-gateway",
		liveUrl: undefined,
		visible: true,
		createdAt: "2023-04-12T18:15:00Z",
		updatedAt: "2025-01-30T14:10:00Z",
	},
	{
		id: "dbcf97d0-924f-48f6-86c7-8d9d2ab81107",
		title: "Schema Sync",
		slug: "schema-sync",
		summary:
			"Ferramenta de linha de comando para sincronização e validação de esquemas entre ambientes.",
		impact: "Reduz erros de configuração e acelera processos de implantação.",
		content: `# Schema Sync

CLI criada para auxiliar equipes na sincronização de estruturas entre diferentes ambientes.

O utilitário executa validações, identifica divergências e gera relatórios detalhados.

Seu foco é aumentar previsibilidade durante implantações.

## Recursos

- Comparação de esquemas
- Relatórios de divergência
- Execução automatizada`,
		highlights: [
			{
				id: "h13",
				content: "Identificação automática de diferenças entre ambientes.",
				sortOrder: 1,
			},
			{
				id: "h14",
				content:
					"Relatórios claros para revisão antes da execução das mudanças.",
				sortOrder: 2,
			},
		],
		category: "cli",
		status: "active",
		tech: ["TypeScript", "Node.js"],
		repositoryUrl: "https://github.com/username/schema-sync",
		liveUrl: undefined,
		visible: true,
		createdAt: "2024-10-22T08:10:00Z",
		updatedAt: "2026-05-28T16:55:00Z",
	},
	{
		id: "c2f8f5a8-5c55-4a0d-90af-1d4f2d8f1108",
		title: "Route Journal",
		slug: "route-journal",
		summary:
			"Aplicativo mobile para registro de rotas, atividades e observações realizadas em campo.",
		impact:
			"Permite registrar informações mesmo sem conexão e sincronizar posteriormente.",
		content: `# Route Journal

Aplicativo desenvolvido para apoiar operações realizadas em campo.

O sistema registra atividades, observações e informações relacionadas às rotas executadas pelos usuários.

A experiência foi projetada para funcionar em cenários com conectividade limitada.

## Funcionalidades

- Registro de atividades
- Histórico de rotas
- Sincronização posterior
- Operação offline`,
		highlights: [
			{
				id: "h15",
				content:
					"Experiência otimizada para uso em ambientes com baixa conectividade.",
				sortOrder: 1,
			},
			{
				id: "h16",
				content:
					"Fluxo simplificado para coleta rápida de informações em campo.",
				sortOrder: 2,
			},
		],
		category: "mobile",
		status: "active",
		tech: ["React Native", "SQLite", "TypeScript"],
		repositoryUrl: "https://github.com/username/route-journal",
		liveUrl: undefined,
		visible: true,
		createdAt: "2024-03-16T07:45:00Z",
		updatedAt: "2026-06-01T10:18:00Z",
	},
];
