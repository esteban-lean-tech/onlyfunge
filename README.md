# OnlyFunge

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

`yarn build && arweave deploy build/index.html --key-file <path to your keyfile>`

## Run Smart Contract

`smartweave create ./contracts/immortagram.js ./contracts/initialState.json --key-file <path to your keyfile>`

> Run `arweave status <txn Id>` to view status
