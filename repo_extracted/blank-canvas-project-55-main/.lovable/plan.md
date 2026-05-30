# Portal IPAG — Plano de Implementação (Fase 1)

Site institucional do **Instituto de Desenvolvimento Social Pastor Antonio Gomes**, com estrutura e ritmo visual inspirados em *Gerando Falcões*, mas com identidade autoral baseada na logo IPAG (laranja solar + grafite + chama).

---

## 1. Identidade Visual (Design System)

**Paleta** (tokens em `src/styles.css`, oklch):
- `--primary` laranja IPAG `#EE7B1D`
- `--primary-glow` amarelo solar `#FFB347`
- `--accent` laranja profundo `#E5631C`
- `--foreground` grafite `#1F1F1F`
- `--muted` cinza quente `#F5F2EE`
- `--background` branco puro `#FFFFFF`
- Gradiente assinatura: `linear-gradient(135deg, #FFB347 → #EE7B1D → #E5631C)` (espelha a logo)

**Tipografia** (via @fontsource):
- Display: **Sora** (geométrica, peso 700/800) — ecoa o peso do "IPAG"
- Body: **Inter** (legibilidade institucional)

**Linguagem visual:**
- Grandes blocos brancos + seções com gradiente laranja sutil
- Cards com sombra suave e cantos `rounded-2xl`
- Números de impacto gigantes (estilo "+5.500 favelas")
- Chama da logo como elemento decorativo flutuante (SVG, opacidade baixa)
- Animações leves com Framer Motion (fade-up no scroll, counter animado nos números)

---

## 2. Assets a copiar para `src/assets/`
- `LOGO_PNG.png` → logo horizontal (header)
- `LOGO_PNG_2.png` → símbolo isolado (favicon, footer, OG)
- `LOGO_JPG.jpg` → versão vertical (rodapé alternativo)

---

## 3. Estrutura de Rotas (TanStack Start)

```
src/routes/
  __root.tsx          → header + footer compartilhados
  index.tsx           → Home (hero, projetos resumo, impacto, parceiros, CTA)
  quem-somos.tsx      → história, Pastor Toninho, missão/visão/valores
  projetos.tsx        → grid dos 6 projetos
  projetos.$slug.tsx  → página individual de cada projeto
  bazar.tsx           → Bazar Solidário IPAG
  eventos.tsx         → listagem de eventos
  blog.tsx            → listagem do blog
  blog.$slug.tsx      → post
  transparencia.tsx   → documentos institucionais
  parceiros.tsx       → seja parceiro + lista
  contato.tsx         → formulário + dados
  admin/              → estrutura preparada (sem login ainda)
    index.tsx         → dashboard mock (admin master adilielson@gmail.com)
```

Cada rota com `head()` próprio (title, description, og).

---

## 4. Seções da Home (espelhando Gerando Falcões)

1. **Header** sticky translúcido — logo + nav (Quem Somos, Projetos, Bazar, Eventos, Blog, Transparência, Contato) + botão CTA "Seja Parceiro"
2. **Hero** — headline "Transformando vidas através da educação, da cultura e do desenvolvimento social", subtexto, 2 CTAs ("Conheça nossos projetos" / "Seja um parceiro"), gradiente laranja + chama decorativa
3. **Faixa de realidades transformadas** — 3 cards de vídeo/depoimento (placeholders)
4. **"Onde existir necessidade, levaremos dignidade"** — bloco de impacto com 6 contadores animados (Anos de atuação, Famílias atendidas, Projetos ativos, Voluntários, Eventos, Alunos)
5. **Quem é o IPAG?** — bloco split (texto + foto) com link "Saiba mais"
6. **Nossos Projetos** — grid 6 cards (Tocando o Coração de Deus, CETEL, Assistência Social, Saúde Mental do Idoso, Técnicas Artesanais, Apoio à Recuperação)
7. **Bazar Solidário** — banner CTA com endereço
8. **Seja um parceiro** — bloco institucional + faixa de logos (placeholders)
9. **Blog / Últimas notícias** — 3 cards de posts mockados
10. **Newsletter** — captura de email
11. **Footer** — 4 colunas (Institucional, Como apoiar, Contato, Legal) + redes sociais + CNPJ

---

## 5. Estrutura Admin (preparada, sem login)

- Pasta `src/routes/admin/` com layout próprio (sidebar)
- Mock do usuário master em `src/lib/admin-mock.ts`:
  ```ts
  export const ADMIN_MASTER = {
    email: "adilielson@gmail.com",
    role: "admin_master",
    name: "Administrador Master"
  }
  ```
- Páginas placeholder: Dashboard, Projetos, Eventos, Blog, Parceiros, Transparência, Usuários
- Sem autenticação real nesta fase (preparada para integração futura)

---

## 6. Detalhes Técnicos

- **TanStack Start** com file-based routing
- **Framer Motion** para animações (fade-up, counter)
- **Lucide React** para ícones
- **shadcn/ui** (Button, Card, Input, Sheet para menu mobile) com variantes customizadas
- Componentes em `src/components/`:
  - `layout/Header.tsx`, `layout/Footer.tsx`
  - `home/Hero.tsx`, `home/ImpactStats.tsx`, `home/ProjectsGrid.tsx`, `home/PartnersBand.tsx`, etc.
  - `ui/Counter.tsx` (contador animado), `ui/FlameDecoration.tsx` (SVG da chama)
- Dados mockados em `src/data/` (projetos, eventos, posts, parceiros)
- Sem Lovable Cloud nesta fase (frontend puro com mocks)

---

## 7. Entrega da Fase 1

Site institucional completo navegável com todas as rotas acima, conteúdo da copy aplicado, estrutura admin preparada. Ao final responderei exatamente: *"Implementação concluída. Solicite o Prompt 02."*
