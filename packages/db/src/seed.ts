// biome-ignore-all lint: seed file
import { randomUUID } from "node:crypto";
import { createClient } from "@libsql/client";
import { hash } from "argon2";
import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/libsql";
import { company } from "./schemas/company";
import { experience } from "./schemas/experience";
import { experienceHighlight } from "./schemas/experience-highlight";
import { files } from "./schemas/files";
import { hero } from "./schemas/hero";
import { project } from "./schemas/project";
import { projectHighlight } from "./schemas/project-highlight";
import { projectSocialLink } from "./schemas/project-social-link";
import { projectTech } from "./schemas/project-tech";
import { refreshToken } from "./schemas/refresh-token";
import { skill } from "./schemas/skill";
import { user } from "./schemas/user";

const envFile =
	process.env.NODE_ENV === "production"
		? ".env.production"
		: ".env.development";
dotenv.config({ path: envFile });

const DATABASE_URL = process.env.DATABASE_URL;
const ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD;

if (!DATABASE_URL || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
	console.error(
		"Required: DATABASE_URL, SEED_ADMIN_EMAIL, SEED_ADMIN_PASSWORD",
	);
	process.exit(1);
}

const db = drizzle(createClient({ url: DATABASE_URL }));

async function clear() {
	await db.transaction(async (tx) => {
		await tx.delete(projectSocialLink);
		await tx.delete(projectHighlight);
		await tx.delete(projectTech);
		await tx.delete(project);
		await tx.delete(files);
		await tx.delete(experienceHighlight);
		await tx.delete(experience);
		await tx.delete(company);
		await tx.delete(skill);
		await tx.delete(hero);
		await tx.delete(refreshToken);
		await tx.delete(user);
	});
	console.log("✓ banco limpo");
}

async function seed(email: string, password: string) {
	const now = new Date().toISOString();
	const passwordHash = await hash(password);

	const heroId = randomUUID();
	const atomoId = randomUUID();
	const logtrackId = randomUUID();
	const datafieldId = randomUUID();
	const exp1Id = randomUUID();
	const exp2Id = randomUUID();
	const exp3Id = randomUUID();
	const proj1Id = randomUUID();
	const proj2Id = randomUUID();

	await db.transaction(async (tx) => {
		await tx
			.insert(user)
			.values({
				id: randomUUID(),
				email,
				passwordHash,
				createdAt: now,
				updatedAt: now,
			})
			.onConflictDoNothing();
		console.log("✓ user");

		await tx.insert(hero).values({
			id: heroId,
			name: "Vitor Hugo Oliveira",
			title: "Software Engineer",
			bio: "Full-stack developer focused on building software that solves real-world problems. Experienced in designing APIs, internal platforms, geospatial tools, and business applications that streamline workflows and improve operational efficiency.",
			resumeUrl: null,
			githubUrl: "https://github.com/hugomos",
			linkedinUrl: "https://linkedin.com/in/hugomos",
			updatedAt: now,
		});
		console.log("✓ hero");

		await tx.insert(skill).values([
			{ id: randomUUID(), heroId, name: "TypeScript", sortOrder: 1 },
			{ id: randomUUID(), heroId, name: "Node.js", sortOrder: 2 },
			{ id: randomUUID(), heroId, name: "React", sortOrder: 3 },
			{ id: randomUUID(), heroId, name: "PostgreSQL", sortOrder: 4 },
			{ id: randomUUID(), heroId, name: "Docker", sortOrder: 5 },
		]);
		console.log("✓ skills");

		await tx.insert(company).values([
			{ id: atomoId, name: "Átomo Tecnologia", website: null },
			{ id: logtrackId, name: "Logtrack", website: null },
			{ id: datafieldId, name: "DataField Soluções", website: null },
		]);
		console.log("✓ companies");

		await tx.insert(experience).values([
			{
				id: exp1Id,
				companyId: atomoId,
				role: "Software Engineer",
				workMode: "hybrid",
				startDate: "2023-03",
				endDate: null,
				visible: true,
				createdAt: now,
				updatedAt: now,
			},
			{
				id: exp2Id,
				companyId: logtrackId,
				role: "Full-stack Developer",
				workMode: "remote",
				startDate: "2021-06",
				endDate: "2023-02",
				visible: true,
				createdAt: now,
				updatedAt: now,
			},
			{
				id: exp3Id,
				companyId: datafieldId,
				role: "Junior Developer",
				workMode: "onsite",
				startDate: "2019-08",
				endDate: "2021-05",
				visible: true,
				createdAt: now,
				updatedAt: now,
			},
		]);
		console.log("✓ experiences");

		await tx.insert(experienceHighlight).values([
			{
				id: randomUUID(),
				experienceId: exp1Id,
				content:
					"Projetei e implementei uma API RESTful para automação de processos internos, reduzindo em 40% o tempo gasto em tarefas manuais pelos times operacionais.",
				sortOrder: 1,
			},
			{
				id: randomUUID(),
				experienceId: exp1Id,
				content:
					"Desenvolvi um módulo de rastreamento geoespacial integrado ao Google Maps Platform para monitoramento de equipes em campo.",
				sortOrder: 2,
			},
			{
				id: randomUUID(),
				experienceId: exp1Id,
				content:
					"Liderei a migração de um monolito legado para uma arquitetura de serviços, com zero downtime e sem impacto para os clientes.",
				sortOrder: 3,
			},
			{
				id: randomUUID(),
				experienceId: exp2Id,
				content:
					"Construí pipelines de ingestão de dados de telemetria de veículos processando mais de 500 mil eventos por dia.",
				sortOrder: 1,
			},
			{
				id: randomUUID(),
				experienceId: exp2Id,
				content:
					"Implementei dashboards de monitoramento em tempo real com WebSocket, reduzindo o tempo de resposta a incidentes de 20 para 4 minutos.",
				sortOrder: 2,
			},
			{
				id: randomUUID(),
				experienceId: exp2Id,
				content:
					"Integrei a plataforma com três transportadoras via webhooks, automatizando a atualização de status de entregas.",
				sortOrder: 3,
			},
			{
				id: randomUUID(),
				experienceId: exp3Id,
				content:
					"Desenvolvi relatórios parametrizados com exportação em PDF e Excel, adotados por 12 clientes corporativos.",
				sortOrder: 1,
			},
			{
				id: randomUUID(),
				experienceId: exp3Id,
				content:
					"Automatizei a importação de dados de planilhas legadas, eliminando 3 horas de trabalho manual diário no time de operações.",
				sortOrder: 2,
			},
		]);
		console.log("✓ experience highlights");

		const roteiroContent = `## Origem

O projeto nasceu de uma conversa com um gestor de campo que passava as manhãs distribuindo ordens de serviço por WhatsApp e recolhendo fotos de comprovante no final do dia. Ele tinha uma equipe de 34 técnicos espalhados por três cidades, e o único controle era uma planilha compartilhada que ninguém conseguia abrir ao mesmo tempo. A pergunta era simples: dá para fazer melhor do que isso?

## O problema de roteamento

A parte mais complexa foi o engine de otimização. Rotas de serviço têm restrições que os algoritmos clássicos de Traveling Salesman não cobrem bem: janelas de horário do cliente, tempo estimado de atendimento por ordem, capacidade de carga do veículo e prioridade de SLA. A solução adotada foi um algoritmo híbrido — uma heurística construtiva de inserção mais barata seguida de busca local 2-opt — que roda no servidor em menos de dois segundos para conjuntos de até 200 ordens. Para operações maiores, o cálculo vai para uma fila assíncrona e o resultado é enviado por WebSocket quando fica pronto.

## Arquitetura e decisões técnicas

O backend é uma API Fastify com PostgreSQL e a extensão PostGIS para operações geoespaciais. A escolha do PostGIS foi determinante: queries como "encontre todos os pontos de serviço em um raio de 5km de uma coordenada" ficam em uma única linha de SQL, sem precisar trazer dados para a aplicação e filtrar em memória. O frontend em Next.js usa o Mapbox GL JS para renderizar as rotas, e cada segmento tem cor e espessura proporcional ao tempo estimado de deslocamento. No mobile, os técnicos acessam via PWA, que funciona offline e sincroniza quando a conexão é restaurada.

## Aprendizados

A maior lição foi sobre feedback de usuário em campo. Na primeira versão, o mapa tinha controles sofisticados de zoom e filtro que faziam sentido no desktop. Na prática, o técnico abre o app dentro do carro com uma mão no volante — tudo que exige mais de um toque foi removido ou repensado. A segunda lição foi sobre dados sujos: endereços digitados por humanos raramente batem com coordenadas precisas. Foi preciso construir uma camada de normalização de endereços com fallback para geocodificação manual antes que o roteamento ficasse confiável o suficiente para uso em produção.`;

		const formaContent = `## Contexto

Empresas de infraestrutura e manutenção vivem de laudos técnicos. Cada inspeção gera um documento com fotos, medições, assinaturas e não conformidades identificadas. Por anos, o processo padrão do setor foi: inspetor anota no papel, volta ao escritório, digita tudo no computador, imprime, assina, digitaliza e arquiva. Forma nasceu para cortar esse ciclo ao meio.

## Formulários dinâmicos

O diferencial técnico central foi o builder de formulários. Em vez de criar um sistema com tipos de inspeção fixos no código, a plataforma permite que administradores definam campos, seções e regras de validação através de uma interface visual. Internamente, cada formulário é armazenado como um schema JSON, e o frontend interpreta esse schema para renderizar o formulário correto em tempo de execução. Isso permitiu que o cliente onboardasse novos tipos de inspeção em minutos, sem abrir um ticket de desenvolvimento.

## Conformidade e rastreabilidade

Laudos técnicos têm valor jurídico. Qualquer alteração posterior ao envio precisa ser auditável. O modelo de dados foi desenhado para que nenhuma linha seja sobrescrita — cada edição cria uma nova versão do laudo com timestamp e ID do usuário responsável. A assinatura digital captura a geolocalização do dispositivo no momento do envio, atendendo às exigências de normas do setor elétrico que o cliente principal precisava cumprir. O PDF gerado emite um hash do conteúdo que pode ser verificado de forma independente.

## Por que está arquivado

O projeto foi desenvolvido como produto sob medida para um cliente específico. Após a entrega e período de estabilização, a decisão foi não generalizar para outros segmentos — a complexidade de adaptar o engine de formulários para outras verticais era alta e o cliente preferiu um contrato de manutenção exclusiva. O código permanece como referência de arquitetura, especialmente o padrão de versionamento imutável de documentos e o builder de formulários dinâmicos baseado em JSON Schema.`;

		await tx.insert(project).values([
			{
				id: proj1Id,
				title: "Roteiro",
				slug: "roteiro",
				summary:
					"Plataforma web para otimização de rotas de equipes em campo. Permite criar, distribuir e monitorar ordens de serviço com visualização geoespacial em tempo real.",
				impact:
					"Reduziu o tempo de planejamento diário de rotas de 2 horas para 15 minutos em operações com 30+ técnicos.",
				content: roteiroContent,
				category: "fullstack",
				status: "active",
				repositoryUrl: "https://github.com/hugomos/roteiro",
				liveUrl: "https://roteiro.app",
				coverImageUrl: null,
				coverImageFileId: null,
				visible: true,
				createdAt: now,
				updatedAt: now,
			},
			{
				id: proj2Id,
				title: "Forma",
				slug: "forma",
				summary:
					"Sistema de inspeções e laudos técnicos para equipes de campo. Substituiu processos baseados em planilhas e formulários físicos por um fluxo digital auditável.",
				impact:
					"Adotado por uma empresa de infraestrutura com 80 inspetores, eliminando o retrabalho de digitação de 200 laudos por semana.",
				content: formaContent,
				category: "fullstack",
				status: "archived",
				repositoryUrl: "https://github.com/hugomos/forma",
				liveUrl: null,
				coverImageUrl: null,
				coverImageFileId: null,
				visible: true,
				createdAt: now,
				updatedAt: now,
			},
		]);
		console.log("✓ projects");

		await tx.insert(projectTech).values([
			{ id: randomUUID(), projectId: proj1Id, name: "Next.js", sortOrder: 1 },
			{ id: randomUUID(), projectId: proj1Id, name: "Fastify", sortOrder: 2 },
			{
				id: randomUUID(),
				projectId: proj1Id,
				name: "PostgreSQL",
				sortOrder: 3,
			},
			{ id: randomUUID(), projectId: proj1Id, name: "PostGIS", sortOrder: 4 },
			{ id: randomUUID(), projectId: proj1Id, name: "Mapbox", sortOrder: 5 },
			{ id: randomUUID(), projectId: proj1Id, name: "Docker", sortOrder: 6 },
			{ id: randomUUID(), projectId: proj2Id, name: "React", sortOrder: 1 },
			{ id: randomUUID(), projectId: proj2Id, name: "Node.js", sortOrder: 2 },
			{ id: randomUUID(), projectId: proj2Id, name: "Prisma", sortOrder: 3 },
			{
				id: randomUUID(),
				projectId: proj2Id,
				name: "PostgreSQL",
				sortOrder: 4,
			},
			{ id: randomUUID(), projectId: proj2Id, name: "AWS S3", sortOrder: 5 },
		]);
		console.log("✓ project techs");

		await tx.insert(projectHighlight).values([
			{
				id: randomUUID(),
				projectId: proj1Id,
				content:
					"Algoritmo de otimização de rotas reduz em média 23% a quilometragem percorrida por equipe.",
				sortOrder: 1,
			},
			{
				id: randomUUID(),
				projectId: proj1Id,
				content:
					"Integração com WhatsApp Business API para notificações automáticas de agendamento aos clientes finais.",
				sortOrder: 2,
			},
			{
				id: randomUUID(),
				projectId: proj1Id,
				content:
					"Painel administrativo com atribuição drag-and-drop de ordens de serviço por técnico.",
				sortOrder: 3,
			},
			{
				id: randomUUID(),
				projectId: proj2Id,
				content:
					"Formulários dinâmicos configuráveis sem código, permitindo que gerentes criem novos tipos de inspeção em minutos.",
				sortOrder: 1,
			},
			{
				id: randomUUID(),
				projectId: proj2Id,
				content:
					"Assinatura digital com registro de geolocalização e timestamp para conformidade com normas de auditoria.",
				sortOrder: 2,
			},
			{
				id: randomUUID(),
				projectId: proj2Id,
				content:
					"Exportação de laudos em PDF com template personalizado por cliente.",
				sortOrder: 3,
			},
		]);
		console.log("✓ project highlights");

		await tx.insert(projectSocialLink).values([
			{
				id: randomUUID(),
				projectId: proj1Id,
				platform: "github",
				username: "hugomos/roteiro",
				sortOrder: 1,
			},
			{
				id: randomUUID(),
				projectId: proj1Id,
				platform: "x",
				username: "roteiroapp",
				sortOrder: 2,
			},
		]);
		console.log("✓ project social links");
	});
}

const shouldClear = process.argv.includes("--clear");

(shouldClear ? clear() : Promise.resolve())
	.then(() => seed(ADMIN_EMAIL, ADMIN_PASSWORD))
	.then(() => {
		console.log("\nSeed concluído.");
		process.exit(0);
	})
	.catch((err) => {
		console.error("Erro ao executar seed:", err);
		process.exit(1);
	});
