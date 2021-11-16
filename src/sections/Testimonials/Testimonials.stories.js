import React from 'react'
import { withKnobs, text, files, radios } from '@storybook/addon-knobs'

import Testimonials from './'
import Image from '../../static/icon.png'

export default {
  title: 'Testimonials / Testimonials',
  component: Testimonials,
  decorators: [withKnobs],
}

export const testimonials = () => (
  <>
    <Testimonials
      testimonials={[
        {
          _id: '43cbc42f-c920-4653-875e-7cdae703dbcd',
          image: {
            _type: 'image',
            alt: '',
            height: 623,
            mimeType: 'image/png',
            name: 'Lana.png',
            size: 230892,
            src: 'https://f.shgcdn.com/16d30320-177c-4f7d-b958-dadc811d2c49/',
            storageID: '16d30320-177c-4f7d-b958-dadc811d2c49',
            uuid: '462353d8-4e8f-4702-b672-99f90605e2b7',
            width: 1080,
          },
          name: 'LANA MILLER',
          testimonial:
            'There’s not another company that I would want to be a part of! Groove Life cares about their employees, ensuring that we grow in our career and our personal life by truly investing in us. And, wow, do we have FUN! What’s better than spending 40 hours a week at a job you’re passionate about with people you love and products that make sense?',
          title: 'Wholesale Manager',
        },
        {
          _id: '55154369-0418-43ca-82e9-1360945bac94',
          image: {
            _type: 'image',
            height: 623,
            is_image: true,
            mimeType: 'image/png',
            name: 'Spenser.png',
            size: 53721,
            src: 'https://f.shgcdn.com/2b8e2f64-2258-487c-8b3b-8d8e0aac8aea/',
            storageID: '2b8e2f64-2258-487c-8b3b-8d8e0aac8aea',
            width: 1080,
          },
          name: 'Spenser Woodard',
          testimonial:
            'Groove Life exemplifies a work atmosphere that is full of fun, passion, and excitement. Our culture is one of the many attractions of being employed by Groove Life. I have never had the pleasure of working for a company that motivates me to be an all around better person.',
          title: 'Director Of Customer Experience',
        },
        {
          _id: 'f3810557-2e91-44a3-8420-b9a6f99817ba',
          image: {
            _type: 'image',
            height: 623,
            is_image: true,
            mimeType: 'image/png',
            name: 'Lori.png',
            size: 250990,
            src: 'https://f.shgcdn.com/97f023d6-9210-4caf-9307-f9680bad9c96/',
            storageID: '97f023d6-9210-4caf-9307-f9680bad9c96',
            width: 1080,
          },
          name: 'Lori Klump',
          testimonial:
            'I have never been a part of a company that sincerely cares so much about its employees, if not more, than it does the actual business. I love that everyone has value, no matter what their job is in this company. Because it takes every single one of us to put out the products that people love and can count on when they are living out their adventures.',
          title: 'Wholesale Fulfillment Team Lead',
        },
        {
          _id: '9b604cca-1bef-4139-923f-6609a85898c8',
          image: {
            _type: 'image',
            alt: '',
            height: 623,
            mimeType: 'image/png',
            name: 'Brandon.png',
            size: 173163,
            src: 'https://f.shgcdn.com/c2733278-fbfb-4fac-aea0-6d7412a2baba/',
            storageID: 'c2733278-fbfb-4fac-aea0-6d7412a2baba',
            uuid: 'b7c7b290-5cbf-4043-a2da-84d6e8d7cb02',
            width: 1080,
          },
          name: 'BRANDON HOWARD',
          testimonial:
            'Working for Groove Life has been a blessing, the amount of care and devotion they show to their employees is beyond amazing. The work atmosphere is one of the best I have ever been a part of, and the lasting friendships I’ve made have been extremely rewarding. I’ve learned and grown so much in the company and look forward to the adventures it holds.',
          title: 'Engraving Supervisor',
        },
      ]}
    />
  </>
)
