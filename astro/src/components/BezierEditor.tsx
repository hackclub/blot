import { useState } from 'preact/hooks'
import { addToRef } from '../lib/addToRef.js'
import styles from './BezierEditor.module.css'

export const BezierEditor = ({ initialValue, onChange }) => {
  const { yStart, p0, p1, yEnd } = initialValue

  const [p0x, p0y] = p0
  const [p1x, p1y] = p1

  const [yStartView, set_yStartView] = useState(yStart)
  const [p0xView, set_p0xView] = useState(p0x)
  const [p0yView, set_p0yView] = useState(p0y)
  const [p1xView, set_p1xView] = useState(p1x)
  const [p1yView, set_p1yView] = useState(p1y)
  const [yEndView, set_yEndView] = useState(yEnd)

  const pointRef = {
    yStartView,
    p0xView,
    p0yView,
    p1xView,
    p1yView,
    yEndView
  }

  const change = () => {
    set_yStartView(pointRef.yStartView)
    set_p0xView(pointRef.p0xView)
    set_p0yView(pointRef.p0yView)
    set_p1xView(pointRef.p1xView)
    set_p1yView(pointRef.p1yView)
    set_yEndView(pointRef.yEndView)

    onChange({
      yStart: pointRef.yStartView,
      p0: [pointRef.p0xView, pointRef.p0yView],
      p1: [pointRef.p1xView, pointRef.p1yView],
      yEnd: pointRef.yEndView
    })
  }

  // const [scale, set_scale] = useState(1);

  const ref = addToRef({ change, pointRef })

  return (
    <div class={styles.container}>
      <svg
        ref={ref}
        class={['bez-ctrl', styles.bezCtrl].join(' ')}
        width="250"
        height="250"
        viewBox="0.05 -1.05 1.1 2.1"
        xmlns="http://www.w3.org/2000/svg">
        {drawGrid({
          xMin: 0,
          xMax: 1,
          xStep: 0.1,
          yMin: -1,
          yMax: 1,
          yStep: 0.1
        })}
        <path
          d={`M0,${yStartView} C ${p0xView},${p0yView} ${p1xView},${p1yView} 1,${yEndView}`}
          stroke-width=".05px"
          stroke="black"
          fill="none"
        />
        <line
          x1="0"
          y1={`${yStartView}`}
          x2={`${p0xView}`}
          y2={`${p0yView}`}
          stroke="black"
          stroke-width="0.01"
          stroke-dasharray="0.02,0.02"
        />
        <line
          x1="1"
          y1={`${yEndView}`}
          x2={`${p1xView}`}
          y2={`${p1yView}`}
          stroke="black"
          stroke-width="0.01"
          stroke-dasharray="0.02,0.02"
        />

        <circle
          class="bez-handle start"
          cx="0"
          cy={`${yStartView}`}
          r=".05"
          fill="red"
        />
        <circle
          class="bez-handle h0"
          cx={`${p0xView}`}
          cy={`${p0yView}`}
          r=".05"
          fill="red"
        />
        <circle
          class="bez-handle h1"
          cx={`${p1xView}`}
          cy={`${p1yView}`}
          r=".05"
          fill="red"
        />
        <circle
          class="bez-handle end"
          cx="1"
          cy={`${yEndView}`}
          r=".05"
          fill="red"
        />
      </svg>

      <div>start: {yStartView.toFixed(2)},</div>
      <div>
        handle0: [{p0xView.toFixed(1)},{p0yView.toFixed(1)}],
      </div>
      <div>
        handle1: [{p1xView.toFixed(1)},{p1yView.toFixed(1)}],
      </div>
      <div>end: {yEndView.toFixed(2)}</div>
      {/*<div>scale: {scale.toFixed(2)}</div>*/}
      {/*<input type="range" min="0" max="20" step="0.01" value={scale} onChange={(e) => set_scale(Number(e.target.value))}/>*/}
    </div>
  )
}

function drawGrid({ xMin, xMax, xStep, yMin, yMax, yStep }) {
  const xLines = []
  for (let i = xMin; i <= xMax; i += xStep) {
    xLines.push(<line x1={i} y1={yMin} x2={i} y2={yMax} />)
  }

  const yLines = []
  for (let i = yMin; i <= yMax; i += yStep) {
    yLines.push(<line x1={xMin} y1={i} x2={xMax} y2={i} />)
  }

  return (
    <>
      <g stroke="lightgray" stroke-width="0.005">
        {xLines}
      </g>

      <g stroke="lightgray" stroke-width="0.005">
        {yLines}
      </g>
    </>
  )
}
