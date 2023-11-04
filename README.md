This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

used code from udemy.com :)

```
  useEffect(() => {
    agent.Catalog.list()
      .then((products) => setProducts(products.products))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []); // Add [] dependency to prevent infinite loop. And call 'useEffect' method once!!!!!!
```

this works for search

```
  useEffect(() => {
    agent.Catalog.list()
      .then((products) => {
        const filteredProducts = products.products.filter((product: Product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        console.log(filteredProducts, "these are filteredProducts");
        setProducts(filteredProducts);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [searchTerm]); // Add [] dependency to prevent infinite loop. And call 'useEffect' method once!!!!!!
```

Debounce:
https://stackoverflow.com/questions/42217121/how-to-start-search-only-when-user-stops-typing
