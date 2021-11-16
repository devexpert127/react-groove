import React from 'react'
import RichText from 'frontend-ui/RichText'
import PageWidth from 'Components/PageWidth'
import EmbedScript from 'Components/EmbedScript'

import './styles.css'

const JobList = ({ title, content }) => {
  return (
    <section className="JobList">
      <PageWidth>
        <h2 className="JobList-title">{title}</h2>

        <div className="JobList-text">
          <RichText source={content} />
        </div>
      </PageWidth>

      <EmbedScript
        scriptSource="//newton.newtonsoftware.com/career/iframe.action?clientId=8a7883d06fb6ed51016ff35e353b31ec"
        scriptAttrs={{ id: 'gnewtonjs' }}
        nested={true}
      />
    </section>
  )
}

export default JobList
