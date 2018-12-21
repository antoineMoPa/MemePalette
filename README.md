# memepalette

A quick meme palette. Organize your memes.

# docker

    docker pull node
    docker run -v $(pwd):/memepalette -p 8080:8080 -it node /bin/bash

Then, in container:

    cd memepalette
    npm install
    npm run dev

# build for production with minification

    npm run build

# build for production and view the bundle analyzer report

    npm run build --report

# Push to gh-pages

    git subtree push --prefix dist origin gh-pages