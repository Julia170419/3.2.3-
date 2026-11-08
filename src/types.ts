import type { ButtonHTMLAttributes } from 'react';

export type CloseBtnProps = ButtonHTMLAttributes<HTMLButtonElement>

export type CardSpaceProps = {
  img?: string,
  missionName: string,
  rocketName?: string,
  onClick: () => void,
}

export type ModalProps = {
    details:string,
} & CardSpaceProps

export type LaunchLinks = {
    mission_patch_small?: string,
    mission_patch?: string
}
export type LaunchRocket = {
    rocket_name?: string
}
export type Card = {
    flight_number: number,
    mission_name: string;
    links?: LaunchLinks,
    rocket?: LaunchRocket,
    details: string
}
export type CardObj = {
    launches: Card[]
}

export type State = {
  cards: Card[],
  isLoading: boolean,
  error: string | null,
  selectedCard: Card | null
}

export type Action =
  | { type: 'fetchSuccess'; payload: Card[] }
  | { type: 'fetchError'; payload: string }
  | { type: 'selectedCard'; payload: Card }
  | { type: 'modalClose' }