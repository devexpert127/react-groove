import React, { useEffect, useState, useRef } from 'react'
import cx from 'classnames'
import Player from '@vimeo/player'

import './styles.css'

const VideoBannerVimeo = ({ videoId = null, videoTitle = '' }) => {
  if (!videoId) return null
  const [videoDimensions, setVideoDimensions] = useState(null)
  const [iFrameTitle, setIFrameTitle] = useState(videoTitle)

  const hasDimensions =
    videoDimensions && videoDimensions.width && videoDimensions.height ? true : false

  // See why we are rounding this way
  // https://stackoverflow.com/questions/11832914/round-to-at-most-2-decimal-places-only-if-necessary#comment24719818_11832950
  const mathRound = (number, decimals) => +(Math.round(number + `e+${decimals}`) + `e-${decimals}`)
  const percentage = (number, decimals) => mathRound(number * 100, decimals)
  const calcVideoRatio = dimensions => (hasDimensions ? dimensions.height / dimensions.width : null)
  const getVideoRatio = () => {
    let ratio = ''
    if (hasDimensions) {
      const ratioDecimal = calcVideoRatio(videoDimensions)
      switch (`${percentage(ratioDecimal, 2)}`) {
        case '52.73':
          ratio = '17x9'
          break
        case '75':
          ratio = '4x3'
          break
        default:
          ratio = '16x9'
      }
    }

    return ratio
  }

  const videoPlayerRef = useRef(null)
  useEffect(() => {
    if (videoPlayerRef && videoPlayerRef.current) {
      const vimeoPlayer = new Player(videoPlayerRef.current)
      vimeoPlayer
        .loadVideo(Number(videoId))
        .then(() => {})
        .catch(error => {
          switch (error.name) {
            case 'TypeError':
              // the id was not a number
              console.debug(`TypeError : the id was not a number`)
              break

            case 'PasswordError':
              // the video is password-protected and the viewer needs to enter the
              // password first
              console.debug(
                `PasswordError :  the video is password-protected and the viewer needs to enter the password first`,
              )

              break

            case 'PrivacyError':
              // the video is password-protected or private
              console.debug(`PrivacyError : the video is password-protected or private`)
              break

            default:
              // some other error occurred
              console.debug(`Unknown error (${error.name}) : some other error occurred`)
              break
          }
        })

      Promise.all([
        vimeoPlayer.getVideoTitle(),
        vimeoPlayer.getVideoWidth(),
        vimeoPlayer.getVideoHeight(),
      ]).then(response => {
        const [title, width, height] = response
        if (videoTitle === '') {
          setIFrameTitle(title)
        }
        setVideoDimensions({
          width: width,
          height: height,
        })
      })
    }
  }, [videoPlayerRef])

  // ------
  // classes for component
  // ------
  const baseClass = 'VideoBannerVimeo'
  const playerClass = `${baseClass}-player`
  const classRatio = `${baseClass}--${getVideoRatio()}`

  // Todo: we could possibly remove the iframe and let VideoPlayer load in the iFrame
  // This would require loading the js for vimeo seperatley into the site.
  return (
    <section className={cx(baseClass, classRatio)}>
      <iframe
        ref={videoPlayerRef}
        className={cx(playerClass)}
        src={`https://player.vimeo.com/video/${videoId}`}
        frameBorder="0"
        webkitallowfullscreen="true"
        mozallowfullscreen="true"
        allowFullScreen={true}
        title={iFrameTitle}
      />
    </section>
  )
}

export default VideoBannerVimeo
