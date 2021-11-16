import React from 'react'
import { withKnobs, text, object } from '@storybook/addon-knobs'

import JobList from './'

export default {
  title: 'Text / Job List',
  component: JobList,
  decorators: [withKnobs],
  parameters: {
    knobs: {
      escapeHTML: false,
    },
  },
}

export const jobList = () => {
  const title = text('Title', 'Work at Groove')
  const content = object('Content', [
    {
      children: [
        {
          text:
            'Groove Life is a fast paced, break-neck-speed type of company. We may not take ourselves too seriously but we take our mission very seriously. We create crazy-good products, content, and customer experiences, but the end goal is that others are inspired to discover who they were made to be and live a life of adventure. <br><br> So, if you can laugh at yourself, and push yourself outside your comfort zone then sign up! We are always looking for fun, hard working people that share the same passion for people that we do.',
        },
      ],
      type: 'paragraph',
    },
  ])

  return (
    <>
      <JobList title={title} content={content} />
    </>
  )
}
