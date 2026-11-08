import { useEffect, useReducer} from 'react';
import ky from 'ky';
import { CardSpace } from './../../Components/Card/CardSpace';
import { Modal } from '../../Components/Modal/Modal';
import { reducer } from '../../hooks';
import type { CardObj, State } from '../../types';
import styles from './style.module.scss'

export function CardList () {
    const initialState: State = {
        cards: [],
        isLoading: true,
        error: null,
        selectedCard: null
    }
    const [state, dispatch] = useReducer(reducer, initialState);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await ky.get('https://kata-spacex.onrender.com/api/launches').json<CardObj>()
                dispatch({ type: 'fetchSuccess', payload: response.launches })
            } catch (e) {
                console.error(e);
                dispatch({ type: 'fetchError', payload: 'The data could not be loaded' })
            }
        }
        fetchData();
    }, [])
    if (state.isLoading) return <p>Loading...</p>;
    if (state.error) return <p>{state.error}</p>;
    return (
        <>
        <ul className={styles['items-list']}>
            {state.cards.map(item =>
                <li key={item.flight_number}>
                    <CardSpace
                    img={item.links?.mission_patch_small}
                    missionName={item.mission_name}
                    rocketName={item.rocket?.rocket_name}
                    onClick={() => 
                        dispatch({ type: 'selectedCard', payload: item })}
                    />
                </li>)}
        </ul>
        {state.selectedCard && 
                    <Modal 
                    img={state.selectedCard.links?.mission_patch}
                    missionName={state.selectedCard.mission_name}
                    rocketName={state.selectedCard.rocket?.rocket_name}
                    details={state.selectedCard.details}
                    onClick={() => 
                        dispatch({ type: 'modalClose'})}
                    />}
                    </>
    )
}