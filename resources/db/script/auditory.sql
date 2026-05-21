-- ====================
-- USER
-- ====================

ALTER TABLE "user" ADD COLUMN "created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "user" ADD COLUMN "updated_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- ====================
-- USER MISSION
-- ====================

ALTER TABLE "user_mission" ADD COLUMN "created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "user_mission" ADD COLUMN "updated_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- ====================
-- USER ATTEMPT
-- ====================

ALTER TABLE "user_mission_attempt" ADD COLUMN "created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "user_mission_attempt" ADD COLUMN "updated_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- ====================
-- USER RESPONSE
-- ====================

ALTER TABLE "user_response" ADD COLUMN "created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "user_response" ADD COLUMN "updated_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- ====================
-- USER ACHIEVEMENT
-- ====================

ALTER TABLE "user_achievement" ADD COLUMN "created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "user_achievement" ADD COLUMN "updated_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- ====================
-- USER RESOURCE
-- ====================

ALTER TABLE "user_resource" ADD COLUMN "created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "user_resource" ADD COLUMN "updated_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP;
