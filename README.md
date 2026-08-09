<div align="center">

# CapDent Owner Dashboard

**A responsive clinic operations dashboard for dental practice owners and administrators.**

Built as a standalone web interface for exploring and managing the operational side of the broader CapDent product ecosystem.

</div>

---

## Overview

CapDent Owner Dashboard is a frontend-focused management interface designed around the day-to-day needs of a dental clinic owner.

The project brings core clinic operations into one place, including patient management, appointments, billing, visit history, staff, files, reports, and settings.

This repository contains the **public dashboard experience**, not the full production CapDent mobile application or production backend.

## Features

- Responsive desktop and mobile dashboard layout
- Clinic overview and operational summaries
- Patient management workflows
- Appointment management
- Billing and payment views
- Visit history
- Clinical/file management interface
- Staff management
- Reports and CSV export
- Settings area
- Demo patient search, add, and delete interactions
- Demo data for UI and workflow development

## Tech Stack

- **React** — component-based frontend
- **Vite** — development and production build tooling
- **JavaScript** — application logic
- **Responsive Web UI** — desktop and mobile layouts

## Product Context

CapDent is being developed as a broader dental-clinic management product covering clinical and administrative workflows.

This repository represents the owner-facing dashboard layer and is intentionally separated from private production infrastructure and sensitive clinic data.

## Local Development

### Requirements

- Node.js 20+
- npm

### Install

```bash
npm install
```

### Start development server

```bash
npm run dev
```

### Production build

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Architecture

```text
User
  ↓
React Dashboard
  ↓
Patients / Appointments / Billing / Files / Visits / Staff / Reports
  ↓
Demo frontend data layer
```

The current public repository is frontend-only. Production authentication, database access, clinic isolation, and backend services are maintained separately from this public portfolio repository.

## Security & Privacy

This repository is intended for portfolio and frontend-development purposes.

It should not contain real patient records, production credentials, secrets, private clinic data, or production database configuration.

## Status

**Active product / portfolio project**

The dashboard is part of the ongoing CapDent product ecosystem and will continue to evolve alongside the main platform.

## Author

**Karthik Raja**  
Product Builder & Full-Stack Developer  
GitHub: [@mkraja826](https://github.com/mkraja826)

---

> Designed around real clinic workflows, with a focus on clarity, speed, and practical day-to-day usability.
