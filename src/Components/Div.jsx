export default function Div(props){
    const {id, cn, clickHandler, children} = props;
    return <div id={id} className={cn} onClick={clickHandler}>{children}</div>
}