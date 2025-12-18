-- =================================================================
-- E2E Test Data Seeding Script
-- =================================================================
-- This script seeds the minimal data needed for E2E tests in
-- ephemeral environments. It includes:
-- 1. Realistic BC project data
-- 2. Invitation token for proponent registration testing
-- 3. Optional staff user for staff-side testing
-- =================================================================

-- =================================================================
-- Seed realistic test projects
-- =================================================================
-- These are based on real BC environmental assessment projects
-- to provide realistic test data for the ephemeral environment
INSERT INTO projects (id, name, ea_certificate, proponent_id, type, description, is_active, created_date)
VALUES
  (1000, 'Coastal GasLink Pipeline', 'E14-03', 'TCPL-001', 'ENERGY_ELECTRICITY',
   'Natural gas pipeline project in northern BC', true, NOW()),
  (1001, 'Site C Clean Energy Project', 'E13-01', 'BCH-001', 'ENERGY_ELECTRICITY',
   'Hydroelectric dam on the Peace River', true, NOW()),
  (1002, 'LNG Canada Export Terminal', 'E17-02', 'LNGC-001', 'INDUSTRIAL',
   'Liquefied natural gas export facility in Kitimat', true, NOW());

-- =================================================================
-- Seed invitation for new account creation
-- =================================================================
-- This invitation allows test proponent to complete registration
-- The test will use this token to navigate to /proponent/registration/?token=...
INSERT INTO invitations (id, token, email, project_ids, role_id, status, expiry_date, is_first_time, created_date)
VALUES (
  1000,
  'e2e-test-invitation-token-uuid',  -- Predictable token for test
  'proponent.test@example.com',
  ARRAY[1000, 1001],  -- Invite to Coastal GasLink and Site C
  (SELECT id FROM roles WHERE role_name = 'PROJECT_ADMIN'),
  'PENDING',
  NOW() + INTERVAL '7 days',
  true,  -- First-time user (shows "Add Projects" step in registration)
  NOW()
);

-- =================================================================
-- Optional: Seed staff user for staff-side tests
-- =================================================================
-- NOTE: The STAFF_AUTH_GUID must match the Keycloak user GUID for the
-- staff username used in tests (STAFF_USERNAME secret in GitHub Actions)
--
-- To find the correct GUID:
-- Option 1: Login as staff in DEV, inspect JWT token 'sub' claim
-- Option 2: Query DEV database:
--   oc exec submit-patroni-0 -n c8b80a-dev -- psql -U postgres -d submit -c \
--     "SELECT auth_guid FROM users WHERE email_address = 'staff.test@gov.bc.ca';"
-- Option 3: Use Keycloak admin API to get user ID
--
-- Uncomment the lines below and replace REPLACE_WITH_ACTUAL_STAFF_GUID with the real GUID
--
-- INSERT INTO users (id, auth_guid, email_address, full_name, type, is_active, created_date)
-- VALUES (2000, 'REPLACE_WITH_ACTUAL_STAFF_GUID', 'staff.test@gov.bc.ca', 'E2E Test Staff User', 'STAFF', true, NOW());
--
-- INSERT INTO staff_users (id, user_id, deputy_director_id, is_active)
-- VALUES (3000, 2000, NULL, true);

-- =================================================================
-- End of seed script
-- =================================================================
