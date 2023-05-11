# vercel-block-folder-deploy

If you ever deployed on vercel i'm sure you've come across the situation where you need to block the deploy if every file is inside a specified folder (for example if you have the repository for the docs of your webapp inside the docs folder in the same repo).

To do so you can use the [ignored build step](https://vercel.com/docs/concepts/projects/overview#ignored-build-step) configuration inside your project settings. This is a simple script that vercel run before deploying your project. If the exit code is 0 it will abort the deploy, if it's 1 it will continue.

You can get really fancy with it but most of time you don't need to. And if you don't need to get fancy, today you can just do

```
npx vercel-block-folder-deploy@latest docs
```

and this will block the deploy if every change is inside the docs folder.

And if you are also deploying the docs website on vercel and you want to avoid deploying it if there are no changes to the docs folder you can do

```
npx vercel-block-folder-deploy@latest --not docs
```

in the docs project so that if every changed file is outside the docs folder it will abort the deploy.

As simple as that!

P.s. you can also specify multiple directories

```
npx vercel-block-folder-deploy@latest docs playground
```

this will block the deploy if every change is inside `docs` or `playground`.

If you need to test this locally you can also run with the `--debug` flag that will show `continue` or `abort` in the console.

