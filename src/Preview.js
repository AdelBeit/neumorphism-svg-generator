import React, { useEffect, useRef } from 'react'
import { LightSource } from './App.style'

const Preview = ({ previewBox, setActiveLightSource }) => {
  const lightSources = useRef([])
  useEffect(() => {
    lightSources.current = [...document.querySelectorAll('.light-source')]
  }, [])
  const setLightSource = e => {
    lightSources.current.forEach(element => {
      element.classList.remove('active')
    })
    e.target.classList.add('active')
    setActiveLightSource(parseInt(e.target.dataset.value))
  }
  return (
    <div className="preview">
      <LightSource
        top="0"
        bottom="unset"
        right="0"
        left="unset"
        data-value="2"
        onClick={setLightSource}
        className="light-source"
      ></LightSource>
      <LightSource
        top="0"
        bottom="unset"
        right="unset"
        left="0"
        data-value="1"
        onClick={setLightSource}
        className="light-source active"
      ></LightSource>
      <LightSource
        top="unset"
        bottom="0"
        right="0"
        left="unset"
        data-value="3"
        onClick={setLightSource}
        className="light-source"
      ></LightSource>
      <LightSource
        top="unset"
        bottom="0"
        right="unset"
        left="0"
        data-value="4"
        onClick={setLightSource}
        className="light-source"
      ></LightSource>
      <div ref={previewBox} className="soft-element soft-shadow"></div>

      <div className="soft-element svg">
        <svg>
          <filter id="inset-shadow">
            {/* Dark shadow offset */}
            <feOffset id="inset:dark-offset" dx="4" dy="4" />

            {/* Shadow blur */}
            <feGaussianBlur id="inset:blur" stdDeviation="5" result="offset-blur" />

            {/* Invert drop shadow to make an inset shadow */}
            <feComposite
              operator="out"
              in="SourceGraphic"
              in2="offset-blur"
              result="dark-inverse"
            />

            {/* Cut dark color inside shadow */}
            <feFlood
              id="inset:dark-color"
              flood-color="#b2b2b2"
              flood-opacity="1"
              result="dark-color"
            />
            <feComposite operator="in" in="dark-color" in2="inverse" result="dark-shadow" />
            <feComposite operator="over" in="dark-shadow" in2="SourceGraphic" />

            {/* Light shadow offset */}
            {/* <feOffset id="inset:light-offset" dx="4" dy="4" /> */}

            {/* Cut light color inside shadow */}
            {/* <feFlood
              id="inset:light-color"
              flood-color="#f0f0f0"
              flood-opacity="1"
              result="light-color"
            />
            <feComposite operator="in" in="light-color" in2="inverse" result="light-shadow" /> */}

            {/* Placing shadow over element */}
            {/* <feComposite operator="over" in="dark-shadow" in2="SourceGraphic" /> */}
            {/* <feComposite operator="over" in="light-shadow" in2="SourceGraphic" /> */}

            {/* <feMerge>
              <feMergeNode in="dark-shadow" />
              <feMergeNode in="light-shadow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge> */}
          </filter>
          <rect
            className="stop_SVG"
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="#EBF4FF"
            filter="url(#inset-shadow)"
          />
        </svg>
      </div>
    </div>
  )
}

export default Preview
