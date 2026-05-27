import { useEffect, useMemo, useState } from 'react';

import api from '@/services/api';

import {
  calculatePlanetProgress,
  MissionTask,
} from '../utils/planetHelper';
import { PLANETS } from '@/models/planet';

type UsePlanetDetailsParams = {
  id?: string | string[];
  refresh?: string | string[];
  router: any;
};

export function usePlanetDetails({
  id,
  refresh,
  router,
}: UsePlanetDetailsParams) {
  const [planeta, setPlaneta] = useState<any>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const planetId = Array.isArray(id) ? id[0] : id;

  async function buscarDetalhesPlaneta() {
    if (!planetId) {
      setErro('Coordenadas não identificadas.');
      setCarregando(false);
      return;
    }

    try {
      setCarregando(true);
      setErro(null);

      const response = await api.get(`/planets/${planetId}`);
      const dadosApi = response.data;

      const idString = String(planetId);
      const planetaLocal = (PLANETS as any)[idString];

      const planetaCompleto = {
        ...dadosApi,
        id: dadosApi.id?.toString() || idString,
        name: dadosApi.name || dadosApi.nome,
        description: dadosApi.description || dadosApi.descricao || '',
        content: dadosApi.content || '',
        imagem: planetaLocal?.imagem || require('../../../assets/FundoPlanets.png'),
        accentColor: planetaLocal?.accentColor || '#3B82F6',
      };

      setPlaneta(planetaCompleto);
    } catch (error) {
      console.error('Erro ao buscar detalhes do planeta:', error);
      setErro('Não foi possível estabelecer conexão com o planeta.');
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    buscarDetalhesPlaneta();
  }, [planetId, refresh]);

  const missions: MissionTask[] = useMemo(() => {
    return planeta?.missions?.tasks || [];
  }, [planeta]);

  const progress = useMemo(() => {
    return calculatePlanetProgress(missions);
  }, [missions]);

  function voltar() {
    router.replace('/homePage');
  }

  function abrirMissao(missao: MissionTask) {
    router.push({
      pathname: '/mission/[id]',
      params: {
        id: String(missao.id),
        planetId: String(planeta.id),
      },
    });
  }

  return {
    planeta,
    missions,
    progress,
    carregando,
    erro,
    buscarDetalhesPlaneta,
    voltar,
    abrirMissao,
  };
}