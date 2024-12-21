import { FunctionComponent, useContext } from "react";
import { ThemeContext } from "../services/darkLightTheme";
import styles from './tools/LoadingComponent.module.css';

interface LoadingProps {}

const Loading: FunctionComponent<LoadingProps> = () => {
    const theme = useContext(ThemeContext);

    return (
        <main
            style={{
                backgroundColor: theme.background, color: theme.color, minHeight: "100vh", display:"flex",
                justifyContent:"center", alignItems:"center", height:"calc(100vh - 60px)"}}>
            <div className= {styles.loader}>
                <div className={styles.circle}>
                    <div className={styles.dot}></div>
                    <div className={styles.outline}></div>
                </div>
                <div className={styles.loader}>
                    <div className={styles.dot}></div>
                    <div className={styles.outline}></div>
                </div>
                <div className={styles.circle}>
                    <div className={styles.dot}></div>
                    <div className={styles.outline}></div>
                </div>
                <div className={styles.circle}>
                    <div className={styles.dot}></div>
                    <div className={styles.outline}></div>
                </div>
            </div>
        </main>
    );
};

export default Loading;
