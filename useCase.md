Use cases for the Central Blood Bank system:

1. **Register as a User:**

    - Actors: Donor, admin, Hospital Staff
    - Description: Users can register their account with the system.
    - Preconditions: User has access to the registration page.
    - Basic Flow:
        1. User navigates to the registration page.
        2. User enters their details (username, password, national id, etc.).
        3. User submits the registration form.
        4. System verifies the information and creates the user account.
        5. User verifies his email using the link sent in mail
    - Postconditions: User account is created, and the user can log in.

2. **Log In to the System:**

    - Actors: Donor, admin, Hospital Staff
    - Description: Users can log in to their account.
    - Preconditions: User has registered an account.
    - Basic Flow:
        1. User navigates to the login page.
        2. User enters their email and password.
        3. User submits the login form.
        4. System verifies the credentials and grants access to the user's dashboard.
    - Postconditions: User is logged in and can access their account features.

3. **Schedule Blood Donation Appointment:**

    - Actors: Donor
    - Description: Donors can schedule appointments for blood donation.
    - Preconditions: Donor is logged in and meets donation eligibility criteria (not donated in the last 3 months).
    - Basic Flow:
        1. Donor navigates to the appointment scheduling section.
        2. Donor selects a date and time for the donation appointment.
        3. Donor confirms the appointment.
        4. System verifies eligibility and schedules the appointment.
    - Postconditions: Donation appointment is scheduled successfully.

4. **Approve Blood Donation and Upload Test Results:**

    - Actors: Hospital Staff
    - Description: Hospital staff can approve blood donations and upload blood virus test results.
    - Preconditions: Donor has donated blood, and hospital staff is reviewing the donation.
    - Basic Flow:
        1. Hospital staff reviews the donation details and test results.
        2. Hospital staff approves the donation if it meets safety criteria.
        3. Hospital staff uploads blood virus test results to the donor's profile.
        4. If the blood virus test results is positive an email will be sent to the email address of the donor.
    - Postconditions: Donation is approved, and test results are stored for reference.

5. **Request Blood Units:**

    - Actors: Hospital Staff
    - Description: Hospitals can request specific blood units from the central blood bank.
    - Preconditions: Hospital staff is logged in and has access to the request form.
    - Basic Flow:
        1. Hospital staff fills out the blood request form (blood type, quantity, urgency, etc.).
        2. Hospital staff submits the request.
        3. System processes the request and checks blood inventory.
        4. If available, system confirms the request and reserves the blood units.
    - Postconditions: Blood units are reserved for the hospital's request.

6. **Manage Blood Inventory:**

    - Actors: Blood Bank Staff
    - Description: Staff members can add, update, and monitor the blood inventory.
    - Preconditions: Staff member is logged in and has access to inventory management tools.
    - Basic Flow:
        1. Staff member adds new donated blood units to the inventory.
        2. Staff member updates inventory levels and expiration dates.
        3. System tracks inventory changes and alerts staff of low stock or expired units.
    - Postconditions: Blood inventory is accurately managed and monitored.

7. **Organize Blood Donation Event:**
    - Actors: Blood Bank Staff
    - Description: Staff members can organize and manage blood donation events.
    - Preconditions: Staff member is logged in and has event management privileges.
    - Basic Flow:
        1. Staff member creates a new blood donation event (name, location, date, etc.).
        2. Staff member promotes the event and invites donors to participate.
        3. Donors register for the event through the system.
        4. System tracks event registrations and preparations.
    - Postconditions: Blood donation event is successfully organized and executed.

These modified use cases incorporate the restriction on donor blood donation frequency and introduce the functionality for hospital staff to review and approve donations while uploading test results for tracking and safety purposes.
