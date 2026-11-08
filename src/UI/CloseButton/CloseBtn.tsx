import { CloseButton } from '@mantine/core';
import type { CloseBtnProps } from './../../types'

export function CloseBtn({...props}: CloseBtnProps) {
  return <CloseButton {...props} aria-label="close"/>;
}