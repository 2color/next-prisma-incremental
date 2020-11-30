# Jamstack with Prisma and Next.js - Incremental Static-Regeneration

This is an example blog app showing how to work with Prisma in Next.js.

The blog compares the two rendering approaches that Next.js supports – **static generation with incremental static re-generation** and **server-side rendering** for post pages.

## Installation

Clone the repo and install the dependencies:

```bash
# with npm
npm i
```
## Start the database

```bash
docker-compose up -d
```

## Set DATABASE_URL

Create `prisma/.env`

```bash
touch prisma/.env
```

And add the following to the file

```
DATABASE_URL="postgresql://test-user:test-password@localhost:5432/my-blog?schema=public"
```

## Create the database

```bash
npx prisma db push --preview-feature
```

## Run the App

```bash
# with npm
npm run dev
```

## License

MIT
