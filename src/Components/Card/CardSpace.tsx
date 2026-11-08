import { Card, Image, Text, Button, Group } from '@mantine/core';
import type { CardSpaceProps } from '../../types';
import styles from './style.module.scss'

export function CardSpace({ img, missionName, rocketName, onClick }: CardSpaceProps) {
  return (
    <Card data-testid="card" shadow="sm" padding="md" radius="md" withBorder className={styles.card}>
      <Card.Section>
        {img ? <Image
        className={styles.img}
          src={img}
          alt={missionName}
        /> : <div className={styles.img}>No image</div>}
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{missionName}</Text>
      </Group>

      <Text size="sm" c="dimmed">
        {rocketName ? rocketName : 'No rocket'}
      </Text>

      <Button color="blue" fullWidth mt="md" onClick={onClick}>
        See more
      </Button>
    </Card>
  );
}