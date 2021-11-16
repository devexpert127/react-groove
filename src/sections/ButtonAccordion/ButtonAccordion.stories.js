import React from 'react'
import { text, object, withKnobs } from '@storybook/addon-knobs'
import ButtonAccordion from './'

export default {
  title: 'Accordion / Button Accordion',
  component: ButtonAccordion,
  decorators: [withKnobs],
}

export const buttonAccordion = () => {
  const buttonColor = text('Button Color', '#f38732')
  const items = [
    {
      name: text('Name', 'One', 'Item 1'),
      content: object(
        'Content',
        [
          { children: [{ text: '' }], type: 'paragraph' },
          {
            alt: 'Gmail Logo',
            children: [{ text: '' }],
            type: 'image',
            url: 'https://frontend.shgcdn.com/4b744026-8725-4c7e-97e0-e8070695fa00/',
          },
          { children: [{ text: 'GMAIL' }], type: 'h2' },
          {
            children: [
              { text: 'AT TIMES, GMAIL MISTAKENLY SENDS EMAILS YOU WANT, TO THE SPAM FOLDER...' },
            ],
            type: 'h3',
          },
          { children: [{ text: '' }], type: 'paragraph' },
          {
            children: [
              { text: 'If you do not readily find an email from ' },
              { bold: true, text: 'Peter w/ Groove' },
            ],
            type: 'paragraph',
          },
          { children: [{ text: '' }], type: 'paragraph' },
          {
            children: [{ text: 'Please check your ' }, { bold: true, text: 'Gmail Spam Folder:' }],
            type: 'paragraph',
          },
          { children: [{ text: '' }], type: 'paragraph' },
          {
            children: [
              { text: 'To assure you continue to get emails you asked to receive, ' },
              { bold: true, text: 'Create a Filter' },
            ],
            type: 'paragraph',
          },
          { children: [{ text: '' }], type: 'paragraph' },
          {
            children: [
              { text: '1. If you find an email from ' },
              { bold: true, text: 'Peter w/ Groove' },
              { text: ' in Gmail spam?' },
            ],
            type: 'paragraph',
          },
          { children: [{ text: '2. Open the email please.' }], type: 'paragraph' },
          {
            children: [
              { text: "3. Click 'Dots' button on the top right, to reveal your choices." },
            ],
            type: 'paragraph',
          },
          {
            children: [
              { children: [{ text: '' }], type: 'paragraph' },
              {
                alt: '',
                children: [{ text: '' }],
                type: 'image',
                url: 'https://frontend.shgcdn.com/69360eba-8c12-4f13-910d-180e965ab134/',
              },
              { children: [{ text: '' }], type: 'paragraph' },
            ],
            type: 'numberedList',
          },
          {
            children: [{ text: 'Click ' }, { bold: true, text: 'Filter messages like this' }],
            type: 'paragraph',
          },
          { children: [{ text: '' }], type: 'paragraph' },
          {
            alt: '',
            children: [{ text: '' }],
            type: 'image',
            url: 'https://frontend.shgcdn.com/ae7f9e89-e328-483d-ae6e-f99852ea5c42/',
          },
          { children: [{ text: '' }], type: 'paragraph' },
          { children: [{ text: '' }], type: 'paragraph' },
          {
            children: [{ text: 'Click the button "Create filter" to open your settings.' }],
            type: 'paragraph',
          },
          { children: [{ text: '' }], type: 'paragraph' },
          {
            children: [{ text: 'From the next menu, please check these options' }],
            type: 'paragraph',
          },
          { children: [{ text: '' }], type: 'paragraph' },
          { children: [{ text: '' }], type: 'paragraph' },
          {
            alt: 'Gmail Options',
            children: [{ text: '' }],
            type: 'image',
            url: 'https://frontend.shgcdn.com/b14860a8-97e0-42fa-b767-d77def7464c4/',
          },
          { children: [{ text: '' }], type: 'paragraph' },
          { children: [{ text: '' }], type: 'paragraph' },
          {
            children: [{ text: 'Under the "Categorize as: Choose Category..."' }],
            type: 'paragraph',
          },
          { children: [{ text: '' }], type: 'paragraph' },
          {
            children: [{ text: '1. Click the dropdown icon next to "Choose Category..."' }],
            type: 'paragraph',
          },
          { children: [{ text: '' }], type: 'paragraph' },
          {
            children: [
              { text: '2. Please select ' },
              { bold: true, text: 'Primary' },
              { text: ' in the next options menu.' },
            ],
            type: 'paragraph',
          },
          { children: [{ text: '' }], type: 'paragraph' },
          { children: [{ text: '' }], type: 'paragraph' },
          {
            alt: 'Gmail Categories',
            children: [{ text: '' }],
            type: 'image',
            url: 'https://frontend.shgcdn.com/a2185051-bb9d-4254-b6ed-8d73635bac23/',
          },
          { children: [{ text: '' }], type: 'paragraph' },
          { children: [{ text: '' }], type: 'paragraph' },
          {
            children: [{ text: 'Click the blue "Create filter" button, to save your settings' }],
            type: 'paragraph',
          },
          { children: [{ text: '' }], type: 'paragraph' },
          {
            children: [
              { text: 'Now you will always see ' },
              { bold: true, text: 'Peter w/ Groove' },
              { text: ' in your Primary Inbox tab!' },
            ],
            type: 'paragraph',
          },
          { children: [{ text: '' }], type: 'paragraph' },
          { children: [{ text: '' }], type: 'paragraph' },
        ],
        'Item 1',
      ),
    },
    {
      name: text('Name', 'Two', 'Item 2'),
      content: object(
        'Content',
        [
          {
            children: [{ text: 'Item two ', bold: true }, { text: 'Item two' }],
            type: 'paragraph',
          },
        ],
        'Item 2',
      ),
    },
    {
      name: text('Name', 'Three', 'Item 3'),
      content: object(
        'Content',
        [
          {
            children: [{ text: 'Item three ', bold: true }, { text: 'Item three' }],
            type: 'paragraph',
          },
        ],
        'Item 3',
      ),
    },
  ]

  return (
    <ButtonAccordion buttonColor={buttonColor} items={items} title={text('Title', 'Example')} />
  )
}
