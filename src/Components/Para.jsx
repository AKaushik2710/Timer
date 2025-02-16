export default function Para(props=undefined){
    const {id="", cn, clickHandler, children, style} = props;
    return <p id={id} className={cn} onClick={clickHandler} style={style}>{children}</p>
}