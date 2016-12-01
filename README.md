[![Build Status](https://travis-ci.org/jaebradley/fooda.svg?branch=master)](https://travis-ci.org/jaebradley/fooda)
[![Coverage Status](https://coveralls.io/repos/github/jaebradley/fooda/badge.svg)](https://coveralls.io/github/jaebradley/fooda)

# Fooda Command Line Interface (CLI)

### Where my food(a) at?

![alt-media](https://i.imgur.com/FFkVOSc.png)

#### Installation
* Install the Fooda CLI using Node Package Manager (NPM) by typing `npm install fooda -g` into your terminal.

#### Commands
* To see what's cooking at a specific location, type `fooda menu {location}`.
* For example, `fooda menu davenport` returns the menu for [the Davenport building](https://goo.gl/maps/3aeyPyh4RD42), today.
* Currently, the only supported location options are `davenport` and `hubspot` (I know, I know). I get to why a bit later.

### Moar Background Information

#### Why is this service so limited?
* Full disclosure: when creating this CLI, I worked at HubSpot, so from a completely selfish perspective, I cared about what the Fooda options were near me.
* Fooda doesn't have an API, so I am generating menu information by scraping their website.
* Given the lack of an API, and that Fooda's url structuring is not completely obvious, programmatically supporting multiple locations is a bit challenging.

#### Why did you create this really limited service?
* Fooda wasn't doing a very good job of emailing me what options were available for a given day, and I hate leaving the command line, if I don't have to (because I'm lazy #millenialproblems).
