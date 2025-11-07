# AgentMD - Conversational Software Development Planning

A workflow system that transforms customer conversations into comprehensive software development plans through 13 sequential roles.

## Quick Start

### For New Projects

1. **Start a conversation** with the agent
2. The agent introduces itself as your colleague (Customer Intake role)
3. Work together collaboratively to scope your project
4. The agent helps you clarify and structure your ideas
5. Together you create a project brief
6. The agent then transitions through specialist roles (1-12)
7. Decide if you want to continue or handover to a new chat context

### For Continuing Projects

1. **Start new chat** with agent in project folder
2. Agent will check for `docs/handovers/handover.md`
3. Agent introduces itself as the next role
4. Agent summarizes where you left off
5. Confirm you want to continue
6. Agent resumes with the next role

## The 13 Roles

| Role | Name | Purpose |
|------|------|---------|
| 0 | Customer Intake | Work as colleagues to scope the project together |
| 1 | Business Analyst | Analyze business needs and stakeholders |
| 2 | Requirements Engineer | Define functional and non-functional requirements |
| 3 | System Architect | Design system architecture and tech stack |
| 4 | Security Architect | Design security controls and threat mitigations |
| 5 | UX/UI Designer | Create user experience and interface designs |
| 6 | Database Designer | Design database schemas and data models |
| 7 | API Designer | Specify API contracts and integrations |
| 8 | DevOps Engineer | Plan infrastructure and CI/CD pipelines |
| 9 | Test Architect | Define testing strategies and quality assurance |
| 10 | Technical Lead | Create implementation roadmap and standards |
| 11 | Documentation Writer | Write user guides and technical documentation |
| 12 | Project Manager | Create project plan, timeline, and risk register |

## Folder Structure

```
agentmd/
├── docs/                       # All project documentation
│   ├── artifacts/             # All role artifacts
│   │   ├── 00-customer/       # Project brief
│   │   ├── 01-business-analyst/   # Business analysis
│   │   ├── 02-requirements-engineer/
│   │   ├── 03-system-architect/
│   │   ├── 04-security-architect/
│   │   ├── 05-ux-ui-designer/
│   │   ├── 06-database-designer/
│   │   ├── 07-api-designer/
│   │   ├── 08-devops-engineer/
│   │   ├── 09-test-architect/
│   │   ├── 10-technical-lead/
│   │   ├── 11-documentation-writer/
│   │   └── 12-project-manager/
│   ├── history/               # Interaction logs
│   │   └── [timestamp]-[role].md
│   ├── handovers/             # Context management
│   │   ├── handover.md        # Current handover
│   │   └── handover-histories/    # Past handovers
│   └── roles/                 # Role definitions
└── agent.md                    # Agent instructions
```

## Key Features

### 🗣️ Conversational Interface
No need to write a project brief manually. Just talk to the agent about your idea.

### 🎯 Customizable Behavior
Personalize the agent through `/agent-custom.md` and role-specific `custom.md` files.

### 📝 Comprehensive Artifacts
50+ detailed documents covering every aspect of software development planning.

### 🔄 Context Handovers
Long projects can span multiple chat sessions without losing context.

### 📊 Complete History
Every interaction is logged with timestamps and decisions.

### ⏰ UTC Timestamps
All times use UTC in `yyyyMMdd-HHmm` format for consistency.

### 🔒 Version Control
Automatic git commits at role transitions.

## Customization

### Global Customizations (`/agent-custom.md`)

Customize the agent's behavior for your organization:
- Preferred technologies and frameworks
- Organizational standards and constraints
- Communication preferences
- Compliance requirements
- Budget and resource limitations

### Role-Specific Customizations (`docs/roles/*/custom.md`)

Each role can be customized with:
- Persona names for more engaging interactions
- Role-specific preferences and standards
- Custom templates and examples
- Industry-specific guidelines (e.g., healthcare, finance)

**Note**: The core instructions in `agent.md` and role `default.md` files are READ-ONLY. All customizations go in the appropriate `custom.md` files.

### 🎭 Role Personas
Each role can have a custom persona name for more engaging interactions.

## Workflow Examples

### Example 1: Quick Session (1-2 Roles)

```
Human: Hi, I want to build a task management app
Agent (as Colleague): Great! Let's work together to scope this out. Tell me more about 
                       what you're envisioning - what problem are you trying to solve?
Human: Our team struggles to track tasks across multiple projects...
Agent: I see. So we're looking at multi-project task management. Have you thought about 
       how many users? What's most important - simplicity or advanced features?
Human: [Discussion continues - working together to clarify scope]
Agent: Perfect. I've captured what we discussed in the project brief. 
       Now I'll switch to Business Analyst role to analyze the business needs...
Agent (as Business Analyst): [Creates business analysis artifacts]
Agent: "I've completed the Business Analyst role. Ready to switch to Requirements Engineer?"
Human: Yes, prepare handover
Agent: [Creates handover, commits changes]
Agent: "Handover ready. Start new chat when ready."
```

### Example 2: Continuing from Handover

```
[New chat context]
Agent: [Checks docs/handovers/handover.md]
Agent: "I found a handover from Business Analyst role completed on 2025-11-07 14:30 UTC.
       We analyzed the business requirements for your task management app.
       Ready to continue with Requirements Engineer role?"
Human: Yes, let's continue
Agent: [Archives handover, begins Requirements Engineer role]
```

### Example 3: Multi-Day Project

**Day 1 (Roles 0-4)**
- Customer intake
- Business analysis
- Requirements engineering
- System architecture
- Security architecture
- Handover created

**Day 2 (Roles 5-8)**
- Resume from handover
- UX/UI design
- Database design
- API design
- DevOps planning
- Handover created

**Day 3 (Roles 9-12)**
- Resume from handover
- Testing strategy
- Implementation planning
- Documentation
- Project management
- Project ready! 🚀

## File Naming Conventions

### History Files
`[yyyyMMdd-HHmm]-[role-number]-[role-name].md`

**Examples:**
- `20251107-1430-00-customer.md`
- `20251107-1545-01-business-analyst.md`

### Handover Archives
`[yyyyMMdd-HHmm]-handover.md`

**Examples:**
- `20251107-1630-handover.md`
- `20251108-0915-handover.md`

### Git Commits
`Completed [Role Name] - [yyyyMMdd-HHmm]`

**Examples:**
- `Completed Business Analyst - 20251107-1545`
- `Completed Requirements Engineer - 20251107-1630`

## Tips for Success

### For Customers

✅ **Do:**
- Be specific about your needs and constraints
- Answer questions honestly (budget, timeline, technical knowledge)
- Ask for clarification if something is unclear
- Review artifacts at role transitions
- Request handovers for long sessions

❌ **Don't:**
- Rush through conversations - details matter
- Hide constraints or concerns
- Skip role reviews
- Let sessions run too long without handovers

### For the Agent

✅ **Do:**
- Ask clarifying questions
- Create detailed, actionable artifacts
- Document decisions and rationale
- Use UTC timestamps consistently
- Commit changes at role transitions
- Create clear handovers

❌ **Don't:**
- Make assumptions - ask questions
- Skip history logging
- Forget to commit after handovers
- Use local times (always UTC)

## Customization

### Skipping Roles

If a role isn't relevant (e.g., "no database needed"), you can:
1. Create a minimal artifact noting why it's not applicable
2. Document the decision in history
3. Proceed to next role

### Revisiting Roles

If later roles reveal gaps:
1. Note the issue in current role's history
2. Return to the earlier role
3. Update the artifact
4. Document why the revision was needed
5. Continue forward

### Custom Roles

You can add custom roles by:
1. Creating a new role definition in `docs/roles/`
2. Adding output folder in `outputs/`
3. Updating workflow sequence
4. Documenting the role's inputs and outputs

## Troubleshooting

### "Can't find handover file"
- Check if `handovers/handover.md` exists
- If not, this is a new project - start from Role 0

### "Lost context between sessions"
- Check `handovers/handover-histories/` for archived handovers
- Review recent history files in `history/`

### "Timestamp format incorrect"
- Always use UTC time
- Format: `yyyyMMdd-HHmm` for filenames
- Format: `YYYY-MM-DD HH:mm UTC` for display

### "Git commit failed"
- Ensure you're in a git repository
- Check for uncommitted changes
- Review `.gitignore` settings

## Best Practices

1. **One role at a time**: Don't rush through multiple roles in one session
2. **Review artifacts**: Check outputs before proceeding
3. **Use handovers**: For sessions >1 hour or >2-3 roles
4. **Keep history**: Never delete history or handover archives
5. **UTC always**: Never use local time zones
6. **Commit often**: Let the agent handle commits at transitions
7. **Ask questions**: Both customer and agent should clarify doubts

## Getting Help

- **Agent Instructions**: See `agent.md`
- **Role Details**: Check `docs/roles/[role-name].md`
- **Workflow Overview**: See `docs/roles-and-artifacts.md`
- **Folder Purpose**: Read `README.md` in each folder

## License

[Your License Here]

---

**Ready to start?** Just say "Hi" to the agent and describe your project idea! 🚀
