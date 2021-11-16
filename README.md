# Shogun Frontend local development

Shogun Frontend repo for sections and components local development. Componets are developed in isolation via Storybook and synced to Shogun Frontend with CLI tool.

What is possible to develop locally:

- React sections/components (`js` files)
- Section component styles (`css` files)

What currently isn't supported:

- Section variables/data
- CMS
- Pages
- Site settings

# Configuration

- Create `.env` file and copy content of `.env.example` in that file.
- Update `HUB_CORE_JWT` variable. To get `HUB_CORE_JWT` value go to Shogun Frontend site https://frontend.getshogun.com/ and in network panel find any graphql `POST` request and look for `authorization` header. Copy/paste value after word 'Bearer'.

# Usage

```
yarn install
yarn start
```

# Conventions and tips

- Components are defined in `src/components/` directory
- Sections are defined in `src/sections/` directory. _Everything_ that's mentioned bellow about the components also applies to sections.

- Each component consists of three files:
  - `index.js` - component code that has a default export of component
  - `styles.css` - component styles
    - We recommend following some css naming convention. We used [SuitCSS naming convention](https://github.com/suitcss/suit/blob/master/doc/naming-conventions.md#components) in our previous project
    - We recommend only using component css, and keeping `src/global.css` as minimal as possible.
    - We do not recommend using css classes across components. Think of component css as local css that is not accessible outside of the component.
  - `ComponentName.stories.js` containing the stories demonstrating component API (optional)
- There's an alias defined for composing components that you can use as [shown in this example](./src/sections/Banner/index.js). Relative imports won't work in the app.

### Can 3rd party dependencies be used?

Yes. You an `yarn add` them here. To add them in Shogun Frontend as well you'll need to ask us to do it for you. Right now we don't have an UI for it, it will be available soon.

### How to configure and use seeder?

- Add env variables to .env
- run using `yarn sync`

Here's a video explaining it as well: https://share.getcloudapp.com/lluJZQJe

### How seeder works?

Seeder tool will read all local components and override remote one with same names or create new component/section if there isn't any section/component in database with same name.
If there is any remote section/component that doesn't exists locally, tool will show warning message.

### Working with SASS

SASS has been added to the project to allow us to use common variables and mixins across components. When running `yarn start`, along side initiating storybook, it will also set up a watcher for any scss files in the src directory and compile them on change.

Each component and section has both a `styles.css` and `styles.scss` file. The .scss file will be compiled into the .css file.

Any variables and mixins live inside `src/scss/` and can be referenced inside the components style.scss file. Changes made to any of the files inside src/scss will cause all the component styles.scss and the global.scss to be compiled en mass.

There is also a global.scss and global.css inside the src directory. This is compiled in the same way as the components. Not that the reference to the src/scss dir will be relative to this file.
