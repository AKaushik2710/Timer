export default function Para(props=undefined){
    const {id="", cn, clickHandler, children} = props;
    return <p id={id} className={cn} onClick={clickHandler}>{children}</p>
}