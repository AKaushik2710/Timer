export default function Para(props=undefined){
    const {id="", cn, clickHandler, children} = props;
    return <p id={id} onClick={clickHandler}>{children}</p>
}