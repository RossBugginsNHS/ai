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
