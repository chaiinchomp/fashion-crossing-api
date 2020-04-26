# fashion-crossing-api

This is a backend API for Animal Crossing New Horizons fashion-related endpoints.

It was built as a standalone fork off the excellent Old School Runescape [scape.fashion](https://scape.fashion) website ([github](https://github.com/ncpierson/fashionscape-api)).

# Development

If you just want to run the api without setting everything up, you can pull the **docker image**:

```bash
docker pull chaiinchomp/fashion-crossing-api
```

Otherwise, for development, clone the repo and read on...

## Initial Setup

You will need [yarn](https://yarnpkg.com/getting-started/install) and [docker](https://www.docker.com/get-started) installed before getting started.

Once that's done, install packages and start up the container:

```bash
cd /wherever/you/cloned/this/repo
yarn install
yarn start
```

To verify that the container is running, you can check with `docker ps`, or just open up your browser to [http://localhost:8000](http://localhost:8000).

## Running locally

To start the application locally with Docker, run:

```bash
yarn start
```

This will mount the `./src/` and `./data/` directories to the container, so that any changes you make will be reflected
on the server without restarting it.

To stop the docker container:

```bash
yarn stop
```

## Troubleshooting

If you are getting a "connection reset" error when trying to hit the endpoints in your browser, something went wrong during docker startup. You can view logs with:

```bash
docker logs fashion-crossing-api
```

# Importing data

In the `./data` directory you'll find scripts for importing item data and scraping color palettes from them. These scripts use the parsed json outputs from [NooksBazaar/google-sheets-to-json](https://github.com/NooksBazaar/google-sheets-to-json) as a base data set and then add extracted color data to each variant.

To update the data with the latest items, you can either run `./tools/import.js` directly and pass in your own CLI arguments, or just run `items.sh` which will set some sane defaults for you.

# Deployment

Before running anything, you'll need your own account on [docker hub](https://hub.docker.com). Create a new repository named `fashion-crossing-api`. Then, in `./scripts/deploy.sh` and `./scripts/build.sh`, replace `chaiinchomp` with your docker ID.

To deploy a new image to Docker Hub:

```bash
yarn version --patch # --minor, --major also supported
yarn deploy
```

This will create and push a new version commit in git, and push to the docker hub image.

# Documentation

All routes begin with the base url: `https://api.scape.fashion`.

## GET /colors/:color

This route takes a parameter `color` which can be any 6-digit hex code. Note that this parameter must be URI encoded. For example, looking up matching items for #C4C3C4 would be `/colors/%23C4C3C4`. [Try it out](https://api.scape.fashion/colors/%23C3C4C3)

## GET /items/:item

This route takes a parameter `item` which can be the name of any item known by the API. You can find a list of these items at `/items/`. Note that this parameter must be URI encoded. For example, looking up items matching "Gnome scarf" would be `/items/Gnome%20scarf`. [Try it out](https://api.scape.fashion/items/Gnome%20scarf)

## GET /items

Returns a list of all items (names only)

## GET /items/search/

Accepts three optional query params to search for items by different criteria:
* By name: `/items/search/?name=NAME`
* By variant: `/items/search/?variant=VARIANT`
* By slot: `/items/search/?slot=SLOT`
 * Valid slot values: Tops, Bottoms, DressUp, Headwear, Accessories, Socks, Shoes, Bags, Umbrellas

Query params can be combined (eg. `/items/search/?slot=Tops&variant=Red`) or left off entirely (in which case all items will be returned).

## GET /items/match/?name=NAME&variant=VARIANT

Searches for an item that matches the query criteria, then returns a list of items with the closest match to the item's color palette. If more than one item is returned matching the search criteria, the first result will be used.

Also accepts an additional optional query param to filter the results by slot: `/items/match/?name=NAME&variant=VARIANT&slot=SLOT`
