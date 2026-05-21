import React from 'react';
import { Text, View } from 'react-native';

type Props = {
  accentColor: string;
  completed: number;
  total: number;
  percent: number;
};

export default function PlanetProgress({
  accentColor,
  completed,
  total,
  percent,
}: Props) {
  return (
    <View
      style={{
        marginTop: 18,
        marginBottom: 18,
        padding: 14,
        borderRadius: 14,
        backgroundColor: 'rgba(15,23,42,0.75)',
        borderWidth: 1,
        borderColor: 'rgba(148,163,184,0.18)',
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 8,
        }}
      >
        <Text
          style={{
            color: '#E2E8F0',
            fontWeight: 'bold',
            fontSize: 14,
          }}
        >
          Progresso do planeta
        </Text>

        <Text
          style={{
            color: accentColor,
            fontWeight: 'bold',
            fontSize: 14,
          }}
        >
          {completed}/{total}
        </Text>
      </View>

      <View
        style={{
          width: '100%',
          height: 8,
          borderRadius: 999,
          backgroundColor: 'rgba(100,116,139,0.35)',
          overflow: 'hidden',
        }}
      >
        <View
          style={{
            width: `${percent}%`,
            height: '100%',
            borderRadius: 999,
            backgroundColor: accentColor,
          }}
        />
      </View>

      <Text
        style={{
          color: '#94A3B8',
          fontSize: 12,
          marginTop: 8,
        }}
      >
        {percent}% concluído
      </Text>
    </View>
  );
}