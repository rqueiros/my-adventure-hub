# Conteúdo

Cada pasta = uma faceta. Um ficheiro `.md` por item, com frontmatter YAML.

## Adicionar um item

1. Cria um novo `.md` em `content/<faceta>/` (slug do ficheiro = id do item).
2. Põe a imagem em `public/images/<faceta>/` e referencia como `/images/<faceta>/<ficheiro>`.
3. Faz build e deploy.

## Campos por faceta

### `profile.md` (singleton)
`name`, `title`, `bio`, `orcid`, `website`, `avatar`, `socials` (objeto YAML).

### `books/*.md`
`title`, `date` (ISO `YYYY-MM-DD`), `publisher`, `subtitle`, `meta`, `image`, `url`.

### `events/*.md`
`title`, `date`, `kind` (`talk|seminar|workshop|conference|podcast|arguencia|hackathon`), `subtitle`, `meta`, `image`, `url`.

### `projects/*.md`
`title`, `date`, `subtitle`, `meta`, `image`, `url`.

### `travels/*.md`
`title`, `date`, `country`, `continent` (`Europe|Asia|Africa|North America|South America|Oceania`), `lat`, `lng`, `meta`, `image`, `url`.

### `running/*.md`
`title` (= raceName), `date`, `distance` (`10K|21K|42K`), `year`, `time`, `image`, `url`.

### `opinion/*.md`
`title`, `date`, `magazine`, `subtitle`, `image`, `url`. **Corpo markdown obrigatório** (parágrafos separados por linha em branco).

### `others/*.md`
`title`, `date`, `kind` (`supervision|committee|editorial|service`), `role`, `subtitle`, `image`, `url`.

### `upcoming/*.md`
`title`, `date` (futuro), `facet` (uma das chaves acima), `subtitle`, `meta`, `image`, `url`.

## Notas

- O `date` é sempre ISO `YYYY-MM-DD`.
- Imagens externas (http/https) também funcionam.
- A contagem de artigos vem em tempo real do ORCID; não há ficheiros markdown para artigos.
