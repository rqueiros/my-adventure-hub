# Conteúdo

**Um ficheiro markdown por faceta.** Para adicionar um item novo basta editar um único ficheiro — sem criar ficheiros nem reorganizar pastas.

## Estrutura

```
content/
  profile.md      # singleton — frontmatter com nome, bio, socials, avatar
  now.md          # singleton — estado actual ("a treinar para...", etc.)
  books.md        # items: [...]
  events.md       # items: [...]
  projects.md     # items: [...]
  travels.md      # items: [...]
  running.md      # items: [...]
  opinion.md      # items: [...] (cada item tem campo `body: |` em markdown)
  others.md       # items: [...]
  upcoming.md     # items: [...]
```

## Adicionar um item

Abre o ficheiro da faceta (ex.: `content/events.md`) e acrescenta um bloco ao array `items:`:

```yaml
  - id: e10
    kind: talk
    title: Novo título
    subtitle: Local
    date: "2026-09-30"
    meta: 45 min
    image: /images/events/foto.jpg
    url: https://exemplo.com
```

**Imagens:** põe os ficheiros em `public/images/<faceta>/` e referencia como `/images/<faceta>/<ficheiro>`. URLs externas (http/https) também funcionam.

## Campos por faceta

### `profile.md`
`name`, `title`, `bio`, `orcid`, `website`, `avatar`, `socials` (objecto YAML).

### `now.md`
`updated`, `items` (lista de strings).

### `books.md`
`id`, `title`, `date`, `publisher`, `subtitle`, `meta`, `image`, `url`.

### `events.md`
`id`, `title`, `date`, `kind` (`talk|seminar|workshop|conference|podcast|arguencia|hackathon`), `subtitle`, `meta`, `image`, `url`.

### `projects.md`
`id`, `title`, `date`, `subtitle`, `meta`, `image`, `url`.

### `travels.md`
`id`, `title`, `date`, `country`, `continent` (`Europe|Asia|Africa|North America|South America|Oceania`), `lat`, `lng`, `meta`, `image`, `url`.

### `running.md`
`id`, `title` (= nome da corrida), `date`, `distance` (`10K|21K|42K`), `year`, `time`, `image`, `url`.

### `opinion.md`
`id`, `title`, `date`, `magazine`, `subtitle`, `image`, `url`, **`body: |`** (texto markdown indentado).

### `others.md`
`id`, `title`, `date`, `kind` (`supervision|committee|editorial|service`), `role`, `subtitle`, `image`, `url`.

### `upcoming.md`
`id`, `title`, `date` (futuro), `facet` (uma das chaves acima), `meta`, `image`, `url`.

## Notas

- O `date` é sempre ISO `YYYY-MM-DD`.
- O `id` tem de ser único dentro da faceta (é usado nos links das opiniões).
- A contagem de artigos vem em tempo real do ORCID; não há ficheiro markdown para artigos.
- Depois de editar, faz build e deploy — o site é 100% estático.
