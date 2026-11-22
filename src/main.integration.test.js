
// @vitest-environment jsdom

import { beforeEach, describe, expect, it, vi } from 'vitest'

describe('DeploySteps website integration', () => {
  beforeEach(async () => {
    vi.resetModules()
    document.body.innerHTML = '<div id="app"></div>'

    await import('./main.js')
  })

  it('renders the application inside the app element', () => {
    const app = document.querySelector('#app')

    expect(app).not.toBeNull()
    expect(app.innerHTML.trim().length).toBeGreaterThan(0)
  })

  it('ensures navigation links point to existing elements', () => {
    const links = document.querySelectorAll('nav a[href^="#"]')

    expect(links.length).toBeGreaterThan(0)

    links.forEach((link) => {
      const target = document.querySelector(link.getAttribute('href'))
      expect(target).not.toBeNull()
    })
  })
})
