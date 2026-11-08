import { CardList } from "../../Modules/CardList/CardList"
import styles from './style.module.scss'

export function RunningSpaceX () {
    return(
        <div>
            <h1 className={styles.heading}>SpaceX Launches 2020</h1>
            <CardList />
        </div>
    )
}