# Sections

The IDE allows you to build sections. Sections are the building blocks of a page. Think of a section as a separate piece of interface that can be reused and handled independently. A section is a composition of a React component. Here are some simple rules to follow when developing a section:

- Section name should be unique and should start with a capital letter
- Make sure `React` is imported - just add the following line to the top of your code

    ```jsx
    import React from 'react'
    ```

- Make sure you export your section using `default export`. Named exports won't work!

# Section IDE

The IDE consists of 3 main parts:

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/eb4563d3-f3cb-42b8-a3a1-07e7f47b502b/Screenshot_2020-06-02_at_18.06.49.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/eb4563d3-f3cb-42b8-a3a1-07e7f47b502b/Screenshot_2020-06-02_at_18.06.49.png)

1. Section Preview
2. Code Editor
3. Variable Editor

# 1. Section Preview

Here you can preview how your section looks. The preview is updated whenever you make a change in the `Code Editor` or `Variable Editor`. If there is an error in the code of the section you will see an error message.

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e1c8c820-7035-4751-bf54-9e1f00b0aabc/Screenshot_2020-06-02_at_18.50.04.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e1c8c820-7035-4751-bf54-9e1f00b0aabc/Screenshot_2020-06-02_at_18.50.04.png)

# 2. Code Editor

Here you can either implement the section needed from scratch or paste a valid React-JavaScript code from any other tool you use. `Code Editor` supports common IDE features such as code highlighting, autocomplete etc.

For now, `Code Editor` has 2 tabs:

1. `JSX` tab where you can write and edit your section's code directly 
2. `CSS` tab where you can write and edit CSS rules for your sections

## Importing Syles

To import styles written in `CSS` tab you must add the following line in your code

```jsx
import './styles.css'
```

After adding this line you may use yours classnames as regular

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/793b4880-e886-4b42-a041-dd2022dd7907/Screenshot_2020-06-02_at_18.26.19.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/793b4880-e886-4b42-a041-dd2022dd7907/Screenshot_2020-06-02_at_18.26.19.png)

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b79adc0f-b02c-4d0f-abcb-5d0ae94b617e/Screenshot_2020-06-02_at_18.25.02.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b79adc0f-b02c-4d0f-abcb-5d0ae94b617e/Screenshot_2020-06-02_at_18.25.02.png)

Note that all styles you write in `CSS` tab are global. You may also write global styles in site settings but we encourage you to encapsulate styles in the components as much as possible by using any CSS naming convention(like [SUIT](https://github.com/suitcss/suit/blob/master/doc/naming-conventions.md#components) for example).

## Available dependencies

By default the following dependencies are available:

- `react`
- `react-dom`
- `react-helmet-async`
- `frontend-ui` - pre-built Shogun components and hooks to make your work easier
- `frontend-checkout` - pre-built Shogun hooks to handle cart logics

## Importing components

After you've created a component you may reuse it in another section. In order to do that you need to import that component by simply adding the following line to your code:

```jsx
import MyComponent from 'Components/MyComponent'
```

## Importing third-party dependencies

For now there is no way to add a third-party dependency on your own. If you need any additional npm package to be available please contact us. We are actively working on adding the this functionality and plan to add this functionality soon!

# 3. Variable Editor

Here you can define variables, their types or link them to specific CMS groups. These variables are mapped to the props or your component. Be careful naming your variables as they are case sensitive!

To start adding a new variable click on `Add` button at the bottom of `Variable Editor`. You will see a new variable added in the editor.

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b6de7301-85df-4236-8eee-07e899f34896/Screenshot_2020-06-04_at_17.56.45.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b6de7301-85df-4236-8eee-07e899f34896/Screenshot_2020-06-04_at_17.56.45.png)

Let's take a look at the fields we have in variable editor:

- `Variable Name` field. Here you should enter the name of your variable
- `Type` field. Here you may specify the type of the variable. For now the following values are available:
    1. `TextField` - represents text type
    2. `Number` - represents number type
    3. `Boolean` - represents boolean type
    4. `Reference` - allows you to map CMS group to your section. You may later pick a specific CMS entry while you would edit a page
    5. `Image` - represents `asset` type. It includes images, videos etc. You will see an uploader while you would edit a page
- `Multiple Values` field. Check it if you want your variable to be an array of specified type.

When you add a new variable you also need to add a new prop with the same name to your component. Make sure you **don't** set default values for the props. We will do it for you. Soon you will be able to set a default value for your variable in `Variable Editor` .

## Removing the variable

If you want to remove any variable from the IDE you can click the cross icon on the right side of variable header. 

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/bd26bf6d-fadf-486e-b862-5dbb4e5caf2d/Screenshot_2020-06-08_at_14.12.04.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/bd26bf6d-fadf-486e-b862-5dbb4e5caf2d/Screenshot_2020-06-08_at_14.12.04.png)

Don't forget to remove associated prop from the component!

# Saving

After everything is set don't forget to click `Save` button to save your changes. Now you can use your section on the pages to build a really awesome website!
