import React from 'react'
import { withKnobs, text, files, boolean } from '@storybook/addon-knobs'
import WhoWearsGroove from './'

export default {
  title: 'Visual Blocks / Who Wears Groove',
  component: WhoWearsGroove,
  decorators: [withKnobs],
  parameters: {
    notes: '',
    knobs: {
      escapeHTML: false,
    },
  },
}

export const whoWearsGroove = () => {
  const media = 'https://assets.frontend.shogun.dev/aa3d1190-148e-4c00-b3a2-bf14d1dee4f4/'
  const mediaType = text('Media type', 'image')

  const blocks = [
    {
      media: {
        src: files('Image', ['.jpg, .png'], media),
      },
      name: text('Title', 'Philip Rivers'),
      description: text('Description', 'Pro Football Player'),
    },
    {
      media: {
        src: files('Image', ['.jpg, .png'], media),
      },
      name: text('Title', 'Rich Froning'),
      description: text('Description', 'Crossfit Athlete @richfroning'),
    },
    {
      media: {
        src: files('Image', ['.jpg, .png'], media),
      },
      name: text('Title', 'Michael Waddell'),
      description: text('Description', 'The Bone Collector @officialbonecollector'),
    },
    {
      media: {
        src: files('Image', ['.jpg, .png'], media),
      },
      name: text('Title', 'JB Mauney'),
      description: text('Description', '2x PBR World Champion | @jbmauneyxv'),
    },
  ]

  return <WhoWearsGroove blocks={blocks} mediaType={mediaType} />
}

export const realData = () => (
  <WhoWearsGroove
    type="image"
    blocks={[
      {
        _id: 'ca6fd71b-23d3-4427-a274-1f8197822e52',
        description: 'American comedian, podcaster, actor, and mixed martial arts | @joerogan',
        media: {
          _type: 'image',
          alt: 'Joe Rogan',
          height: 450,
          mimeType: 'image/jpeg',
          name: 'joerogan.jpg',
          size: 203913,
          src: 'https://f.shgcdn.com/eb5db036-7790-4deb-a336-33fe7b6b3e5e/',
          storageID: 'eb5db036-7790-4deb-a336-33fe7b6b3e5e',
          uuid: '83a198e1-62d5-4481-9e60-1702494f4e2d',
          width: 540,
        },
        name: 'Joe Rogan',
      },
      {
        _id: '864a4341-adf3-4867-8ce9-c56c717985da',
        description: 'Pro Skateboarder | @tonyhawk',
        media: {
          _type: 'image',
          alt: '',
          height: 450,
          mimeType: 'image/jpeg',
          name: 'tonyhawk.jpg',
          size: 65457,
          src: 'https://f.shgcdn.com/c53601ab-5353-4bac-af04-134d93ac9d50/',
          storageID: 'c53601ab-5353-4bac-af04-134d93ac9d50',
          uuid: '0518149f-328c-4bdb-8d09-b44bf7a6e093',
          width: 540,
        },
        name: 'Tony Hawk',
      },
      {
        _id: 'b1ce4a86-7c9f-4878-a9b2-b77e6028f72f',
        description: 'Pro Football Player',
        media: {
          _type: 'image',
          alt: 'Philip Rivers',
          height: 450,
          mimeType: 'image/jpeg',
          name: 'philiprivers.jpg',
          size: 218230,
          src: 'https://f.shgcdn.com/9b0ef1f8-7e38-4826-99cf-5c5182c3e9bb/',
          storageID: '9b0ef1f8-7e38-4826-99cf-5c5182c3e9bb',
          uuid: '6df35171-9d27-4192-a5d7-2b05c480d3a0',
          width: 540,
        },
        name: 'Philip Rivers',
      },
      {
        _id: 'e76d971d-e3f9-4fba-9ef1-aa1bab8883d9',
        description: 'MMA World Champion Fighter @mikechandlermma',
        media: {
          _type: 'image',
          alt: 'Michael Chandler',
          height: 450,
          mimeType: 'image/jpeg',
          name: 'MICHAEL_CHANDLER_rev.jpg',
          size: 38313,
          src: 'https://f.shgcdn.com/49281703-7739-4487-98ab-c00726b6a571/',
          storageID: '49281703-7739-4487-98ab-c00726b6a571',
          thumbnail:
            'https://frontend.shgcdn.com/49281703-7739-4487-98ab-c00726b6a571/-/resize/x70/',
          uuid: '32d812bb-3dc2-4193-a58c-5ec9cab061f6',
          width: 540,
        },
        name: 'Michael Chandler',
      },
      {
        _id: '14c2f73e-8f32-48a7-8e24-f5ba539fdcc4',
        description: 'The Bone Collector @officialbonecollector',
        media: {
          _type: 'image',
          alt: 'Michael Waddell',
          height: 800,
          mimeType: 'image/jpeg',
          name: 'waddell_Web.jpg',
          size: 120015,
          src: 'https://f.shgcdn.com/720e718e-4d90-47cd-b3f0-4a291593280b/',
          storageID: '720e718e-4d90-47cd-b3f0-4a291593280b',
          thumbnail:
            'https://frontend.shgcdn.com/720e718e-4d90-47cd-b3f0-4a291593280b/-/resize/x70/',
          uuid: 'aaeb63bc-5588-4d6c-bb1a-3888914c8747',
          width: 960,
        },
        name: 'Michael Waddell',
      },
      {
        _id: '9191b389-4708-4225-a275-b02424bdf5ad',
        description: 'Olympian | @chan_taemac',
        media: {
          _type: 'image',
          alt: 'Chantae McMillan Langhorst',
          height: 450,
          mimeType: 'image/jpeg',
          name: 'CHANTAE_MCMILLIAN2.jpg',
          size: 59992,
          src: 'https://f.shgcdn.com/11488962-698f-4ada-9bee-615d89ed7afe/',
          storageID: '11488962-698f-4ada-9bee-615d89ed7afe',
          thumbnail:
            'https://frontend.shgcdn.com/11488962-698f-4ada-9bee-615d89ed7afe/-/resize/x70/',
          uuid: '3ac5a4fc-c747-4a01-a807-5bfc9a7f9b8a',
          width: 540,
        },
        name: 'Chantae McMillan Langhorst',
      },
      {
        _id: 'eb0521e8-8e6f-4390-9fd5-9d6a04f688ee',
        description: 'Duck Commander and Duck Dynasty | @jmartinduckman',
        media: {
          _type: 'image',
          alt: 'Justin Martin',
          height: 450,
          mimeType: 'image/jpeg',
          name: 'justinmartin.jpg',
          size: 253635,
          src: 'https://f.shgcdn.com/8c4c8c13-05fa-4cd9-8322-35ec6d549b20/',
          storageID: '8c4c8c13-05fa-4cd9-8322-35ec6d549b20',
          uuid: '6514afbd-6b4a-4d11-ae73-89527c22a17b',
          width: 540,
        },
        name: 'Justin Martin',
      },
      {
        _id: '313ca101-04de-42f8-beca-72b6008c96a6',
        description: 'Halo Outdoors | @Halo_Hunting',
        media: {
          _type: 'image',
          alt: 'Henry and Lakeisha Woodard',
          height: 450,
          mimeType: 'image/jpeg',
          name: 'halo.jpg',
          size: 228089,
          src: 'https://f.shgcdn.com/a2bf0819-4570-4696-b2f0-88e15f0acb45/',
          storageID: 'a2bf0819-4570-4696-b2f0-88e15f0acb45',
          uuid: '34253f3b-2866-4d1f-b0fb-b7e4f99bf69f',
          width: 540,
        },
        name: 'Henry and Lakeisha Woodard',
      },
      {
        _id: '1279b446-d787-41fe-ac33-de48d30ab2b1',
        description: 'Athlete, Actor, Amy Veteran | @xcnatch',
        media: {
          _type: 'image',
          alt: 'Randy Couture',
          height: 450,
          mimeType: 'image/jpeg',
          name: 'Randy Couture.jpg',
          size: 206369,
          src: 'https://f.shgcdn.com/4bc4b404-1670-4ec4-845c-e59d85a4cb90/',
          storageID: '4bc4b404-1670-4ec4-845c-e59d85a4cb90',
          uuid: '16e9db4e-8a7d-4567-a3d0-bec0b438c4a4',
          width: 540,
        },
        name: 'Randy Couture',
      },
      {
        _id: 'b22bd58f-0ae6-4be5-be91-26442ff60e95',
        description: '2x pbr world champion | @jbmauneyxv',
        media: {
          _type: 'image',
          alt: 'JB Mauney',
          height: 820,
          mimeType: 'image/jpeg',
          name: 'JB_Mauney.jpg',
          size: 122871,
          src: 'https://f.shgcdn.com/64e4694d-10e8-495f-95b7-58905fcd806e/',
          storageID: '64e4694d-10e8-495f-95b7-58905fcd806e',
          thumbnail:
            'https://frontend.shgcdn.com/64e4694d-10e8-495f-95b7-58905fcd806e/-/resize/x70/',
          uuid: '3e476d6d-d899-4790-9183-6528b67ff7c0',
          width: 984,
        },
        name: 'JB Mauney',
      },
      {
        _id: '14727fe0-5f32-4aef-ac31-a8babac03037',
        description: 'professional bass fisherman | @ottdefoe',
        media: {
          _type: 'image',
          alt: 'Ott DeFoe',
          height: 450,
          mimeType: 'image/jpeg',
          name: 'OttDeFoe.jpg',
          size: 33097,
          src: 'https://f.shgcdn.com/0d670792-92ec-433b-ba67-e8dd72a698db/',
          storageID: '0d670792-92ec-433b-ba67-e8dd72a698db',
          thumbnail:
            'https://frontend.shgcdn.com/0d670792-92ec-433b-ba67-e8dd72a698db/-/resize/x70/',
          uuid: '55f90529-2abd-4246-8ed2-f1fd36ee0f1b',
          width: 540,
        },
        name: 'Ott DeFoe',
      },
      {
        _id: 'e36736c1-4504-484d-81eb-ecb061291d03',
        description: 'DRURY OUTDOORS @mattdrury81',
        media: {
          _type: 'image',
          alt: 'Matt Drury',
          height: 640,
          mimeType: 'image/jpeg',
          name: 'ambassador__matt-drury_2x_1.jpg',
          size: 104863,
          src: 'https://f.shgcdn.com/0d354983-bc07-4d6a-b2de-d7f38155b177/',
          storageID: '0d354983-bc07-4d6a-b2de-d7f38155b177',
          thumbnail:
            'https://frontend.shgcdn.com/0d354983-bc07-4d6a-b2de-d7f38155b177/-/resize/x70/',
          uuid: '36bdb3d2-42b5-4f75-b296-bba5e20534cc',
          width: 768,
        },
        name: 'Matt Drury',
      },
      {
        _id: '7fe8d697-ad22-4711-aa29-2de05071434b',
        description: 'crossfit athlete  @richfroning',
        media: {
          _type: 'image',
          alt: 'Rich Froning',
          height: 450,
          mimeType: 'image/jpeg',
          name: 'RICH_FRONING_rev.jpg',
          size: 30974,
          src: 'https://f.shgcdn.com/d289d343-5385-4790-bcd2-d2087b186717/',
          storageID: 'd289d343-5385-4790-bcd2-d2087b186717',
          thumbnail:
            'https://frontend.shgcdn.com/d289d343-5385-4790-bcd2-d2087b186717/-/resize/x70/',
          uuid: 'c7aa9018-84de-468a-98ed-c0ef3452199d',
          width: 540,
        },
        name: 'Rich Froning',
      },
      {
        _id: '1038b6cf-7508-4e04-bcbe-72146f234183',
        description: 'Pro Football Player',
        media: {
          _type: 'image',
          alt: 'Jason Elam',
          height: 450,
          mimeType: 'image/jpeg',
          name: 'JASON_ELAM_rev.jpg',
          size: 26355,
          src: 'https://f.shgcdn.com/41170693-048a-4795-97a9-f4414bfddb15/',
          storageID: '41170693-048a-4795-97a9-f4414bfddb15',
          thumbnail:
            'https://frontend.shgcdn.com/41170693-048a-4795-97a9-f4414bfddb15/-/resize/x70/',
          uuid: 'aaf88cfd-913e-4bbb-af59-3740a81cd2f0',
          width: 540,
        },
        name: 'Jason Elam',
      },
      {
        _id: 'f95a676f-2066-4c7e-aefe-2f2aeada999c',
        description: 'Bone Maniacs - Owner @bone_maniacs',
        media: {
          _type: 'image',
          alt: 'Shane Mowery',
          height: 640,
          mimeType: 'image/jpeg',
          name: 'shane-mowery--thumb_2x_cf8079ce-98cb-468f-a417-4771c42691fa.jpg',
          size: 89695,
          src: 'https://f.shgcdn.com/8c9b2882-ecc2-4024-8720-31580583dbd7/',
          storageID: '8c9b2882-ecc2-4024-8720-31580583dbd7',
          thumbnail:
            'https://frontend.shgcdn.com/8c9b2882-ecc2-4024-8720-31580583dbd7/-/resize/x70/',
          uuid: '37a04f91-06c8-4a0c-b9bb-11f234ed501f',
          width: 768,
        },
        name: 'Shane Mowery',
      },
      {
        _id: 'a024b2a5-5514-40d4-b206-933de7bfa3e3',
        description: 'blogger | @masseya',
        media: {
          _type: 'image',
          alt: 'Amber Massey',
          height: 450,
          mimeType: 'image/jpeg',
          name: 'AMBER_MASSEY_rev.jpg',
          size: 63186,
          src: 'https://f.shgcdn.com/1d0d4f83-090c-4949-9cee-17004644e3f9/',
          storageID: '1d0d4f83-090c-4949-9cee-17004644e3f9',
          thumbnail:
            'https://frontend.shgcdn.com/1d0d4f83-090c-4949-9cee-17004644e3f9/-/resize/x70/',
          uuid: '328ad69f-7cc3-4109-8645-a3dbe2cf83b4',
          width: 540,
        },
        name: 'Amber Massey',
      },
      {
        _id: '69348d04-c9a7-4e60-9bc3-e315527aacec',
        description: 'professional stock car driver | @jebburtonracing',
        media: {
          _type: 'image',
          alt: 'Jeb Burton',
          height: 450,
          mimeType: 'image/jpeg',
          name: 'ambassador__jeb-burton_2x_540x_c097b9fb-7516-4d6a-9e31-1d0045dce601.jpg',
          size: 61774,
          src: 'https://f.shgcdn.com/44b508b1-4284-4a7a-900e-6cd69f261b50/',
          storageID: '44b508b1-4284-4a7a-900e-6cd69f261b50',
          thumbnail:
            'https://frontend.shgcdn.com/44b508b1-4284-4a7a-900e-6cd69f261b50/-/resize/x70/',
          uuid: 'b94ccdfb-458c-40d6-aec4-8742db98eb0b',
          width: 540,
        },
        name: 'Jeb Burton',
      },
      {
        _id: '51b5ee70-5381-4903-a0f3-1707856840a9',
        description: 'musician | @joshgallaghermusic',
        media: {
          _type: 'image',
          alt: 'Josh Gallagher',
          height: 450,
          mimeType: 'image/jpeg',
          name: 'josh_gallagher_rev_3cd8efcc-a1d4-4c94-8d03-2619f1031214.jpg',
          size: 59323,
          src: 'https://f.shgcdn.com/45a43737-746c-49dd-b39e-4cce91094bd1/',
          storageID: '45a43737-746c-49dd-b39e-4cce91094bd1',
          thumbnail:
            'https://frontend.shgcdn.com/45a43737-746c-49dd-b39e-4cce91094bd1/-/resize/x70/',
          uuid: 'ef051ead-1d69-496d-b98b-f0ed62bafe73',
          width: 540,
        },
        name: 'Josh Gallagher',
      },
      {
        _id: 'ec710d70-88c2-4e80-982f-5a3c118010bc',
        description: 'Professional Scooter Athlete | @jonreyesnyc',
        media: {
          _type: 'image',
          alt: 'Jon Reyes',
          height: 450,
          mimeType: 'image/jpeg',
          name: 'Jon Reyes.jpg',
          size: 183753,
          src: 'https://f.shgcdn.com/1e81ddb0-ee7f-4110-970e-c85a46a43bbe/',
          storageID: '1e81ddb0-ee7f-4110-970e-c85a46a43bbe',
          uuid: '5f5ba132-abcf-4e5e-bc0c-f96209463000',
          width: 540,
        },
        name: 'Jon Reyes',
      },
      {
        _id: 'f029e2ae-f2cf-4c71-bf49-592d60384a78',
        description: 'Beach Volleyball Player/Olympian | @brookesweat',
        media: {
          _type: 'image',
          alt: 'Brooke Sweat',
          height: 1000,
          mimeType: 'image/jpeg',
          name: 'Brookecrop.jpg',
          size: 119380,
          src: 'https://f.shgcdn.com/1a545bd7-f05b-4e35-9be0-e73240604ca3/',
          storageID: '1a545bd7-f05b-4e35-9be0-e73240604ca3',
          thumbnail:
            'https://frontend.shgcdn.com/1a545bd7-f05b-4e35-9be0-e73240604ca3/-/resize/x70/',
          uuid: '7aa62ba7-d9b5-4f28-882b-b23fb6d7ea90',
          width: 1200,
        },
        name: 'Brooke Sweat',
      },
    ]}
  />
)
