
import './style.css'

document.querySelector('#app').innerHTML = `
  <header class="site-header">
    <a class="brand" href="#home" aria-label="DeploySteps home">
      <span class="brand-mark">D</span>
      <span>Deploy<span class="brand-light">Steps</span></span>
    </a>

    <nav class="nav-links" aria-label="Main navigation">
      <a href="#features">Features</a>
      <a href="#pipeline">Pipeline</a>
      <a href="#technology">Technology</a>
    </nav>

    <a
      class="nav-github"
      href="https://github.com/L00205909/DeploySteps"
      target="_blank"
      rel="noreferrer"
    >
      GitHub <span aria-hidden="true">↗</span>
    </a>
  </header>

  <main>
    <section class="hero-section" id="home">
      <div class="hero-content">
        <div class="eyebrow">
          <span class="status-dot"></span>
          A PRACTICAL DEVOPS PROJECT
        </div>

        <h1>
          From code<br />
          to <span class="gradient-text">production.</span>
        </h1>

        <p class="hero-description">
          Build, test and deploy with confidence.
          DeploySteps demonstrates a modern CI/CD workflow
          using automation, containers and cloud infrastructure.
        </p>

        <div class="hero-actions">
          <a class="button button-primary" href="#pipeline">
            Explore the pipeline <span aria-hidden="true">→</span>
          </a>
          <a
            class="button button-secondary"
            href="https://github.com/L00205909/DeploySteps"
            target="_blank"
            rel="noreferrer"
          >
            View on GitHub ↗
          </a>
        </div>

        <div class="hero-meta">
          <span><span class="meta-dot"></span> Automation first</span>
          <span>Built with modern DevOps tools</span>
        </div>
      </div>

      <div class="terminal-card" aria-label="Example CI/CD pipeline output">
        <div class="terminal-top">
          <div class="terminal-dots">
            <span></span><span></span><span></span>
          </div>
          <span>deploysteps / pipeline</span>
          <span class="terminal-live">● LIVE FLOW</span>
        </div>

        <div class="terminal-body">
          <div class="terminal-command">
            <span class="prompt">$</span> git push origin main
          </div>
          <div class="terminal-line">
  <span class="check">✓</span>
  <span>Source control — GitHub</span>
</div>
<div class="terminal-line">
  <span class="check">✓</span>
  <span>Automated tests &amp; code quality</span>
</div>
<div class="terminal-line">
  <span class="check">✓</span>
  <span>Security scanning — npm audit &amp; Trivy</span>
</div>
<div class="terminal-line">
  <span class="check">✓</span>
  <span>Docker build &amp; ECR image push</span>
</div>
<div class="terminal-line">
  <span class="check">✓</span>
  <span>AWS EC2 deployment via SSM</span>
</div>
<div class="terminal-line">
  <span class="check">✓</span>
  <span>Prometheus &amp; Grafana monitoring</span>
</div>

<div class="terminal-result">
  <span class="result-indicator"></span>
  DEPLOYSTEPS DELIVERY
  <strong>PIPELINE CONFIGURED</strong>
</div>
        </div>
      </div>
    </section>

    <section class="tech-strip" id="technology">
      <p>POWERED BY MODERN TECHNOLOGY</p>
      <div class="tech-list">
        <span>GitHub Actions</span>
        <span>Docker</span>
        <span>AWS</span>
        <span>Terraform</span>
        <span>Prometheus</span>
        <span>Grafana</span>
      </div>
    </section>

    <section class="content-section" id="features">
      <div class="section-heading">
        <span class="section-label">WHAT IS DEPLOYSTEPS?</span>
        <h2>Development meets automation.</h2>
        <p>
          A hands-on project exploring the tools and practices
          behind reliable software delivery.
        </p>
      </div>

      <div class="feature-grid">
        <article class="feature-card">
          <div class="feature-icon blue-icon">↗</div>
          <h3>Continuous Integration</h3>
          <p>
            Automatically validate every change with code quality
            checks, automated tests and build workflows.
          </p>
          <span class="feature-tag">GitHub Actions</span>
        </article>

        <article class="feature-card">
          <div class="feature-icon purple-icon">▣</div>
          <h3>Containerisation</h3>
          <p>
            Package applications into consistent Docker images
            and manage services with Docker Compose.
          </p>
          <span class="feature-tag">Docker</span>
        </article>

        <article class="feature-card">
          <div class="feature-icon green-icon">⌁</div>
          <h3>Cloud Infrastructure</h3>
          <p>
            Provision and manage cloud resources through
            repeatable Infrastructure as Code.
          </p>
          <span class="feature-tag">AWS · Terraform</span>
        </article>

        <article class="feature-card">
          <div class="feature-icon orange-icon">◉</div>
          <h3>Monitoring</h3>
          <p>
            Collect infrastructure metrics and visualise
            system health through monitoring dashboards.
          </p>
          <span class="feature-tag">Prometheus · Grafana</span>
        </article>
      </div>
    </section>

    <section class="pipeline-section" id="pipeline">
  <div class="section-heading">
    <span class="section-label">CI/CD WORKFLOW</span>
    <h2>From commit to cloud deployment.</h2>
    <p>
      Every code change passes through automated quality checks,
      security scanning and container deployment before reaching AWS.
    </p>
  </div>

  <div class="pipeline-flow">
    <article class="pipeline-step">
      <span class="step-number">01</span>
      <span class="step-icon">⌘</span>
      <strong>Source Control</strong>
      <small>GitHub Repository</small>
      <span class="step-detail">Version control &amp; collaboration</span>
    </article>

    <span class="flow-arrow">→</span>

    <article class="pipeline-step">
      <span class="step-number">02</span>
      <span class="step-icon">✓</span>
      <strong>Build &amp; Test</strong>
      <small>GitHub Actions</small>
      <span class="step-detail">ESLint · Vitest · Vite</span>
    </article>

    <span class="flow-arrow">→</span>

    <article class="pipeline-step">
      <span class="step-number">03</span>
      <span class="step-icon">⌕</span>
      <strong>Security Scan</strong>
      <small>npm audit · Trivy</small>
      <span class="step-detail">Dependency &amp; image scanning</span>
    </article>

    <span class="flow-arrow">→</span>

    <article class="pipeline-step">
      <span class="step-number">04</span>
      <span class="step-icon">▣</span>
      <strong>Containerisation</strong>
      <small>Docker · Amazon ECR</small>
      <span class="step-detail">Build &amp; push image</span>
    </article>

    <span class="flow-arrow">→</span>

    <article class="pipeline-step">
      <span class="step-number">05</span>
      <span class="step-icon">☁</span>
      <strong>Cloud Deployment</strong>
      <small>AWS EC2 · SSM</small>
      <span class="step-detail">Automated application deployment</span>
    </article>

    <span class="flow-arrow">→</span>

    <article class="pipeline-step">
      <span class="step-number">06</span>
      <span class="step-icon">◉</span>
      <strong>Monitoring</strong>
      <small>Prometheus · Grafana</small>
      <span class="step-detail">Metrics &amp; observability</span>
    </article>
  </div>
</section>

    <section class="closing-section">
      <span class="section-label">THE PROJECT</span>
      <h2>Learn by building.<br /><span class="gradient-text">Improve by automating.</span></h2>
      <p>
        DeploySteps is an evolving DevOps project.
        Every improvement is an opportunity to test the pipeline.
      </p>
      <a
        class="button button-primary"
        href="https://github.com/L00205909/DeploySteps"
        target="_blank"
        rel="noreferrer"
      >
        Explore the repository ↗
      </a>
    </section>
  </main>

  <footer class="site-footer">
    <a class="brand footer-brand" href="#home">
      <span class="brand-mark">D</span>
      <span>Deploy<span class="brand-light">Steps</span></span>
    </a>
    <p>Build. Test. Deploy. Repeat.</p>
    <span>© ${new Date().getFullYear()} DeploySteps</span>
  </footer>
`
