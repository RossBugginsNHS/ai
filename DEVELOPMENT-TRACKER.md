# Development Tracker

> **⚠️ THIS FILE IS FOR TEMPLATE DEVELOPMENT ONLY**  
> This file tracks the development of the AgentMD template repository itself.  
> **Delete this file when the template is complete and ready for use.**

---

## Current Status

**Phase**: Building the AgentMD Framework Template  
**Started**: 2025-11-07  
**Last Updated**: 2025-11-07

---

## 📋 Todo List

### High Priority
- [ ] Document all 42 architecture principles in agent-custom.md template
- [ ] Update all role files to reflect TDD, DDD, and architecture principles
- [ ] Create comprehensive examples for each role's outputs
- [ ] Add guidance on asking about tech stack preferences
- [ ] Add guidance on cloud provider agnosticism

### Core Framework
- [ ] Complete all role default.md files with detailed instructions
- [ ] Add examples to each role custom.md file
- [ ] Create workflow diagrams (Mermaid) for the process
- [ ] Document handover process thoroughly
- [ ] Create troubleshooting guide

### Documentation
- [ ] Enhance README with more examples
- [ ] Create video walkthrough guide
- [ ] Add FAQ section
- [ ] Create contributor guidelines
- [ ] Add license information

### Project Template
- [ ] Complete the projects/_template structure
- [ ] Add language-specific templates (Python, TypeScript, Go, etc.)
- [ ] Create CI/CD workflow templates for GitHub Actions
- [ ] Add Kubernetes manifest templates
- [ ] Add Terraform/IaC templates

### Testing & Validation
- [ ] Test the workflow end-to-end with a sample project
- [ ] Validate all artifacts generate correctly
- [ ] Test handover process across multiple sessions
- [ ] Verify git commit process works
- [ ] Test with different project types

---

## ✅ Done

### 2025-11-07
- [x] Created basic repository structure
- [x] Created 13 role folders with default.md and custom.md
- [x] Added READ-ONLY warnings to all default.md files
- [x] Created docs/artifacts/ structure with .gitkeep files
- [x] Created docs/handovers/ and docs/history/ structures
- [x] Renamed outputs → artifacts throughout
- [x] Implemented collaborative colleague model for Customer role
- [x] Created agent-custom.md for global customizations
- [x] Created .github/copilot-instructions.md
- [x] Added customization system to README
- [x] Started projects/ folder with _template structure
- [x] Defined 42 architecture principles and practices

---

## 📝 Notes & Decisions

### Architecture & Design Principles (2025-11-07)

Comprehensive set of 42 principles to guide all projects:

#### Core Methodologies
1. **Test Driven Development (TDD)** - Tests before code, always
2. **Domain Driven Design (DDD)** - Model the business domain
3. **API-First Design** - Design APIs before implementation
4. **Security by Design** - Security from the start, not bolted on later
5. **Shift Left** - Fail fast, catch issues early
6. **12-Factor App Principles** - For portable, cloud-agnostic applications

#### System Architecture
7. **Event Driven Architecture** - Asynchronous, decoupled communication
8. **Microservices** - Clear service boundaries
9. **Clear Separation of Concerns** - Each component has one responsibility
10. **Idempotency** - Operations can be safely retried
11. **Eventual Consistency** - Embrace it in distributed systems
12. **Backward Compatibility** - Versioning strategy for APIs and events

#### Infrastructure & Deployment
13. **CI/CD Pipeline** - Integrated with GitHub
14. **Infrastructure as Code** - Everything versioned and reproducible
15. **Cloud Provider Agnostic** - Design for portability (ask: AWS/Azure/GCP, but ensure Docker Compose/local alternatives)
16. **Local Development Parity** - Must be able to test and deploy locally
17. **Dev/Prod Parity** - Environments should be as similar as possible
18. **Publishable Artifacts** - Build once, deploy many times
19. **Container Orchestration** - Ask preference (Kubernetes, Docker Swarm, Docker Compose)

#### Quality & Security
20. **Automated Security Scanning** - SAST/DAST in CI/CD (OWASP, STRIDE)
21. **Code Quality Gates** - Linting, formatting, complexity checks in CI/CD
22. **Dependency Management** - Regular updates, vulnerability scanning
23. **Observability** - Logging, metrics, tracing from day one

#### Data & State Management
24. **Database Migrations** - Versioned, reversible, testable
25. **Data Privacy by Design** - GDPR compliance, data minimization
26. **Message Broker Strategy** - Ask preference (Kafka, RabbitMQ, cloud-native)
27. **API Gateway Strategy** - Ask preference (centralized gateway, service mesh, none)
28. **Configuration Management** - Ask how to handle secrets/config across environments

#### Documentation Standards
29. **Use Mermaid for Diagrams** - All diagrams in Mermaid format
30. **Use Markdown** - All documentation in Markdown
31. **Code Blocks Must Specify Language** - Always include language identifier
32. **Architecture Decision Records (ADRs)** - Document why decisions were made
33. **README-Driven Development** - Document before building
34. **OpenAPI/AsyncAPI Specifications** - For REST and event-driven APIs
35. **Changelog Maintenance** - Keep CHANGELOG.md up to date

#### Technology Choices
36. **Always Ask About Tech Stack** - Language, frameworks, specific versions
37. **Never Assume** - If unsure, ask; then suggest if needed
38. **Ask About Hosting** - AWS, Azure, GCP, on-premise, or hybrid

#### Development Practices
39. **Monorepo Structure** - All projects in `/projects` with consistent structure
40. **Trunk-Based Development** - Or short-lived feature branches
41. **Semantic Versioning** - Clear version numbering
42. **Feature Flags** - Toggle features without deployment

### Customization System (2025-11-07)
Three-tier hierarchy:
1. Core behavior: agent.md + role default.md (READ-ONLY)
2. Global customizations: agent-custom.md (EDITABLE)
3. Role customizations: role custom.md (EDITABLE)

### Collaborative Colleague Model (2025-11-07)
Customer role (Role 0) operates as peer colleague, not interviewer.
Natural conversation, working together to scope projects.

---

---

## 📝 Notes & Decisions

### Architecture Principles (2025-11-07)
Decided on 42 core principles covering:
- TDD, DDD, API-First, Security by Design
- Event-driven architecture, microservices
- Cloud-agnostic with local development support
- CI/CD, IaC, observability
- Monorepo structure in /projects

### Customization System (2025-11-07)
Three-tier hierarchy:
1. Core behavior: agent.md + role default.md (READ-ONLY)
2. Global customizations: agent-custom.md (EDITABLE)
3. Role customizations: role custom.md (EDITABLE)

### Collaborative Colleague Model (2025-11-07)
Customer role (Role 0) operates as peer colleague, not interviewer.
Natural conversation, working together to scope projects.

---

## 🎯 Next Steps

1. **Integrate Architecture Principles**: Update agent.md and relevant role files with the 42 principles
2. **Complete Project Template**: Finish creating the template files that were interrupted
3. **Role Enhancement**: Add specific guidance to each role about principles they should emphasize
4. **Examples**: Create at least one complete example walkthrough

---

## 🐛 Known Issues

None currently.

---

## 💡 Ideas for Future

- Integration with project management tools
- Support for multiple programming languages
- Template variations for different project types
- Plugin system for custom roles
- Integration with code generation tools

---

## 🤝 Contributors

- rb (Human) - Framework design and requirements
- GitHub Copilot (Agent) - Implementation and documentation
