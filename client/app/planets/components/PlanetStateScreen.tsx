import React from 'react';
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type Props = {
  loading?: boolean;
  message: string;
  color?: string;
  onBack?: () => void;
};

export default function PlanetStateScreen({
  loading = false,
  message,
  color = '#3B82F6',
  onBack,
}: Props) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#020617',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
      }}
    >
      {loading && <ActivityIndicator size="large" color={color} />}

      <Text
        style={{
          color: loading ? 'white' : '#ef4444',
          marginTop: loading ? 10 : 0,
          textAlign: 'center',
        }}
      >
        {message}
      </Text>

      {onBack && (
        <TouchableOpacity onPress={onBack}>
          <Text
            style={{
              color,
              marginTop: 15,
              fontWeight: 'bold',
            }}
          >
            Voltar para o mapa estelar
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}