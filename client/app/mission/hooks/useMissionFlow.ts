import { useEffect, useMemo, useState } from 'react';

import missionService, {
  AttemptAnswerRequest,
  AttemptFinishResponse,
  MissionDetail,
  Question,
} from '@/services/domain/mission.service';

import {
  getMissionErrorMessage,
  getPlanetAccentColor,
} from '../utils/missionHelper';

type UseMissionFlowParams = {
  id?: string;
  planetId?: string;
  router: any;
};

export function useMissionFlow({ id, planetId, router }: UseMissionFlowParams) {
  const [mission, setMission] = useState<MissionDetail | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [opcaoSelecionada, setOpcaoSelecionada] = useState<number | null>(null);
  const [answers, setAnswers] = useState<AttemptAnswerRequest[]>([]);

  const [loading, setLoading] = useState(true);
  const [finishing, setFinishing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [finishResult, setFinishResult] = useState<AttemptFinishResponse | null>(
    null,
  );

  const accentColor = useMemo(() => {
    return getPlanetAccentColor(planetId);
  }, [planetId]);

  const currentQuestion = questions[currentQuestionIndex];

  const missionTitle = useMemo(() => {
    return mission?.name || mission?.title || 'Missão';
  }, [mission]);

  const planetName = useMemo(() => {
    return mission?.planet?.name || 'Planeta';
  }, [mission]);

  const progressText = useMemo(() => {
    if (!questions.length) return '';

    return `Pergunta ${currentQuestionIndex + 1} de ${questions.length}`;
  }, [currentQuestionIndex, questions.length]);

  function voltarParaPlaneta() {
    if (planetId) {
      router.replace({
        pathname: '/planet/[id]',
        params: {
          id: String(planetId),
          refresh: Date.now().toString(),
        },
      });
      return;
    }

    router.back();
  }

  async function carregarMissao() {
    try {
      if (!id) {
        setErrorMessage('ID da missão não encontrado.');
        setLoading(false);
        return;
      }

      setLoading(true);
      setErrorMessage('');
      setFinishResult(null);
      setAnswers([]);
      setOpcaoSelecionada(null);
      setCurrentQuestionIndex(0);

      const missionData = await missionService.getById(id);

      const orderedQuestions = [...(missionData.questions || [])].sort(
        (a, b) => Number(a.order) - Number(b.order),
      );

      setMission(missionData);
      setQuestions(orderedQuestions);
    } catch (error: any) {
      const status = error?.response?.status;

      if (status === 401 || status === 403) {
        setErrorMessage('Você precisa estar logado para acessar esta missão.');
        return;
      }

      setErrorMessage(
        getMissionErrorMessage(
          error,
          'Não foi possível carregar a missão. Verifique sua conexão e tente novamente.',
        ),
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarMissao();
  }, [id]);

  function selecionarAlternativa(index: number) {
    if (finishing || finishResult) return;

    setOpcaoSelecionada(index);
    setErrorMessage('');
  }

  function salvarRespostaAtual() {
    if (!currentQuestion) {
      return null;
    }

    if (opcaoSelecionada === null) {
      return null;
    }

    const selectedAlternative = currentQuestion.alternatives[opcaoSelecionada];

    if (!selectedAlternative) {
      return null;
    }

    const answer: AttemptAnswerRequest = {
      questionId: Number(currentQuestion.id),
      alternativeId: Number(selectedAlternative.id),
    };

    const filteredAnswers = answers.filter(
      (item) => item.questionId !== answer.questionId,
    );

    return [...filteredAnswers, answer];
  }

  async function confirmarResposta() {
    if (!currentQuestion || opcaoSelecionada === null) {
      return;
    }

    const updatedAnswers = salvarRespostaAtual();

    if (!updatedAnswers) {
      setErrorMessage('Selecione uma alternativa válida.');
      return;
    }

    setAnswers(updatedAnswers);

    const isLastQuestion = currentQuestionIndex >= questions.length - 1;

    if (!isLastQuestion) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setOpcaoSelecionada(null);
      setErrorMessage('');
      return;
    }

    await finalizarMissao(updatedAnswers);
  }

  async function finalizarMissao(finalAnswers: AttemptAnswerRequest[]) {
    try {
      if (!id) {
        setErrorMessage('ID da missão não encontrado.');
        return;
      }

      setFinishing(true);
      setErrorMessage('');

      const attemptData = await missionService.startAttempt(id);

      const result = await missionService.finishAttempt(
        attemptData.id,
        finalAnswers,
      );

      setFinishResult(result);
    } catch (error: any) {
      const status = error?.response?.status;

      if (status === 401 || status === 403) {
        setErrorMessage('Você precisa estar logado para finalizar esta missão.');
        return;
      }

      if (status === 409) {
        setErrorMessage(
          getMissionErrorMessage(
            error,
            'Não foi possível finalizar. Existe uma tentativa em andamento para esta missão.',
          ),
        );
        return;
      }

      setErrorMessage(
        getMissionErrorMessage(
          error,
          'Não foi possível finalizar a missão. Tente novamente em alguns segundos.',
        ),
      );
    } finally {
      setFinishing(false);
    }
  }

  function reiniciarMissao() {
    carregarMissao();
  }

  return {
    mission,
    questions,
    currentQuestion,
    currentQuestionIndex,
    opcaoSelecionada,
    loading,
    finishing,
    errorMessage,
    finishResult,
    accentColor,
    missionTitle,
    planetName,
    progressText,
    selecionarAlternativa,
    confirmarResposta,
    reiniciarMissao,
    voltarParaPlaneta,
  };
}