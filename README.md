# TraceX 🔎

### Digital Forensics & Incident Response Analysis Platform

> **TraceX** is a digital forensics investigation platform designed to organize forensic investigations, analyze digital evidence, reconstruct investigation timelines, and present findings through a structured and investigator-friendly interface.

**Problem Statement:** SIH 2026 – PS 26148
**Domain:** Cybersecurity / Digital Forensics & Incident Response (DFIR)

---

## 🚀 Live Demo

**TraceX:**
https://dfir-lab.preview.emergentagent.com

**GitHub Repository:**
https://github.com/devinamounisha/TraceX

---

## 📌 Overview

Digital forensic investigations often involve large amounts of technical information collected from different sources.

Investigators may need to work with:

* Files and digital artifacts
* Evidence metadata
* Hash values
* Investigation cases
* Event information
* Timestamps
* Network and system-related information
* Investigation notes
* Evidence relationships
* Forensic findings

When these activities are handled manually through separate tools and files, maintaining a clear investigation workflow can become difficult.

**TraceX brings the investigation workflow into a unified digital environment.**

The platform is designed to help an investigator move from:

**Case Creation → Evidence Handling → Analysis → Timeline Reconstruction → Investigation → Findings → Reporting**

instead of managing every step independently.

---

# 🎯 Problem Addressed

The SIH problem statement focuses on creating scripts/functions using a new programming language or environment to support **Computer & Network Forensic Analysis**.

Traditional forensic workflows can require investigators to execute multiple commands, inspect different outputs, correlate timestamps, maintain evidence information, and finally prepare investigation reports.

TraceX provides a structured interface around this workflow.

The objective is not to replace a forensic examiner.

Instead, TraceX acts as an **investigation workspace** that helps organize and present forensic analysis activities in a systematic manner.

---

# 💡 Our Solution

TraceX provides a centralized DFIR environment where an investigator can manage an investigation from a single application.

The platform is designed around a simple investigation lifecycle:

```text
                    ┌──────────────────┐
                    │   Create Case    │
                    └────────┬─────────┘
                             ↓
                    ┌──────────────────┐
                    │  Collect / Add   │
                    │     Evidence     │
                    └────────┬─────────┘
                             ↓
                    ┌──────────────────┐
                    │ Evidence Analysis│
                    └────────┬─────────┘
                             ↓
                    ┌──────────────────┐
                    │ Timeline / Event │
                    │   Reconstruction │
                    └────────┬─────────┘
                             ↓
                    ┌──────────────────┐
                    │    Findings      │
                    └────────┬─────────┘
                             ↓
                    ┌──────────────────┐
                    │ Investigation    │
                    │     Report       │
                    └──────────────────┘
```

---

# ✨ Key Features

## 1. 🗂️ Case Management

TraceX organizes investigations into individual cases.

Each investigation can be handled as a separate workspace, allowing investigators to keep case information and related evidence organized.

### Benefits

* Centralized case information
* Structured investigation workflow
* Easier case tracking
* Separation of different investigations

---

## 2. 🔐 Evidence Management

Digital evidence is one of the most important components of a forensic investigation.

TraceX provides a structured environment for working with evidence and its associated information.

Evidence can be connected to an investigation so that investigators can examine relevant information without losing the context of the case.

---

## 3. #️⃣ Evidence Integrity & Hashing

Cryptographic hashes are important in digital forensics because they allow investigators to verify whether digital evidence has changed.

TraceX can incorporate hash information into the evidence workflow so that evidence integrity can be checked and documented.

Conceptually:

```text
Original Evidence
       │
       ↓
   SHA-256 Hash
       │
       ↓
Evidence Record
       │
       ↓
Later Verification
       │
       ↓
Compare Hash Values
       │
 ┌─────┴─────┐
 ↓           ↓
MATCH      DIFFERENT
 ↓           ↓
Integrity   Investigate
Maintained  Possible Change
```

> Hash verification supports evidence integrity checking; it does not by itself establish the complete legal chain of custody.

---

# 4. 🕒 Timeline Reconstruction

A forensic investigation often requires understanding **what happened and when**.

TraceX provides a timeline-oriented approach for organizing events chronologically.

This helps investigators correlate events from different sources and understand the sequence of activity.

```text
Event A ──────→ Event B ──────→ Event C ──────→ Event D
   │               │               │               │
Timestamp       Timestamp       Timestamp       Timestamp
```

A chronological view can make relationships between events easier to understand than examining isolated records.

---

# 5. 🔍 Investigation & Analysis

TraceX is designed to bring relevant investigation information into a common workspace.

Instead of treating each artifact as an isolated piece of information, the investigator can use the case context to connect evidence, events, and findings.

The investigator remains responsible for interpreting the evidence.

---

# 6. 📊 Findings & Investigation Summary

Investigation results can be organized into structured findings.

This allows an investigator to move from raw evidence toward documented observations.

The general workflow is:

```text
Evidence
   ↓
Observation
   ↓
Correlation
   ↓
Finding
   ↓
Investigator Review
   ↓
Final Report
```

This keeps the human investigator in the decision-making loop.

---

# 7. 📄 Forensic Reporting

A forensic investigation is not complete simply because evidence has been analyzed.

The results must also be communicated clearly.

TraceX is designed to support structured reporting by bringing investigation information together into a single workflow.

A report can contain information such as:

* Case information
* Evidence information
* Investigation observations
* Timeline information
* Findings
* Relevant metadata
* Integrity information

---

# 8. 🧩 Modular Architecture

TraceX is organized into separate modules rather than putting the entire application into a single file.

The repository contains dedicated areas for:

```text
app/
components/
constants/
drizzle/
hooks/
lib/
scripts/
server/
shared/
tests/
```

This makes the project easier to maintain and extend.

---

# 🏗️ System Architecture

```text
                    TRACE-X
                       │
        ┌──────────────┼──────────────┐
        ↓              ↓              ↓
   User Interface   Application     Database
        │             Logic           Layer
        │               │               │
        └───────────────┼───────────────┘
                        ↓
                  Backend API
                        │
                        ↓
              Investigation Data
                        │
          ┌─────────────┼─────────────┐
          ↓             ↓             ↓
       Evidence      Timeline       Findings
          │             │             │
          └─────────────┼─────────────┘
                        ↓
                  Final Report
```

---

# 🛠️ Technology Stack

## Frontend

* React
* React Native
* Expo
* Expo Router
* React Native Web
* TypeScript
* NativeWind
* Tailwind CSS

The project is configured for both native Expo environments and web deployment.

## Backend

* Node.js
* Express
* TypeScript
* tRPC

The backend exposes the application API through Express and tRPC.

## Database

* Drizzle ORM
* MySQL
* Drizzle Kit

The repository includes Drizzle configuration and database migration support.

## Supporting Technologies

* Axios
* Zod
* React Query
* Expo Secure Store
* Expo Notifications
* Expo Audio
* Expo Video
* QR Code utilities

These dependencies are defined in the project's package configuration.

---

# 📁 Project Structure

```text
TraceX/
│
├── app/                    # Application screens and routing
│
├── assets/
│   └── images/             # Application images and icons
│
├── components/             # Reusable UI components
│
├── constants/              # Application constants and configuration
│
├── drizzle/                # Database schema / migration configuration
│
├── hooks/                  # Reusable React hooks
│
├── lib/                    # Shared application utilities
│
├── scripts/                # Development and utility scripts
│
├── server/
│   ├── _core/              # Backend server infrastructure
│   └── ...                 # API and server functionality
│
├── shared/                 # Shared constants / utilities
│
├── tests/                  # Automated tests
│
├── app.config.ts           # Expo application configuration
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── tailwind.config.js      # Tailwind configuration
└── README.md               # Project documentation
```

The repository currently contains these major application modules and configuration files.

---

# 🔄 Investigation Workflow

TraceX follows a structured workflow:

### Step 1 — Create Investigation

Create a dedicated case for the investigation.

### Step 2 — Add Evidence

Associate relevant digital evidence with the case.

### Step 3 — Preserve Integrity

Record relevant evidence integrity information such as cryptographic hashes.

### Step 4 — Analyze

Review available evidence and investigation information.

### Step 5 — Reconstruct Events

Organize relevant events chronologically.

### Step 6 — Correlate

Connect related evidence and events.

### Step 7 — Document Findings

Record observations and investigation findings.

### Step 8 — Generate Report

Compile the investigation information into a structured report.

---

# 🧠 Human-in-the-Loop Approach

TraceX is designed as an **investigator-assistance platform**, not an autonomous forensic decision-maker.

The system can help with:

* Organization
* Evidence management
* Data presentation
* Timeline organization
* Integrity information
* Investigation documentation
* Report preparation

However:

> **Final interpretation and forensic conclusions remain with the investigator.**

This is important because digital forensic evidence requires context, validation, and expert interpretation.

---

# 🔒 Security & Privacy Considerations

TraceX is intended for authorized forensic investigation and cybersecurity analysis.

Investigators should:

* Work only with legally authorized evidence.
* Preserve original evidence appropriately.
* Maintain proper chain-of-custody procedures.
* Use verified working copies where appropriate.
* Protect sensitive case information.
* Avoid exposing confidential evidence publicly.
* Validate important findings independently.

TraceX should be treated as an investigation-support application rather than a replacement for established forensic procedures.

---

# 🧪 Development

The project uses **pnpm** as its package manager.

### Install dependencies

```bash
pnpm install
```

### Start development environment

```bash
pnpm dev
```

This starts the application development environment and backend development server.

### Type checking

```bash
pnpm check
```

### Linting

```bash
pnpm lint
```

### Formatting

```bash
pnpm format
```

### Run tests

```bash
pnpm test
```

### Database migration

```bash
pnpm db:push
```

### Production build

```bash
pnpm build
```

### Start production server

```bash
pnpm start
```

The available scripts are defined in `package.json`.

---

# 🌐 Deployment

The current project has a deployed web version:

**Live Application:**
https://dfir-lab.preview.emergentagent.com

The repository is configured for web output using Expo/Metro.

---

# 📱 Platform Support

The application architecture is based on Expo and React Native and is configured for:

* 🌐 Web
* 🤖 Android
* 🍎 iOS

The Expo configuration includes native application settings, web bundling, deep linking, audio, video, notifications, and platform-specific configuration.

---

# 🎓 SIH 2026

TraceX was developed in the context of **Smart India Hackathon 2026 – Problem Statement 26148**, focused on computer and network forensic analysis.

### Objective

The project aims to demonstrate how a modern software platform can make forensic investigation workflows more structured, accessible, and easier to manage.

### Core Idea

```text
Traditional Approach
        ↓
Multiple Tools
        ↓
Separate Evidence
        ↓
Manual Correlation
        ↓
Manual Documentation
        ↓
Investigation Report


                    VS


TraceX
  ↓
Case
  ↓
Evidence
  ↓
Integrity
  ↓
Analysis
  ↓
Timeline
  ↓
Findings
  ↓
Report
```

---

# 🚀 Future Scope

TraceX can be extended with additional forensic capabilities such as:

* Automated artifact extraction
* PCAP/network evidence analysis
* Log parsing
* Windows event analysis
* Browser artifact analysis
* File metadata extraction
* Advanced timeline correlation
* IOC extraction
* Threat-intelligence integration
* Additional hash verification workflows
* Forensic report export formats
* Plugin-based forensic tool integrations
* Advanced case collaboration
* More comprehensive audit logging

These are potential extensions and should not be interpreted as currently implemented features.

---

# ⚠️ Important Disclaimer

TraceX is intended for:

* Authorized digital forensic investigations
* Cybersecurity research
* Academic projects
* Incident-response workflows
* Security analysis performed with appropriate authorization

Users are responsible for ensuring that they have legal authorization to collect, access, analyze, and store any digital evidence processed through the application.

TraceX does not replace professional forensic procedures, legal requirements, or expert examination.

---

# 👥 Project

**Project:** TraceX
**Focus:** Digital Forensics & Incident Response
**Problem Statement:** SIH 2026 – PS 26148

### Links

* **Live Demo:** https://dfir-lab.preview.emergentagent.com
* **Source Code:** https://github.com/devinamounisha/TraceX

---

## ⭐ Vision

> **TraceX — Turning complex digital evidence into a structured investigation workflow.**

The goal is simple:

**Collect → Preserve → Analyze → Correlate → Understand → Report**
