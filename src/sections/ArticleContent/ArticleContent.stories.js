import React from 'react'
import { withKnobs, text, files, boolean, object } from '@storybook/addon-knobs'
import ArticleContent from './'

export default {
  title: 'Blog / ArticleContent',
  component: ArticleContent,
  decorators: [withKnobs],
  parameters: {
    knobs: {
      escapeHTML: false,
    },
  },
}

export const articleContent = () => {
  const content = [
    { children: [{ text: 'Heading 1' }], type: 'h1' },
    { children: [{ text: 'Heading 2' }], type: 'h2' },
    { children: [{ text: 'Heading 3' }], type: 'h3' },
    { children: [{ bold: true, text: 'Heading 1 Bold' }], type: 'h1' },
    { children: [{ bold: true, text: 'Heading 2 Bold' }], type: 'h2' },
    { children: [{ bold: true, text: 'Heading 3 Bold' }], type: 'h3' },
    { children: [{ text: '' }], type: 'separator' },
    { children: [{ text: 'WHO IS KATIE VAN SLYKE?' }], type: 'h2' },
    { children: [{ text: '' }], type: 'paragraph' },
    {
      children: [
        {
          text:
            'When you think of a hunter, the first image that comes to mind is probably a burly beard, camouflage coveralls, and a deer stand. Katie Van Slyke is here to shatter those stereotypes. She loves makeup and dressing up pretty, but she can shoot a deer through the lungs with the best of them. Last week, we had the chance to interview Katie and find out how she became one of the top female shooters on social media and grew a massive following on Instagram and other platforms.',
        },
      ],
      type: 'paragraph',
    },
    { children: [{ text: '' }], type: 'paragraph' },
    {
      alt: 'katie van slyke woman bowhunting ',
      children: [{ text: '' }],
      type: 'image',
      url: 'https://frontend.shgcdn.com/0390feeb-23c9-46be-ab6e-c9e7058817c3/',
    },
    { children: [{ text: '' }], type: 'paragraph' },
    { children: [{ text: 'HOW DOES A WOMAN BECOME A HUNTRESS?' }], type: 'h3' },
    { children: [{ bold: true, text: '' }], type: 'paragraph' },
    {
      children: [
        {
          text:
            'Katie Van Slyke grew up on a 300-acre farm with her mom and dad and has lived there for just about her entire life. The farm is where her love of hunting was born. Almost as soon as she could walk, she was out hunting with her dad, and that is where she does most of her hunting and fishing to this day. ',
        },
      ],
      type: 'paragraph',
    },
    { children: [{ text: '' }], type: 'paragraph' },
    {
      children: [
        {
          text:
            '“My mom showed horses and my dad was into hunting, it was just our thing to go do together. Even before I was shooting… I would go sit with my dad in ground and box blinds. There are pictures of me at three years old, all decked out in camo with him. It’s just been this way my entire life.”',
        },
      ],
      type: 'paragraph',
    },
    { children: [{ text: '' }], type: 'paragraph' },
    {
      children: [
        {
          text:
            'Katie knows her family’s farm by heart - it’s an outdoor enthusiast’s paradise. The farm is interwoven with horse trails, cattle fields, and scattered with barns. Additional scores of acres of “untamed” land make it ideal for hunting and fishing.',
        },
      ],
      type: 'paragraph',
    },
    { children: [{ text: '' }], type: 'paragraph' },
    {
      children: [
        {
          text:
            'While Katie is usually known for her hunting posts on social media, she also loves to show horses. In fact, showing horses used to be her #1 passion. Until the last three years, hunting was something she did in her spare time. ',
        },
      ],
      type: 'paragraph',
    },
    { children: [{ text: '' }], type: 'paragraph' },
    {
      children: [
        {
          text:
            'In 2020, Katie looks forward to investing more time in showing horses while continuing to spend time hunting.',
        },
      ],
      type: 'paragraph',
    },
    { children: [{ text: '' }], type: 'paragraph' },
    {
      children: [
        {
          text:
            '“You know, I’d say whitetail just because that’s what I have the most knowledge of and experience with. I feel completely comfortable doing it all on my own. I will say, the different species I’ve been hunting over the last two years were so much fun. Whitetail hunting is still my favorite but I wouldn’t be surprised if it got kicked to the curb by other stuff in a couple of years, once I get a little more comfortable.”',
        },
      ],
      type: 'paragraph',
    },
    { children: [{ text: '' }], type: 'paragraph' },
    {
      children: [{ text: 'WHAT ARE SOME CHALLENGES KATIE FACES AS A FEMALE HUNTER?' }],
      type: 'h2',
    },
    { children: [{ bold: true, text: '' }], type: 'paragraph' },
    {
      children: [
        {
          text:
            'Katie Van Slyke isn’t new to the world of social media. She’s had a massive platform on Instagram for several years now, and she said dealing with negativity there has taught her to develop a thick skin.',
        },
      ],
      type: 'paragraph',
    },
    { children: [{ text: '' }], type: 'paragraph' },
    {
      alt: '',
      children: [{ text: '' }],
      type: 'image',
      url: 'https://frontend.shgcdn.com/f84c7edf-a5f2-4ab0-b51a-1d048471eba9/',
    },
    { children: [{ text: '' }], type: 'paragraph' },
    {
      children: [
        {
          text:
            'AS A FEMALE HUNTER, YOU BREAK A LOT OF STEREOTYPES! HOW DOES IT FEEL TO BE A HUNTRESS?',
        },
      ],
      type: 'h3',
    },
    { children: [{ bold: true, text: '' }], type: 'paragraph' },
    {
      children: [
        {
          text:
            '“A lot of the time it’s very frustrating because I do get put into a lot of stereotypes. Especially on social media. It is fun though, the stereotype breaking, and getting into an industry where it has been a ‘boy’s game’ for so long!”',
        },
      ],
      type: 'paragraph',
    },
    { children: [{ text: '' }], type: 'paragraph' },
    {
      children: [
        {
          text:
            'Katie mentioned that she often receives a lot of nasty comments and DMs, but the possibility of impacting little girls and encouraging them to start hunting gives her the courage to continue to share her journey online. She shared that God always gives her a little bit of encouragement on the harder days when unkind comments are extra hurtful.',
        },
      ],
      type: 'paragraph',
    },
    { children: [{ text: '' }], type: 'paragraph' },
    {
      children: [
        {
          text:
            '“The response from other young women and dads with daughters who are getting them into hunting… it makes all the hate and all the frustration worth it. It’s the sweetest victory ever to see new girls coming into it.”',
        },
      ],
      type: 'paragraph',
    },
    { children: [{ text: '' }], type: 'paragraph' },
    {
      children: [{ text: 'WHAT IS YOUR ADVICE FOR PEOPLE WHO ARE HOPING TO BECOME INFLUENCERS?' }],
      type: 'h3',
    },
    { children: [{ bold: true, text: '' }], type: 'paragraph' },
    {
      children: [
        {
          text:
            '“Just stay true to yourself and don’t mold yourself into what you think people want to see. I feel like I went down that road myself, just for a minute, of trying to be the perfect person. It’s like a highlight reel all the time… it was exhausting and so frustrating. I was honestly too obsessive at first with trying to keep up this appearance - this was years ago - and it just isn’t worth it. It’s too much to handle and it will wear on you. Just be yourself. Show people your bad days. Tell people what’s going on. You don’t have to share everything but just be authentically you and stay true to it and just keep on truckin’ and it all pays off when something good comes out of it. Because you know that you’ve just been you and stayed true to yourself.”',
        },
      ],
      type: 'paragraph',
    },
    { children: [{ text: '' }], type: 'paragraph' },
    { children: [{ text: 'DO YOU LIKE TO HUNT ALONE?' }], type: 'h3' },
    { children: [{ bold: true, text: '' }], type: 'paragraph' },
    {
      children: [
        {
          text:
            '“I love going hunting by myself, especially in the evenings. I love a good solo evening hunt when I can just be quiet by myself with my thoughts. Even if I don’t see anything, it’s just a good, fun time. My fiance will hunt with me a lot, and I like to go with my dad sometimes, too. When I’m out of state, generally my fiance, Jonathan, will go on the trips with me or if I go by myself it’s with an outfitter so I’m not DIY-ing it.”',
        },
      ],
      type: 'paragraph',
    },
    { children: [{ text: '' }], type: 'paragraph' },
    { children: [{ text: 'WHO ARE YOUR FRIENDS IN THE INDUSTRY?' }], type: 'h3' },
    { children: [{ bold: true, text: '' }], type: 'paragraph' },
    {
      children: [
        { text: '“I have a lot of them. I love ' },
        {
          children: [{ text: 'Hannah Baron' }],
          external: true,
          type: 'link',
          url: 'https://www.instagram.com/hannahbarron96/',
        },
        { text: ', I love ' },
        {
          children: [{ text: 'Allie Butler' }],
          external: true,
          type: 'link',
          url: 'https://www.instagram.com/alliembutler/',
        },
        { text: ', ' },
        {
          children: [{ text: 'Kendall Jones' }],
          external: true,
          type: 'link',
          url: 'https://www.instagram.com/_kendalljones_/',
        },
        { text: ', ' },
        {
          children: [{ text: 'Rachelle Hedrick' }],
          external: true,
          type: 'link',
          url: 'https://www.instagram.com/rachellehedrick/',
        },
        {
          text:
            ', there are so many I can’t even name them all. As for my bridesmaids, it’s childhood friends mixed with college friends and even a new friend who is going to be my sister in law!”',
        },
      ],
      type: 'paragraph',
    },
    { children: [{ text: '' }], type: 'paragraph' },
    { children: [{ text: 'KATIE IS MUCH MORE THAN A HUNTRESS.' }], type: 'h2' },
    { children: [{ bold: true, text: '' }], type: 'paragraph' },
    {
      children: [
        {
          text:
            'While Katie’s first love is hunting, she is well-rounded and has a wide variety of interests that she enjoys in her spare time.',
        },
      ],
      type: 'paragraph',
    },
    { children: [{ text: '' }], type: 'paragraph' },
    {
      alt: '',
      children: [{ text: '' }],
      type: 'image',
      url: 'https://frontend.shgcdn.com/cb5b246c-6a8d-4390-8ff2-64c999e8df67/',
    },
    { children: [{ text: '' }], type: 'paragraph' },
    { children: [{ text: "WHAT ARE YOUR HOBBIES WHEN YOU'RE NOT HUNTING?" }], type: 'h3' },
    { children: [{ bold: true, text: '' }], type: 'paragraph' },
    {
      children: [
        {
          text:
            '“Riding horses is the big one. Over the winter it’s been really slow because they’ve all been on stall rest or pregnant so I haven’t done much riding lately.  Generally, if I’m not hunting, I’m at the barn riding. I also really enjoy singing. Sometimes some buddies will come over and have jam sessions at my house. We’ve written hunting songs! I also really like creating make-up tutorials."',
        },
      ],
      type: 'paragraph',
    },
    { children: [{ text: '' }], type: 'paragraph' },
    { children: [{ text: 'WHAT IS YOUR FAVORITE KIND OF MUSIC?' }], type: 'h3' },
    { children: [{ bold: true, text: '' }], type: 'paragraph' },
    {
      children: [
        {
          text:
            '“I like country. I think what they’re calling the specific kind of music that I like,  ‘outlaw country.’ ',
        },
        {
          children: [{ text: 'Tyler Childers' }],
          external: true,
          type: 'link',
          url: 'https://tylerchildersmusic.com/',
        },
        { text: ', ' },
        {
          children: [{ text: 'Colter Wall' }],
          external: true,
          type: 'link',
          url: 'http://www.colterwall.com/',
        },
        { text: '… more of a gritty, raw country.”' },
      ],
      type: 'paragraph',
    },
    { children: [{ text: '' }], type: 'paragraph' },
    { children: [{ text: 'WHAT IS YOUR FAVORITE FOOD?' }], type: 'h3' },
    { children: [{ bold: true, text: '' }], type: 'paragraph' },
    {
      children: [
        {
          text:
            '“Honestly, any type of meat. I’m a picky eater unless it is meat. I will eat literally anything you put in front of me if it was an animal at one point. I recently figured out that my favorite wild game is sandhill crane but my favorite meat overall is probably steak.”',
        },
      ],
      type: 'paragraph',
    },
    { children: [{ text: '' }], type: 'paragraph' },
    { children: [{ text: 'HOW DO YOU STAY IN SHAPE?' }], type: 'h3' },
    { children: [{ bold: true, text: '' }], type: 'paragraph' },
    {
      children: [
        {
          text:
            '“I’m actually getting into shape for the wedding, which is five months away. Used to be… I would just say if you’re bad one day, just be extra good the next day! I cut out a lot of sodas and I’m just not eating anything that is obviously bad and cut down on my intake.”',
        },
      ],
      type: 'paragraph',
    },
    { children: [{ text: '' }], type: 'paragraph' },
    {
      children: [{ text: 'WHAT ARE YOU MOST LOOKING FORWARD TO ABOUT YOUR WEDDING DAY?' }],
      type: 'h3',
    },
    { children: [{ bold: true, text: '' }], type: 'paragraph' },
    {
      children: [
        {
          text:
            '“I’m honestly in camo with leggings and boots every day of my life. Yeah, I wear makeup all the time and I’m girly and stuff, but I never get to just be like a princess and just be okay with it. I never have anywhere to go where I wear dresses and have my hair and makeup professionally done. I’m so excited to be in my bridal suite with my bridesmaids, my mom, and my nana, getting to just be a princess unapologetically for one day... I’m so excited.”',
        },
      ],
      type: 'paragraph',
    },
    { children: [{ text: '' }], type: 'paragraph' },
    {
      children: [{ text: 'WHAT ARE YOUR FAVORITE THINGS ABOUT YOUR LIFE RIGHT NOW?' }],
      type: 'h3',
    },
    { children: [{ bold: true, text: '' }], type: 'paragraph' },
    {
      children: [
        {
          text:
            '“Sometimes I get nervous that something bad is going to happen because it’s just too good. We are getting married, I just bought a house, I have a new puppy, we’re in love, we’re in a good spot in our relationship… I just feel like I’m in such a good point in life. 2019 showed some difficulties but I will say it had some very high points. 2020 is starting off really good.”',
        },
      ],
      type: 'paragraph',
    },
    { children: [{ text: '' }], type: 'paragraph' },
    {
      children: [{ text: 'WHAT DOES KATIE VAN SLYKE LOVE ABOUT HER GROOVE LIFE GEAR?' }],
      type: 'h2',
    },
    { children: [{ text: '' }], type: 'paragraph' },
    {
      alt: 'girls hunt and fish with groove rings',
      children: [{ text: '' }],
      type: 'image',
      url: 'https://frontend.shgcdn.com/38afbf2f-3d82-4357-b168-27538f8c6272/',
    },
    { children: [{ text: '' }], type: 'paragraph' },
    {
      children: [
        { text: 'Katie has been a huge fan of ' },
        {
          children: [{ text: 'Groove Life' }],
          external: true,
          type: 'link',
          url: 'https://groovelife.com/',
        },
        {
          text:
            ' products ever since she got engaged this past year! She loves the thin snow silicone ring because it goes with everything, it’s easy to put on, it’s stretchy, it feels comfortable, and sometimes she even forgets that she has it on. She laughed about her fiance’s reaction to her love for her Groove ring.',
        },
      ],
      type: 'paragraph',
    },
    { children: [{ text: '' }], type: 'paragraph' },
    {
      children: [
        {
          text:
            '“Sometimes Jonathan’s like ‘do you want to put your pretty ring back on? The one that I saved up and got for you… do you want to wear that one?’ I love ',
        },
        {
          children: [{ text: 'my Kryptek Typhon ring' }],
          external: true,
          type: 'link',
          url: 'https://groovelife.com/collections/kryptek-camo-silicone-rings',
        },
        { text: " for when I'm hunting, and " },
        {
          children: [{ text: 'the white ring' }],
          external: true,
          type: 'link',
          url: 'https://groovelife.com/products/groove-thin-silicone-ring-snow',
        },
        {
          text:
            ' for day-to-day activities such as going to the gym, going to the barn, that kind of thing. It’s literally the most comfortable silicone ring I’ve ever put on in my life.”',
        },
      ],
      type: 'paragraph',
    },
    { children: [{ text: '' }], type: 'paragraph' },
    {
      children: [
        {
          text:
            'Katie also mentioned that her Groove ring cleans up well. “There are no stains on it even after cleaning a deer.”',
        },
      ],
      type: 'paragraph',
    },
    { children: [{ text: '' }], type: 'paragraph' },
    {
      children: [
        {
          text:
            'Katie also has a Groove watch band for her Apple Watch and she loves alternating different styles.',
        },
      ],
      type: 'paragraph',
    },
    { children: [{ text: '' }], type: 'paragraph' },
    {
      children: [
        { text: '“I wear my ' },
        {
          children: [{ text: 'camouflage' }],
          external: true,
          type: 'link',
          url: 'https://groovelife.com/products/groove-watch-band-mossy-oak-breakup',
        },
        { text: ' watch band when I’m hunting, and I really like ' },
        {
          children: [{ text: 'the plain white band' }],
          external: true,
          type: 'link',
          url: 'https://groovelife.com/products/groove-watch-band-solid-white',
        },
        {
          text:
            ', too, because I feel like it’s more like an accessory for any outfit. I’m a minimal person as far as outfits go, but the ',
        },
        {
          children: [{ text: 'Aspire Soar' }],
          external: true,
          type: 'link',
          url: 'https://groovelife.com/products/groove-watch-band-aspire-soar',
        },
        {
          text:
            ' design really speaks to me and it just embodies my vibe. Teal is my favorite color and I love feathers and arrows so it just goes with my personality. That’s probably my favorite watch band out of all of them.”',
        },
      ],
      type: 'paragraph',
    },
    { children: [{ text: '' }], type: 'paragraph' },
    { children: [{ text: 'THE BOTTOM LINE' }], type: 'h3' },
    { children: [{ bold: true, text: '' }], type: 'paragraph' },
    {
      children: [
        {
          text:
            'Katie Van Slyke is an inspiration because she’s not afraid to be herself, even if that means hitting the woods with a shotgun over her shoulder, camo Groove Ring on her finger, and lipstick in her pocket. You can find her and follow along on her adventures ',
        },
        {
          children: [{ text: 'on Instagram' }],
          external: true,
          type: 'link',
          url: 'https://www.instagram.com/katievanslyke/',
        },
        { text: ', or see her photos among other awesome influencers on our ' },
        {
          children: [{ text: 'Groove Life feed, HERE!' }],
          external: true,
          type: 'link',
          url: 'https://www.instagram.com/groovelife/',
        },
        { text: '' },
      ],
      type: 'paragraph',
    },
    { children: [{ text: '' }], type: 'paragraph' },
    {
      children: [
        {
          text:
            'If you’re living your best life out in the great outdoors with your Groove gear, make sure you tag us in your photos so we can feature you, too!',
        },
      ],
      type: 'paragraph',
    },
    { children: [{ text: '' }], type: 'paragraph' },
    { children: [{ bold: true, text: 'Keep Groovin’! ' }], type: 'paragraph' },
    { children: [{ text: '' }], type: 'paragraph' },
    {
      children: [
        { bold: true, text: '' },
        {
          children: [{ bold: true, text: 'SHOP GROOVE WATCH BANDS' }],
          external: true,
          type: 'link',
          url: 'https://groovelife.com/',
        },
        { text: '' },
      ],
      type: 'paragraph',
    },
  ]

  return <ArticleContent content={content} />
}
