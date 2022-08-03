import styles from './card.module.css'


const Card = (props) => {

    const { name } = props.cardData.types[0].type;

    const color = { grass: { light: '#BFDCCC', dark: '#7EB998' }, water: { light: '#C5DBF1', dark: '#8AB7E2' }, fire: { light: '#F8CCC8', dark: '#F09990' }, poison: { light: '#c9c4df', dark: '#a197c6' }, bug: { light: '#a9d580', dark: '#8cc756' }, rock: { light: '#b8b7b3', dark: '#acaba6' }, ground: { light: '#b69d73', dark: '#9e7c44' }, ghost: { light: '#c2b4d5', dark: '#947cb6' }, psychic: { light: '#FFF59F', dark: '#fff179' }, electric: { dark: '#ffea4d', light: '#fff080' }, normal: { light: '#99c3c4', dark: '#66a6a6' },dragon:{dark:'#acbfe1',light:'#c4d1ea'},fighting:{ dark: '#c6c9cb', light: '#d6d9da' },dark:{ light: '#99b2c3', dark: '#4d7897' },ice:{ light: '#c2b4d5', dark: '#947cb6' }}
    console.log(color[name])




    return (<div className={`${styles.card}`} style={{ backgroundColor: `${color[name]?.dark}` }}>
        {console.log(props.cardData)}
        <h3>{props.cardData.name}</h3>
        <div className={`${styles.imageContainer}`} style={{ backgroundColor: `${color[name]?.light}` }}>
            <img src={props.cardData.sprites?.other.dream_world.front_default} alt="" />
        </div>



    </div>)
}

export default Card;