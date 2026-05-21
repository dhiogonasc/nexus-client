-- VARIABILIS (Variáveis e Tipos de Dados)
INSERT INTO planet ("name", "description", "order") VALUES
    ('Variabilis', 'Planeta do tópico Variáveis e Tipos de Dados. Ecossistema: armazenamento de seiva (inteiros e reais), folhas gravadas (char e string) e magnetismo bipolar (booleano).', 1);

-- BIFURCA (Estruturas Condicionais)
INSERT INTO planet ("name", "description", "order") VALUES
    ('Bifurca', 'Planeta do tópico Estruturas Condicionais (SE / SENAO). Ecossistema instável com dois hemisférios; a extração depende de decisões baseadas no clima.', 2);

-- CICLOS (Laços de Repetição)
INSERT INTO planet ("name", "description", "order") VALUES
    ('Ciclos', 'Planeta do tópico Laços de Repetição (ENQUANTO / PARA). Ecossistema onde o tempo flui em espiral e recursos exigem automação para coleta repetida.', 3);

-- VETORIAL (Vetores e Matrizes)
INSERT INTO planet ("name", "description", "order") VALUES
    ('Vetorial', 'Planeta do tópico Vetores e Matrizes. Cavernas de cristais organizados em índices; o explorador aprende a acessar coleções estruturadas.', 4);

-- VARIABILIS (Variáveis e Tipos de Dados) - Inserção de recursos, missões, perguntas e alternativas
INSERT INTO resource (planet_id, "name", description) VALUES
    ((SELECT id FROM planet WHERE "name" = 'Variabilis' AND "order" = 1), 'Seiva Bruta', 'Recurso que representa valores numéricos (inteiros e reais) usados no ecossistema de Variabilis.');

INSERT INTO mission (planet_id, title, description, difficulty, xp_reward) VALUES
    ((SELECT id FROM planet WHERE "name" = 'Variabilis' AND "order" = 1), 'Coleta de Seiva', 'Identificar e armazenar tipos numéricos e textuais durante a coleta de seiva.', 'EASY', 50);

INSERT INTO question (mission_id, "statement", tag, "order") VALUES
    ((SELECT id FROM mission WHERE planet_id = (SELECT id FROM planet WHERE "name" = 'Variabilis' AND "order" = 1) AND title = 'Coleta de Seiva'), 'Qual tipo é mais adequado para armazenar a quantidade inteira de seiva coletada (por exemplo: 42)?', 'QUESTION', 1);

INSERT INTO alternative (question_id, "content", is_correct) VALUES
                                                                 ((SELECT id FROM question WHERE mission_id = (SELECT id FROM mission WHERE planet_id = (SELECT id FROM planet WHERE "name" = 'Variabilis' AND "order" = 1) AND title = 'Coleta de Seiva') AND "order" = 1), 'Inteiro', true),
                                                                 ((SELECT id FROM question WHERE mission_id = (SELECT id FROM mission WHERE planet_id = (SELECT id FROM planet WHERE "name" = 'Variabilis' AND "order" = 1) AND title = 'Coleta de Seiva') AND "order" = 1), 'Real', false),
                                                                 ((SELECT id FROM question WHERE mission_id = (SELECT id FROM mission WHERE planet_id = (SELECT id FROM planet WHERE "name" = 'Variabilis' AND "order" = 1) AND title = 'Coleta de Seiva') AND "order" = 1), 'Texto', false),
                                                                 ((SELECT id FROM question WHERE mission_id = (SELECT id FROM mission WHERE planet_id = (SELECT id FROM planet WHERE "name" = 'Variabilis' AND "order" = 1) AND title = 'Coleta de Seiva') AND "order" = 1), 'Booleano', false);

-- BIFURCA (Estruturas Condicionais) - Inserção de recursos, missões, perguntas e alternativas
INSERT INTO resource (planet_id, "name", description) VALUES
    ((SELECT id FROM planet WHERE "name" = 'Bifurca' AND "order" = 2), 'Cristal do Clima', 'Recurso sensível ao estado do tempo; exige decisões condicionais para extração.');

INSERT INTO mission (planet_id, title, description, difficulty, xp_reward) VALUES
    ((SELECT id FROM planet WHERE "name" = 'Bifurca' AND "order" = 2), 'Síntese Condicional', 'Usar condições para decidir qual recurso extrair conforme o clima.', 'EASY', 60);

INSERT INTO question (mission_id, "statement", tag, "order") VALUES
    ((SELECT id FROM mission WHERE planet_id = (SELECT id FROM planet WHERE "name" = 'Bifurca' AND "order" = 2) AND title = 'Síntese Condicional'), 'Se o sintetizador detectar chuva, qual recurso o Explorador deve extrair?', 'QUESTION', 1);

INSERT INTO alternative (question_id, "content", is_correct) VALUES
                                                                 ((SELECT id FROM question WHERE mission_id = (SELECT id FROM mission WHERE planet_id = (SELECT id FROM planet WHERE "name" = 'Bifurca' AND "order" = 2) AND title = 'Síntese Condicional') AND "order" = 1), 'Flor de Água', true),
                                                                 ((SELECT id FROM question WHERE mission_id = (SELECT id FROM mission WHERE planet_id = (SELECT id FROM planet WHERE "name" = 'Bifurca' AND "order" = 2) AND title = 'Síntese Condicional') AND "order" = 1), 'Cristal de Sol', false),
                                                                 ((SELECT id FROM question WHERE mission_id = (SELECT id FROM mission WHERE planet_id = (SELECT id FROM planet WHERE "name" = 'Bifurca' AND "order" = 2) AND title = 'Síntese Condicional') AND "order" = 1), 'Folha Seca', false),
                                                                 ((SELECT id FROM question WHERE mission_id = (SELECT id FROM mission WHERE planet_id = (SELECT id FROM planet WHERE "name" = 'Bifurca' AND "order" = 2) AND title = 'Síntese Condicional') AND "order" = 1), 'Nada', false);

-- CICLOS (Laços de Repetição) - Inserção de recursos, missões, perguntas e alternativas
INSERT INTO resource (planet_id, "name", description) VALUES
    ((SELECT id FROM planet WHERE "name" = 'Ciclos' AND "order" = 3), 'Fruto em Série', 'Frutos que aparecem repetidamente; coletá-los exige automação por laços de repetição.');

INSERT INTO mission (planet_id, title, description, difficulty, xp_reward) VALUES
    ((SELECT id FROM planet WHERE "name" = 'Ciclos' AND "order" = 3), 'Colheita Automática', 'Programar o sintetizador para repetir a coleta enquanto o solo for fértil.', 'MEDIUM', 100);

INSERT INTO question (mission_id, "statement", tag, "order") VALUES
    ((SELECT id FROM mission WHERE planet_id = (SELECT id FROM planet WHERE "name" = 'Ciclos' AND "order" = 3) AND title = 'Colheita Automática'), 'Qual estrutura é indicada para repetir uma ação enquanto uma condição for verdadeira?', 'QUESTION', 1);

INSERT INTO alternative (question_id, "content", is_correct) VALUES
                                                                 ((SELECT id FROM question WHERE mission_id = (SELECT id FROM mission WHERE planet_id = (SELECT id FROM planet WHERE "name" = 'Ciclos' AND "order" = 3) AND title = 'Colheita Automática') AND "order" = 1), 'ENQUANTO', true),
                                                                 ((SELECT id FROM question WHERE mission_id = (SELECT id FROM mission WHERE planet_id = (SELECT id FROM planet WHERE "name" = 'Ciclos' AND "order" = 3) AND title = 'Colheita Automática') AND "order" = 1), 'SE', false),
                                                                 ((SELECT id FROM question WHERE mission_id = (SELECT id FROM mission WHERE planet_id = (SELECT id FROM planet WHERE "name" = 'Ciclos' AND "order" = 3) AND title = 'Colheita Automática') AND "order" = 1), 'FUNÇÃO', false),
                                                                 ((SELECT id FROM question WHERE mission_id = (SELECT id FROM mission WHERE planet_id = (SELECT id FROM planet WHERE "name" = 'Ciclos' AND "order" = 3) AND title = 'Colheita Automática') AND "order" = 1), 'RETORNO', false);

-- VETORIAL (Vetores e Matrizes) - Inserção de recursos, missões, perguntas e alternativas
INSERT INTO resource (planet_id, "name", description) VALUES
    ((SELECT id FROM planet WHERE "name" = 'Vetorial' AND "order" = 4), 'Cristal Índice', 'Cristais organizados por índices; exigem acesso por posições (vetores/matrizes).');

INSERT INTO mission (planet_id, title, description, difficulty, xp_reward) VALUES
    ((SELECT id FROM planet WHERE "name" = 'Vetorial' AND "order" = 4), 'Mineração Indexada', 'Acessar coleções de cristais por índices e montar estruturas para evitar perdas na mina.', 'MEDIUM', 120);

INSERT INTO question (mission_id, "statement", tag, "order") VALUES
    ((SELECT id FROM mission WHERE planet_id = (SELECT id FROM planet WHERE "name" = 'Vetorial' AND "order" = 4) AND title = 'Mineração Indexada'), 'Como se chama a estrutura que reúne múltiplos elementos acessíveis por posição?', 'QUESTION', 1);

INSERT INTO alternative (question_id, "content", is_correct) VALUES
                                                                 ((SELECT id FROM question WHERE mission_id = (SELECT id FROM mission WHERE planet_id = (SELECT id FROM planet WHERE "name" = 'Vetorial' AND "order" = 4) AND title = 'Mineração Indexada') AND "order" = 1), 'Vetor (ou Array)', true),
                                                                 ((SELECT id FROM question WHERE mission_id = (SELECT id FROM mission WHERE planet_id = (SELECT id FROM planet WHERE "name" = 'Vetorial' AND "order" = 4) AND title = 'Mineração Indexada') AND "order" = 1), 'Condicional', false),
                                                                 ((SELECT id FROM question WHERE mission_id = (SELECT id FROM mission WHERE planet_id = (SELECT id FROM planet WHERE "name" = 'Vetorial' AND "order" = 4) AND title = 'Mineração Indexada') AND "order" = 1), 'Laço', false),
                                                                 ((SELECT id FROM question WHERE mission_id = (SELECT id FROM mission WHERE planet_id = (SELECT id FROM planet WHERE "name" = 'Vetorial' AND "order" = 4) AND title = 'Mineração Indexada') AND "order" = 1), 'Booleano', false);