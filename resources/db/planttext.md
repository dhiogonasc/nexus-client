# NEXUS - Script Diagramação ER

## Script para diagramação ER via PlantText

```
@startuml
!theme plain
skinparam Linetype ortho
skinparam shadowing false

' ==============================
' USER DOMAIN
' ==============================

package "User" {

entity "User" as user {
    * id : bigint <<PK>>
    --
    username : varchar(255)
    email : varchar(255) <<UK>>
    password : varchar(255)
    created_at : timestamp
}

entity "UserStat" as user_stat {
    * id : bigint <<PK>>
    --
    user_id : bigint <<FK>> <<UK>>
    level_id : bigint <<FK>>
    xp_current : int <<CK>>
    streak_current : int <<CK>>
    last_access : timestamp
}

entity "UserMission" as user_mission {
    * id : bigint <<PK>>
    --
    user_id : bigint <<FK>>
    mission_id : bigint <<FK>>
    status : varchar(50) <<CK>>
    best_result : numeric(5,2)
    --
    <<UK (user_id, mission_id)>>
}

entity "UserMissionAttempt" as attempt {
    * id : bigint <<PK>>
    --
    user_mission_id : bigint <<FK>>
    start_at : timestamp
    end_at : timestamp
    duration : interval
    result : numeric(5,2)
}

entity "UserResponse" as response {
    * id : bigint <<PK>>
    --
    attempt_id : bigint <<FK>>
    alternative_id : bigint <<FK>>
    is_correct : boolean
}

entity "UserAchievement" as user_achievement {
    * id : bigint <<PK>>
    --
    user_id : bigint <<FK>>
    achievement_id : bigint <<FK>>
    earned_at : timestamp
    --
    <<UK (user_id, achievement_id)>>
}

entity "UserResource" as user_resource {
    * id : bigint <<PK>>
    --
    user_id : bigint <<FK>>
    resource_id : bigint <<FK>>
    collected_at : timestamp
    --
    <<UK (user_id, resource_id)>>
}

}

' ==============================
' PROGRESSION DOMAIN
' ==============================

package "Progression" {

entity "Level" as level {
    * id : bigint <<PK>>
    --
    number : int <<UK>>
    xp_required : int <<CK>>
}

entity "Achievement" as achievement {
    * id : bigint <<PK>>
    --
    name : varchar(255)
    description : text
    bonus_xp : int <<CK>>
    type : varchar(50) <<CK>>
    target_type : varchar(50) <<CK>>
    target_id : bigint
}

}

' ==============================
' LEARNING DOMAIN
' ==============================

package "Learning" {

entity "Planet" as planet {
    * id : bigint <<PK>>
    --
    name : varchar(255) <<UK>>
    description : text
    planet_prerequisite_id : bigint <<FK>> <<UK>>
}

entity "Mission" as mission {
    * id : bigint <<PK>>
    --
    planet_id : bigint <<FK>>
    title : varchar(255)
    description : text
    difficulty : varchar(50) <<CK>>
    xp_reward : int
    mission_prerequisite_id : bigint <<FK>>
    --
    <<UK (planet_id,title)>>
}

entity "Resource" as resource {
    * id : bigint <<PK>>
    --
    planet_id : bigint <<FK>> <<UK>>
    name : varchar(255) <<UK>>
    description : text
}

entity "Question" as question {
    * id : bigint <<PK>>
    --
    mission_id : bigint <<FK>>
    statement : text
    tag : varchar(50) <<CK>>
    order : int
    --
    <<UK (mission_id, order)>>
}

entity "Alternative" as alternative {
    * id : bigint <<PK>>
    --
    question_id : bigint <<FK>>
    content : text
    is_correct : boolean
    --
    <<UK (question_id, content)>>
}

}

' ==============================
' RELATIONSHIPS
' ==============================

user ||--|| user_stat
level ||--o{ user_stat

planet |o--o| planet : prerequisite
planet ||--{ mission
planet ||--{ resource

mission |o--o| mission : prerequisite
mission ||--{ question
question ||--{ alternative

user ||--o{ user_mission
mission ||--o{ user_mission

user_mission ||--o{ attempt
attempt ||--{ response
alternative ||--o{ response

user ||--o{ user_achievement
achievement ||--o{ user_achievement

user ||--o{ user_resource
resource ||--o{ user_resource

header Nexus DB

@enduml

```

---

Visualize ou atualize: [PlantText](https://www.planttext.com/)
