export default function Button(props){
    const {id="", cn="", ds, children, clickHandler} = props;
    return <button id={id} className={cn} disabled={ds} onClick={clickHandler}>{children}</button>
}