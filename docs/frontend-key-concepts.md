## Sections

Sections are fullwidth building blocks for your pages. These are developed using JSX and CSS in the Shogun Frontend IDE:

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6a9f4f1b-fbbe-4cae-a198-8bec214e5ba2/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6a9f4f1b-fbbe-4cae-a198-8bec214e5ba2/Untitled.png)

## Variables

Variables are the props passed into your Sections. These are defined in the right sidebar in the IDE. These variables will be available when editing one of your pages allowing you to map them to a field in the CMS or manually enter the values directly in the Experience Manager sidebar. 

## Components

Components are building blocks of a section, for example a button, and can be re-used across multiple sections. Components are not available to add directly to your page, they must be added within a section in the IDE.

## CMS Content

The CMS allows your to define your content that you can use when building your pages in the Experience Manager.

### Content Groups

Content Groups are created to define the data model of you site, you can think of them like a table. Content Groups have fields which can be mapped to variables created in the IDE when creating your page in the Experience Manager. 

Fields can be of the following data types:

- Text
- Number
- Image
- Boolean
- Reference

Fields can be single value or multi-value (lists).

You cannot change the data type of a field. You will need to delete and re-create the field if you wish to change it's definition. 

### Content Items

Content Items are the entries created for your defined data model. For example if you have a People Content Group with fields for name, title and profile picture, a content item will be a person with values for those fields populated. 

### Reference Type

One data type that requires further explanation is the reference type. This data type allows you to reference data from an existing Content Group in your CMS. For example, I may have a People Content Group containing a list of people working at my company. I could then create a Teams content group with a reference type field that references the People Content Group. When creating Content Items for each team I can select which people from the People Group are in each team.

People Content Group with Content Items

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ef4fadf5-d90a-43a5-873b-6481c8447ec1/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ef4fadf5-d90a-43a5-873b-6481c8447ec1/Untitled.png)

New Teams Content Group creation with reference field linked to People

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0e99c0d4-db9a-45f2-83f4-8e5090855916/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0e99c0d4-db9a-45f2-83f4-8e5090855916/Untitled.png)

New Teams Content Item where I select which people are in each team

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0c984ae5-ebbf-4a08-af5f-206ce0579a25/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0c984ae5-ebbf-4a08-af5f-206ce0579a25/Untitled.png)

## Pages

Pages are created in the Experience Manager by adding sections and providing the data for those sections either connected to the CMS or manually entered in the sidebar.

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/63753775-5e63-4534-843c-c9e6792d74f3/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/63753775-5e63-4534-843c-c9e6792d74f3/Untitled.png)

## Master Pages

Master pages can be created for a given CMS Content Group. When creating/updating a master page a page will be automatically generated/re-generated for each content item within that content group. Sections added to a master page will exist on all pages generated. Any sections custom to a page should be added as custom content sections.

## Custom Content Sections

If there is a section that only applies to a subset of pages generated from a master page you can add this as a custom content section. To do this you need to add a custom content section placeholder to the associated master page:

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/014406bd-7474-4f77-8ad1-2d67fd861293/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/014406bd-7474-4f77-8ad1-2d67fd861293/Untitled.png)

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a3e2564d-1854-4e32-957b-844f90c8890b/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a3e2564d-1854-4e32-957b-844f90c8890b/Untitled.png)

You will then be able to add a section in that position on any of the individual pages generated from the master page.

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/065407a3-1e75-4d95-8e9a-636e0fee7413/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/065407a3-1e75-4d95-8e9a-636e0fee7413/Untitled.png)

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/eb873a8c-4fa7-4414-b71f-716cca282686/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/eb873a8c-4fa7-4414-b71f-716cca282686/Untitled.png)

Note: You can add as many custom content areas to the master page, at any position between the existing master page sections, as required.
