import React from 'react';

import { Ionicons } from '@expo/vector-icons';

import * as Atoms from '@components/atoms';

type SectionCardProps = {
  title: string;
  onPress?: () => void;
};

function SectionCard({ title, onPress }: SectionCardProps) {
  return (
    <Atoms.Pressable onPress={onPress}>
      <Atoms.Card>
        <Atoms.Row
          sx={{ alignItems: 'center', justifyContent: 'space-between' }}
        >
          <Atoms.Text
            variant="text-xs"
            sx={{
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            {title}
          </Atoms.Text>

          <Ionicons name="chevron-forward" color="white" size={18} />
        </Atoms.Row>
      </Atoms.Card>
    </Atoms.Pressable>
  );
}

export { SectionCard };
