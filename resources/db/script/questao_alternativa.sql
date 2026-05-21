INSERT INTO "question" (question_id, "description", "code_snippet", "order")
VALUES
    (1, 'Qual é a forma correta de declarar uma variável inteira em Java?', 'int x = 10;', 1),
    (2, 'Qual é o tipo de dado adequado para armazenar o valor "true" ou "false"?', 'boolean isActive = true;', 2),
    (3, 'Qual é o escopo de uma variável declarada dentro de um método em Java?', 'public void example() { int x = 10; }', 3);

INSERT INTO "alternative" (question_id, "content", "feedback_tip", "is_correct")
VALUES
    (1, 'int x = 10;', 'Correto! Em Java, variáveis inteiras são declaradas com "int".', true),
    (1, 'integer x = 10;', 'Errado. O tipo correto para inteiros em Java é "int".', false),
    (1, 'var x = 10;', 'Errado. "var" é um tipo implícito em Java, mas para int explicitamente usamos "int".', false);

INSERT INTO "alternative" (question_id, "content", "feedback_tip", "is_correct")
VALUES
    (2, 'boolean', 'Correto! O tipo "boolean" é usado para valores lógicos como "true" ou "false".', true),
    (2, 'int', 'Errado. "int" é utilizado para números inteiros, não para valores booleanos.', false),
    (2, 'char', 'Errado. "char" é usado para armazenar caracteres, não valores booleanos.', false);
a
INSERT INTO "alternative" (question_id, "content", "feedback_tip", "is_correct")
VALUES
    (3, 'Local', 'Correto! Variáveis dentro de um método têm escopo local e só podem ser acessadas dentro do método.', true),
    (3, 'Global', 'Errado. Variáveis locais não são globais. Elas são visíveis apenas dentro do método.', false),
    (3, 'Estático', 'Errado. Variáveis locais não são estáticas, elas pertencem ao escopo do método onde foram declaradas.', false);