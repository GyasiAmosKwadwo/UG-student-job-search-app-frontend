# UG CareerLink Frontend

Repo for the DCIT317 project (UG CareerLink frontend).

## Project Overview
UG CareerLink is a web-based job marketplace for students and employers within
the University of Ghana campus. Students create profiles, upload CVs, and apply
for part-time, internship, and campus-based opportunities. Employers (campus
units and verified businesses) post job listings and manage applications. The
platform enhances employability, reduces information gaps, and provides
structured access to opportunities.

## How The App Works
UG CareerLink is built around two primary roles:
- Students: build a profile, upload a CV, discover verified roles, apply, and
  track application status.
- Employers: complete verification, publish campus roles, review applications,
  shortlist candidates, and schedule interviews.

High-level flow:
1. User selects a role (student or employer) and completes onboarding.
2. Students create a profile and apply to verified listings.
3. Employers review applications and manage candidate communications.
4. Admins oversee platform safety, approvals, and reporting.

## Installation (Local Dev)
From the repo root:
1. `cd main`
2. `npm install`
3. `npm run dev`

The app will be available at the local Vite dev server URL shown in the terminal.

## Build
From `main/`:
1. `npm run build`
2. `npm run preview`

## Project Structure
- `main/src/components`: reusable UI components.
- `main/src/pages`: route-level screens (Home, Login, Signup, 404).
- `main/src/styles`: global styles and design tokens.
- `main/src/hooks`: shared hooks (future).

## Objectives and Success Criteria
Objectives:
- Build a functional web platform for campus-based job listings.
- Provide secure registration and role-based access (student, employer, admin).
- Deploy the platform within 12 weeks.

Success Criteria:
- At least 100 student registrations within the first month of launch.
- System uptime of 95% or higher.
- Posting and application workflow tested and approved.

## Stakeholders and Roles
- Project Sponsor: University authority or department providing approval.
- Project Manager: Oversees planning, execution, and monitoring.
- Development Team: Designs and builds the platform.
- Students: End users applying for jobs.
- Employers: Post job opportunities.
- System Administrator: Manages platform operations.

## Milestones Timeline
- Week 1-2: Requirements gathering and approval
- Week 3-5: System design and architecture
- Week 6-9: Development phase
- Week 10-11: Testing and debugging
- Week 12: Deployment and training

## Key Constraints and Assumptions
Constraints:
- 12-week completion deadline.
- Limited academic project funding.
- Student developers balancing academic workload.

Assumptions:
- Students have internet access.
- University management supports implementation.
- Required development tools are available.

## Scope
Included:
- User registration and authentication system.
- Job posting and application management.
- Admin dashboard.
- Profile management and CV upload.

Excluded:
- Payment processing system.
- Mobile native application.
- Integration with external national job platforms.

## Key Requirements
1. Secure authentication with encrypted passwords.
2. Role-based access control.
3. Search and filter job listings.
4. Application tracking feature.
5. Administrative reporting dashboard.

## Scope Change Management
All change requests must be submitted in writing to the Project Manager. Requests
will be reviewed for impact on time, cost, and resources. Approved changes will
be documented and incorporated into the revised project plan. Unapproved changes
will not be implemented to prevent scope creep.

## Team
- Ebenezer Fuachie (22129348)
- Richmond Nkansah Duodu (22122528)
- Horaya Razak (22236215)
- Opoku Ransford (22041329)
- Gyasi Amos Kwadwo (22245133)
- Nartey Godwin Odimera (22016934)
- Vordey Dzidzor Adzo (22052103)
- Apeagyei Nathaniel Nana Yaw Asare (11248990)
