-- ==========================================
-- DROP VIEWS (Ordem de Dependência Lógica)
-- ==========================================

DROP VIEW IF EXISTS vw_question_alternatives;
DROP VIEW IF EXISTS vw_mission_questions;

DROP VIEW IF EXISTS vw_planet_missions;
DROP VIEW IF EXISTS vw_achievements_detailed;

DROP VIEW IF EXISTS vw_user_achievement_history;
DROP VIEW IF EXISTS vw_user_mission_progression;


--- ==============================
--- USER MISSION PROGRESS
--- ==============================

CREATE OR REPLACE VIEW vw_user_mission_progression AS
SELECT 
    u.username,
    p.name AS planet_name,
    m.name AS mission_name,
    m.difficulty,
    um.status AS mission_status,
    um.best_result AS best_score
FROM "user" u
JOIN "user_mission" um ON u.id = um.user_id
JOIN "mission" m ON um.mission_id = m.id
JOIN "planet" p ON m.planet_id = p.id
ORDER BY p."order" ASC, m."order" ASC;

-- SELECT * FROM vw_user_mission_progression;


--- ==============================
--- USER ACHIEVEMENT HISTORY
--- ==============================

CREATE OR REPLACE VIEW vw_achievements_detailed AS
SELECT 
    a.name AS achievement,
    a.description,
    a.scope,
    a.type,
    a.bonus_xp,
    CASE 
        WHEN a.scope = 'GAME' THEN 'Global'
        WHEN at.entity = 'PLANET' THEN 'Planeta: ' || p.name
        WHEN at.entity = 'MISSION' THEN 'Missão: ' || m.name
        WHEN at.entity = 'LEVEL' THEN 'Nível Alcançado: ' || l.number
        ELSE 'Indefinido'
    END AS achievement_target_name,
FROM "achievement" a
LEFT JOIN "achievement_target" at ON a.id = at.achievement_id
LEFT JOIN "planet" p ON (at.entity = 'PLANET' AND at.entity_id = p.id)
LEFT JOIN "mission" m ON (at.entity = 'MISSION' AND at.entity_id = m.id)
LEFT JOIN "level" l ON (at.entity = 'LEVEL' AND at.entity_id = l.id)
ORDER BY 
    a.scope ASC, 
    a.type ASC, 
    p."order" NULLS FIRST, 
    m."order" NULLS FIRST;

-- SELECT * FROM vw_achievements_detailed;


--- ==============================
--- USER ACHIEVEMENT HISTORY
--- ==============================

CREATE OR REPLACE VIEW vw_user_achievement_history AS
SELECT 
    u.username,
    a.name AS achievement,
    a.description,
    a.type,
    a.bonus_xp,
    ua.collected_at
FROM "user" u
JOIN "user_achievement" ua ON u.id = ua.user_id
JOIN "achievement" a ON ua.achievement_id = a.id
ORDER BY a.scope, a.type, ua.collected_at DESC;

-- SELECT * FROM vw_user_achievement_history;


--- ==============================
--- PLANET MISSION
--- ==============================

CREATE OR REPLACE VIEW vw_planet_missions AS
SELECT 
    p.name AS planet,
    m.name AS mission,
    m.difficulty,
    m.xp_reward
FROM "planet" p
JOIN "mission" m ON p.id = m.planet_id
ORDER BY p."order" ASC, m."order" ASC;

-- SELECT * FROM vw_planet_missions;


--- ==============================
--- MISSION QUESTION
--- ==============================

CREATE OR REPLACE VIEW vw_mission_questions AS
SELECT 
    p.name AS planet,
    m.name AS mission,
    q.description AS question,
    q.code_snippet
FROM "planet" p
JOIN "mission" m ON p.id = m.planet_id
JOIN "question" q ON m.id = q.mission_id
ORDER BY p."order" ASC, m."order" ASC, q."order" ASC;

-- SELECT * FROM vw_mission_questions;


--- ==============================
--- QUESTION ALTERNATIVE
--- ==============================

CREATE OR REPLACE VIEW vw_question_alternatives AS
SELECT 
    m.name AS mission,
    q.description AS question,
    alt.content AS alternative,
    alt.is_correct,
    alt.feedback_tip
FROM "mission" m
JOIN "question" q ON m.id = q.mission_id
JOIN "alternative" alt ON q.id = alt.question_id
ORDER BY m."order" ASC, q."order" ASC, alt.id ASC;

-- SELECT * FROM vw_question_alternatives;
