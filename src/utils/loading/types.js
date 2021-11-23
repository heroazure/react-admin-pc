import { isNum, isStr } from '../dataType'

/* eslint-disable */
export const loadingTypes = {
  plane: 'plane',
  chase: 'chase',
  fold: 'fold',
  grid: 'grid',
  wander: 'wander',
  circle: 'circle',
  circleFade: 'circle-fade',
  'circle-fade': 'circle-fade',
  bounce: 'bounce',
  wave: 'wave',
  pulse: 'pulse',
  flow: 'flow',
  swing: 'swing',
}
export function getLoadingContent(option) {
  let { type, size } = option || {}
  if (isNum(size)) {
    size = size + 'px'
  }
  let style = ''
  if (isStr(size)) {
    style += `width:${size};height:${size};`
  }
  const content = {
    plane: '',
    pulse: '',
    flow: `
            <div class="sk-flow-dot"></div>
            <div class="sk-flow-dot"></div>
            <div class="sk-flow-dot"></div>`,
    swing: `
              <div class="sk-swing-dot"></div>
              <div class="sk-swing-dot"></div>`,
    bounce: `
              <div class="sk-bounce-dot"></div>
              <div class="sk-bounce-dot"></div>
            `,
    wave: `
              <div class="sk-wave-rect"></div>
              <div class="sk-wave-rect"></div>
              <div class="sk-wave-rect"></div>
              <div class="sk-wave-rect"></div>
              <div class="sk-wave-rect"></div>
            `,
    chase: `
              <div class="sk-chase-dot"></div>
              <div class="sk-chase-dot"></div>
              <div class="sk-chase-dot"></div>
              <div class="sk-chase-dot"></div>
              <div class="sk-chase-dot"></div>
              <div class="sk-chase-dot"></div>
            `,
    fold: `
            <div class="sk-fold-cube"></div>
            <div class="sk-fold-cube"></div>
            <div class="sk-fold-cube"></div>
            <div class="sk-fold-cube"></div>
          `,
    grid: `
            <div class="sk-grid-cube"></div>
            <div class="sk-grid-cube"></div>
            <div class="sk-grid-cube"></div>
            <div class="sk-grid-cube"></div>
            <div class="sk-grid-cube"></div>
            <div class="sk-grid-cube"></div>
            <div class="sk-grid-cube"></div>
            <div class="sk-grid-cube"></div>
            <div class="sk-grid-cube"></div>
          `,
    wander: `
              <div class="sk-wander-cube"></div>
              <div class="sk-wander-cube"></div>
              <div class="sk-wander-cube"></div>
            `,
    circle: `
              <div class="sk-circle-dot"></div>
              <div class="sk-circle-dot"></div>
              <div class="sk-circle-dot"></div>
              <div class="sk-circle-dot"></div>
              <div class="sk-circle-dot"></div>
              <div class="sk-circle-dot"></div>
              <div class="sk-circle-dot"></div>
              <div class="sk-circle-dot"></div>
              <div class="sk-circle-dot"></div>
              <div class="sk-circle-dot"></div>
              <div class="sk-circle-dot"></div>
              <div class="sk-circle-dot"></div>
            `,
    'circle-fade': `
          <div class="sk-circle-fade-dot"></div>
          <div class="sk-circle-fade-dot"></div>
          <div class="sk-circle-fade-dot"></div>
          <div class="sk-circle-fade-dot"></div>
          <div class="sk-circle-fade-dot"></div>
          <div class="sk-circle-fade-dot"></div>
          <div class="sk-circle-fade-dot"></div>
          <div class="sk-circle-fade-dot"></div>
          <div class="sk-circle-fade-dot"></div>
          <div class="sk-circle-fade-dot"></div>
          <div class="sk-circle-fade-dot"></div>
          <div class="sk-circle-fade-dot"></div>
        `,
  }[type]
  return `<div class="sk-${type}" style="z-index: 1;${style}">${content}</div>`
}
