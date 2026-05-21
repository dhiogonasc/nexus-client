import React from 'react';
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import MissionBackground from './MissionBackground';

type Props = {
  accentColor: string;
  message: string;
  loading?: boolean;
  onRetry?: () => void;
  onBack?: () => void;
};

export default function MissionStateScreen({
  accentColor,
  message,
  loading = false,
  onRetry,
  onBack,
}: Props) {
  return (
    <MissionBackground>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 24,
        }}
      >
        {loading && <ActivityIndicator size="large" color={accentColor} />}

        <Text
          style={{
            color: 'white',
            textAlign: 'center',
            marginTop: loading ? 12 : 0,
            marginBottom: 16,
            fontSize: 16,
            lineHeight: 24,
          }}
        >
          {message}
        </Text>

        {onRetry && (
          <TouchableOpacity
            onPress={onRetry}
            style={{
              paddingVertical: 12,
              paddingHorizontal: 20,
              borderRadius: 12,
              backgroundColor: accentColor,
              marginBottom: 12,
            }}
          >
            <Text style={{ color: 'white', fontWeight: 'bold' }}>
              Tentar novamente
            </Text>
          </TouchableOpacity>
        )}

        {onBack && (
          <TouchableOpacity onPress={onBack}>
            <Text style={{ color: accentColor }}>Voltar</Text>
          </TouchableOpacity>
        )}
      </View>
    </MissionBackground>
  );
}